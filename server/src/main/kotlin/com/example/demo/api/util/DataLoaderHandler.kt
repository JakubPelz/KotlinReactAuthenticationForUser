package com.example.demo.api.util

import com.example.demo.api.entity.UserEntity
import com.example.demo.api.repository.UserRepository
import org.springframework.boot.ApplicationArguments
import org.springframework.boot.ApplicationRunner
import org.springframework.stereotype.Component
import org.springframework.security.crypto.password.PasswordEncoder

@Component("customDataLoaderHandler")
class DataLoaderHandler(private val userRepository: UserRepository, private val passwordEncoder: PasswordEncoder): ApplicationRunner {
    override fun run(args: ApplicationArguments?) {
        // Check if users already exist
        if (userRepository.count() == 0L) {
            // Create test users
            val users = listOf(
                UserEntity(username = "testuser1", password = passwordEncoder.encode("password"), name = "Test User 1"),
                UserEntity(username = "testuser2", password = passwordEncoder.encode("password"), name = "Test User 2"),
                UserEntity(username = "admin", password = passwordEncoder.encode("password"), name = "Admin User")
            )

            // Save users to the database
            userRepository.saveAll(users)
        }
    }
}