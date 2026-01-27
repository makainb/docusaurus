---
title: 增强组件库
draft: true
sidebar_class_name: hidden-sidebar-item
---

```java
@Service
public class LoginService {

    // 注入AuthenticationManagerBuilder，用于获得authenticationManager
    @Autowired
    private AuthenticationManagerBuilder authenticationManagerBuilder;

    public Result<String> login(LoginDTO loginDTO, HttpServletRequest request, HttpServletResponse response) {
        // 拿到前端传过来的用户名密码
        String username = loginDTO.getUsername();
        String password = loginDTO.getPassword();
        // 构建一个AuthenticationToken
        UsernamePasswordAuthenticationToken authenticationToken = UsernamePasswordAuthenticationToken.unauthenticated(username, password);
        try {
            // 以下部分是因为我们屏蔽原先密码登录，自己实现密码登录，因此要模仿UsernamePasswordAuthenticationFilter处理流程
            // 使用authenticationManager认证
            Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
            // 成功返回登录成功
            if(authentication!=null && authentication.isAuthenticated()){
                // 保存用户信息
                SecurityContextHolder.getContext().setAuthentication(authentication);
                // 设置session
                HttpSession session = request.getSession();
                session.setAttribute(HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY, SecurityContextHolder.getContext());
                return Result.success("登录成功");
            }
        }catch (AuthenticationException e){
            // 返回认证失败信息
            return Result.failed(e.getLocalizedMessage());
        }
        catch (Exception e){
            e.printStackTrace();
            return Result.failed("未知错误");
        }
        return Result.failed("认证失败");
    }

    public Result<String> logout() {
        // 判断SecurityContext
        if(SecurityContextHolder.getContext().getAuthentication()!=null){
            SecurityContextHolder.getContext().setAuthentication(null);
            // 清楚SecurityContext
            SecurityContextHolder.clearContext();
            return Result.success("登出成功");
        }else{
            return Result.failed("登出失败，用户不存在");
        }
    }
}

```


```java
@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // 所有访问都必须认证
                .authorizeHttpRequests(auth->auth
                        // 允许"/login","/logout"免登录访问
                        .requestMatchers("/login","/logout").permitAll()
                        // 其它接口需要登录访问
                        .anyRequest().authenticated())
                // 自定义登录界面，并允许无需认证即可访问
                .formLogin(AbstractHttpConfigurer::disable)
                // 关闭默认的登出
                .logout(LogoutConfigurer::disable)
                // 关闭csrf功能，因为我们有post请求，而csrf会屏蔽post请求
                .csrf(AbstractHttpConfigurer::disable);
        return http.build();
    }
}

```








--------------------


## 定义自己的Authentication，在authentication包下面定义PhoneCodeAuthenticationToken类



```java
/**
 * 手机验证码token
 */
public class PhoneCodeAuthenticationToken extends AbstractAuthenticationToken {

    private final Object principal;

    private Object credentials;

    public PhoneCodeAuthenticationToken(Object principal, Object credentials) {
        super(null);
        this.principal = principal;
        this.credentials = credentials;
        setAuthenticated(false);
    }

    public PhoneCodeAuthenticationToken(Object principal, Object credentials, Collection<? extends GrantedAuthority> authorities) {
        super(authorities);
        this.principal = principal;
        this.credentials = credentials;
        super.setAuthenticated(true); // must use super, as we override
    }

    @Override
    public Object getCredentials() {
        return this.credentials;
    }

    @Override
    public Object getPrincipal() {
        return this.principal;
    }
}

```

## 在authentication包下，定义PhoneCodeAuthenticationFilter（继承AbstractAuthenticationProcessingFilter），用于过滤和解析前端传过来的数据

```java
/**
 * 手机验证码验证过滤器
 */
public class PhoneCodeAuthenticationFilter extends AbstractAuthenticationProcessingFilter {

    // 前端手机参数
    public static final String SPRING_SECURITY_FORM_PHONE_KEY = "phone";
    // 前端手机验证码参数
    public static final String SPRING_SECURITY_FORM_CODE_KEY = "code";

    // 是否只能为post请求
    private boolean postOnly = true;

    // 只拦截loginphonecode路径的POST方法
    private static final AntPathRequestMatcher DEFAULT_ANT_PATH_REQUEST_MATCHER = new AntPathRequestMatcher("/loginphonecode",
            "POST");

    public PhoneCodeAuthenticationFilter() {
        super(DEFAULT_ANT_PATH_REQUEST_MATCHER);
    }

    public PhoneCodeAuthenticationFilter(AuthenticationManager authenticationManager) {
        super(DEFAULT_ANT_PATH_REQUEST_MATCHER, authenticationManager);
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException, IOException, ServletException {
        if(postOnly && !request.getMethod().equals("POST") ){
            throw new AuthenticationServiceException("Authentication method not supported: " + request.getMethod());
        }else{
            // 获取电话号码
            String phone = getPhone(request);
            // 获取验证码
            String code= getCode(request);
            // 组装AuthenticationToken
            PhoneCodeAuthenticationToken token = new PhoneCodeAuthenticationToken(phone,code);
            this.setDetails(request,token);
            return this.getAuthenticationManager().authenticate(token);
        }
    }

    /**
     * 将request传递到token中
     */
    public void setDetails(HttpServletRequest request , PhoneCodeAuthenticationToken token ){
        token.setDetails(this.authenticationDetailsSource.buildDetails(request));
    }

    /**
     * 获取前端的Phone
     */
    public String getPhone(HttpServletRequest request ){
        return request.getParameter(SPRING_SECURITY_FORM_PHONE_KEY);
    }

    /**
     * 获取前端的验证码
     */
    public String getCode(HttpServletRequest request ){
        return request.getParameter(SPRING_SECURITY_FORM_CODE_KEY);
    }

    public void setPostOnly(boolean postOnly) {
        this.postOnly = postOnly;
    }
}

```

