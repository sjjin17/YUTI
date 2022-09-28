package com.yuti.analytics.global.util;


import com.yuti.analytics.domain.accounts.repository.UserRepository;

import io.jsonwebtoken.*;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import javax.persistence.EntityNotFoundException;
import java.io.UnsupportedEncodingException;
import java.util.Date;


@Component
@Slf4j
public class JWTUtil {
    private static final String SALT = "SSAFIT";
    private final UserRepository userRepository;
    public JWTUtil(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
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

    public Jws<Claims> getClaims (String token) throws UnsupportedEncodingException {
        return Jwts.parser().setSigningKey(SALT.getBytes("UTF-8")).parseClaimsJws(token);
    }

    public Boolean validateTokenTime(Jws<Claims> claims) {
        return !claims.getBody().getExpiration().before(new Date());
    }


    public Boolean checkIsToken(String id) {
        if (userRepository.existsById(id))
            return userRepository.findById(id).get().isToken();
        else
            throw new EntityNotFoundException();
    }

}













