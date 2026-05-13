package backend.service.Impl;

import backend.DTO.notifications.NotificationResponse;
import backend.Enum.NotificationType;
import backend.entity.Notification;
import backend.entity.User;
import backend.exception.BadRequestException;
import backend.exception.ResourceNotFoundException;
import backend.mapper.NotificationMapper;
import backend.repository.NotificationRepository;
import backend.repository.UserRepository;
import backend.security.AuthUser;
import backend.service.EmailService;
import backend.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;
    private final EmailService emailService;

    private User getCurrentUser() {
        Object principal = SecurityContextHolder.getContext()
                .getAuthentication()
                .getPrincipal();

        if (!(principal instanceof AuthUser authUser)) {
            throw new BadRequestException("User chưa đăng nhập");
        }

        return userRepository.findById(authUser.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User không tồn tại"));
    }

    // ===== CREATE =====
    @Override
    @Transactional
    public String createNotification(Long receiverId, String content, String redirectUrl,
                                     NotificationType type, boolean sendEmail) {

        User sender = getCurrentUser();

        User receiver = userRepository.findById(receiverId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy user nhận"));

        Notification notification = Notification.builder()
                .content(content)
                .isRead(false)
                .isDeleted(false)
                .createdAt(LocalDateTime.now())
                .redirectUrl(redirectUrl)
                .type(type)
                .user(receiver)
                .sender(sender)
                .build();

        notificationRepository.save(notification);

        if (sendEmail) {
            sendEmailAsync(receiver.getEmail(), content);
        }

        return "Gửi thông báo thành công";
    }

    @Async
    public void sendEmailAsync(String email, String content) {
        emailService.sendSimpleMail(email, "Thông báo hệ thống", content);
    }

    // ===== GET =====
    @Override
    public Page<NotificationResponse> getNotifications(Long userId, int page, int size) {

        User currentUser = getCurrentUser();

        if (!currentUser.getId().equals(userId)) {
            throw new BadRequestException("Không có quyền");
        }

        return notificationRepository
                .findByUserIdAndIsDeletedFalse(userId, PageRequest.of(page, size))
                .map(NotificationMapper::toDTO);
    }

    @Override
    public NotificationResponse getById(Long id) {

        User currentUser = getCurrentUser();

        Notification notification = notificationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy notification"));

        // check quyền
        if (!notification.getUser().getId().equals(currentUser.getId())) {
            throw new BadRequestException("Không có quyền");
        }

        return NotificationMapper.toDTO(notification);
    }

    @Override
    public Page<NotificationResponse> getUnreadNotifications(Long userId, int page, int size) {

        User currentUser = getCurrentUser();

        if (!currentUser.getId().equals(userId)) {
            throw new BadRequestException("Không có quyền");
        }

        return notificationRepository
                .findByUserIdAndIsReadFalseAndIsDeletedFalse(userId, PageRequest.of(page, size))
                .map(NotificationMapper::toDTO);
    }

    // ===== READ =====
    @Override
    @Transactional
    public String markAsRead(Long notificationId) {

        User currentUser = getCurrentUser();

        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy"));

        if (!notification.getUser().getId().equals(currentUser.getId())) {
            throw new BadRequestException("Không có quyền");
        }

        notification.setIsRead(true);
        notificationRepository.save(notification);

        return "Đã đọc";
    }

    @Override
    @Transactional
    public String markAllAsRead(Long userId) {

        User currentUser = getCurrentUser();

        if (!currentUser.getId().equals(userId)) {
            throw new BadRequestException("Không có quyền");
        }

        notificationRepository
                .findByUserIdAndIsDeletedFalse(userId, PageRequest.of(0, Integer.MAX_VALUE))
                .forEach(n -> n.setIsRead(true));

        return "Đã đọc tất cả";
    }

    // ===== COUNT =====
    @Override
    public long countUnread(Long userId) {

        User currentUser = getCurrentUser();

        if (!currentUser.getId().equals(userId)) {
            throw new BadRequestException("Không có quyền");
        }

        return notificationRepository.countByUserIdAndIsReadFalseAndIsDeletedFalse(userId);
    }

    // ===== DELETE =====
    @Override
    @Transactional
    public String deleteNotification(Long notificationId) {

        User currentUser = getCurrentUser();

        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy"));

        if (!notification.getUser().getId().equals(currentUser.getId())) {
            throw new BadRequestException("Không có quyền");
        }

        notification.setIsDeleted(true);
        notificationRepository.save(notification);

        return "Đã xoá";
    }
}