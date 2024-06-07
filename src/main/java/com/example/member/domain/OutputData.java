package com.example.member.domain;

import com.example.member.dto.TransferStation;

import java.util.*;

public class OutputData {
   private Integer Curtime;
   private List<String> Path;
   private String StartLine;
   private List<Integer> EachTime;
   private List<Integer> EachWalkingTime;
   private List<String> EachTypeOfLine;
   private List<String> EachTransferStation;
   private List<Integer> EachWaitingTime;
   private Integer TotalTime;
   private String FinalTime;

    public OutputData(Integer curtime,List<String> path, String startLine, List<Integer> eachTime, List<Integer> eachWalkingTime, List<String> eachTypeOfLine, List<String> eachTransferStation, List<Integer> eachWaitingTime, Integer totalTime, String finalTime) {
        Curtime = curtime;
        Path = path;
        StartLine = startLine;
        EachTime = eachTime;
        EachWalkingTime = eachWalkingTime;
        EachTypeOfLine = eachTypeOfLine;
        EachTransferStation = eachTransferStation;
        EachWaitingTime = eachWaitingTime;
        TotalTime = totalTime;
        FinalTime = finalTime;
    }

    public Integer getCurtime() {
        return Curtime;
    }

    public void setCurtime(Integer curtime) {
        Curtime = curtime;
    }

    public List<String> getEachTransferStation() {
        return EachTransferStation;
    }

    public void setEachTransferStation(List<String> eachTransferStation) {
        EachTransferStation = eachTransferStation;
    }

    public List<String> getPath() {
        return Path;
    }

    public void setPath(List<String> path) {
        Path = path;
    }

    public String getStartLine() {
        return StartLine;
    }

    public void setStartLine(String startLine) {
        StartLine = startLine;
    }

    public List<Integer> getEachTime() {
        return EachTime;
    }

    public void setEachTime(List<Integer> eachTime) {
        EachTime = eachTime;
    }

    public List<Integer> getEachWalkingTime() {
        return EachWalkingTime;
    }

    public void setEachWalkingTime(List<Integer> eachWalkingTime) {
        EachWalkingTime = eachWalkingTime;
    }

    public List<String> getEachTypeOfLine() {
        return EachTypeOfLine;
    }

    public void setEachTypeOfLine(List<String> eachTypeOfLine) {
        EachTypeOfLine = eachTypeOfLine;
    }

    public List<Integer> getEachWaitingTime() {
        return EachWaitingTime;
    }

    public void setEachWaitingTime(List<Integer> eachWaitingTime) {
        EachWaitingTime = eachWaitingTime;
    }

    public Integer getTotalTime() {
        return TotalTime;
    }

    public void setTotalTime(Integer totalTime) {
        TotalTime = totalTime;
    }

    public String getFinalTime() {
        return FinalTime;
    }

    public void setFinalTime(String finalTime) {
        FinalTime = finalTime;
    }
}
