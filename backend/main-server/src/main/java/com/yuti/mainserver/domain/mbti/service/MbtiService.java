package com.yuti.mainserver.domain.mbti.service;

import com.yuti.mainserver.domain.mbti.dto.MbtiRecommendResponseDto;
import com.yuti.mainserver.domain.mbti.dto.MbtiResultRequestDto;

import java.util.List;

public interface MbtiService {

    List<MbtiRecommendResponseDto> recommendYoutubers(MbtiResultRequestDto resultRequestDto);
}
