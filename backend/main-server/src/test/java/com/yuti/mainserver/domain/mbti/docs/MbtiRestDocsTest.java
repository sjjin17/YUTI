package com.yuti.mainserver.domain.mbti.docs;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.yuti.mainserver.domain.mbti.api.MbtiApiController;
import com.yuti.mainserver.domain.mbti.dto.MbtiRecommendResponseDto;
import com.yuti.mainserver.domain.mbti.service.MbtiService;
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

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(MbtiApiController.class)
@AutoConfigureRestDocs
public class MbtiRestDocsTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private MbtiService mbtiService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    public void mbti_youtuber추천() throws Exception {
        //given
        String mbti = "mbti";
        List<MbtiRecommendResponseDto> response = new ArrayList<>();
        for(int i = 1; i <= 3; i++) {
            response.add(MbtiRecommendResponseDto.builder()
                    .channelId("channel_id_"+i)
                    .channelName("channel_name_"+i)
                    .thumbnail("thumbnail_"+i).build());
        }
        given(mbtiService.recommendYoutubers(anyString())).willReturn(response);

        //when, then
        mockMvc.perform(RestDocumentationRequestBuilders.get("/api/v1/mbti/{mbti}", mbti))
                .andExpect(status().isOk())
                .andDo(document("recommend-youtuber",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        pathParameters(
                                parameterWithName("mbti").description("mbti")
                        ),
                        responseFields(
                                fieldWithPath("success").description("API 요청 성공 여부").type(JsonFieldType.BOOLEAN),
                                fieldWithPath("data").description("Response data").type(JsonFieldType.ARRAY)
                        ).andWithPrefix("data[].",
                                fieldWithPath("channelId").description("유튜버 채널 id").type(JsonFieldType.STRING),
                                fieldWithPath("channelName").description("유튜버 채널명").type(JsonFieldType.STRING),
                                fieldWithPath("thumbnail").description("유튜버 썸네일 주소").type(JsonFieldType.STRING))
                ));
    }
}
