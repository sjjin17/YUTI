package com.yuti.mainserver.domain.youtuber.Service;

import com.yuti.mainserver.domain.youtuber.dto.YoutuberResponseDto;

import java.util.List;

public interface YoutuberService {

    List<YoutuberResponseDto> searchYoutuber(String keyword, int offset);

}
