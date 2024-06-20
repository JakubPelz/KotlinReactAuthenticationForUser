package com.example.demo.api.config

import com.example.demo.api.filter.JwtAuthenticationFilter
import com.example.demo.api.service.UserService
import com.example.demo.api.util.JwtUtil
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.beans.factory.annotation.Value
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.security.web.SecurityFilterChain
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter
import org.springframework.http.HttpMethod

@Configuration
@EnableWebSecurity
class SecurityConfig(
    private val jwtUtil: JwtUtil,
    private val userService: UserService,
    private val authenticationConfiguration: AuthenticationConfiguration
) {

    @Value("\${security.enabled}")
    private var securityEnabled: Boolean = true

    @Bean
    fun passwordEncoder(): PasswordEncoder {
        return BCryptPasswordEncoder()
    }

    @Bean
    fun authenticationManager(): AuthenticationManager {
        return authenticationConfiguration.authenticationManager
    }

    @Bean
    fun securityFilterChain(http: HttpSecurity): SecurityFilterChain {
        if (securityEnabled) {
            http
                .csrf().disable()
                .authorizeHttpRequests { auths ->
                    auths
                        .requestMatchers(HttpMethod.POST, "/users/**").permitAll()
                        .requestMatchers("/tokens/**").permitAll()
                        .requestMatchers("/users/").permitAll()
                        .requestMatchers("/users/{id}").authenticated()
                        .anyRequest().authenticated()
                }
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .addFilterBefore(JwtAuthenticationFilter(jwtUtil, userService), UsernamePasswordAuthenticationFilter::class.java)
        } else {
            http
                .csrf().disable()
                .authorizeHttpRequests { auths ->
                    auths
                        .anyRequest().permitAll()
                }
        }

        return http.build()
    }
}
