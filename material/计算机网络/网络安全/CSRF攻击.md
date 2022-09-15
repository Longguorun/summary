# CSRF攻击

### 定义

CSRF(Cross-site request forgery)：跨站伪造请求，是一种挟制用户在已登录的web应用上执行非本意的操作的攻击方法。

与XSS的区别在于，XSS利用的是用户对网页服务器的信任；而CSRF利用的是，网页服务器对用户浏览器的信任。

比如，在获取到用户的认证密钥后，以此密钥去向服务器发送恶意请求。

### 防范手段

1. 涉及敏感操作的请求改为POST请求
2. 用户验证码
3. 请求来源限制，验证http referer字段
4. 额外验证机制，token使用



https://blog.csdn.net/weixin_40482816/article/details/114301717