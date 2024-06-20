package com.example.demo.mapper

import com.example.demo.api.entity.UserEntity
import com.example.demo.dto.LoggedUserDto
import org.springframework.stereotype.Component

@Component
class UserMapper {
    fun toDTO(userEntity: UserEntity) = LoggedUserDto(
        id = userEntity.id,
        name = userEntity.name,
        username = userEntity.username
    )
}