package com.yuti.analytics.global.filter;


import com.yuti.analytics.global.util.JWTUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.web.filter.OncePerRequestFilter;



import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;



@RequiredArgsConstructor
public class JwtAuthorizationFilter extends OncePerRequestFilter {

    private static final String HEADER_AUTH = "Authorization";
    private final JWTUtil jwtUtil;



    public void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {

        String token = request.getHeader(HEADER_AUTH);


        String path = ((HttpServletRequest) request).getRequestURI();
        if (path.contains("/analytics/v1/accounts/login") || path.contains("/analytics/v1/accounts/signup") || path.contains("/analytics/v1/accounts/logout")) {
            chain.doFilter(request,response);
        } else {

            if (token != null) {
                String jwtToken = token.replace("Bearer ", "");
                String userId = jwtUtil.getClaims(jwtToken).getBody().get("id").toString();

                if (jwtUtil.validateTokenTime(jwtUtil.getClaims(jwtToken)) && jwtUtil.checkIsToken(userId)) {
                    jwtUtil.checkToken(jwtToken);
                    chain.doFilter(request, response);
                } else {
                    throw new RuntimeException("유효하지 않은 요청입니다.");
                }

            } else
                throw new RuntimeException("유효하지 않은 요청입니다.");
            }
        }






}
