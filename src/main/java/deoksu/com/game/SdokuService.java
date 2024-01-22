package deoksu.com.game;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Service
public class SdokuService {

    public List sdokuStart(int empty){
        int line = 0;
        List<List<Integer>> result = defaultResult();
        Random random = new Random();

        while(true){
            int ch = 1;
            for(int a=0;a<9;a++){
                List<Integer> list = new ArrayList<>();
                for(int num=1;num<=9;num++){
                    if (duplicationCheck(result, a, line, num)) {
                        list.add(num);
                    }
                }

                if(list.size()>0){
                    int ran = random.nextInt(list.size());
                    int num = list.get(ran);
                    result.get(line).set(a,num);
                    list.remove(ran);

                }else{
                    ch = 0;
                    break;
                }
            }
            if(ch == 1) {
                line += 1;
                if (line >= 9) {
                    break;
                }
            }else{
                line = 0;
                result = defaultResult();
            }
        }

        List<Integer> rans = new ArrayList<>();
        for(int n=0;n<empty;n++) {
            int ran = random.nextInt(81);
            int ch = 1;
            for (int i = 0; i < rans.size(); i++) {
                if (rans.get(i) == ran) {
                    ch = 0;
                    break;
                }
            }
            if (ch == 1) {
                result.get(ran / 9).set(ran % 9, 0);
            }else {
                rans.add(ran);
            }
        }

        return result;
    }

    /**
     * 중복 확인
     * @param result 전체 데이터
     * @param x x축 인덱스
     * @param y y축 인덱스
     * @param num 값
     * @return
     */
    public boolean duplicationCheck(List<List<Integer>> result, int x, int y, int num){
        int x_max = x <= 2 ? 2 : (x <= 5 ? 5 : 8);
        int y_max = y <= 2 ? 2 : (y <= 5 ? 5 : 8);

        // 가로
        for(int a=0;a<9;a++){
            if(x!=a){
                if(result.get(y).get(a) == num){
                    return false;
                }
            }
        }

        // 네모
        for(int a=x_max-2;a<=x_max;a++){
            for(int b=y_max-2;b<=y_max;b++){
                if(x != a || y != b){
                    if(result.get(b).get(a) == num){
                        return false;
                    }
                }
            }
        }

        // 세로
        for(int b=0;b<9;b++){
            if(y != b){
                if(result.get(b).get(x) == num){
                    return false;
                }
            }
        }

        return true;
    }


    /**
     * 전체 데이터 생성(기본 0)
     * @return
     */
    public List<List<Integer>> defaultResult(){
        List<List<Integer>> result = new ArrayList<>();
        List<Integer> r = null;
        for(int a=0;a<9;a++){
            r = new ArrayList<>();
            for(int b=0;b<9;b++){
                r.add(0);
            }
            result.add(r);
        }

        return result;
    }
}
