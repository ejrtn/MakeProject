package deoksu.com.strimming.repository;

import deoksu.com.strimming.model.StrimmingBlackList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StrimmingBlackListRepository extends JpaRepository<StrimmingBlackList,Long> {
}
