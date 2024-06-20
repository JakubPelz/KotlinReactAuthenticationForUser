package com.example.demo.api.controller

import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import com.example.demo.api.entity.UserEntity
import com.example.demo.api.exception.CustomException
import com.example.demo.api.repository.UserRepository
import com.example.demo.api.util.JwtUtil
import com.example.demo.dto.LoggedUserDto
import com.example.demo.mapper.UserMapper
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.crypto.password.PasswordEncoder

@RestController
@RequestMapping("/users")
class UserController(
    private val userRepository: UserRepository,
    @Autowired private val passwordEncoder: PasswordEncoder,
    @Autowired private val userMapper: UserMapper,
    @Autowired private val jwtUtil: JwtUtil
)  {

    @GetMapping("/{id}")
    fun getUserById(@PathVariable id: Long): ResponseEntity<Any> {
        val user = userRepository.findById(id)
        return if (user.isPresent) {
            ResponseEntity.ok(user.get())
        } else {
            throw CustomException("ERR004", "User not found")
        }
    }

    @GetMapping("/username/{username}")
    fun getUserByUsername(@PathVariable username: String): ResponseEntity<Any> {
        val user = userRepository.findByUsername(username)
        return if (user.isPresent) {
            val userDTO = userMapper.toDTO(user.get())
            ResponseEntity.ok(userDTO)
        }  else {
            throw CustomException("ERR004", "User not found")
        }
    }

    @PostMapping("/")
    fun createUser(
        @RequestParam("name") name: String,
        @RequestParam("username") username: String,
        @RequestParam("password") password: String
    ): ResponseEntity<Any> {
        if (userRepository.existsByUsername(username)) {
            throw CustomException("ERR002", "Username is already taken")
        }
        return try {
            val encodedUser = UserEntity(
                name = name,
                username = username,
                password = passwordEncoder.encode(password)
            )
            userRepository.save(encodedUser)
            ResponseEntity.ok("User successfully created")
        } catch (ex: Exception) {
            throw CustomException("ERR001", "Error creating user")
        }
    }

    @PutMapping("/{id}")
    fun updateUser(@PathVariable id: Long, @RequestBody updatedUser: Map<String, String>): ResponseEntity<Any> {
        return userRepository.findById(id).map { existingUser ->
            val updatedName = updatedUser["name"] ?: existingUser.name
            val updatedUsername = updatedUser["username"] ?: existingUser.username
            val updatedPassword = updatedUser["password"]?.let {
                if (it.isNotBlank()) passwordEncoder.encode(it) else existingUser.password
            } ?: existingUser.password

            if (updatedUsername != existingUser.username) {
                // If the new username exists in the database, throw an exception
                if (userRepository.existsByUsername(updatedUsername)) {
                    throw CustomException("ERR002", "Username is already taken")
                }
            }

            val userToUpdate = existingUser.copy(
                name = updatedName,
                username = updatedUsername,
                password = updatedPassword
            )
            ResponseEntity.ok<Any>(userRepository.save(userToUpdate) as Any)
        }.orElse(ResponseEntity.status(404).body("User not found"))
    }

    @GetMapping("/")
    fun getAllUsers(): ResponseEntity<List<UserEntity>> {
        val users = userRepository.findAll()
        return ResponseEntity.ok(users)
    }

    @DeleteMapping("/{id}")
    fun deleteUser(@PathVariable id: Long): ResponseEntity<Void> {
        val userOptional = userRepository.findById(id)
        return if (userOptional.isPresent) {
            userRepository.delete(userOptional.get())
            ResponseEntity.ok().build()
        } else {
            ResponseEntity.status(404).build()
        }
    }

    @GetMapping("/current")
    fun getCurrentUser(@RequestHeader("Authorization") token: String): ResponseEntity<Any> {
        val actualToken = token.substring(7) // Remove "Bearer " prefix
        val username = jwtUtil.getUsernameFromToken(actualToken)
        val user = userRepository.findByUsername(username)
        return if (user.isPresent) {
            val userDTO = userMapper.toDTO(user.get())
            ResponseEntity.ok(userDTO)
        } else {
            throw CustomException("ERR004", "User not found")
        }
    }
}
