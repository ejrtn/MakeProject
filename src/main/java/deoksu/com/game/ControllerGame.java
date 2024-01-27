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

    @GetMapping("game")
    public String game(Model model, HttpSession httpSession){
        if(chatService.findRoomById("tetris") == null) {        // live 시작
            chatService.createRoom("tetris");
        }
        if(chatService.findRoomById("sdoku") == null) {        // live 시작
            chatService.createRoom("sdoku");
        }
        if(chatService.findRoomById("concave") == null) {        // live 시작
            chatService.createRoom("concave");
        }
        if(chatService.findRoomById("seotda") == null) {        // live 시작
            chatService.createRoom("seotda");
        }
        ChatRoom tetris = chatService.findRoomById("tetris");
        model.addAttribute("tetris",tetris);

        ChatRoom sdoku = chatService.findRoomById("sdoku");
        model.addAttribute("sdoku",sdoku);

        ChatRoom concave = chatService.findRoomById("concave");
        model.addAttribute("concave",concave);

        ChatRoom seotda = chatService.findRoomById("seotda");
        model.addAttribute("seotda",seotda);


        model.addAttribute("nickname",httpSession.getAttribute("nickname") == null ? "test" : httpSession.getAttribute("nickname"));
        return "game";
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
