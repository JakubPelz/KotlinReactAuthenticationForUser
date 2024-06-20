package com.example.demo.api.filter

import jakarta.servlet.FilterChain
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import java.util.logging.Logger
import org.springframework.stereotype.Component
import org.springframework.web.filter.OncePerRequestFilter
import org.springframework.web.util.ContentCachingRequestWrapper
import org.springframework.web.util.ContentCachingResponseWrapper

@Component
class LoggingFilter : OncePerRequestFilter() {

    private val logger = Logger.getLogger(LoggingFilter::class.java.name)
    private val separator = "/------------------------------------------------------------------------------------------------------------------------------/"

    override fun doFilterInternal(
        request: HttpServletRequest,
        response: HttpServletResponse,
        filterChain: FilterChain
    ) {
        val requestWrapper = ContentCachingRequestWrapper(request)
        val responseWrapper = ContentCachingResponseWrapper(response)

        filterChain.doFilter(requestWrapper, responseWrapper)

        logRequest(requestWrapper)
        logResponse(responseWrapper)
        responseWrapper.copyBodyToResponse()
    }

    private fun logRequest(request: ContentCachingRequestWrapper) {
        val requestBody = request.contentAsByteArray.let {
            if (it.isNotEmpty()) String(it) else "Request body is empty"
        }
        println(separator)
        println("Class: ${LoggingFilter::class.java.name}, Request URL: ${request.requestURL}, Method: ${request.method}, Body: $requestBody")
        println(separator)
    }

    private fun logResponse(response: ContentCachingResponseWrapper) {
        val responseBody = response.contentAsByteArray.let {
            if (it.isNotEmpty()) String(it) else "Response body is empty"
        }
        println(separator)
        println("Class: ${LoggingFilter::class.java.name}, Response Status: ${response.status}, Body: $responseBody")
        println(separator)
    }
}
