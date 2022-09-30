package com.yuti.mainserver.domain.youtuber.docs;

import com.yuti.mainserver.domain.youtuber.dto.YoutuberResponseDto;
import com.yuti.mainserver.domain.youtuber.service.YoutuberService;
import com.yuti.mainserver.domain.youtuber.api.YoutuberApiController;
import com.yuti.mainserver.domain.youtuber.dto.YoutuberDto;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(YoutuberApiController.class)
@AutoConfigureRestDocs
public class YoutuberRestDocsTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private YoutuberService youtuberService;

    @Test
    public void youtuber_검색() throws Exception {
        // given
        String request = "삼성청년";
        List<YoutuberDto> youtubers = new ArrayList<>();
        youtubers.add(YoutuberDto.builder()
                .channelId("UC_XI3ByFO1uZIIH-g-zJZiw")
                .channelName("삼성청년SW아카데미 Youtube채널 HELLOSSAFY")
                .thumbnail("https://yt3.ggpht.com/ytc/AMLnZu9qdR9T9_9OXz27_3lZVs4hfwECef2oUSylrcQv=s800-c-k-c0x00ffffff-no-rj").build());
        YoutuberResponseDto response = YoutuberResponseDto.builder()
                        .isLast(true)
                        .youtubers(youtubers)
                        .nextPageToken("nextPageToken").build();
        given(youtuberService.searchYoutuber(anyString(), anyString())).willReturn(response);

        // when, then
        mockMvc.perform(RestDocumentationRequestBuilders.get("/api/v1/youtubers")
                        .queryParam("keyword", request)
                        .queryParam("offset", String.valueOf(0)))
                .andExpect(status().isOk())
                .andDo(document("youtuber-search",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        requestParameters(
                                parameterWithName("keyword").description("검색할 단어"),
                                parameterWithName("offset").description("조회할 시작 번호")
                        ),
                        responseFields(
                                fieldWithPath("success").description("API 요청 성공 여부").type(JsonFieldType.BOOLEAN),
                                fieldWithPath("data").description("Response data").type(JsonFieldType.OBJECT)
                        ).andWithPrefix("data.",
                                fieldWithPath("last").description("마지막 페이지인지 구분").type(JsonFieldType.BOOLEAN),
                                fieldWithPath("nextPageToken").description("유튜브 API 사용 시 다음 offset").type(JsonFieldType.STRING),
                                fieldWithPath("youtubers").description("검색된 유튜버 리스트").type(JsonFieldType.ARRAY),
                                fieldWithPath("youtubers[].channelId").description("유튜버 채널 id").type(JsonFieldType.STRING),
                                fieldWithPath("youtubers[].channelName").description("유튜버 채널명").type(JsonFieldType.STRING),
                                fieldWithPath("youtubers[].thumbnail").description("유튜버 썸네일 주소").type(JsonFieldType.STRING))
                        ));
    }
}
