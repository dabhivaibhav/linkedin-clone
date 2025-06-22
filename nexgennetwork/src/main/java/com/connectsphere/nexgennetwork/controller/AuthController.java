package com.connectsphere.nexgennetwork.controller;

import com.connectsphere.nexgennetwork.Model.User;
import com.connectsphere.nexgennetwork.config.JwtService;
import com.connectsphere.nexgennetwork.dto.request.LoginRequest;
import com.connectsphere.nexgennetwork.dto.response.ApiResponse;
import com.connectsphere.nexgennetwork.dto.response.LogInResponse;
import com.connectsphere.nexgennetwork.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/api/v1")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UserRepository userRepository;

    public AuthController(AuthenticationManager authenticationManager, JwtService jwtService, UserRepository userRepository) {
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
        this.userRepository = userRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<LogInResponse>> login(@RequestBody LoginRequest loginRequest) {
        try {
            Authentication auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getEmail(),
                            loginRequest.getPassword()
                    )
            );

            UserDetails userDetails = (UserDetails) auth.getPrincipal();

            Optional<User> userOptional = userRepository.findByEmail(userDetails.getUsername());
            if (userOptional.isEmpty()) {
                ApiResponse<LogInResponse> response = new ApiResponse<>(
                        null,
                        "User not found",
                        HttpStatus.NOT_FOUND.value()
                );
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }

            User user = userOptional.get();

            LogInResponse logInResponse = new LogInResponse(
                    "Login successful",
                    user.getUserId().toString(),
                    user.getFirstName(),
                    user.getLastName(),
                    user.getPassword(), // ⚠️ Only for testing; don’t return in prod
                    jwtService.generateToken(userDetails)
            );

            ApiResponse<LogInResponse> response = new ApiResponse<>(
                    logInResponse,
                    "Login successful",
                    HttpStatus.OK.value()
            );

            return ResponseEntity.ok(response);

        } catch (AuthenticationException e) {
            ApiResponse<LogInResponse> response = new ApiResponse<>(
                    null,
                    "Invalid credentials",
                    HttpStatus.UNAUTHORIZED.value()
            );
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }
}