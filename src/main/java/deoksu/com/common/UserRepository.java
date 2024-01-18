package deoksu.com.common;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User,String> {

    User findByNickname(String nickname);

    User findByNicknameAndPw(String nickname, String pw);
}
