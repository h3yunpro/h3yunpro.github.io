---
title: 氚云调用WebService
createTime: 2025/02/17 19:09:53
permalink: /docs/req-ws/
---

由于氚云能配置连接上的 ```WebService``` 必须按照规定格式进行定义，且只对 ```.NET``` 框架下开发的 ```WebService``` 兼容性友好，对于 ```JAVA```、```Python``` 等语言兼容性差，并且配置不上时开发者个人无法排查解决，体验感不佳。

所以氚云推出了 **第三方连接** 插件，用于氚云调用第三方 ```Web API``` 服务，也是目前推荐开发者使用的方式，[第三方连接插件文档](/docs/req-api)。

但考虑到有些开发者更熟悉 ```WebService``` 的对接方式，所以这里也提供了一个 ```.NET``` 的 ```WebService Demo``` 以供参考：[.NET WebService Demo](https://gitee.com/h3yun-pro-public/h3yun-demo/tree/main/WebServiceDemo)

::: warning
本文档将不会对氚云调用 ```WebService``` 做出详细说明，如有需要，请前往[官方文档](https://help.h3yun.com/contents/1126/2234.html)。
:::