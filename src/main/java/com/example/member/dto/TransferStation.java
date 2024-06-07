package com.example.member.dto;

import java.util.List;

public class TransferStation {
    private String Name;
    private Integer TransferTime;
    private String ScheduleTime;
    private Integer TransferDistance;

    public TransferStation(String name, Integer transferTime, String scheduleTime, Integer transferDistance) {
        Name = name;
        TransferTime = transferTime;
        ScheduleTime = scheduleTime;
        TransferDistance = transferDistance;
    }

    public String getName() {
        return Name;
    }

    public void setName(String name) {
        Name = name;
    }

    public Integer getTransferTime() {
        return TransferTime;
    }

    public void setTransferTime(Integer transferTime) {
        TransferTime = transferTime;
    }

    public String getScheduleTime() {
        return ScheduleTime;
    }

    public void setScheduleTime(String scheduleTime) {
        ScheduleTime = scheduleTime;
    }

    public Integer getTransferDistance() {
        return TransferDistance;
    }

    public void setTransferDistance(Integer transferDistance) {
        TransferDistance = transferDistance;
    }
}
