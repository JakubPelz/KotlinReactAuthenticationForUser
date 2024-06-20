package com.example.demo.api.util

import com.example.demo.api.exception.CustomException
import com.example.demo.api.exception.TokenExpiredException
import com.example.demo.api.model.ErrorResponse
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice

@RestControllerAdvice
class GlobalExceptionHandler {

    @ExceptionHandler(CustomException::class)
    fun handleCustomException(ex: CustomException): ResponseEntity<ErrorResponse> {
        val errorResponse = ErrorResponse(
            errorCode = ex.errorCode,
            errorDescription = ex.errorDescription
        )
        return ResponseEntity(errorResponse, HttpStatus.BAD_REQUEST)
    }

    @ExceptionHandler(TokenExpiredException::class)
    fun handleTokenExpiredException(ex: TokenExpiredException): ResponseEntity<ErrorResponse> {
        val errorResponse = ErrorResponse(
            errorCode = "ERR005",
            errorDescription = ex.message
        )
        return ResponseEntity(errorResponse, HttpStatus.UNAUTHORIZED)
    }

    @ExceptionHandler(Exception::class)
    fun handleException(ex: Exception): ResponseEntity<ErrorResponse> {
        val errorResponse = ErrorResponse(
            errorCode = "ERR999",
            errorDescription = ex.message
        )
        return ResponseEntity(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR)
    }
}
