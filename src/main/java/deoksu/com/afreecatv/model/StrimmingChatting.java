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
public class StrimmingChatting {

    /**
     * 채팅 ID
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int chattingId;

    /**
     * 유저 ID
     */
    private String nickname;

    /**
     * 채팅내용
     */
    @Column(columnDefinition = "TEXT")
    private String chatting;

    /**
     * 생성 날짜
     */
    @CreatedDate
    private LocalDateTime cdate;


}
