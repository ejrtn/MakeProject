package deoksu.com.afreecatv.repository;

import deoksu.com.afreecatv.model.StrimmingBlackList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StrimmingBlackListRepository extends JpaRepository<StrimmingBlackList,Long> {
}
