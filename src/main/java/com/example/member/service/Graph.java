package com.example.member.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Graph {

    public static Map<String, Map<String, Integer>> createGraph(List<List<Map<String, Object>>> lines)
    {
        Map<String, Map<String, Integer>> subwayGraph = new HashMap<>();

        for (List<Map<String, Object>> line : lines) {
            for (Map<String, Object> station : line) {
                String stationName = (String) station.get("name");
                String stationLine = (String) station.get("line");

                // 'next' 값을 처리
                Object nextValue = station.get("next");
                if (nextValue instanceof String && !"None".equals(nextValue)) {
                    String[] parts = ((String) nextValue).split(",");
                    String nextStation = parts[0]; // 역 이름
                    String timeInfo = parts[1];    // 시간 정보
                    String nextStationLine = (String) station.get("line"); // 다음 역의 호선 정보
                    addEdgeWithTime(subwayGraph, nextStation, stationName, timeInfo, stationLine, nextStationLine);
                } else if (nextValue instanceof List) {
                    List<String> nextStations = (List<String>) nextValue;
                    for (String next : nextStations) {
                        String[] parts = next.split(",");
                        String nextStation = parts[0]; // 역 이름
                        String timeInfo = parts[1];    // 시간 정보
                        String nextStationLine = (String) station.get("line"); // 다음 역의 호선 정보
                        addEdgeWithTime(subwayGraph, nextStation, stationName, timeInfo, stationLine, nextStationLine);
                    }
                }

                // 'prev' 값을 처리
                Object prevValue = station.get("prev");
                if (prevValue instanceof String && !"None".equals(prevValue)) {
                    String[] parts = ((String) prevValue).split(",");
                    String prevStation = parts[0]; // 역 이름
                    String timeInfo = parts[1];    // 시간 정보
                    String prevStationLine = (String) station.get("line"); // 이전 역의 호선 정보
                    addEdgeWithTime(subwayGraph, prevStation, stationName, timeInfo, stationLine, prevStationLine);


                } else if (prevValue instanceof List) {
                    List<String> prevStations = (List<String>) prevValue;
                    for (String prev : prevStations) {
                        String[] parts = prev.split(",");
                        String prevStation = parts[0]; // 역 이름
                        String timeInfo = parts[1];    // 시간 정보
                        String prevStationLine = (String) station.get("line"); // 이전 역의 호선 정보
                        addEdgeWithTime(subwayGraph, prevStation, stationName, timeInfo, stationLine, prevStationLine);
                    }
                }
            }

        }

        return subwayGraph;
    }
    public static String getBaseLine(List<List<Map<String, Object>>> lines, List<String> path)
    {
        String baseLine = null;

        String first = path.get(0);
        String next = path.get(1);


        for (List<Map<String, Object>> line : lines)
        {
            for (Map<String, Object> station : line)
            {
                if (first.equals((String) station.get("name")))
                {
                    if (station.get("next") instanceof List) {
                        List<?> list = (List<?>) station.get("next");
                        for (int z = 0; z < list.size(); z++) {
                            String newer = (String) list.get(z);
                            String[] splitData = newer.split(",");
                            String tmpNext = splitData[0];

                            if (next.equals(tmpNext)) {
                                baseLine = (String) station.get("line");
                                break;
                            }
                        }
                    }
                    else {
                        String newer = (String) station.get("next");
                        String[] splitData = newer.split(",");
                        String tmpNext = splitData[0];

                        if (next.equals(tmpNext)) {
                            baseLine = (String) station.get("line");
                            break;
                        }
                    }
                    if (station.get("prev") instanceof List) {
                        List<?> list = (List<?>) station.get("prev");
                        for (int z = 0; z < list.size(); z++) {
                            String newer = (String) list.get(z);
                            String[] splitData = newer.split(",");
                            String tmpPrev = splitData[0];

                            if (next.equals(tmpPrev)) {
                                baseLine = (String) station.get("line");
                                break;
                            }
                        }
                    } else {
                        String newer = (String) station.get("prev");
                        String[] splitData = newer.split(",");
                        String tmpPrev = splitData[0];

                        if (next.equals(tmpPrev)) {
                            baseLine = (String) station.get("line");
                            break;
                        }
                    }
                }
            }
        }
        return baseLine;
    }

    private static void addEdgeWithTime(Map<String, Map<String, Integer>> subwayGraph, String from, String to, String timeInfo, String fromLine, String toLine) {
        if (from == null || from.isEmpty() || to == null || to.isEmpty() || timeInfo == null || timeInfo.isEmpty() || fromLine == null || fromLine.isEmpty() || toLine == null || toLine.isEmpty()) {
            return;
        }

        if ("None".equals(from) || "None".equals(to) || "None".equals(timeInfo) ) {
            return;
        }

        // 시간 정보를 분과 초로 분리
        String[] timeParts = timeInfo.split(":");
        if (timeParts.length < 2) {
            System.err.println("Invalid time format: " + timeInfo);
            return;
        }

        // 분과 초로 변환
        int weight = convertToSeconds(timeParts[0], timeParts[1]);


        subwayGraph.putIfAbsent(from, new HashMap<>());
        subwayGraph.putIfAbsent(to, new HashMap<>());

        // 엣지 추가
        subwayGraph.get(from).put(to, weight);
        subwayGraph.get(to).put(from, weight);
    }

    private static int convertToSeconds(String minutes, String seconds) {
        // 분과 초를 정수로 변환하고 초로 합산
        int min = Integer.parseInt(minutes);
        int sec = Integer.parseInt(seconds);
        return min * 60 + sec;
    }
}

