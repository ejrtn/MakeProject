package deoksu.com.game;

import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Getter
public class DuplicationCheckDto {

    private List<List<Integer>> result;
    private int x;
    private int y;
    private int num;

    public DuplicationCheckDto(){
        result = new ArrayList<>();
    }
}
