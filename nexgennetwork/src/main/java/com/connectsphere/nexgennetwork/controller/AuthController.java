package com.connectsphere.nexgennetwork.controller;

import com.connectsphere.nexgennetwork.config.JwtService;
import com.connectsphere.nexgennetwork.dto.request.LoginRequest;
import com.connectsphere.nexgennetwork.dto.response.LogInResponse;
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

@RestController
@RequestMapping("/api/v1")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    public AuthController(AuthenticationManager authenticationManager, JwtService jwtService) {
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }

    @PostMapping("/login")
    public ResponseEntity<LogInResponse> login(@RequestBody LoginRequest loginRequest) {
        try {
            Authentication auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getEmail(),
                            loginRequest.getPassword()
                    )
            );

            UserDetails user = (UserDetails) auth.getPrincipal();
            String jwt = jwtService.generateToken(user);

            return ResponseEntity.ok(new LogInResponse("Login successful", jwt));
        } catch (AuthenticationException e) {
            return ResponseEntity.status(401).body(new LogInResponse("Invalid credentials", null));
        }
    }
}
