---
title: 表单前端GetValue&SetValue
createTime: 2025/02/17 19:06:15
permalink: /docs/form-js-set-get/
---


由于不同控件类型，在赋值和取值（即：SetValue/GetValue）时数据结构有一定差别，所以本篇做一个特别说明。

::: warning
本文中的 ```that``` 指代的是 ```this```，不直接使用 `this` 是因为在回调事件中 `this` 的指向是错的（具体原因请移步：[表单前端API-this](/docs/form-js-api/#this)）。

为了使用时统一，本文一律把  `this` 替换为 `that`。
:::


## 单行文本/多行文本/单选框/下拉框/流水号

此类控件值都是 ```string``` 类型

取值：
``` js
var str = that.控件编码.GetValue();

//判断控件有值
if( str ) {
    //符合这个条件的值为非空字符串，undefined、null、"" 都不会符合这个条件
}

//判断控件值为空
if( str === undefined || str === null || str === "" ) {

}
```

赋值：
``` js
that.控件编码.SetValue("控件值");
```

清空控件值：
``` js
that.控件编码.SetValue("");
```


## 人员单选/部门单选

此类控件取值和赋值不一样，取值时返回的是字符串数组，而赋值时传入字符串即可。

- 人员单选控件的值是用户Id，这个Id可以通过SQL查询 [系统-用户表 H_User](/docs/database/#系统-用户表-h-user) 表来获取

- 人员单选控件的值是部门Id，这个Id可以通过SQL查询 [系统-部门表 H_Organizationunit](/docs/database/#系统-部门表-h-organizationunit) 表来获取

取值：
``` js
var idArray = that.控件编码.GetValue();

//虽然返回的是字符串数组，但因为是单选，所以数组只会有一个元素，所以取下标为0的就是 用户Id/部门Id
var unitId = "";
if( idArray && idArray.length > 0 ) {
    unitId = idArray[ 0 ];
}

//判断控件值为空
if( idArray === null || idArray.length === 0 ) {

}
```

赋值：
``` js
that.控件编码.SetValue("人员Id/部门Id");
```

清空控件值：
``` js
that.控件编码.SetValue("");
```


## 人员多选/部门多选

此类控件取值和赋值都是字符串数组。

- 人员多选控件的值是用户Id的字符串数组，这个Id可以通过SQL查询 [系统-用户表 H_User](/docs/database/#系统-用户表-h-user) 表来获取

- 人员多选控件的值是部门Id的字符串数组，这个Id可以通过SQL查询 [系统-部门表 H_Organizationunit](/docs/database/#系统-部门表-h-organizationunit) 表来获取

取值：
``` js
var idArray = that.控件编码.GetValue();

//循环数组
if( idArray && idArray.length > 0 ) {
    for( var i = 0; i < idArray.length; i++ ) {
        var unitId = idArray[ i ];
    }
}

//取用户选择的第一个人员Id/部门Id
if( idArray && idArray.length > 0 ) {
    var firstUnitId = idArray[ 0 ];
}

//判断控件值为空
if( idArray === null || idArray.length === 0 ) {

}
```

赋值：
``` js
that.控件编码.SetValue(["id1", "id2"]);
```

清空控件值：
``` js
that.控件编码.SetValue(null);
```


## 关联表单

此类控件值都是 ```string``` 类型，但是值是被关联表单的数据Id，即数据表中的ObjectId字段。

取值：
``` js
var boId = that.控件编码.GetValue();

//判断控件有值
if( boId ) {
    //符合这个条件的值就是非空字符串，而 undefined、null、"" 都不会符合这个条件
}

//判断控件值为空
if( boId === undefined || boId === null || boId === "" ) {

}
```

赋值：
``` js
that.控件编码.SetValue("xxx-xxx-xxx-xxx");
```

清空控件值：
``` js
that.控件编码.SetValue("");
```


## 关联表单多选

此类控件取值和赋值都是字符串数组，但是数组里每一个元素都是被关联表单的数据Id，即数据表中的ObjectId字段。

取值：
``` js
var boIdArray = that.控件编码.GetValue();

//循环用户选择的每个数据Id
if( boIdArray && boIdArray.length > 0 ) {
    for( var i = 0; i < boIdArray.length; i++ ) {
        var boId = boIdArray[ i ];
    }
}

//取用户选择的第一个数据Id
if( boIdArray && boIdArray.length > 0 ) {
    var firstBoId = boIdArray[ 0 ];
}

//判断控件值为空
if( idArray === null || idArray.length === 0 ) {

}
```

赋值：
``` js
that.控件编码.SetValue(["数据Id-1", "数据Id-2"]);
```

清空控件值：
``` js
that.控件编码.SetValue(null);
```


## 日期

日期控件取值和赋值都是 ```string``` 类型，取值时字符串格式会和配置的格式一致，但是赋值时只支持2种格式：```yyyy-MM-dd``` 或 ```yyyy-MM-dd HH:mm:ss```。

取值：
``` js
var dateStr = that.控件编码.GetValue();

//判断控件有值
if( dateStr ) {
    //如果有值，将它转成Date类型
    var dateObj = new Date(dateStr);
}

//判断控件值为空
if( dateStr === undefined || dateStr === null || dateStr === "" ) {

}
```

赋值：
``` js
that.控件编码.SetValue("2024-05-17");//无时间部分时
that.控件编码.SetValue("2024-05-17 06:24:49");//有时间部分时
```

> 如果是把当前时间赋值给日期控件，请参考：[前端Date Format](/docs/tool-function/#前端-date对象转字符串)

清空控件值：
``` js
that.控件编码.SetValue(null);
```


## 数字

数字控件取值时返回 ```string``` 类型，但赋值时是 ```number``` 类型。

取值：
``` js
var numStr = that.控件编码.GetValue();

//判断控件有值
if( numStr ) {
    //转成number类型
    var num = parseFloat(numStr);
}

//判断控件值为空
if( numStr === undefined || numStr === null || numStr === "" ) {

}
```

赋值：
``` js
that.控件编码.SetValue(123.45);
```

清空控件值：
``` js
that.控件编码.SetValue(null);
```


## 复选框

复选框取值赋值都是 ```string``` 类型，每个选项间用;分割。

取值：
``` js
var checkboxStr = that.控件编码.GetValue();

//判断控件有值
if( checkboxStr ) {
    //分割出每一个选项
    var checkboxArray = checkboxStr.split(";");
    for( var i = 0; i < checkboxArray.length; i++ ) {
        var item = checkboxArray[ i ];
    }
}

//判断是否包含某个选项
if( checkboxStr && checkboxStr.indexOf("选项1") >= 0 ) {

}

//判断控件值为空
if( checkboxStr === undefined || checkboxStr === null || checkboxStr === "" ) {

}
```

赋值：
``` js
that.控件编码.SetValue("选项1;选项2");
```

清空控件值：
``` js
that.控件编码.SetValue("");
```


## 是/否

是/否控件取值赋值都是 ```boolean``` 类型。

取值：
``` js
var isChecked = that.控件编码.GetValue();
if( isChecked ) {
    //选择了“是”
}

if(!isChecked){
    //选择了“否”
}
```

赋值：
``` js
that.控件编码.SetValue(true);
that.控件编码.SetValue(false);
```

清空控件值：不支持


## 地址

地址控件取值赋值都是 ```string``` 类型，但格式是一个对象JSON。

> JSON里的adcode是中国行政区划代码，可访问：[2022年中华人民共和国县以上行政区划代码](https://blog.csdn.net/m0_58016522/article/details/135306117)。
>
> **注意：这个区划代码国家会修订，氚云的地址控件也会随之更新，所以使用时请百度查询最新版的区划代码。**

取值：
``` js
var address = that.控件编码.GetValue();

/*
未填写地址时：
{"adcode":"","adname":"","Detail":""}

已填写地址时：
{"adcode":"440305","adname":"广东省 深圳市 南山区","Detail":"粤海街道科兴科学园A2单元1505室"}
*/

//因为地址控件特殊，判断用户是否填写了地址，就直接跟JSON进行判断了
if( address !== undefined && address !== null && address !== "" && address !== '{"adcode":"","adname":"","Detail":""}' ) {
    //用户填写了地址
}

if( address === undefined || address === null || address === "" || address === '{"adcode":"","adname":"","Detail":""}' ) {
    //用户没有填写地址
}
```

赋值：
``` js
that.控件编码.SetValue('{"adcode":"440305","adname":"广东省 深圳市 南山区","Detail":"粤海街道科兴科学园A2单元1505室"}');
```

清空控件值：
``` js
that.控件编码.SetValue(null);
```


## 位置

位置控件取值赋值都是 ```string``` 类型，但值是一个JSON字符串，JSON结构如下：
``` json
{
  "Address": "广东省深圳市南山区粤海街道南山科兴科学园C2栋",
  "Point": {
    "lat": 22.547421,
    "lng": 113.944386
  },
  "CSType": 2,
  "WGS84Point": {
    "lng": 113.93950766274739,
    "lat": 22.550433917423504
  }
}
```

取值：
``` js
var location = that.控件编码.GetValue();

/*
未录入位置时：
{"Address":"","Point":{"lat":0,"lng":0},"CSType":2,"WGS84Point":{"lng":0,"lat":0}}

已录入位置时：
{"Address":"广东省深圳市南山区粤海街道南山科兴科学园C2栋","Point":{"lat":22.547421,"lng":113.944386},"CSType":2,"WGS84Point":{"lng":113.93950766274739,"lat":22.550433917423504}}
*/

//因为位置控件特殊，判断用户是否录入，就直接跟JSON进行判断了
if( location && location !== '{"Address":"","Point":{"lat":0,"lng":0},"CSType":2,"WGS84Point":{"lng":0,"lat":0}}' ) {
    //用户录入了位置
}

if( !location || location === '{"Address":"","Point":{"lat":0,"lng":0},"CSType":2,"WGS84Point":{"lng":0,"lat":0}}' ) {
    //用户没有录入位置
}
```

赋值：
``` js
that.控件编码.SetValue('{"Address":"广东省深圳市南山区粤海街道南山科兴科学园C2栋","Point":{"lat":22.547421,"lng":113.944386},"CSType":2,"WGS84Point":{"lng":113.93950766274739,"lat":22.550433917423504}}');
```

清空控件值：
``` js
that.控件编码.SetValue(null);
```


## 附件/图片

此类控件在前端可取值、清空控件值，但由于附件和图片的特殊性，所以前端不可对附件/图片赋值。

取值：
``` js
var fileData = that.控件编码.GetValue();

/*
取值出来是一个对象，格式如下：
{"AttachmentIds":"bc83a20b-2882-4d34-816c-8a938971ab66;1bacf027-0a2d-4358-bab7-7b8a8fb05e88;","Attachments":"[{\\"AttachmentId\\":\\"bc83a20b-2882-4d34-816c-8a938971ab66\\"},{\\"AttachmentId\\":\\"1bacf027-0a2d-4358-bab7-7b8a8fb05e88\\"}]","DelAttachmentIds":""}
*/

//一般为了拿附件Id，取AttachmentIds字段值比较方便，这个字段的值是把所有附件Id用;分割
if( fileData && fileData.AttachmentIds ) {
    //拆分附件Id
    var attachmentIdArray = fileData.AttachmentIds.split(";");
    //由于AttachmentIds的值是以;结尾，所以split会多出来一个空字符串，此处要pop掉
    attachmentIdArray.pop();
    //循环每个附件Id
    for( var i = 0; i < attachmentIdArray.length; i++ ) {
        var attachmentId = attachmentIdArray[ i ];
    }
    //取第一个附件Id
    var firstAttachmentId = attachmentIdArray[ 0 ];
}

//判断控件值为空
if( fileData === null || fileData.AttachmentIds === null || fileData.AttachmentIds === "" ) {

}
```

赋值：不支持

清空控件值：
``` js
that.控件编码.SetValue(null);
```


## 子表

子表控件提供了比较多的函数来操作数据，这里只演示 ```GetValue```、```ClearRows``` 函数，其他的函数请查阅：[表单前端API](/docs/form-js-api)。

取值：
``` js
var ctData = that.控件编码.GetValue();

/*
取值出来是一个对象数组，格式如下：
[
    {"ctSingleText":"我是子表内-单行文本","ctDate":"2024-07-17 19:39","ctNumber":"123.55","ctBooleanBox":false,"ObjectId":"cdd4e1e3-a82f-4563-bcc0-7e173b284073"},
    {"ctSingleText":"我是子表内-单行文本","ctDate":"2024-07-26 19:39","ctNumber":"8565.22","ctBooleanBox":true,"ObjectId":"6db047aa-6886-4a03-9285-3355f7613538"}
]

可以发现：
1. 子表控件的值是一个对象数组，每个对象代表一行数据
2. 对象里的字段名并不是表单设计里的 子表编码.控件编码 格式，而直接是控件编码，也就是“.”后面的部分
3. 每个对象里都有一个 ObjectId 字段，这个字段的值就是子表数据Id
4. 里面的控件值格式就和主表控件里一样，所以不懂取值赋值时的数据格式，可以参照主表控件的说明文档
*/

if( ctData && ctData.length > 0 ) {
    //循环子表每行数据
    for( var i = 0; i < ctData.length; i++ ) {
        var ctRow = ctData[ i ];

        //取出本行子表的数据Id
        var ctBoId = ctRow["ObjectId"];

        //取出子表内控件的值
        var txt = ctRow["ctSingleText"];
    }
}

//取子表第一行数据
if( ctData && ctData.length > 0 ) {
    var firstRow = ctData[ 0 ];
    var ctBoId = firstRow["ObjectId"];
}

//取子表最后一行数据
if( ctData && ctData.length > 0 ) {
    var lastRow = ctData[ ctData.length - 1 ];
    var ctBoId = lastRow["ObjectId"];
}

//判断子表控件值为空
if( ctData === null || ctData.length === 0 ) {

}
```

清空控件值：
``` js
that.控件编码.ClearRows();
```
