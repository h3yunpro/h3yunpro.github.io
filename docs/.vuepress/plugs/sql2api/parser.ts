import { Select, Binary, ExprList, Value, ColumnRefItem } from 'node-sql-parser';

import { Matcher } from './matcher.ts';
import { OperatorType } from './operatorType.ts';

function generateApiRequest(select: Select) {
    const tableName = getTableName(select);
    const limit = getLimit(select);
    const orderBy = getOrderBy(select);
    const returnItems = getReturnItems(select);
    const where = getWhere(select);

    if (select.distinct) {
        throw new Error('LoadBizObjects不支持distinct查询');
    }
    if (select.groupby) {
        throw new Error('LoadBizObjects不支持group by查询');
    }
    if (select.having) {
        throw new Error('LoadBizObjects不支持having查询');
    }

    const filter = {
        'FromRowNum': limit.FromRowNum,
        'ToRowNum': limit.ToRowNum,
        'Matcher': where,
        'SortByCollection': orderBy,
        'RequireCount': true,
        'ReturnItems': returnItems
    };

    const result = {
        'ActionName': 'LoadBizObjects',
        'SchemaCode': tableName,
        'Filter': JSON.stringify(filter)
    };

    return result;
}

//获取表名
function getTableName(select: Select) {
    if (!select.from) {
        throw new Error('请先输入要转换的SELECT语句');
    }

    // 检查 from 是否为数组
    let firstFromItem;
    if (Array.isArray(select.from)) {
        if (select.from.length === 0) {
            throw new Error('请先输入要转换的SELECT语句');
        }
        firstFromItem = select.from[0];
    } else {
        // 如果是 TableExpr 类型（子查询等情况），LoadBizObjects 不支持
        throw new Error('LoadBizObjects不支持子查询作为数据源');
    }

    // 检查 firstFromItem 是否有 table 属性（BaseFrom 或 Join 类型）
    if ('table' in firstFromItem && typeof firstFromItem.table === 'string') {
        const table = firstFromItem.table;
        if (table.length === 0) {
            throw new Error('表名不能为空');
        }
        //正则判断表名是否以H_或h_开头
        if (/^(H_|h_)/.test(table)) {
            throw new Error('h_开头的是系统表, LoadBizObjects不支持查询系统表');
        }
        //正则判断表名是否以I_或i_开头
        if (!/^(I_|i_)/.test(table)) {
            throw new Error('表名有误, 氚云表单数据表必须是i_开头');
        }
        return table.substring(2);
    } else if ('type' in firstFromItem && firstFromItem.type === 'dual') {
        throw new Error('LoadBizObjects不支持DUAL表');
    } else {
        throw new Error('表名不能为空或不支持的表类型');
    }
}

//获取limit
function getLimit(select: Select) {
    var fromRowNum = 0;
    var pageSize = 500;
    if (select.limit && select.limit.value && select.limit.value.length) {
        if (select.limit.value.length == 1) {
            pageSize = select.limit.value[0].value;
        } else {
            fromRowNum = select.limit.value[0].value;
            pageSize = select.limit.value[1].value;
        }
    }

    if (fromRowNum < 0) {
        throw new Error('limit语句转换失败, 起始下标应大于0');
    }

    if (pageSize <= 0 || pageSize > 500) {
        throw new Error('limit语句转换失败, LoadBizObjects每次查询数据量范围应是[0-500]');
    }

    return {
        'FromRowNum': fromRowNum,
        'ToRowNum': fromRowNum + pageSize
    };
}

//获取order by
function getOrderBy(select: Select) {
    if (!select.orderby || !select.orderby.length) {
        return [];
    }

    const sortByCollection: object[] = [];
    for (const item of select.orderby) {
        if (typeof item.expr.type !== 'string' || item.expr.type !== 'column_ref') {
            throw new Error('order by语句转换失败, LoadBizObjects只支持按列名排序');
        }
        const orderByType = item.type && item.type === 'DESC' ? 'Descending' : 'Ascending';
        sortByCollection.push({
            'ItemName': item.expr.column,
            'Direction': orderByType
        });
    }
    return sortByCollection;
}

//获取查询列
function getReturnItems(select: Select) {
    if (!select.columns || !select.columns.length) {
        throw new Error('查询列不能为空');
    }

    const returnItems: string[] = [];
    var isQueryAllColumns = false;
    for (const item of select.columns) {
        if (typeof item.expr.type !== 'string' || item.expr.type !== 'column_ref') {
            throw new Error('查询列语句转换失败, LoadBizObjects只支持按列名查询');
        }
        if (item.expr.column === '*') {
            isQueryAllColumns = true;
        }
        returnItems.push(item.expr.column);
    }
    if (isQueryAllColumns && returnItems.length > 1) {
        throw new Error('查询列语句转换失败, “*”不能与其他列同时出现');
    }
    if (isQueryAllColumns) {
        return [];
    }
    return returnItems;
}

