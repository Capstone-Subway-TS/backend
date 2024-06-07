package com.example.member.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/sendRequest") // 카카오 API에 대한 경로
                .allowedOrigins("http://flask:8082") // 모든 출처 허용
                .allowedMethods("GET") // GET 메서드 허용
                .allowCredentials(false) // 인증 허용 안 함
                .maxAge(3600); // 프리플라이 시간 설정
    }
}