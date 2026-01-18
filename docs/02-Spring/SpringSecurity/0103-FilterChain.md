---
title: 快速入门-过滤器链介绍
sidebar_position: 0103
draft: true
sidebar_class_name: hidden-sidebar-item
---
springsecurity基本运行原理分析
SpringSecurity的原理其实就是一个过滤器链，内部包含了提供各种功能的过滤器。这里我们可以看看入门案例中的过滤器。实际上我们访问hello 它会重定向 到login
因为springsecurity 采用了15个Filter（也有的版本是16个Filter 老版本）进行拦截
Spring Security 的核心是有序的 Servlet 过滤器链（DefaultSecurityFilterchain），而非单一过滤器。
1.整体过滤器数量：默认包含16个过滤器，大部分为非核心过滤器（负责记住我、CSRF防护等特殊场景），仅少数为核心过滤器，承担认证、授权、异常处理等核心功能。
2.执行规则：请求自上而下依次经过过滤器，响应自下而上返回；未通过安全校验的请求会被提前拦截，无法访问目标资源。
3.过滤器链查看方式：Debug 模式下，输入run.getBean（DefaultSecurityFilterchain.class）可查看当前系统中过滤器的完整列表及执行顺序。


UsernamePasswordAuthenticationFilter:负责处理我们在登陆页面填写了用户名密码后的登陆请求。入门案例的认证工作主要有它负责。
ExceptionTranslationFilter：处理过滤器链中抛出的任何AccessDeniedException和AuthenticationException。FilterSecuritylnterceptor：负责权限校验的过滤器。通俗一点就是授权由它负责（鉴权）
DefaultLoginPageGeneratingFilter：生成登入页面（通过/login地址）DefaultLogoutPageGeneratingFilter：生成退出页面（通过/logout地址）
我们可以通过Debug查看当前系统中SpringSecurity过滤器链中有哪些过滤器及它们的顺序。

我们也可以通过入口 `FilterChainProxy（List<Filter>filters=this.getFilters（（http.ServlertRequest)firewallRequest)` 
对 Servlet 容器而言，它只感知到 FilterChainProxy 这一个过滤器，Spring Security 内部的所有 DefaultSecurityFilterchain（之前了解的具体过滤器链）都由它统一管理和调度，屏蔽了内部复杂的过滤器细节。

