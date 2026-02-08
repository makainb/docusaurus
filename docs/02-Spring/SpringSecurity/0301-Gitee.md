---
draft: true
sidebar_class_name: hidden-sidebar-item
---

## 什么是OAuth2
官网 `https://datatracker.ietf.org/doc/draft-ietf-oauth-v2-1/` 中有这么一段话：
```
 The OAuth 2.1 authorization framework enables an application to
   obtain limited access to a protected resource, either on behalf of a
   resource owner by orchestrating an approval interaction between the
   resource owner and an authorization service, or by allowing the
   application to obtain access on its own behalf.  This specification
   replaces and obsoletes the OAuth 2.0 Authorization Framework
   described in RFC 6749 and the Bearer Token Usage in RFC 6750.
```

## 关键角色
- 客户端（Client）：咱们开发的APS应用
- 授权服务器（Authorization Server） ：授权服务器是用于处理和发放访问令牌的服务器。当用户请求访问资源时，需要先向授权服务器请求访问令牌。 
- 资源服务器（Resource Server） ：资源服务器是用于存储和管理资源的服务器；当用户拥有访问令牌后，就可以向资源服务器请求访问资源。 
- 资源所有者（Resource Owner） ：资源所有者通常就是指用户。 
- 访问令牌（Access Token） ：访问令牌是授权服务器发放给客户端的一个凭证，表示客户端有权访问资源所有者的资源。访问令牌有一定的有效期，过期后需要使用刷新令牌来获取新的访问令牌。上面的例子虽然没有提到，但是结果可能是给了一个临时凭证，让第三方分析应用可以获取到订单数据，而这个凭证就是访问令牌。
- 刷新令牌（Refresh Token） ：刷新令牌是授权服务器在发放访问令牌时一同发放的一个凭证，用于在访问令牌过期后获取新的访问令牌。刷新令牌通常有较长的有效期，甚至可以设置为永不过期。


## 基本流程
A：Client（第三方分析应用）去请求获得Resource Owner（你）的淘宝订单数据的授权
B：Resource Owner（你）授权给Client（第三方分析应用）
C：Client（第三方分析应用）去Authorization Server（淘宝）获得授权令牌
D：Authorization Server（淘宝）给Client（第三方分析应用）发放授权令牌
E：Client（第三方分析应用）拿着授权令牌，去Resource Server（淘宝订单）获取数据
F：Resource Server（淘宝订单）验证令牌有效后，提供订单数据给Client（第三方分析应用）

## 授权码模式(Authorization Code Grant)
授权码模式：是 OAuth2.0 中最常用的一种模式，这种模式适合那些可以安全存储客户端凭证的应用程序（如 Web 服务器应用），并且它将客户端与资源所有者分离，增加了安全性。授权码是里面流程最复杂，但却是最安全的，大部分开放的OAuth2授权模式都是这种方式。下图为官方授权码模式下的流程。

- A：你（User-Agent） 打开 第三方分析应用（Client客户端） ，会跳转到 淘宝（Authorization Server授权服务器） 的授权界面
- B：你（User-Agent） 点击确认授权
- C：淘宝（Authorization Server授权服务器） 会返回一个授权码Code（注意：该Code并非令牌，而是一个临时授权码Code，为了后面能获得令牌）， 第三方分析应用（Client客户端） 得到这个授权码Code。
- D：第三方分析应用（Client客户端） 使用授权码Code，再次访问 淘宝（Authorization Server授权服务器） 去获得 令牌token
- E：淘宝（Authorization Server授权服务器） 验证授权码code无误后，返回 令牌token 。

## 客户端模式(Client Credentials Grant)
客户端模式：是指客户端（第三方分析应用）以自身身份而不是用户身份向授权服务器请求访问令牌，即没有用户直接参与的授权流程。这种认证对于用户来说是不安全的，因为获得授权并不需要得到用户的确认，因此一般只用于内部系统之间（因为内部系统属于完全可信任的客户端）。如下图，其流程很简单：

- A：第三方分析应用（Client客户端） 直接请求 淘宝（Authorization Server授权服务器） 的授权（当然会发客户端凭证给授权服务器）
- B：淘宝（Authorization Server授权服务器） 验证通过，直接发放 令牌token 给 第三方分析应用（Client客户端）


