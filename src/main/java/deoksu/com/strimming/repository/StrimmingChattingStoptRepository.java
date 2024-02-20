package deoksu.com.strimming.repository;

import deoksu.com.strimming.model.StrimmingChattingStop;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StrimmingChattingStoptRepository extends JpaRepository<StrimmingChattingStop,Long> {
}
