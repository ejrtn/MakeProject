package deoksu.com.common;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class CommonController {

    @Autowired
    private UserService userService;

    @GetMapping("/")
    public String index(){
        return "index";
    }

    @GetMapping("join")
    public String join(){
        return "join";
    }

    @GetMapping("login")
    public String login(){
        return "login";
    }

    @PostMapping("findByNickname")
    @ResponseBody
    public String findByNickname(@RequestParam String nickname){
        return userService.findByNickname(nickname);
    }

    @PostMapping("userSave")
    public String userSave(User user){
        userService.userSave(user);
        return "index";
    }

    @PostMapping("loginCheck")
    @ResponseBody
    public String login(User user, HttpServletRequest httpServletRequest){
        HttpSession session = httpServletRequest.getSession(true);
        String nickname = userService.login(user);
        session.setAttribute("nickname", nickname);
        return nickname;
    }
}
