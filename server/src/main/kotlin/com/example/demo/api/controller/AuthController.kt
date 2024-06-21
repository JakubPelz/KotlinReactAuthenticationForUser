package com.example.demo.api.controller

import com.example.demo.api.entity.UserEntity
import com.example.demo.api.exception.CustomException
import com.example.demo.api.service.UserService
import com.example.demo.api.util.JwtUtil
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.http.ResponseEntity
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.Authentication
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.web.bind.annotation.*

data class AuthRequest(val username: String, val password: String)
data class AuthResponse(val accessToken: String, val refreshToken: String)

@RestController
@RequestMapping("/tokens")
class AuthController {

    @Autowired
    private lateinit var authenticationManager: AuthenticationManager

    @Autowired
    private lateinit var jwtUtil: JwtUtil

    @Autowired
    private lateinit var userService: UserService

    @Value("\${jwt.access.token.expiration}")
    private  var accessTokenExpiration: Long = 0

    @Value("\${jwt.refresh.token.expiration}")
    private  var refreshTokenExpiration: Long = 0

    @PostMapping("/")
    fun login(@RequestBody authRequest: AuthRequest): ResponseEntity<AuthResponse> {
        val authentication: Authentication = authenticationManager.authenticate(
            UsernamePasswordAuthenticationToken(authRequest.username, authRequest.password)
        )
        SecurityContextHolder.getContext().authentication = authentication
        val user: UserEntity = try {
            userService.findByUsername(authRequest.username)
        } catch (ex: UsernameNotFoundException) {
            throw CustomException("ERR003", "User or password is not valid")
        }

        val accessToken = jwtUtil.generateToken(user.id, accessTokenExpiration)
        val refreshToken = jwtUtil.generateToken(user.id, refreshTokenExpiration)

        return ResponseEntity.ok(AuthResponse(accessToken, refreshToken))
    }

    @PutMapping("/")
    fun refresh(@RequestHeader("Authorization") refreshToken: String): ResponseEntity<AuthResponse> {
        val token = refreshToken.substring(7)
        if (!jwtUtil.validateToken(token)) {
            throw CustomException("ERR006", "Invalid refresh token")
        }
        val userId = jwtUtil.getUserIdFromToken(token)
        val newAccessToken = jwtUtil.generateToken(userId, accessTokenExpiration)
        val newRefreshToken = jwtUtil.generateToken(userId, refreshTokenExpiration)
        return ResponseEntity.ok(AuthResponse(newAccessToken, newRefreshToken))
    }


    @DeleteMapping("/")
    fun logout(): ResponseEntity<String> {
        SecurityContextHolder.clearContext()
        return ResponseEntity.ok("User successfully logged out")
    }
}