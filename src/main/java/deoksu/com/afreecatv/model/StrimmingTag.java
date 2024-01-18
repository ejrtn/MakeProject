package deoksu.com.afreecatv.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class StrimmingTag {

    @Id
    private String tag;

}
