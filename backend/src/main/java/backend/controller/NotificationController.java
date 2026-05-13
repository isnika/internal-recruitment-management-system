package backend.controller;

import backend.DTO.notifications.NotificationRequest;
import backend.DTO.notifications.NotificationResponse;
import backend.DTO.ApiResponse;
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

    // ================= SEND =================
    @PostMapping("/send")
    public ResponseEntity<ApiResponse<String>> sendNotification(
            @RequestBody NotificationRequest request
    ) {
        return ResponseEntity.ok(
                ApiResponse.<String>builder()
                        .status(200)
                        .message("Gửi thông báo thành công")
                        .data(notificationService.createNotification(
                                request.getUserId(),
                                request.getContent(),
                                request.getRedirectUrl(),
                                request.getType(),
                                request.isSendEmail()
                        ))
                        .build()
        );
    }

    // ================= GET ALL =================
    @GetMapping
    public ResponseEntity<ApiResponse<List<NotificationResponse>>> getMyNotifications() {

        Long userId = getCurrentUserId();

        return ResponseEntity.ok(
                ApiResponse.<List<NotificationResponse>>builder()
                        .status(200)
                        .message("Lấy danh sách thông báo thành công")
                        .data(notificationService
                                .getNotifications(userId, 0, 10)
                                .getContent())
                        .build()
        );
    }

    // ================= UNREAD =================
    @GetMapping("/unread")
    public ResponseEntity<ApiResponse<List<NotificationResponse>>> getUnread() {

        Long userId = getCurrentUserId();

        return ResponseEntity.ok(
                ApiResponse.<List<NotificationResponse>>builder()
                        .status(200)
                        .message("Lấy danh sách thông báo chưa đọc thành công")
                        .data(notificationService
                                .getUnreadNotifications(userId, 0, 10)
                                .getContent())
                        .build()
        );
    }

    // ================= COUNT UNREAD =================
    @GetMapping("/unread/count")
    public ResponseEntity<ApiResponse<Long>> countUnread() {

        Long userId = getCurrentUserId();

        return ResponseEntity.ok(
                ApiResponse.<Long>builder()
                        .status(200)
                        .message("Đếm thông báo chưa đọc thành công")
                        .data(notificationService.countUnread(userId))
                        .build()
        );
    }

    // ================= GET BY ID =================
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<NotificationResponse>> getById(@PathVariable Long id) {

        return ResponseEntity.ok(
                ApiResponse.<NotificationResponse>builder()
                        .status(200)
                        .message("Lấy thông báo thành công")
                        .data(notificationService.getById(id))
                        .build()
        );
    }

    // ================= MARK READ =================
    @PutMapping("/{id}/read")
    public ResponseEntity<ApiResponse<String>> markAsRead(@PathVariable Long id) {

        return ResponseEntity.ok(
                ApiResponse.<String>builder()
                        .status(200)
                        .message("Đánh dấu đã đọc thành công")
                        .data(notificationService.markAsRead(id))
                        .build()
        );
    }

    // ================= MARK ALL =================
    @PutMapping("/read-all")
    public ResponseEntity<ApiResponse<String>> markAllAsRead() {

        Long userId = getCurrentUserId();

        return ResponseEntity.ok(
                ApiResponse.<String>builder()
                        .status(200)
                        .message("Đánh dấu tất cả đã đọc thành công")
                        .data(notificationService.markAllAsRead(userId))
                        .build()
        );
    }

    // ================= DELETE =================
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<String>> delete(@PathVariable Long id) {

        return ResponseEntity.ok(
                ApiResponse.<String>builder()
                        .status(200)
                        .message("Xoá thông báo thành công")
                        .data(notificationService.deleteNotification(id))
                        .build()
        );
    }

    // ================= helper =================
    private Long getCurrentUserId() {
        Object principal = SecurityContextHolder.getContext()
                .getAuthentication()
                .getPrincipal();

        if (principal instanceof AuthUser authUser) {
            return authUser.getId();
        }

        throw new RuntimeException("Chưa đăng nhập");
    }
}