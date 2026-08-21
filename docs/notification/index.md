---
url: 'https://h3yunpro.github.io/docs/notification/index.md'
---
::: warning
以下示例中，engine实例获取方式，请参考 [H3.IEngine](/docs/cs-instance/#h3-iengine)
:::

## 发送消息通知

向氚云用户发送站内/钉钉文本消息，接收人需要传氚云用户Id。

可用位置：✔表单 / ✔列表 / ✔定时器 / ✔自定义接口

```cs
string senderId = H3.Organization.User.SystemUserId;//发送人，通常使用系统用户
string receiverId = "接收人Id";//接收人氚云用户Id。表单/列表中可用 this.Request.UserContext.UserId 获取当前用户Id
string title = "待办提醒";
string content = "您有一条新的待处理数据，请及时查看。";

H3.Notification.UserMessage message = new H3.Notification.UserMessage(
    H3.Notification.UserMessageType.DingTalkPlainText,
    senderId,
    receiverId,
    "",//接收地址，发送给氚云用户时留空
    title,
    content,
    ""//扩展参数，普通文本消息留空
);

engine.Notifier.Send(new H3.Notification.UserMessage[] { message });
```

## 发送邮件

向指定邮箱发送邮件。邮件接收人不要求是氚云用户，只需要传邮箱地址。

可用位置：✔表单 / ✔列表 / ✔定时器 / ✔自定义接口

```cs
string email = "user@example.com";
string title = "待办提醒";
string content = "您有一条新的待处理数据，请及时查看。";

H3.Notification.UserMessage message = new H3.Notification.UserMessage(
    H3.Notification.UserMessageType.Email,
    "",//邮件发送人可留空
    "",//邮件不需要传氚云用户Id
    email,//收件邮箱
    title,
    content,
    ""//扩展参数，普通邮件留空
);

engine.Notifier.Send(new H3.Notification.UserMessage[] { message });
```

## 创建提醒任务

如果需要通过工作通知提醒用户，可以创建提醒任务。提醒时间设置为当前时间时，系统会立即发送提醒。

提醒任务通常需要关联到一条业务数据，用户点击提醒时可以跳转到对应数据。

可用位置：✔表单 / ✔列表 / ✔定时器 / ✔自定义接口

```cs
string appCode = "应用编码";
string schemaCode = "表单编码";
string receiverId = "接收人Id";//接收人氚云用户Id。表单/列表中可用 this.Request.UserContext.UserId 获取当前用户Id
string bizObjectId = "数据Id";//关联业务对象Id。表单后端中可用 this.Request.BizObjectId 获取当前数据Id
string bizObjectName = "数据标题";//关联业务对象标题。表单后端中可用 this.Request.BizObject.Name 获取当前数据标题
string reminderText = "您的客户跟进日期快要到了，请尽快跟进！";
DateTime alertTime = DateTime.Now;

H3.Task.UserTask task = new H3.Task.UserTask();
task.ObjectId = Guid.NewGuid().ToString();//Guid码
task.Sender = H3.Organization.User.SystemUserId;//任务的发起人id
task.UserId = receiverId;//任务的接收人id
task.AppCode = appCode;//应用编码
task.TaskType = H3.Task.TaskType.Reminder;//任务类型为提醒
task.SchemaCode = schemaCode;//表单编码
task.TargetType = H3.LinkTargetType.BizObject;//关联类型
task.TargetId = bizObjectId;//关联业务对象的ID
task.TargetName = bizObjectName;//关联业务对象的数据标题
task.Name = reminderText;//提醒标题
task.Summary = reminderText;//提醒的内容
task.AlertTime = alertTime;//提醒时间
task.ReminderType = H3.Task.ReminderType.Once;//提醒类型
task.StartTime = DateTime.Now;//任务开始时间
task.EndTime = alertTime;//任务截止时间
task.TaskState = H3.Task.TaskState.Unfinished;//任务状态
task.AlertState = H3.Task.AlertState.Waiting;//提醒的状态

engine.TaskManager.AddTask(task);
```

## 发送催办信息

对指定流程发送催办信息，常用于流程长时间未处理时提醒当前处理人。

可用位置：✔表单 / ✔列表 / ✔定时器 / ✔自定义接口

```cs
string userId = "催办人Id";//催办人氚云用户Id。表单/列表中可用 this.Request.UserContext.UserId 获取当前用户Id
string instanceId = "流程Id";//流程实例Id。流程表单后端中可用 this.Request.InstanceId 获取当前流程Id
string content = "请尽快处理当前流程。";

engine.WorkItemManager.Urge(userId, instanceId, content);
```

参数说明：

| 参数 | 说明 |
| --- | --- |
| userId | 催办人 |
| instanceId | 流程Id |
| content | 催办内容 |

## 后端代码发送短信

代码发送短信和配置发送短信效果一样，不支持自定义签名，并且消耗短信条数余量。

可用位置：✔表单 / ✔列表 / ✔定时器 / ✔自定义接口

```cs
string senderId = H3.Organization.User.SystemUserId;//消息发送人，通常使用系统用户
string receivePhone = "12345678901";//接收短信的手机号
string sign = "氚云";//短信签名（由于运营商管控，目前已不支持自定义短信签名，统一签名为“氚云”）
string content = "您有一条新的待处理数据，请及时查看。";

H3.Notification.UserMessage message = new H3.Notification.UserMessage(senderId, receivePhone, sign, content);

engine.Notifier.Send(new H3.Notification.UserMessage[] { message });
```
