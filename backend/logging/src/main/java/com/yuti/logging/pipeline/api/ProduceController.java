package com.yuti.logging.pipeline.api;

import com.google.gson.Gson;
import com.yuti.logging.pipeline.dto.DiffTimeRequestDto;
import com.yuti.logging.pipeline.dto.SurveyRequestDto;
import com.yuti.logging.pipeline.vo.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.SendResult;
import org.springframework.util.concurrent.ListenableFutureCallback;
import org.springframework.web.bind.annotation.*;

import java.net.URISyntaxException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
public class ProduceController {

    private final KafkaTemplate<String, String> kafkaTemplate;

    @PostMapping("/log/mbti-result")
    public void saveMbtiResult(@RequestHeader("user-agent") String userAgentName,
                               @RequestHeader("x-forwarded-for") String userIpAddress,
                               @RequestBody SurveyRequestDto requestDto) {
        SimpleDateFormat sdfDate = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSZZ");
        LocalDateTime now = LocalDateTime.now().plusHours(9);
        Gson gson = new Gson();
        MbtiResultVO mbtiResultVO = new MbtiResultVO(now.format(DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss")), requestDto.getMbti(), validateYoutuberDuplication(requestDto.getYoutuber()), userAgentName, userIpAddress);
        String jsonMbtiResultLog = gson.toJson(mbtiResultVO);

        sendDataToKafka("mbti-result", jsonMbtiResultLog);
    }

    @PostMapping("/log/diff-time")
    public void diffTimeBetweenResearchContents(@RequestHeader("user-agent") String userAgentName,
                                                @RequestHeader("x-forwarded-for") String userIpAddress,
                                                @RequestBody DiffTimeRequestDto requestDto) {
        SimpleDateFormat sdfDate = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSZZ");
        LocalDateTime now = LocalDateTime.now().plusHours(9);
        Gson gson = new Gson();

        DiffTimeVO diffTimeVO = new DiffTimeVO(requestDto.getPageNo(), requestDto.getColor(), requestDto.getAnswer(), now.format(DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss")), now.format(DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss")), userAgentName, userIpAddress);
        String jsonDiffTimeLog = gson.toJson(diffTimeVO);

        sendDataToKafka("diff-time", jsonDiffTimeLog);
    }

    @PostMapping("/log/share-result/{mbti}")
    public void shareResult(@RequestHeader("user-agent") String userAgent,
                                    @RequestHeader("x-forwarded-for") String userIpAddress,
                                       @PathVariable String mbti) throws URISyntaxException {
        SimpleDateFormat sdfDate = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSZZ");
        LocalDateTime now = LocalDateTime.now().plusHours(9);
        Gson gson = new Gson();

        ShareResultVO shareResultVO = new ShareResultVO(now.format(DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss")), userAgent, userIpAddress, "result");
        String jsonShareResultVO = gson.toJson(shareResultVO);

        sendDataToKafka("share-result", jsonShareResultVO);
    }

    @PostMapping("/log/share-main")
    public void shareMain(@RequestHeader("user-agent") String userAgent,
                                       @RequestHeader("x-forwarded-for") String userIpAddress) throws URISyntaxException {
        SimpleDateFormat sdfDate = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSZZ");
        LocalDateTime now = LocalDateTime.now().plusHours(9);
        Gson gson = new Gson();

        ShareResultVO shareResultVO = new ShareResultVO(now.format(DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss")), userAgent, userIpAddress, "main");
        String jsonShareResultVO = gson.toJson(shareResultVO);

        sendDataToKafka("share-result", jsonShareResultVO);
    }

    @PostMapping("/log/leave")
    public void leaveService(@RequestHeader("user-agent") String userAgent,
                                       @RequestHeader("x-forwarded-for") String userIpAddress,
                                          @RequestParam Integer pageNo) {
        SimpleDateFormat sdfDate = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSZZ");
        LocalDateTime now = LocalDateTime.now().plusHours(9);
        Gson gson = new Gson();

        LeaveVO leaveVO = new LeaveVO(now.format(DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss")), userAgent, userIpAddress, pageNo);
        String jsonLeaveVO = gson.toJson(leaveVO);

        sendDataToKafka("leave-result", jsonLeaveVO);
    }

    @PostMapping("/log/share-button")
    public void shareButton(@RequestHeader("user-agent") String userAgent,
                             @RequestHeader("x-forwarded-for") String userIpAddress,
                             @RequestParam String sns) {
        LocalDateTime now = LocalDateTime.now().plusHours(9);
        Gson gson = new Gson();

        ShareButtonVO buttonVO = new ShareButtonVO(now.format(DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss")), userAgent, userIpAddress, sns);
        String jsonButtonVO = gson.toJson(buttonVO);

        sendDataToKafka("share-button", jsonButtonVO);
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

    private List<String> validateYoutuberDuplication(List<String> youtuber) {
        return new ArrayList<>(new HashSet<>(youtuber));
    }
}
