package com.rmit.sept.fri_10_30_3.majorproject.security;

public class SecurityConstant {

    public static final String SIGN_UP_URLS = "/api/customer/register";
    public static final String H2_URL = "/h2-console/**";
    public static final String SECRET = "SecretKeyToGenJWTs";
    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String HEADER_STRING = "Authorization";
    public static final String CUSTOMER_LOGIN = "/api/customer/login";
    public static final long EXPIRATION_TIME = 240_000;
}
