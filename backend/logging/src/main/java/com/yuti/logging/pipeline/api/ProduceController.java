package com.yuti.logging.pipeline.api;

import com.google.gson.Gson;
import com.yuti.logging.pipeline.dto.SurveyRequestDto;
import com.yuti.logging.pipeline.vo.MbtiResultVO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.SendResult;
import org.springframework.util.concurrent.ListenableFutureCallback;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.Date;

@Slf4j
@RequiredArgsConstructor
@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ProduceController {

    private final KafkaTemplate<String, String> kafkaTemplate;

    @GetMapping("/log/mbti-result")
    public void saveMbtiResult(@RequestHeader("user-agent") String userAgentName,
                               @RequestHeader("x-forwarded-for") String userIpAddress,
                               @RequestBody SurveyRequestDto requestDto) {
        SimpleDateFormat sdfDate = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSZZ");
        Date now = new Date();
        Gson gson = new Gson();
        MbtiResultVO mbtiResultVO = new MbtiResultVO(sdfDate.format(now), requestDto.getMbti(), requestDto.getYoutuber(), userAgentName, userIpAddress);
        String jsonMbtiResultLog = gson.toJson(mbtiResultVO);

        kafkaTemplate.send("mbti-result", jsonMbtiResultLog ).addCallback(new ListenableFutureCallback<SendResult<String, String>>() {
            @Override
            public void onFailure(Throwable ex) {
                log.error(ex.getMessage(), ex);
            }

            @Override
            public void onSuccess(SendResult<String, String> result) {
                log.info(result.toString());
            }
        });
    }
}
