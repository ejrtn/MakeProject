package deoksu.com.afreecatv.repository;

import deoksu.com.afreecatv.model.StrimmingChattingStop;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StrimmingChattingStoptRepository extends JpaRepository<StrimmingChattingStop,Long> {
}
