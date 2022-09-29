package com.codesoom.myseat.controllers;

import com.codesoom.myseat.dto.LoginRequest;
import com.codesoom.myseat.dto.LoginResponse;
import com.codesoom.myseat.services.AuthenticationService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

/**
 * 로그인 컨트롤러
 */
@RestController
@RequestMapping("/login")
@CrossOrigin
@Slf4j
public class LoginController {
    private final AuthenticationService authService;

    public LoginController(
            AuthenticationService authService
    ) {
        this.authService = authService;
    }

    /**
     * 사용자 인증 후 상태코드 200과 토큰을 응답한다.
     * 
     * @param req 로그인 정보
     * @return 토큰
     */
    @PostMapping
    @ResponseStatus(HttpStatus.OK)
    public LoginResponse login(
            @RequestBody LoginRequest req
    ) {
        String email = req.getEmail();
        String password = req.getPassword();
        
        String token = authService.login(email, password);
        log.info("token: " + token);

        return toResponse(token);
    }

    /**
     * 응답 정보를 반환한다.
     *
     * @param token 토큰
     * @return 응답 정보
     */
    private LoginResponse toResponse(
            String token
    ) {
        return LoginResponse.builder()
                .token(token)
                .build();
    }
}
