package deoksu.com.english;



import org.apache.commons.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.util.FileCopyUtils;

import java.io.*;
import java.util.*;

@Service
public class ServiceEnglish {

    @Value("#{properties['english.picture.path']}")
    private String englishPicturePath;

    @Value("#{properties['english.video.path']}")
    private String englishVideoPath;

    public Map<String,String> RandomPicture() {
        Random random = new Random();
        File file = new File(englishPicturePath);

        String[] filenames = file.list();


        String fileString = new String();
        FileInputStream inputStream = null;
        ByteArrayOutputStream byteOutStream = new ByteArrayOutputStream();
        int ran = random.nextInt(filenames.length);
        try {
            inputStream = new FileInputStream(file = new File(englishPicturePath + filenames[ran]));
            int len = 0;
            byte[] buf = new byte[1024];
            while ((len = inputStream.read(buf)) != -1) {
                byteOutStream.write(buf, 0, len);
            }
            byte[] fileArray = byteOutStream.toByteArray();
            fileString = new String(Base64.encodeBase64(fileArray));
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                if(inputStream != null)inputStream.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
            try {
                if(byteOutStream != null) byteOutStream.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        Map<String,String> result = new HashMap<>();
        result.put("fileName",filenames[ran].split("\\.")[0]);
        result.put("url","data:img/jpg;base64,"+fileString);
        return result;
    }

    public Resource video(String fileName) throws FileNotFoundException, IOException {
        return new ByteArrayResource(FileCopyUtils.copyToByteArray(new FileInputStream(englishVideoPath+fileName)));
    }

    public List<String> englishVideoFolderList(String path){
        List<String> folderList = new ArrayList<>();
        File dir =  new File(englishVideoPath);

        for(String filename : dir.list()) {
            folderList.add(filename);
        }
        Collections.sort(folderList);
        return folderList;
    }

    public List<String> englishVideoFileList(String path){
        List<String> fileList = new ArrayList<>();
        File dir =  new File(englishVideoPath+path+"/");

        for(String filename : dir.list()) {
            if(new File(englishVideoPath+path+"/"+filename).isFile()){
                fileList.add(filename);
            }
        }
        Collections.sort(fileList);
        return fileList;
    }


}
