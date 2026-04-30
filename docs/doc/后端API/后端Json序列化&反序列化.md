---
title: 后端Json序列化&反序列化
createTime: 2025/02/17 19:08:13
permalink: /docs/cs-json/
---

在氚云的后端，不允许用户自行引入Json操作库，但是提供了Json的序列化与反序列化方法：```this.Serialize```、```this.Deserialize```。

## 注意事项

```this.Serialize```、```this.Deserialize``` 是 **表单类** / **列表类** / **定时器类** / **自定义接口类** 的动态方法，所以这两个方法只能在这些类的动态方法里调用到，不可在静态方法中调用。

如果您想要在自定义类中调用这两个类方法，请继承定时器类以得到这两个方法，示例：
``` cs
public class MyClass: H3.SmartForm.Timer
{
    public MyClass() { }
    //由于继承 H3.SmartForm.Timer 只是为了得到 this.Serialize、this.Deserialize 两个方法
    //所以OnWork事件必须重写一下，但是方法体里不需要任何代码
    protected override void OnWork(H3.IEngine engine) { }

    //在自定义类动态方法里调用 this.Serialize、this.Deserialize
    public string Test()
    {
        Dictionary < string, object > data = new Dictionary<string, object>();
        data["key1"] = "value1";
        data["key2"] = "value2";
        string json = this.Serialize(data);

        return json;
    }
}
```


## Json序列化

将一个对象/集合/键值对序列化成一个Json字符串。

使用方式：
``` cs
string json = this.Serialize(object value);
```

示例：
``` cs
//将字符串数组序列化成Json字符串，此示例结果为：["123","456","789"]
string[] strArray = new string[]{ "123", "456", "789"};
string json1 = this.Serialize(strArray);

//将整数集合序列化成Json字符串，此示例结果为：[1,2,3,4,5]
List < int > numList = new List<int>() { 1, 2, 3, 4, 5 };
string json2 = this.Serialize(numList);

//将键值对序列化成Json字符串，此示例结果为：{"key1":"value1","key2":"value2"}
Dictionary < string, object > data = new Dictionary<string, object>();
data["key1"] = "value1";
data["key2"] = "value2";
string json3 = this.Serialize(data);
```


## Json反序列化

将一个Json字符串反序列化成一个对象实例。

使用方式：
``` cs
//T 表示要反序列化成的数据类型
T value = this.Deserialize<T>(string json);
```

示例：
``` cs
//将Json字符串反序列化成string[]（反序列化字符串数组）
string[] strArray = this.Deserialize<string[]>("[\"123\",\"456\",\"789\"]");

//将Json字符串反序列化成List<int>（反序列化整数数组）
List<int> numList = this.Deserialize<List<int>>("[1,2,3,4,5]");

//将Json字符串反序列化成Dictionary<string, object>（反序列化对象）
Dictionary<string, object> data = this.Deserialize<Dictionary<string, object>>("{\"key1\":\"value1\",\"key2\":\"value2\"}");

//将Json字符串反序列化成object[]（反序列化对象数组）
object[] objArray = this.Deserialize<object[]>("[{\"key1\":\"value1\",\"key2\":\"value2\"},{\"key1\":\"value3\",\"key2\":\"value4\"}]");
if(objArray != null && objArray.Length > 0) 
{
    //循环数组元素
    foreach(object obj in objArray) 
    {
        //将每个数组元素转成Dictionary < string, object >
        string dataStr = obj + string.Empty;
        Dictionary < string, object > data = this.Deserialize<Dictionary<string, object>>(dataStr);

        //获取键值对中的键值
        string val1 = data["key1"] + string.Empty;
        string val2 = data["key2"] + string.Empty;
    }
}
```