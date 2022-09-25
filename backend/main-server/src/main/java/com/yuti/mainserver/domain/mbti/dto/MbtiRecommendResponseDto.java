package com.yuti.mainserver.domain.mbti.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Map;

@Getter
@NoArgsConstructor
public class MbtiRecommendResponseDto {

    private String channelId;
    private String channelName;
    private String thumbnail;

    @Builder
    public MbtiRecommendResponseDto(String channelId, String channelName, String thumbnail) {
        this.channelId = channelId;
        this.channelName = channelName;
        this.thumbnail = thumbnail;
    }

    public static MbtiRecommendResponseDto toResponseDto(Map<String, Object> response) {
        return MbtiRecommendResponseDto.builder()
                .channelId((String) response.get("channel_id"))
                .channelName((String) response.get("channel_name"))
                .thumbnail((String) response.get("thumbnail"))
                .build();
    }
}
