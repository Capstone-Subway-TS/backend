package com.example.member.domain;

public class TransferInfo {
    private String currentStation;
    private String nextStation;
    private String fromLine;
    private String toLine;
    private int transferTime;
    private int distanceToTransfer;

    // 생성자, 게터 및 세터 생략

    // 수정된 생성자

    public TransferInfo(String currentStation, String nextStation, String fromLine, String toLine, int transferTime) {
        this.currentStation = currentStation;
        this.nextStation = nextStation;
        this.fromLine = fromLine;
        this.toLine = toLine;
        this.transferTime = transferTime;
        //this.distanceToTransfer = distanceToTransfer;
    }

    // Getter methods


    public int getDistanceToTransfer(){
        return distanceToTransfer;
    }
    public String getStation() {
        return currentStation;
    }

    public String getNextStation() {
        return nextStation;
    }

    public String getFromLine() {
        return fromLine;
    }

    public String getToLine() {
        return toLine;
    }

    public int getTransferTime() {
        return transferTime;
    }
}
