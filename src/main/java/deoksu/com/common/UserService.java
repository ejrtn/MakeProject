package deoksu.com.common;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;


    public String findByNickname(String nickname){
        User user = userRepository.findByNickname(nickname);
        return user==null ? "" : user.getNickname();
    }

    public void userSave(User user){
        userRepository.save(user);
    }

    public String login(User user){
        User new_user = userRepository.findByNicknameAndPw(user.getNickname(),user.getPw());
        return new_user == null ? "" : new_user.getNickname();
    }
}
