/*package com.example.member.controller;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class KakaoMapController {

    @CrossOrigin(origins = "http://localhost:8080")
    @GetMapping("/api/kakao/map-url")
    public Map<String, String> getKakaoMapUrl(HttpServletResponse response) {
        // 클라이언트에게 전달할 카카오 지도 API URL을 설정합니다.
        String kakaoMapApiUrl = "https://dapi.kakao.com/v2/maps/sdk.js?appkey=a576239cea9ab4b2daf2a00e251e97e9&autoload=false";


        Cookie cookie = new Cookie("SameSite", "None");
        cookie.setSecure(true); // Secure 속성 설정
        response.addCookie(cookie);


        Map<String, String> responseMap = new HashMap<>();
        responseMap.put("kakaoMapApiUrl", kakaoMapApiUrl);
        return responseMap;
    }
}
*/