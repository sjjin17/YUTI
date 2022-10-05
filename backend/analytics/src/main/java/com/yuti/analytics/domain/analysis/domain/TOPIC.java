package com.yuti.analytics.domain.analysis.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Arrays;

@Getter
@AllArgsConstructor
public enum TOPIC {
    TOPIC019_rr("Lifestyle_sociology", 6),
    TOPIC032tl("Fashion", 6),
    TOPIC064t9("Pop_music", 2),
    TOPIC02lkt("Electronic_music", 2),
    TOPIC028sqc("Music_of_Asia", 2),
    TOPIC04rlf("Music", 2),
    TOPIC025zzc("Action_game", 1),
    TOPIC0403l3g("Role", 6),
    TOPIC03hf_rm("Strategy_video_game", 1),
    TOPIC02ntfj("Action", 1),
    TOPIC0bzvm2("Video_game_culture", 1),
    TOPIC07c1v("Technology", 5),
    TOPIC01k8wb("Knowledge", 5),
    TOPIC068hy("Pet", 6),
    TOPIC021bp2("Simulation_video_game", 1),
    TOPIC02wbm("Food", 4),
    TOPIC0glt670("Hip_hop_music", 2),
    TOPIC02jjt("Entertainment", 2),
    TOPIC02vxn("Film", 2),
    TOPIC06ntj("Sport", 3),
    TOPIC018jz("Baseball", 3),
    TOPIC02vx4("Association_football", 3),
    TOPIC03glg("Hobby", 6),
    TOPIC0f2f9("Television_program", 2),
    TOPIC120yrv6h("Tourism", 6),
    TOPIC0ggq0m("Classical_music", 2),
    TOPIC04q1x3q("Puzzle_video_game", 1),
    TOPIC06j6l("Rhythm_and_blues", 2),
    TOPIC05qjc("Performing_arts", 2),
    TOPIC02mscn("Christian_music", 2),
    TOPIC098wr("Society", 5),
    TOPIC03_d0("Jazz", 2),
    TOPIC06by7("Rock_music", 2),
    TOPIC05rwpb("Independent_music", 2),
    TOPIC07yv9("Vehicle", 3),
    TOPIC027x7n("Physical_fitness", 3),
    TOPIC07bs0("Tennis", 3),
    TOPIC037hz("Golf", 3),
    TOPIC0kt51("Health", 3),
    TOPIC022dc6("Sports_game", 3),
    TOPIC06bvp("Religion", 5),
    TOPIC05qt0("Politics", 5),
    TOPIC041xxh("Physical_attractiveness", 3),
    TOPIC0410tth("Motorsport", 3),
    TOPIC01sjng("Racing_video_game", 1),
    TOPIC02hygl("Music_video_game", 1),
    TOPIC01h6rj("Military", 3),
    TOPIC120y8l81("Business", 5),
    TOPIC07_53("Volleyball", 3),
    TOPIC0g293("Music_of_Latin_America", 2),
    TOPIC09kqc("Humour", 6),
    TOPIC0gywn("Soul_music", 2),
    TOPIC018w8("Basketball", 3),
    TOPIC0b1vjn("Casual_game", 1),
    TOPIC01cgz("Boxing", 3),
    TOPIC01h7lh("Mixed_martial_arts", 2),
    TOPIC066wd("Professional_wrestling", 3),
    TOPIC0jm_("American_football", 3),
    TOPIC01lyv("Country_music", 2);

    private String name;
    private int category;

    public static int findCategory(String topic) {
        return Arrays.stream(values()).filter(t -> t.toString().contains(topic))
                .findFirst().get().getCategory();
    }
}
