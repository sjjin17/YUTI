package com.yuti.mainserver.domain.mbti.service.impl;

import com.yuti.mainserver.domain.mbti.dto.MbtiRecommendResponseDto;
import com.yuti.mainserver.domain.mbti.service.MbtiService;
import com.yuti.mainserver.global.exception.CustomException;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class MbtiServiceImplTest {

    @Autowired
    private MbtiService mbtiService;

    @Test
    public void MBTI별_유튜버_3명_추천_성공() {
        for(int i = 0; i < "EI".length(); i++) {
            for(int j = 0; j < "SN".length(); j++) {
                for(int k = 0; k < "FT".length(); k++) {
                    for(int l = 0; l < "PJ".length(); l++) {
                        //given
                        String mbti = ""+ "EI".charAt(i) + "SN".charAt(j) + "FT".charAt(k) + "PJ".charAt(l);

                        //when
                        List<MbtiRecommendResponseDto> responseDtos = mbtiService.recommendYoutubers(mbti);

                        //then
                        assertThat(responseDtos.size()).isEqualTo(3);
                    }
                }
            }
        }
    }

    @Test
    public void 유효하지않은_MBTI_추천_실패() {
        //given
        String mbti = "NNNN";

        //when, then
        assertThatThrownBy(() -> mbtiService.recommendYoutubers(mbti))
                .isInstanceOf(CustomException.class);
    }
}
