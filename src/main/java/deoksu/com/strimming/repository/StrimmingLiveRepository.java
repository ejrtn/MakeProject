package deoksu.com.strimming.repository;

import deoksu.com.strimming.model.StrimmingLive;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StrimmingLiveRepository extends JpaRepository<StrimmingLive,Long> {
}
