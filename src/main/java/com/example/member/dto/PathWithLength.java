package com.example.member.dto;

import java.util.List;

public class PathWithLength {
    List<String> path;
    int length;
    String baseline;

    public String getBaseline() {
        return baseline;
    }

    public void setBaseline(String baseline) {
        this.baseline = baseline;
    }

    public PathWithLength(List<String> path, int length) {
        this.path = path;
        this.length = length;
    }

    public List<String> getPath() {
        return path;
    }

    public void setLength(int length) {
        this.length = length;
    }

    public int getLength() {
        return length;
    }
}