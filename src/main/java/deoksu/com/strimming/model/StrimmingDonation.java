package deoksu.com.strimming.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class StrimmingDonation {

    /**
     * sequence
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int starSeq;

    /**
     * 보내는 유저
     */
    private String pushUserId;

    /**
     * 받는 유저
     */
    private String receiveUserId;

    /**
     * 생성 날짜
     */
    @CreatedDate
    private LocalDateTime cdate;

    /**
     * 현금 전환 날짜
     */
    private LocalDateTime changeCash;
}
