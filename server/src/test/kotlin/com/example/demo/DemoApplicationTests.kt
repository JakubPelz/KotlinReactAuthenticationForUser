package com.example.demo

import com.example.demo.api.entity.UserEntity
import com.fasterxml.jackson.databind.ObjectMapper
import org.junit.jupiter.api.*
import org.junit.jupiter.api.Assertions.assertNotNull
import org.junit.jupiter.api.MethodOrderer.OrderAnnotation
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.*

@SpringBootTest
@AutoConfigureMockMvc
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@TestMethodOrder(OrderAnnotation::class)
class DemoApplicationTests {

	@Autowired
	private lateinit var mockMvc: MockMvc

	@Autowired
	private lateinit var objectMapper: ObjectMapper

	private var createdUserId: Long? = null
	private var createdUserName: String? = null

//	@BeforeAll
//	fun setup() {
//		val userJson = """
//            {
//                "name": "Test User",
//                "username": "testuser",
//                "password": "password123"
//            }
//        """
//		val result = mockMvc.perform(post("/users/")
//			.contentType(MediaType.APPLICATION_JSON)
//			.content(userJson))
//			.andExpect(status().isOk)
//			.andExpect(jsonPath("$.id").exists())
//			.andReturn()
//
//		val responseContent = result.response.contentAsString
//		val createdUser = objectMapper.readValue(responseContent, UserEntity::class.java)
//		createdUserId = createdUser.id
//		createdUserName = createdUser.username // Store the username instead of name
//		assertNotNull(createdUserId)
//	}
//
//	@Test
//	@Order(1)
//	fun getUserByIdTest() {
//		mockMvc.perform(get("/users/$createdUserId")
//			.contentType(MediaType.APPLICATION_JSON))
//			.andExpect(status().isOk)
//			.andExpect(jsonPath("$.id").value(createdUserId!!))
//			.andExpect(jsonPath("$.username").value(createdUserName!!)) // Corrected assertion to match username
//	}
//
//	@Test
//	@Order(2)
//	fun getAllUsersTest() {
//		mockMvc.perform(get("/users/")
//			.contentType(MediaType.APPLICATION_JSON))
//			.andExpect(status().isOk)
//			.andExpect(jsonPath("$").isArray)
//	}
//
//	@Test
//	@Order(3)
//	fun deleteUserTest() {
//		println("Created user ID  $createdUserId")
//		mockMvc.perform(delete("/users/$createdUserId")
//			.contentType(MediaType.APPLICATION_JSON))
//			.andExpect(status().isOk)
//
//		mockMvc.perform(get("/users/$createdUserId")
//			.contentType(MediaType.APPLICATION_JSON))
//			.andExpect(status().isNotFound)
//	}
}
