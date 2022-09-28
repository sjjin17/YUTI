package com.yuti.mainserver.domain.youtuber.dto;

import com.google.api.services.youtube.model.SearchResult;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.util.Map;

@ToString
@Getter
public class YoutuberResponseDto {

    private String channelId;
    private String channelName;
    private String thumbnail;

    @Builder
    public YoutuberResponseDto(String channelId, String channelName, String thumbnail) {
        this.channelId = channelId;
        this.channelName = channelName;
        this.thumbnail = thumbnail;
    }

    public static YoutuberResponseDto toResponseDto(Map<String, Object> response) {
        return YoutuberResponseDto.builder()
                .channelId((String) response.get("channel_id"))
                .channelName((String) response.get("channel_name"))
                .thumbnail((String) response.get("thumbnail"))
                .build();
    }

    public static YoutuberResponseDto toResponseDto(SearchResult searchResult) {
        return YoutuberResponseDto.builder()
                .channelId(searchResult.getSnippet().getChannelId())
                .channelName(searchResult.getSnippet().getChannelTitle())
                .thumbnail(searchResult.getSnippet().getThumbnails().getHigh().getUrl())
                .build();
    }

}
