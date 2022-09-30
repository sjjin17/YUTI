package com.yuti.mainserver.domain.youtuber.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
public class YoutuberResponseDto {

    private boolean isLast;
    private String nextPageToken;
    List<YoutuberDto> youtubers;

    @Builder
    public YoutuberResponseDto(boolean isLast, String nextPageToken, List<YoutuberDto> youtubers) {
        this.isLast = isLast;
        this.nextPageToken = nextPageToken;
        this.youtubers = youtubers;
    }
}
