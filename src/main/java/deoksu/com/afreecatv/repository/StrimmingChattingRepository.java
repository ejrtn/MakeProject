package deoksu.com.afreecatv.repository;

import deoksu.com.afreecatv.model.StrimmingChatting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StrimmingChattingRepository extends JpaRepository<StrimmingChatting,Long> {
}
