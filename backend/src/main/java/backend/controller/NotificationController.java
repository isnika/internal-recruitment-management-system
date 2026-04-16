package backend.controller;

import backend.entity.Notification;
import backend.security.AuthUser;
import backend.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;

    // ==================== RECRUITER GỬI THÔNG BÁO ====================
    @PostMapping("/send")
    public ResponseEntity<String> sendNotification(
            @RequestParam Long userId,
            @RequestParam String content,
            @RequestParam(defaultValue = "false") boolean sendEmail
    ) {

        String result = notificationService.createNotification(userId, content, sendEmail);

        return ResponseEntity.ok(result);
    }

    // ==================== LẤY THÔNG BÁO CỦA CHÍNH MÌNH ====================
    @GetMapping
    public ResponseEntity<List<Notification>> getMyNotifications() {

        Long userId = getCurrentUserId();

        List<Notification> notifications =
                notificationService.getNotificationsByUserId(userId);

        return ResponseEntity.ok(notifications);
    }

    // ==================== LẤY THÔNG BÁO CHƯA ĐỌC ====================
    @GetMapping("/unread")
    public ResponseEntity<List<Notification>> getUnreadNotifications() {

        Long userId = getCurrentUserId();

        List<Notification> notifications =
                notificationService.getUnreadNotifications(userId);

        return ResponseEntity.ok(notifications);
    }

    // ==================== ĐÁNH DẤU ĐÃ ĐỌC ====================
    @PutMapping("/{id}/read")
    public ResponseEntity<String> markAsRead(@PathVariable Long id) {

        String result = notificationService.markAsRead(id);

        return ResponseEntity.ok(result);
    }

    private Long getCurrentUserId() {

        Object principal = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();

        if (principal instanceof AuthUser authUser) {
            return authUser.getId();
        }

        throw new RuntimeException("Chưa đăng nhập");
    }
}