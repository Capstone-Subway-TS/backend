package com.example.member.dto;

import java.util.List;

public class SearchRouteDTO {

    private int TotalTime;
    private List<String> path;
    private List<Integer> times;
    private TransferStation transferStation;

    public SearchRouteDTO(int totalTime, List<String> path, List<Integer> times, TransferStation transferStation) {
        TotalTime = totalTime;
        this.path = path;
        this.times = times;
        this.transferStation = transferStation;
    }

    public int getTotalTime() {
        return TotalTime;
    }

    public void setTotalTime(int totalTime) {
        TotalTime = totalTime;
    }

    public List<String> getPath() {
        return path;
    }

    public void setPath(List<String> path) {
        this.path = path;
    }

    public List<Integer> getTimes() {
        return times;
    }

    public void setTimes(List<Integer> times) {
        this.times = times;
    }

    public TransferStation getTransferStation() {
        return transferStation;
    }

    public void setTransferStation(TransferStation transferStation) {
        this.transferStation = transferStation;
    }
}
