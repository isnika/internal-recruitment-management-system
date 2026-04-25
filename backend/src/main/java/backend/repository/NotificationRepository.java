package backend.repository;

import backend.entity.Notification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationRepository extends JpaRepository<Notification, Long> {

  Page<Notification> findByUserIdAndIsDeletedFalse(Long userId, Pageable pageable);

  Page<Notification> findByUserIdAndIsReadFalseAndIsDeletedFalse(Long userId, Pageable pageable);

  long countByUserIdAndIsReadFalseAndIsDeletedFalse(Long userId);
}