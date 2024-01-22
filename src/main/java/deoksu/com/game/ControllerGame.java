package deoksu.com.game;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
public class ControllerGame {

    @Autowired
    private SdokuService sdokuService;

    @GetMapping("game")
    public String game(){
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
