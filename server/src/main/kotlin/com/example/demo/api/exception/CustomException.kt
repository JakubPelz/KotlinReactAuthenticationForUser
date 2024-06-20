package com.example.demo.api.exception

class CustomException (
    val errorCode: String,
    val errorDescription: String? = null,
) : RuntimeException(errorCode)