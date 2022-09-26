package com.yuti.analytics.global.filter;

import com.yuti.analytics.domain.accounts.repository.UserRepository;
import com.yuti.analytics.global.util.JWTUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.web.filter.OncePerRequestFilter;


import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.UnsupportedEncodingException;

@RequiredArgsConstructor
public class JwtAuthorizationFilter extends OncePerRequestFilter {

    private static final String HEADER_AUTH = "Authorization";
    private final JWTUtil jwtUtil;


    public void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {

        String token = request.getHeader(HEADER_AUTH);
        System.out.println(token);

        String path = ((HttpServletRequest) request).getRequestURI();

        if (path.contains("/analytics/v1/accounts/login")) {
            chain.doFilter(request,response);
        } else {
            if (token != null) {
                token = token.replace("Bearer ", "");
                jwtUtil.checkToken(token);

            } else
                throw new RuntimeException("유효하지 않은 요청입니다.");

            }
        }






}
