package deoksu.com.afreecatv.repository;

import deoksu.com.afreecatv.model.StrimmingLive;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StrimmingLiveRepository extends JpaRepository<StrimmingLive,Long> {
}
