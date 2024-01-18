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
public class StrimmingChattingStop {

    /**
     * sequence
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int chattingStopSeq;

    /**
     * 채팅 금지 시간
     */
    @CreatedDate
    private LocalDateTime chattingTime;

    /**
     * BJ ID(유저 ID)
     */
    @ManyToOne(fetch = FetchType.LAZY) // 다대일 연관관계 지정
    @JoinColumn(name = "nickname") // TEAM_ID를 외래키로 지정
    private User user;

    /**
     * 채팅 금지당한 유저 ID
     */
    private String chattingStopId;


}
