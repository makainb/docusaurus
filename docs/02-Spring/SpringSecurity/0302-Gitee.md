---
draft: true
sidebar_class_name: hidden-sidebar-item
---

## 零基础学授权码模式
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

