package com.connectsphere.nexgennetwork.controller;

import com.connectsphere.nexgennetwork.dto.request.UserRegistrationRequest;
import com.connectsphere.nexgennetwork.dto.response.ApiResponse;
import com.connectsphere.nexgennetwork.dto.response.UserResponseDTO;
import com.connectsphere.nexgennetwork.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<UserResponseDTO>> registerUser(@Valid @RequestBody UserRegistrationRequest request) {
        ApiResponse<UserResponseDTO> response = userService.registerUser(request);
        return ResponseEntity.status(response.getHttpStatusCode()).body(response);
    }
}