//获取where
function getWhere(select: Select) {
    var matcher = {
        'Type': 'And',
        'Matchers': []
    };
    if (!select.where) {
        return matcher;
    }
    if (typeof select.where.type !== 'string' || select.where.type !== 'binary_expr') {
        throw new Error('where语句转换失败, LoadBizObjects只支持二元表达式');
    }
    convertToMatcher(select.where, matcher);
    return matcher;
}

function convertToMatcher(item: Binary, matcher: Matcher) {
    if (typeof item.type !== 'string' || item.type.length === 0) {
        throw new Error('where语句转换失败');
    }

    if (typeof item.operator === 'string') {
        if (item.type !== 'binary_expr') {
            throw new Error('where语句转换失败, LoadBizObjects只支持二元表达式');
        }

        //条件连接
        if (item.operator === 'AND' || item.operator === 'OR') {
            var currMatcher = matcher;
            if (item.operator === 'AND' && matcher.Type === 'Or') {
                currMatcher = {
                    'Type': 'And',
                    'Matchers': []
                };
                matcher.Matchers.push(currMatcher);
            } else if (item.operator === 'OR' && matcher.Type === 'And') {
                currMatcher = {
                    'Type': 'Or',
                    'Matchers': []
                };
                matcher.Matchers.push(currMatcher);
            }

            convertToMatcher(item.left as Binary, currMatcher);
            convertToMatcher(item.right as Binary, currMatcher);
            return;
        }

        //条件
        var operator = item.operator;
        operator = convertToLikeOperator(operator, item);
        operator = convertToInOperator(operator, item);
        if (operator in OperatorType) {
            if (item.left.type !== 'column_ref' || item.right.type === 'function') {
                throw new Error('where语句转换失败, LoadBizObjects筛选条件不支持函数和子查询');
            }
            if (typeof (item.right as ExprList).value === 'undefined') {
                throw new Error('where语句转换失败, LoadBizObjects筛选条件值不能为空');
            }
            matcher.Matchers.push({
                'Type': 'Item',
                'Name': (item.left as ColumnRefItem).column,
                'Operator': OperatorType[operator as keyof typeof OperatorType],
                'Value': (item.right as Value).value
            });
            return;
        } else {
            throw new Error('where语句转换失败, LoadBizObjects不支持该操作符:' + operator);
        }
    }

    throw new Error('where语句转换失败');
}

function convertToLikeOperator(operator: string, item: Binary) {
    if (operator !== 'LIKE' && operator !== 'NOT LIKE') {
        return operator;
    }
    if (!item.right || !item.right.type || item.right.type !== 'single_quote_string') {
        throw new Error('where语句转换失败, LoadBizObjects要求' + operator + '操作符右边必须是字符串');
    }
    const v = item.right.value;
    if (v.startsWith('%') && v.endsWith('%')) {
        operator = '%' + operator + '%';
    } else if (v.startsWith('%') && !v.endsWith('%')) {
        operator = '%' + operator;
    } else if (!v.startsWith('%') && v.endsWith('%')) {
        operator = operator + '%';
    } else {
        operator = '%' + operator + '%';
    }
    item.right.value = trimSymbol(v, '%');
    return operator;
}

//转换in、not in的值
function convertToInOperator(operator: string, item: Binary) {
    if (operator !== 'IN' && operator !== 'NOT IN') {
        return operator;
    }

    if (item.right.type !== 'expr_list' || typeof item.right.value !== 'object' || !Array.isArray(item.right.value)) {
        throw new Error('where语句转换失败, ' + operator + '语法有误');
    }

    for (var i = 0; i < item.right.value.length; i++) {
        const v = item.right.value[i];
        if (typeof v.type !== 'string') {
            throw new Error('where语句转换失败, ' + operator + '语法有误');
        }
        if (item.right.value[i].type !== 'single_quote_string' && item.right.value[i].type !== 'number') {
            throw new Error('where语句转换失败, ' + operator + '操作符右边只支持字符串和数字');
        }
        item.right.value[i] = v.value;
    }
    return operator;
}

//替换字符串左右两边的指定符号
function trimSymbol(str: string, symbol: string) {
    if (!str) return str;
    const pattern = new RegExp('^[\\' + symbol + ']+|[\\' + symbol + ']+$', 'g');
    return str.replace(pattern, '');
}

export default generateApiRequest;