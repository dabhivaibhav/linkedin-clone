package com.connectsphere.nexgennetwork.service;

import com.connectsphere.nexgennetwork.Model.User;
import com.connectsphere.nexgennetwork.dto.request.UserRegistrationRequest;
import com.connectsphere.nexgennetwork.dto.response.ApiResponse;
import com.connectsphere.nexgennetwork.dto.response.UserResponseDTO;
import com.connectsphere.nexgennetwork.repository.UserRepository;
import jakarta.validation.Valid;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    public ApiResponse<UserResponseDTO> registerUser(@Valid UserRegistrationRequest request) {

        if (!request.getPassword().equals(request.getConfirmPassword())) {
            return new ApiResponse<UserResponseDTO>(null, "Passwords do not match", 400);
        }

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            return new ApiResponse<UserResponseDTO>(null, "Email already exists", 409);
        }

        User user = new User();
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setEmail(request.getEmail());

        userRepository.save(user);

        UserResponseDTO responseDTO = new UserResponseDTO(
                user.getFirstName(),
                user.getLastName(),
                user.getEmail());


        return new ApiResponse<>(responseDTO, "Registration successful", 201);
    }
}
