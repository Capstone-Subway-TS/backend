package com.example.member.controller;

/*import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;


@RestController
public class LiveController {

    @PostMapping("/LiveController")
    public String sendToFlask(@RequestBody String stationName) {
        // Flask 서버의 URL
        String flaskUrl = "http://flask:8082/receive_subway_arrive"; // 적절한 URL로 대체해주세요

        // HTTP 요청 헤더 설정
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        // HTTP 요청 본문 설정
        HttpEntity<String> requestEntity = new HttpEntity<>(stationName, headers);

        // RestTemplate 객체 생성
        RestTemplate restTemplate = new RestTemplate();

        // Flask 서버에 HTTP POST 요청 보내기
        restTemplate.postForObject(flaskUrl, requestEntity, String.class);

        return "데이터 전송 완료";
    }
}*/
