package com.rmit.sept.fri_10_30_3.majorproject.security;

import com.rmit.sept.fri_10_30_3.majorproject.model.Customer;
import com.rmit.sept.fri_10_30_3.majorproject.services.UserLoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collections;

import static com.rmit.sept.fri_10_30_3.majorproject.security.SecurityConstant.HEADER_STRING;
import static com.rmit.sept.fri_10_30_3.majorproject.security.SecurityConstant.TOKEN_PREFIX;

public class JwtAuthenticationFilter extends OncePerRequestFilter {
    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private UserLoginService userLoginService;

    @Override
    protected void doFilterInternal(HttpServletRequest httpServletRequest,
                                    HttpServletResponse httpServletResponse,
                                    FilterChain filterChain) throws ServletException, IOException {
        try {

            String jwt = getJWTFromRequest(httpServletRequest);

            if(StringUtils.hasText(jwt)&& tokenProvider.validateToken(jwt)){
                Long userId = tokenProvider.getUserIdFromJWT(jwt);
                UserDetails loginUser = userLoginService.loadUserById(userId);

                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                        loginUser, null, Collections.emptyList());

                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(httpServletRequest));
                SecurityContextHolder.getContext().setAuthentication(authentication);

            }

        }catch (Exception ex){
            logger.error("Could not set user authentication in security context", ex);
        }


        filterChain.doFilter(httpServletRequest, httpServletResponse);
    }

    private String getJWTFromRequest(HttpServletRequest request){
        String bearerToken = request.getHeader(HEADER_STRING);

        if(StringUtils.hasText(bearerToken)&&bearerToken.startsWith(TOKEN_PREFIX)){
            return bearerToken.substring(7, bearerToken.length());
        }

        return null;
    }
}
