package deoksu.com.game;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ControllerGame {

    @GetMapping("game")
    public String game(){
        return "game";
    }
}
