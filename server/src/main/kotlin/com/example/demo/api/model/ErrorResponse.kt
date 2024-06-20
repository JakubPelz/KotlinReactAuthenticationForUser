package com.example.demo.api.model


import java.util.UUID

data class ErrorResponse(
    val errorId: String = UUID.randomUUID().toString(),
    val errorCode: String,
    val errorDescription: String? = null
)
