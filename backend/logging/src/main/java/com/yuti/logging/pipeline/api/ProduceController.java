package com.yuti.logging.pipeline.api;

import com.google.gson.Gson;
import com.yuti.logging.pipeline.dto.DiffTimeRequestDto;
import com.yuti.logging.pipeline.dto.SurveyRequestDto;
import com.yuti.logging.pipeline.vo.DiffTimeVO;
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

    @PostMapping("/log/mbti-result")
    public void saveMbtiResult(@RequestHeader("user-agent") String userAgentName,
                               @RequestHeader("x-forwarded-for") String userIpAddress,
                               @RequestBody SurveyRequestDto requestDto) {
        SimpleDateFormat sdfDate = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSZZ");
        Date now = new Date();
        Gson gson = new Gson();
        MbtiResultVO mbtiResultVO = new MbtiResultVO(sdfDate.format(now), requestDto.getMbti(), requestDto.getYoutuber(), userAgentName, userIpAddress);
        String jsonMbtiResultLog = gson.toJson(mbtiResultVO);

        sendDataToKafka("mbti-result", jsonMbtiResultLog);
    }

    @PostMapping("/log/diff-time")
    public void diffTimeBetweenResearchContents(@RequestHeader("user-agent") String userAgentName,
                                                @RequestHeader("x-forwarded-for") String userIpAddress,
                                                @RequestBody DiffTimeRequestDto requestDto) {
        SimpleDateFormat sdfDate = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSZZ");
        Date now = new Date();
        Gson gson = new Gson();

        DiffTimeVO diffTimeVO = new DiffTimeVO(requestDto.getPageNo(), requestDto.getColor(), requestDto.getAnswer(), sdfDate.format(requestDto.getDiffTime()), sdfDate.format(now), userAgentName, userIpAddress);
        String jsonDiffTimeLog = gson.toJson(diffTimeVO);

        sendDataToKafka("diff-time", jsonDiffTimeLog);
    }

    private void sendDataToKafka(String topic, String data) {
        kafkaTemplate.send(topic, data).addCallback(new ListenableFutureCallback<SendResult<String, String>>() {
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
