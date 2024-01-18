package deoksu.com.afreecatv.model;

import deoksu.com.common.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import java.time.LocalDateTime;

@Entity
@Setter
@Getter
public class StrimmingLive {

    /**
     * sequence
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int liveSeq;

    /**
     * 유저 ID
     */
    @ManyToOne(fetch = FetchType.LAZY) // 다대일 연관관계 지정
    @JoinColumn(name = "nickname") // TEAM_ID를 외래키로 지정
    private User user;

    /**
     * 채팅 ID
     */
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "chattingId")
    private StrimmingChatting afreecatvChatting;

    /**
     * 제목
     */
    private String title;

    /**
     * 태그
     */
    @ManyToOne(fetch = FetchType.LAZY)
    private StrimmingTag afreecatvTag;

    /**
     * 생성 날짜
     */
    @CreatedDate
    private LocalDateTime chattingTime;

}