## 在authentication包下，定义PhoneCodeAuthenticationProvider（实现AuthenticationProvider），用于真实验证手机验证码是否正确

```java
public class PhoneCodeAuthenticationProvider implements AuthenticationProvider {

    /**
     * 支持PhoneCodeAuthenticationToken认证
     */
    @Override
    public boolean supports(Class<?> aClass) {
        return PhoneCodeAuthenticationToken.class.isAssignableFrom(aClass);
    }

    /**
     * 认证
     */
    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        if (!supports(authentication.getClass())) {
            return null;
        }
        PhoneCodeAuthenticationToken token = (PhoneCodeAuthenticationToken) authentication;
        // 这里一般会通过电话号码查询用户，判断用户是否存在以及获取其权限，这里只是演示，就不做这一步
        String phone = (String) token.getPrincipal();
        if (phone == null) {
            throw new BadCredentialsException("无法获取电话信息");
        }
        String code = (String) token.getCredentials();
        if (code == null) {
            throw new BadCredentialsException("验证码为空");
        }
        // 这里只是演示，正常是有一个短信发送服务，发送短信后，我们将验证码存入Redis，然后根据电话号码去取这个验证码做验证。由于我们没有发送短信服务，这里就模拟一个固定验证码
        if(!"8633".equals(code)){
            throw new BadCredentialsException("验证码错误");
        }
        // 这里PhoneCodeAuthenticationToken第三个入参应该是权限，这里没有使用数据库，就默认一个空值。完整情况应该是前面通过phone获取到用户，再找到权限
        PhoneCodeAuthenticationToken result =
                new PhoneCodeAuthenticationToken(phone, code, new ArrayList<>());
        result.setDetails(token.getDetails());
        return result;
    }
}

```
## 在config包下，新建SecurityConfig，配置Spring Security

```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    /**
     * 定义手机验证码需要的phoneCodeAuthenticationProvider
     */
    @Bean
    public PhoneCodeAuthenticationProvider phoneCodeAuthenticationProvider() {
        return new PhoneCodeAuthenticationProvider();
    }

    /**
     * 定义密码加密方式，用于DaoAuthenticationProvider
     */
    @Bean
    public PasswordEncoder passwordEncoder(){
        return NoOpPasswordEncoder.getInstance();
    }

    /**
     * 定义AuthenticationManager，加入两种AuthenticationProvider
     */
    @Bean
    public AuthenticationManager authenticationManager() throws Exception {
        // 保留原来账号密码登录的AuthenticationProvider
        DaoAuthenticationProvider daoAuthenticationProvider = new DaoAuthenticationProvider();
        daoAuthenticationProvider.setUserDetailsService(userDetailsService());
        daoAuthenticationProvider.setPasswordEncoder(passwordEncoder());
        // 将daoAuthenticationProvider和 phoneCodeAuthenticationProvider 加入到authenticationManager
        return new ProviderManager(daoAuthenticationProvider, phoneCodeAuthenticationProvider());
    }

    /**
     * 定义securityContextRepository，加入两种securityContextRepository
     */
    @Bean
    public SecurityContextRepository securityContextRepository(){
        HttpSessionSecurityContextRepository httpSecurityRepository = new HttpSessionSecurityContextRepository();
        DelegatingSecurityContextRepository defaultRepository = new DelegatingSecurityContextRepository(
                httpSecurityRepository, new RequestAttributeSecurityContextRepository());
        return defaultRepository;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        // 定义PhoneCodeAuthenticationFilter，将authenticationManager和securityContextRepository设置进去，保持一致
        PhoneCodeAuthenticationFilter phoneCodeAuthenticationFilter = new PhoneCodeAuthenticationFilter(authenticationManager());
        phoneCodeAuthenticationFilter.setSecurityContextRepository(securityContextRepository());
        http
                // 所有请求都需要认证
                .authorizeHttpRequests(auth->auth.anyRequest().authenticated())
                // 禁用csrf，因为登录和登出是post请求，csrf会屏蔽掉post请求
                .csrf(AbstractHttpConfigurer::disable)
                // 添加到过滤器链路中，确保在AuthorizationFilter过滤器之前
                .addFilterBefore(phoneCodeAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                // 默认登录页面
                .formLogin(Customizer.withDefaults())
                // 设置全局authenticationManager
                .authenticationManager(authenticationManager())
                // 设置全局securityContextRepository
                .securityContext(c->c.securityContextRepository(securityContextRepository()))
        ;
        return http.build();
    }

    /**
     * 定义一个内存用户
     */
    public UserDetailsService userDetailsService(){
        return new UserDetailsService(){
            @Override
            public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
                return User.withUsername("test")
                        .password("1234")
                        .build();
            }
        };
    }

}

```
## 测试
POST http://127.0.0.1:8080/loginphonecode?phone=1388888888&code=8633
