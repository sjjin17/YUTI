package com.yuti.analytics.global.util;


import io.jsonwebtoken.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.io.UnsupportedEncodingException;
import java.util.Date;
import java.util.function.Function;

import static org.springframework.security.config.Elements.JWT;

@Component
@Slf4j
public class JWTUtil {

    private static final String SALT = "SSAFIT";

    public String createToken(String claimId, String data) throws UnsupportedEncodingException {

        return Jwts.builder()
                .setHeaderParam("alg", "HS256")
                .setHeaderParam("typ", "JWT")
                .claim(claimId, data)
                .setExpiration(new Date(System.currentTimeMillis()+1000L * 60 * 60))
                .signWith(SignatureAlgorithm.HS256, SALT.getBytes("UTF-8"))
                .compact();

    }


    public static boolean checkToken(String token) throws UnsupportedEncodingException {

        try {
            Jwts.parser().setSigningKey(SALT.getBytes("UTF-8")).parseClaimsJws(token);
            return true;
        } catch (SignatureException ex) {
            log.error("Invalid JWT signature");
        } catch (MalformedJwtException ex) {
            log.error("Invalid JWT token");
        } catch (ExpiredJwtException ex) {
            log.error("Expired JWT token");
        } catch (UnsupportedJwtException ex) {
            log.error("Unsupported JWT token");
        } catch (IllegalArgumentException ex) {
            log.error("JWT claims string is empty.");
        }
        return false;


    }









}
