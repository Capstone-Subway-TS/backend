/*package com.example.member.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
public class FlaskController {

    @GetMapping("/sendRequest")
    public ResponseEntity<String> sendRequest() {
        String flaskEndpoint = "http://flask:8082/receive_subway_arrive";

        try {
            RestTemplate restTemplate = new RestTemplate();
            String response = restTemplate.getForObject(flaskEndpoint, String.class);
            System.out.println("Received data from Flask application: " + response);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred while processing request.");
        }
    }
}*/