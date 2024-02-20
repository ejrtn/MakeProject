package deoksu.com.common;

import lombok.Value;
import net.bramp.ffmpeg.FFmpeg;
import net.bramp.ffmpeg.FFprobe;
import org.springframework.beans.factory.config.PropertiesFactoryBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

@Configuration
public class PropertyConfig {



    @Bean
    public PropertiesFactoryBean properties() throws Exception{
        PropertiesFactoryBean propertyFactoryBean = new PropertiesFactoryBean();
        ClassPathResource classPathResource = new ClassPathResource("application.properties");

        propertyFactoryBean.setLocation(classPathResource);
        propertyFactoryBean.setFileEncoding(StandardCharsets.UTF_8.toString());

        return propertyFactoryBean;
    }

    @Bean(name = "ffMpeg")
    public FFmpeg ffMpeg() throws IOException {
        FFmpeg ffMPeg = null;

        String osName = System.getProperty("os.name");

        // 운영체제가 Window인 경우 jar에 내장되어있는 ffmpeg 를 이용
        if (osName.toLowerCase().contains("win")) {
//            ClassPathResource classPathResource = new ClassPathResource("D:\\ffmpeg-2024-02-15-git-a2cfd6062c-full_build\\ffmpeg-2024-02-15-git-a2cfd6062c-full_build\\bin\\ffmpeg.exe");
            ffMPeg = new FFmpeg("\"D:\\\\ffmpeg-2024-02-15-git-a2cfd6062c-full_build\\\\ffmpeg-2024-02-15-git-a2cfd6062c-full_build\\\\bin\\\\ffmpeg.exe\"");
        }

        return ffMPeg;
    }

    @Bean(name = "ffProbe")
    public FFprobe ffProbe() throws IOException {
        FFprobe ffprobe = null;

        String osName = System.getProperty("os.name");

        // 운영체제가 Window인 경우 jar에 내장되어있는 ffmpeg 를 이용
        if (osName.toLowerCase().contains("win")) {
//            ClassPathResource classPathResource = new ClassPathResource("D:\\ffmpeg-2024-02-15-git-a2cfd6062c-full_build\\ffmpeg-2024-02-15-git-a2cfd6062c-full_build\\bin\\ffprobe.exe");
            ffprobe = new FFprobe("D:\\ffmpeg-2024-02-15-git-a2cfd6062c-full_build\\ffmpeg-2024-02-15-git-a2cfd6062c-full_build\\bin\\ffprobe.exe");
        }

        return ffprobe;
    }
}
