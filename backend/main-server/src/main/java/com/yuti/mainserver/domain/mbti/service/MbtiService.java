package com.yuti.mainserver.domain.mbti.service;

import com.yuti.mainserver.domain.mbti.dto.MbtiRecommendResponseDto;

import java.util.List;

public interface MbtiService {

    List<MbtiRecommendResponseDto> recommendYoutubers(String mbti);
}
