package deoksu.com.strimming;
import lombok.RequiredArgsConstructor;
import net.bramp.ffmpeg.FFmpeg;
import net.bramp.ffmpeg.FFprobe;
import net.bramp.ffmpeg.builder.FFmpegBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.FilenameFilter;

@Service
@RequiredArgsConstructor
public class StrimmingService {

    @Value("#{properties['english.video.path']}")
    private String englishVideoPath;

    private final FFmpeg ffmpeg;
    private final FFprobe ffprobe;


    // 이미지 파일 생성
    public void createThumbnail(){

        try {


            // ffmpeg cli 명령어 생성
            FFmpegBuilder builder = new FFmpegBuilder()
                    .setInput("D:/애니/심슨/S05_Season_05/The.Simpsons.S05E01.Homer's.Barbershop.Quartet.480p.DVD.x265.10bit.AAC.5.1-ImE[UTR].mkv")
                    .overrideOutputFiles(true)
                    .addOutput("D:/애니/심슨/S05_Season_05/The.Simpsons.S05E01.Homer's.Barbershop.Quartet.480p.DVD.x265.10bit.AAC.5.1-ImE[UTR].png")
                    .addExtraArgs("-ss","00:10:00")
                    .setFormat("image2")
                    .setFrames(1)
                    .setVideoFrameRate(1)
                    .done();

            // 명령어 실행
            ffmpeg.run(builder);
        } catch (Exception e) {
            // 썸네일 추출 실패시 기본 이미지 썸네일로 사용

        }

    }

    public void ffmpeg(){

        try {
            // ffmpeg 명령어 생성
            FFmpegBuilder builder = new FFmpegBuilder()
                .setInput("D:/애니/심슨/S05_Season_05/The.Simpsons.S05E01.Homer's.Barbershop.Quartet.480p.DVD.x265.10bit.AAC.5.1-ImE[UTR].mkv")
                .addExtraArgs("-y")
                .addOutput("D:/애니/심슨/S05_Season_05/%v/playlist.m3u8") // 출력 위치
                .setFormat("hls")
                .addExtraArgs("-hls_time", "10") // chunk 시간
                .addExtraArgs("-hls_list_size", "0")
                .addExtraArgs("-hls_segment_filename", "D:/애니/심슨/S05_Season_05/%v/output_%03d.ts") // ts 파일 이름 (ex: output_000.ts)
                .addExtraArgs("-master_pl_name", "master.m3u8") // 마스터 재생 파일
                .addExtraArgs("-map", "0:v")
                .addExtraArgs("-map", "0:v")
                .addExtraArgs("-map", "0:v")
                .addExtraArgs("-var_stream_map", "v:0,name:1080 v:1,name:720 v:2,name:480") // 출력 매핑

                // 1080 화질 옵션
                .addExtraArgs("-b:v:0", "5000k")
                .addExtraArgs("-maxrate:v:0", "5000k")
                .addExtraArgs("-bufsize:v:0", "10000k")
                .addExtraArgs("-s:v:0", "1920x1080")
                .addExtraArgs("-crf:v:0", "15")
                .addExtraArgs("-b:a:0", "128k")

                // 720 화질 옵션
                .addExtraArgs("-b:v:1", "2500k")
                .addExtraArgs("-maxrate:v:1", "2500k")
                .addExtraArgs("-bufsize:v:1", "5000k")
                .addExtraArgs("-s:v:1", "1280x720")
                .addExtraArgs("-crf:v:1", "22")
                .addExtraArgs("-b:a:1", "96k")

                // 480 화질 옵션
                .addExtraArgs("-b:v:2", "1000k")
                .addExtraArgs("-maxrate:v:2", "1000k")
                .addExtraArgs("-bufsize:v:2", "2000k")
                .addExtraArgs("-s:v:2", "854x480")
                .addExtraArgs("-crf:v:2", "28")
                .addExtraArgs("-b:a:2", "64k")
                .done();

            ffmpeg.run(builder);
        } catch (Exception e) {
            // 썸네일 추출 실패시 기본 이미지 썸네일로 사용

        }
    }

    public void ffmpeg_mix(int c){
        try {

            if(c==0) {
                FFmpegBuilder builder  = null;
                String path = "C:/Users/Yu/Desktop/onair_video/ffmpeg_mix.txt";

                File file = new File("C:/Users/Yu/Desktop/onair_video/ffmpeg_mix.txt");
                if (!file.exists()) {
                    file.createNewFile();
                }

                // 3. Buffer를 사용해서 File에 write할 수 있는 BufferedWriter 생성
                FileWriter fw = new FileWriter(file);
                BufferedWriter writer = new BufferedWriter(fw);

                File dir = new File("C:/Users/Yu/Desktop/onair_video");
                FilenameFilter filter = new FilenameFilter() {
                    public boolean accept(File f, String name) {
                        return name.startsWith("file");
                    }
                };

                String[] files = dir.list(filter);
                for (int i = 0; i < files.length; i++) {
                    writer.write("file "+files[i]+"\n");
                }



                writer.close();

                builder = new FFmpegBuilder()
                        .addInput(path)
                        .addExtraArgs("-f", "concat")
                        .addExtraArgs("-safe", "0")
                        .addOutput("C:/Users/Yu/Desktop/onair_video/old_filename.avi")
                        .addExtraArgs("-b:v:0", "5000k")
                        .addExtraArgs("-maxrate:v:0", "5000k")
                        .addExtraArgs("-bufsize:v:0", "10000k")
                        .addExtraArgs("-s:v:0", "1920x1080")
                        .addExtraArgs("-crf:v:0", "15")
                        .addExtraArgs("-b:a:0", "128k")
                        .done();
                ffmpeg.run(builder);
            }


        } catch (Exception e) {
            // 썸네일 추출 실패시 기본 이미지 썸네일로 사용

        }
    }
}
