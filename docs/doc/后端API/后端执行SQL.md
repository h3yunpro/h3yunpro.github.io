---
title: 后端执行SQL
createTime: 2025/02/17 19:08:07
permalink: /docs/exec-sql/
---

氚云数据库采用MySQL，不同企业MYSQL版本可能不同，您可以通过执行此语句进行MySQL版本查询：

``` sql
SELECT VERSION()
```

后端代码执行增删改查SQL语句，均通过 ```engine.Query.QueryTable``` 接口进行执行，并获取结果。

氚云不提供DDL语句的执行，更改表结构，直接在表单设计更改配置即可。

::: tip
engine实例获取，可参考此文档：[H3.IEngine](/docs/cs-instance/#h3-iengine)  
表单对应的数据库表名：```i_表单编码```，表单编码查看方式：[表单编码查看](/docs/check-code/#表单编码查看)  
子表对应的数据库表名：```i_子表控件编码```，子表控件编码查看方式：[子表编码查看](/docs/check-code/#子表编码查看)  
表单与系统表的表结构文档，请参考此文档：[数据库表结构详解](/docs/database/)  
:::

::: warning
由于该接口会直接影响数据表，请谨慎执行 **增删改** 三类SQL语句，有 **增删改** 的需求请尽量通过操作业务对象实现。  
若因用户执行 **增删改** 三类SQL语句，造成表单数据异常而无法查询，或者因修改系统表数据导致氚云无法使用，解决办法只能找运维恢复数据（收费）。

为了防止用户滥用或执行低效SQL，从而对系统性能造成过大影响， ```engine.Query.QueryTable``` 接口有执行超时机制，耗时超过 **30秒** ，则SQL语句执行失败，并抛出异常，异常消息示例：  
```Timeout in IO operation``` 或者 ```Connection must be valid and open to rollback transaction```，  
一旦出现此类情况，请优化SQL，提升效率，或者将执行逻辑拆分，分批多次执行。
:::

以下是接口使用示例：

## 调用执行SELECT语句

``` cs
string sql = "SELECT ObjectId, Status FROM i_D00001ABC WHERE Status=1; ";
System.Data.DataTable dt = engine.Query.QueryTable(sql, null);
if(dt == null || dt.Rows.Count == 0)
{
    //未查询到数据

} else {
    //循环查询结果
    foreach(System.Data.DataRow row in dt.Rows) 
    {
        string boId = row["ObjectId"] + string.Empty;
        string boStatus = row["Status"] + string.Empty;

    }
}
```


## 调用执行UPDATE语句
``` cs
try
{
    string upSql = "UPDATE i_D00001ABC SET F0000001 = '是' WHERE Status = 3; ";
    engine.Query.QueryTable(sql, null);
} catch(Exception ex)
{
    //更新语句执行异常（可能是sql语句有误，或执行超时等）
    
}
```


## 参数化SQL语句执行

参数化执行SQL的好处：防SQL注入攻击、无需考虑字符串值在SQL拼接时引发的格式错误

``` cs
//本sql中@name即参数名，与H3.Data.Database.Parameter参数对象一一对应
string sql = "SELECT ObjectId FROM H_User WHERE Name = @name; ";

//定义参数集合
List < H3.Data.Database.Parameter > parameters = new List<H3.Data.Database.Parameter>();

//创建一个参数
H3.Data.Database.Parameter param = new H3.Data.Database.Parameter(
    "@name", //参数名
    System.Data.DbType.String, //参数值类型
    "张三" //参数值    
);

//将参数添加到参数集合
parameters.Add(param);

//传入sql和参数查询结果
System.Data.DataTable dt = engine.Query.QueryTable(sql, parameters.ToArray());

/*
常用参数值类型：
System.Data.DbType.String：字符串，对应string
System.Data.DbType.Int32：整数，对应int
System.Data.DbType.Int64：整数，对应long
System.Data.DbType.Double：双精度浮点数，对应double
System.Data.DbType.Decimal：高精度浮点数，对应decimal
System.Data.DbType.DateTime：日期，对应DateTime
System.Data.DbType.Boolean：布尔，对应bool
*/
```


## SQL转义换行

1. 使用@对字符串进行转义，SQL字符串里面的特殊字符不再具有转义功能，例如 ```\n``` 不再被转义成换行符。

2. 使用@对字符串进行转义，若字符串中要使用双引号，则需要在双引号外，再加一个双引号以区分，或者换成单引号。

``` cs
string sql = @"
            SELECT TT.NO, 
            TT.ONE, 
            TT.TWO,
            FROM TABLE_TEMP TT 
            WHERE 
            TT.NO = ""1""
            OR TT.NO = '2'
            ";
System.Data.DataTable dtAccount = engine.Query.QueryTable(sql, null);
```