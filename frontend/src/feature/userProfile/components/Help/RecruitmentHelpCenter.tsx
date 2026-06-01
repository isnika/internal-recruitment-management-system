import React, { useState } from 'react';
import styles from './RecruitmentHelpCenter.module.css';

import {
  FiSearch,
  FiFileText,
  FiUsers,
  FiCalendar,
  FiShield,
  FiAlertTriangle,
  FiPhone,
  FiMessageCircle
} from "react-icons/fi";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

interface CategoryItem {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const RecruitmentHelpCenter: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaqId, setOpenFaqId] = useState<number | null>(null);

  const categories: CategoryItem[] = [
    {
      id: 'post',
      icon: <FiFileText />,
      title: 'Quản lý tin tuyển dụng',
      description: 'Cách đăng tin, sửa tin và tối ưu hóa hiển thị để thu hút ứng viên.'
    },
    {
      id: 'resume',
      icon: <FiUsers />,
      title: 'Sàng lọc & Quản lý CV',
      description: 'Sử dụng bộ lọc thông minh, phân loại trạng thái và lưu trữ hồ sơ.'
    },
    {
      id: 'interview',
      icon: <FiCalendar />,
      title: 'Lịch trình phỏng vấn',
      description: 'Đặt lịch hẹn tự động, gửi email mời phỏng vấn hàng loạt.'
    },
    {
      id: 'account',
      icon: <FiShield />,
      title: 'Tài khoản & Bảo mật',
      description: 'Phân quyền nhân viên, quản lý gói dịch vụ và hóa đơn VAT.'
    },
  ];

  const faqs: FAQItem[] = [
    {
      id: 1,
      question: 'Làm sao để tin tuyển dụng của tôi có nhiều lượt ứng tuyển hơn?',
      answer: 'Bạn nên tối ưu hóa tiêu đề công việc rõ ràng, cung cấp chi tiết mức lương và nêu rõ quyền lợi. Sử dụng gói đẩy tin Hot cũng giúp tăng hiển thị.'
    },
    {
      id: 2,
      question: 'Hệ thống ATS hoạt động như thế nào?',
      answer: 'Hệ thống tự động phân loại CV theo kỹ năng và giúp bạn quản lý ứng viên theo từng giai đoạn.'
    },
    {
      id: 3,
      question: 'Có thể chia sẻ tài khoản không?',
      answer: 'Có. Bạn có thể thêm thành viên và phân quyền trong phần cài đặt tài khoản.'
    },
  ];

  const toggleFaq = (id: number) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={styles.helpCenterContainer}>

      {/* Banner */}
      <div className={styles.developingBanner}>
        <FiAlertTriangle className={styles.bannerIcon} />
        <p>Hệ thống đang được nâng cấp. Một số tính năng có thể tạm thời không khả dụng.</p>
      </div>

      {/* HERO */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <span className={styles.badge}>
            Trung tâm trợ giúp Nhà tuyển dụng
          </span>

          <h1 className={styles.heroTitle}>
            Chúng tôi có thể giúp gì cho Doanh nghiệp của bạn?
          </h1>

          <div className={styles.searchWrapper}>
            <FiSearch className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Nhập từ khóa tìm kiếm..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>
        </div>
      </section>

      {/* CATEGORY */}
      <section className={styles.sectionContainer}>
        <h2 className={styles.sectionTitle}>Danh mục quản trị cốt lõi</h2>

        <div className={styles.categoryGrid}>
          {categories.map(cat => (
            <div key={cat.id} className={styles.categoryCard}>
              <div className={styles.categoryIcon}>
                {cat.icon}
              </div>
              <h3>{cat.title}</h3>
              <p>{cat.description}</p>
              <a href={`#${cat.id}`}>Xem chi tiết →</a>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className={`${styles.sectionContainer} ${styles.faqBg}`}>
        <h2 className={styles.sectionTitle}>Câu hỏi thường gặp</h2>

        <div className={styles.faqList}>
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map(faq => (
              <div
                key={faq.id}
                className={`${styles.faqItem} ${openFaqId === faq.id ? styles.faqItemOpen : ''}`}
                onClick={() => toggleFaq(faq.id)}
              >
                <div className={styles.faqHeader}>
                  <span>{faq.question}</span>
                  <span className={styles.faqToggleIcon}>
                    {openFaqId === faq.id ? '−' : '+'}
                  </span>
                </div>

                <div className={styles.faqAnswerWrapper}>
                  <div className={styles.faqAnswerContent}>
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className={styles.noResult}>
              Không tìm thấy kết quả phù hợp.
            </p>
          )}
        </div>
      </section>

      {/* CONTACT */}
      <section className={styles.contactSection}>
        <div className={styles.contactCard}>
          <h3>Vẫn cần hỗ trợ?</h3>
          <p>Đội ngũ hỗ trợ luôn sẵn sàng 24/7.</p>

          <div className={styles.btnGroup}>
            <button className={styles.btnPrimary}>
              <FiPhone /> Hotline
            </button>

            <button className={styles.btnSecondary}>
              <FiMessageCircle /> Chat
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default RecruitmentHelpCenter;