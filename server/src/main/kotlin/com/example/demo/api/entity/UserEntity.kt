package com.example.demo.api.entity

import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.Table
import jakarta.persistence.Column
import jakarta.validation.constraints.NotBlank

@Entity
@Table(name = "users")
data class UserEntity(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

   @field:NotBlank(message = "Name is mandatory")
    val name: String = "",

    @field:NotBlank(message = "Name is mandatory")
    @Column(unique = true)
    val username: String = "",

    @field:NotBlank(message = "Name is mandatory")
    val password: String = "",
)