## 零基础也可以看得懂的授权码模式
1、必须有一个gitee的帐号
2、注册第三方应用：https://gitee.com/oauth/applications/new  回调地址需要填写 `http://localhost:8080/login/oauth2/code/gitee` 
3、创建应用后，你会得到一个Client ID和Client Secret，这两个就是我们获得授权的关键，拷贝下来，后续授权码模式获得用户信息需要使用到。
```

Client ID： bfa4c356742580d5e8715d1c99b9ff3fa91311cc337a81061de585ba6bfa4464
Client Secret： 39baccffb6c1d187279b81d4361e84da8ef8de220d93d36cbd364d71fb1239e9
```
4、看图里的流程
![alt text](image.png)
5、打开到Gitee的的授权界面，确定授权：`https://gitee.com/oauth/authorize?client_id=bfa4c356742580d5e8715d1c99b9ff3fa91311cc337a81061de585ba6bfa4464&redirect_uri=http://localhost:8080/login/oauth2/code/gitee&response_type=code` 
6、你点击授权，你会跳转到一个新的页面，那就是回调地址（虽然无法访问，但是没关系），同时你看URL会多了一个code参数，这就是授权码模式下返回的code
```
http://localhost:8080/login/oauth2/code/gitee?code=73da6e424e0ab08bfe50bbbc9d91012744a503f527353ca5298db5a78d5c26d1
```
7、打开Hoppscotch工具，新建一个post请求，按照下方的请求后，你会获得一个access_token。至此授权码模式下获取令牌token已完成
```
POST https://gitee.com/oauth/token
Content-Type: application/json
{
    "grant_type": "authorization_code",
    "code": "73da6e424e0ab08bfe50bbbc9d91012744a503f527353ca5298db5a78d5c26d1",
    "client_id": "bfa4c356742580d5e8715d1c99b9ff3fa91311cc337a81061de585ba6bfa4464",
    "client_secret": "39baccffb6c1d187279b81d4361e84da8ef8de220d93d36cbd364d71fb1239e9",
    "redirect_uri": "http://localhost:8080/login/oauth2/code/gitee"
}


响应
{
  "access_token": "255678ef3f0b87cdb241a776f1969cd5",
  "token_type": "bearer",
  "expires_in": 86400,
  "refresh_token": "29f8c8018f666ede78e2a47cd7fb44a2a2f1a052370fd0056b2964038e78955b",
  "scope": "user_info",
  "created_at": 1770569221
}
```

8、获得用户信息，使用 Hoppscotch，将步骤7）中获得的令牌token，访问：https://gitee.com/api/v5/user ，可以得到用户信息
```
GET https://gitee.com/api/v5/user?access_token=255678ef3f0b87cdb241a776f1969cd5

响应
{
    "id": 1334687,
    "login": "makainb",
    "name": "凉皮店主",
    "avatar_url": "https://foruda.gitee.com/avatar/1765644325929081169/1334687_makainb_1765644325.png",
    "url": "https://gitee.com/api/v5/users/makainb",
    "html_url": "https://gitee.com/makainb",
    "remark": "",
    "followers_url": "https://gitee.com/api/v5/users/makainb/followers",
    "following_url": "https://gitee.com/api/v5/users/makainb/following_url{/other_user}",
    "gists_url": "https://gitee.com/api/v5/users/makainb/gists{/gist_id}",
    "starred_url": "https://gitee.com/api/v5/users/makainb/starred{/owner}{/repo}",
    "subscriptions_url": "https://gitee.com/api/v5/users/makainb/subscriptions",
    "organizations_url": "https://gitee.com/api/v5/users/makainb/orgs",
    "repos_url": "https://gitee.com/api/v5/users/makainb/repos",
    "events_url": "https://gitee.com/api/v5/users/makainb/events{/privacy}",
    "received_events_url": "https://gitee.com/api/v5/users/makainb/received_events",
    "type": "User",
    "blog": null,
    "weibo": null,
    "bio": "",
    "public_repos": 3,
    "public_gists": 0,
    "followers": 0,
    "following": 0,
    "stared": 0,
    "watched": 0,
    "created_at": "2017-05-02T13:52:53+08:00",
    "updated_at": "2026-02-09T00:28:43+08:00",
    "email": null
}
```

