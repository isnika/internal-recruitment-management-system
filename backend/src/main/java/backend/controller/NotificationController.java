package backend.controller;

import backend.DTO.notifications.NotificationRequest;
import backend.DTO.notifications.NotificationResponse;
import backend.security.AuthUser;
import backend.service.NotificationService;
import lombok.RequiredArgsConstructor;
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
            @RequestBody NotificationRequest request
    ) {
        String result = notificationService.createNotification(
                request.getUserId(),
                request.getContent(),
                request.isSendEmail()
        );

        return ResponseEntity.ok(result);
    }

    // ==================== LẤY THÔNG BÁO CỦA CHÍNH MÌNH ====================
    @GetMapping
    public ResponseEntity<List<NotificationResponse>> getMyNotifications() {

        Long userId = getCurrentUserId();

        List<NotificationResponse> notifications =
                notificationService.getNotificationsByUserId(userId);

        return ResponseEntity.ok(notifications);
    }

    // ==================== LẤY THÔNG BÁO CHƯA ĐỌC ====================
    @GetMapping("/unread")
    public ResponseEntity<List<NotificationResponse>> getUnreadNotifications() {

        Long userId = getCurrentUserId();

        List<NotificationResponse> notifications =
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