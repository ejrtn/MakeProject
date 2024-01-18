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
public class StrimmingVideo {

    /**
     * sequence
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int videoSeq;

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
     * 썸네일
     */
    @Column(columnDefinition = "TEXT")
    private String thumbnail;

    /**
     * 영상 이름
     */
    private String videotTitle;

    /**
     * 영상 시간
     */
    private String videoTime;

    /**
     * 생성 날짜
     */
    @CreatedDate
    private LocalDateTime cdate;
}
