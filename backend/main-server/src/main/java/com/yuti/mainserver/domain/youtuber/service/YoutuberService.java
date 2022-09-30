package com.yuti.mainserver.domain.youtuber.service;

import com.yuti.mainserver.domain.youtuber.dto.YoutuberDto;
import com.yuti.mainserver.domain.youtuber.dto.YoutuberResponseDto;

import java.util.List;

public interface YoutuberService {

    YoutuberResponseDto searchYoutuber(String keyword, String offset);

}
