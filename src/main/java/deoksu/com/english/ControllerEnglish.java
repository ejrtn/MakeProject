package deoksu.com.english;

import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.*;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.List;
import java.util.Map;

@Controller
public class ControllerEnglish {

    @Autowired
    private ServiceEnglish serviceEnglish;

    @GetMapping("english")
    public String English(){
        return "english";
    }

    @PostMapping("englishVideoFolderList")
    @ResponseBody
    public List<String> englishVideoFolderList(@RequestParam String path){
        return serviceEnglish.englishVideoFolderList(path);
    }

    @PostMapping("englishVideoFileList")
    @ResponseBody
    public List<String> englishVideoFileList(@RequestParam String path){
        return serviceEnglish.englishVideoFileList(path);
    }

    @PostMapping("RandomPicture")
    @ResponseBody
    public Map<String,String> RandomPicture(){
        return serviceEnglish.RandomPicture();
    }

    // 출처: https://luvstudy.tistory.com/172#article-1--파일-읽어-들이고-내보내기 [파란하늘의 지식창고:티스토리]
    @GetMapping(path = "/englishVideo/{path}", produces = MediaType.APPLICATION_OCTET_STREAM_VALUE)
    @ResponseBody
    public Resource englishVideo(@PathVariable String path) throws IOException {
        return new ByteArrayResource(FileCopyUtils.copyToByteArray(new FileInputStream("D:\\애니\\심슨\\"+path)));
    }

    @GetMapping(path = "/englishVideo/{path1}/{path2}", produces = MediaType.APPLICATION_OCTET_STREAM_VALUE)
    @ResponseBody
    public Resource englishVideo(@PathVariable String path1, @PathVariable String path2) throws IOException {
        return new ByteArrayResource(FileCopyUtils.copyToByteArray(new FileInputStream("D:\\애니\\심슨\\"+path1+"\\"+path2)));
    }

    @GetMapping(path = "/englishSubtitle/{path1}/{path2}", produces = MediaType.APPLICATION_OCTET_STREAM_VALUE)
    @ResponseBody
    public Resource englishSubtitle(@PathVariable String path1, @PathVariable String path2) throws IOException {
        return new ByteArrayResource(FileCopyUtils.copyToByteArray(new FileInputStream("D:\\애니\\심슨\\"+path1+"\\subtitles\\"+path2.replace(".mkv",".vtt"))));
    }
}
