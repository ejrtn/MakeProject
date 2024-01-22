package deoksu.com.game;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class DuplicationCheckDto {

    private List<List<Integer>> result;
    private Long x;
    private Long y;
    private Long num;

    public DuplicationCheckDto(){
        result = new ArrayList<>();
    }
}
