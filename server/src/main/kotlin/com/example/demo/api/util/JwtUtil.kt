package com.example.demo.api.util

import io.jsonwebtoken.*
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Component
import java.util.*
import io.jsonwebtoken.security.Keys
import java.security.Key

@Component
class JwtUtil {

    @Value("\${jwt.secret}")
    private lateinit var secret: String

    @Value("\${jwt.access.token.expiration}")
    private var accessTokenExpiration: Long = 0

    @Value("\${jwt.refresh.token.expiration}")
    private var refreshTokenExpiration: Long = 0

    private val secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS256)

    fun generateToken(userId: Long, expirationTimeInMinutes: Long): String {
        val claims: MutableMap<String, Any> = HashMap()
        claims["userId"] = userId
        return Jwts.builder()
            .setClaims(claims)
            .setIssuedAt(Date(System.currentTimeMillis()))
            .setExpiration(Date(System.currentTimeMillis() + expirationTimeInMinutes * 60 * 1000))
            .signWith(secretKey)
            .compact()
    }

    fun getUserIdFromToken(token: String): Long {
        val claims = getAllClaimsFromToken(token)
        return claims["userId"].toString().toLong()
    }

    fun validateToken(token: String): Boolean {
        try {
            val claims = getAllClaimsFromToken(token)
            val userId = claims["userId"]
            return userId != null && !isTokenExpired(token)
        } catch (e: Exception) {
            return false
        }
    }

    private fun getAllClaimsFromToken(token: String): Claims {
        return Jwts.parserBuilder()
            .setSigningKey(secretKey)
            .build()
            .parseClaimsJws(token)
            .body
    }

    private fun isTokenExpired(token: String): Boolean {
        val expiration = getAllClaimsFromToken(token).expiration
        return expiration.before(Date())
    }
}
