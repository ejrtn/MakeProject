package deoksu.com.afreecatv;

import deoksu.com.common.websocket.ChatRoom;
import deoksu.com.common.websocket.ChatService;
import jakarta.annotation.Resource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.*;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.List;

@Controller
public class StrimmingController {

    @Autowired
    private ChatService chatService;

    @Autowired
    private StrimmingService strimmingService;

    @GetMapping("strimming")
    public String strimming(Model model){
        List<ChatRoom> roomList = chatService.findAllRoom();
        model.addAttribute("roomList",roomList);
        return "strimming";
    }

    @PostMapping("asd")
    public void asd(@RequestParam Object object){
    }

    @GetMapping("onair/{nickname}/live")
    public String strimmingLive(Model model, @PathVariable String nickname){
        if(chatService.findRoomById(nickname) == null) {        // live 시작
            chatService.createRoom(nickname);
            model.addAttribute("live",true);
        }else{          // 방송중인곳 참여
            model.addAttribute("live",false);
        }
        ChatRoom room = chatService.findRoomById(nickname);
        model.addAttribute("room",room);
        model.addAttribute("nickname",nickname);
        return "onair";
    }

    @GetMapping("onair/{userId}/video")
    public String strimmingVideo(Model model, @PathVariable String nickname){
        model.addAttribute("nickname",nickname);
        return "onair";
    }



}
