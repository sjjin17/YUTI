package com.yuti.mainserver.domain.mbti.service;

import com.yuti.mainserver.domain.mbti.dto.MbtiRecommendResponseDto;

import java.io.IOException;
import java.util.List;

public interface MbtiService {

    List<MbtiRecommendResponseDto> recommendYoutubers(String mbti);
    Long findAllParticipant();
}
