package deoksu.com.afreecatv.repository;

import deoksu.com.afreecatv.model.StrimmingVideo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StrimmingVideoRepository extends JpaRepository<StrimmingVideo,Long> {
}
