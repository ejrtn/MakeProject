package deoksu.com.strimming.model;

import deoksu.com.common.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class StrimmingBlackList {

    /**
     * sequence
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int blackListSeq;

    /**
     * BJ ID
     */
    @ManyToOne(fetch = FetchType.LAZY) // 다대일 연관관계 지정
    @JoinColumn(name = "nickname") // TEAM_ID를 외래키로 지정
    private User user;

    /**
     * 생성날짜
     */
    @CreatedDate
    private LocalDateTime cdate;

    /**
     * 블랙당한 유저 ID
     */
    private String blackUserId;


}
