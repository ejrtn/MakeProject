package deoksu.com.strimming;

import deoksu.com.common.websocket.ChatRoom;
import deoksu.com.common.websocket.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
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

    @PostMapping("/onair_video")
    @ResponseBody
    public void onair_video(@RequestParam String url) throws IOException {
        System.out.println(url);
    }

//    @PostMapping("/onair_strimming")
//    @ResponseBody
//    public Object onair_strimming(@RequestParam Object object){
//        return
//    }
}
