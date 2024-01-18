package deoksu.com.common;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
@Setter
@Getter
public class User {
    /**
     * 닉네임
     */
    @Id
    private String nickname;

    /**
     * 패스워드
     */
    private String pw;

    /**
     * 프로필 사진
     */
    @Column(columnDefinition = "TEXT")
    private String profile;
}
