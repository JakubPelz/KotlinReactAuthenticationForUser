package com.example.demo.api.repository

import org.springframework.data.jpa.repository.JpaRepository
import com.example.demo.api.entity.UserEntity
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface UserRepository : JpaRepository<UserEntity, Long> {
    fun findByUsername(username: String): Optional<UserEntity>
    fun existsByUsername(username: String): Boolean
}