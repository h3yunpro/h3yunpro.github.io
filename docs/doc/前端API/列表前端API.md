---
title: 列表前端API
createTime: 2025/02/17 19:06:25
permalink: /docs/list-js-api/
---

列表前端只有一个列表按钮点击事件：```$.ListView.ActionPreDo```，所以本篇的API都是用在按钮点击时的处理上。


## 列表前端获取选中的数据
``` js
var selectedDatas = $.ListView.GetSelected();
```


## 列表前端Post请求后端

利用Ajax技术，异步请求后端，触发列表后端OnSubmit事件，[使用示例](/docs/pure-example/#列表-post)。

``` js
$.ListView.Post(
    actionName, //传给后端的actionName，命名标准：功能名_Post
    data, //传给后端的数据，object类型
    callBack, //请求成功后的回调事件
    errorBack, //请求失败后的回调事件
    async //true：不阻塞，false：请求过程中阻塞后续代码执行
);
```


## 列表前端刷新数据

``` js
$.ListView.RefreshView();
```


## 列表前端初始化筛选条件

``` js
$.ListView.InitQueryItems();
```


## 列表前端消息弹窗
``` js
$.IShowSuccess( "成功", "这是一条成功消息" );//弹出成功消息

$.IShowWarn( "警告", "这是一条警告消息" );//弹出警告消息

$.IShowError( "错误", "这是一条错误消息" );//弹出错误消息

//注意：$.IConfirm弹窗是属于回调式的，而非阻塞式，所以弹窗后的代码依然会被执行
$.IConfirm( "提示", "是否确认？", function( data ) {
    if( data ) {
        //点击确认按钮
    } else {
        //点击取消按钮
    }
});
```


## 列表前端以全屏模式打开表单
``` js
var schemaCode = "xxx";// 表单编码
var objectId = "xx-xx-xx";// 表单数据Id，传 "" 时表示以新增模式打开，传具体数据Id表示打开该条数据表单详情页
var checkIsChange = true;// 关闭时是否感知变化，固定传 true
$.IShowForm(schemaCode, objectId, checkIsChange);
```


## 列表前端以弹窗模式打开表单
``` js
var schemaCode = "xxx";// 表单编码
var objectId = ""; // 表单数据Id，传 "" 时表示以新增模式打开，传具体数据Id表示打开该条数据表单详情页
var params = { "param1": "参数值1", "param2": 200 };// 传递到表单的参数，JSON对象格式
var checkIsChange = false;// 是否检查修改
var showlist = false;// 兼容移动端是否显示列表
var showInModal = true;// 是否弹出框中显示，如果为false，title height width OnShowCallback OnHiddenCallback 等属性不起作用
$.IShowForm(schemaCode, objectId, params, checkIsChange, showlist, {
  showInModal: showInModal, title: "表单页标题", height: 500, width: 800,
  OnShowCallback: function( da ) { },// OnShowCallback 表单打开时事件
  onHiddenCallback: function( data ) {// onHiddenCallback 表单关闭时事件
        //当用户关闭表单后，会触发此事件，并且可以从data参数中获取用户在弹窗中输入的值
        //比如，弹窗表单中有一个控件编码为F0000001的单行文本控件，则获取值方式如下：
        var inputValue = data.Data["F0000001"];
        if(inputValue){
            //用户输入了值
        }else{
            //用户没输入值，进行提示
            $.IShowError( "错误", "请输入xxx的值！" );
        }
  }
});
```