package com.yuti.mainserver.domain.youtuber.dto;

import com.google.api.services.youtube.model.SearchResult;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.util.Map;

@ToString
@Getter
public class YoutuberDto {

    private String channelId;
    private String channelName;
    private String thumbnail;

    @Builder
    public YoutuberDto(String channelId, String channelName, String thumbnail) {
        this.channelId = channelId;
        this.channelName = channelName;
        this.thumbnail = thumbnail;
    }

    public static YoutuberDto toResponseDto(Map<String, Object> response) {
        return YoutuberDto.builder()
                .channelId((String) response.get("channel_id"))
                .channelName((String) response.get("channel_name"))
                .thumbnail((String) response.get("thumbnail"))
                .build();
    }

    public static YoutuberDto toResponseDto(SearchResult searchResult) {
        return YoutuberDto.builder()
                .channelId(searchResult.getSnippet().getChannelId())
                .channelName(searchResult.getSnippet().getChannelTitle())
                .thumbnail(searchResult.getSnippet().getThumbnails().getHigh().getUrl().split("\\u003ds800-c-k-c0xffffffff-no-rj-mo")[0])
                .build();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        YoutuberDto that = (YoutuberDto) o;

        return channelName.equals(that.channelName);
    }

    @Override
    public int hashCode() {
        return channelName.hashCode();
    }
}
