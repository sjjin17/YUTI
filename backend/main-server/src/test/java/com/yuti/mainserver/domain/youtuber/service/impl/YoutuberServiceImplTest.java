package com.yuti.mainserver.domain.youtuber.service.impl;

import com.yuti.mainserver.domain.youtuber.Service.YoutuberService;
import com.yuti.mainserver.domain.youtuber.dto.YoutuberResponseDto;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class YoutuberServiceImplTest {

    @Autowired
    private YoutuberService youtuberService;


    @Test
    public void keyword_검색_성공() {
        // given
        String keyword = "삼성청년SW아카데미 Youtube채널 HELLOSSAFY";

        // when
        List<YoutuberResponseDto> response = youtuberService.searchYoutuber(keyword, 0);

        // then
        assertThat(response.size()).isNotEqualTo(0);
        assertThat(response.stream().anyMatch(youtuber -> youtuber.getChannelName().equals("삼성청년SW아카데미 Youtube채널 HELLOSSAFY"))).isTrue();
    }

    @Test
    public void keyword_부분검색_성공() {
        // given
        String keyword = "삼성청년";

        // when
        List<YoutuberResponseDto> response = youtuberService.searchYoutuber(keyword, 0);

        // then
        assertThat(response.size()).isNotEqualTo(0);
        assertThat(response.stream().anyMatch(youtuber -> youtuber.getChannelName().equals("삼성청년SW아카데미 Youtube채널 HELLOSSAFY"))).isTrue();
    }

    @Test
    public void keyword_초성검색_성공() {
        // given
        String keyword = "ㅅㅅㅊㄴ";

        // when
        List<YoutuberResponseDto> response = youtuberService.searchYoutuber(keyword, 0);

        // then
        assertThat(response.size()).isNotEqualTo(0);
        assertThat(response.stream().anyMatch(youtuber -> youtuber.getChannelName().equals("삼성청년SW아카데미 Youtube채널 HELLOSSAFY"))).isTrue();
    }

}
