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

    // ==================== GỬI THÔNG BÁO ====================
    @PostMapping("/send")
    public ResponseEntity<String> sendNotification(
            @RequestBody NotificationRequest request
    ) {
        String result = notificationService.createNotification(
                request.getUserId(),
                request.getContent(),
                request.getRedirectUrl(),
                request.getType(),
                request.isSendEmail()
        );

        return ResponseEntity.ok(result);
    }

    // ==================== LẤY NOTIFICATION ====================
    @GetMapping
    public ResponseEntity<List<NotificationResponse>> getMyNotifications() {

        Long userId = getCurrentUserId();

        List<NotificationResponse> notifications =
                notificationService.getNotifications(userId, 0, 10).getContent();
        return ResponseEntity.ok(notifications);
    }

    // ==================== UNREAD ====================
    @GetMapping("/unread")
    public ResponseEntity<List<NotificationResponse>> getUnreadNotifications() {

        Long userId = getCurrentUserId();

        List<NotificationResponse> notifications =
                notificationService.getUnreadNotifications(userId, 0, 10).getContent(); // 🔥 fix

        return ResponseEntity.ok(notifications);
    }

    // ==================== ĐÁNH DẤU 1 ====================
    @PutMapping("/{id}/read")
    public ResponseEntity<String> markAsRead(@PathVariable Long id) {
        return ResponseEntity.ok(notificationService.markAsRead(id));
    }

    // ==================== MARK ALL ====================
    @PutMapping("/read-all")
    public ResponseEntity<String> markAllAsRead() {
        Long userId = getCurrentUserId();
        return ResponseEntity.ok(notificationService.markAllAsRead(userId));
    }

    // ==================== ĐẾM UNREAD ====================
    @GetMapping("/unread/count")
    public ResponseEntity<Long> countUnread() {
        Long userId = getCurrentUserId();
        return ResponseEntity.ok(notificationService.countUnread(userId));
    }

    // ==================== XOÁ ====================
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteNotification(@PathVariable Long id) {
        return ResponseEntity.ok(notificationService.deleteNotification(id));
    }

    // ==================== CURRENT USER ====================
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

    @GetMapping("/{id}")
    public ResponseEntity<NotificationResponse> getById(@PathVariable Long id) {

        return ResponseEntity.ok(
                notificationService.getById(id)
        );
    }
}