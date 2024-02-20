package deoksu.com.strimming.repository;

import deoksu.com.strimming.model.StrimmingChatting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StrimmingChattingRepository extends JpaRepository<StrimmingChatting,Long> {
}
