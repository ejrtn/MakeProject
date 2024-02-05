package deoksu.com.game;

import deoksu.com.common.websocket.ChatRoom;
import deoksu.com.common.websocket.ChatService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
public class ControllerGame {

    @Autowired
    private SdokuService sdokuService;

    @Autowired
    private ChatService chatService;

    @GetMapping("tetris")
    public String game(Model model, HttpSession httpSession){
        if(chatService.findRoomById("tetris") == null) {        // live 시작
            chatService.createRoom("tetris");
        }
        ChatRoom tetris = chatService.findRoomById("tetris");
        model.addAttribute("tetris",tetris);
        model.addAttribute("nickname",httpSession.getAttribute("nickname") == null ? "test" : httpSession.getAttribute("nickname"));
        return "game/tetris";
    }

    @GetMapping("baduk")
    public String baduk(){
        return "game/baduk";
    }

    @GetMapping("sdoku")
    public String sdoku(){
        return "game/sdoku";
    }

    @PostMapping("sdoku_start")
    @ResponseBody
    public List<List<Integer>> sdokuStart(@RequestParam int empty){
        return sdokuService.sdokuStart(empty);
    }

    @PostMapping("duplication_check")
    @ResponseBody
    public boolean duplicationCheck(DuplicationCheckDto duplicationCheckDto){
        return sdokuService.duplicationCheck(duplicationCheckDto.getResult(),Integer.parseInt(duplicationCheckDto.getX().toString()),Integer.parseInt(duplicationCheckDto.getY().toString()),Integer.parseInt(duplicationCheckDto.getNum().toString()));
    }
}
