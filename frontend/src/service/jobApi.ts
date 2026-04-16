import axios from "axios";

/**
 * Giúp TypeScript hiểu được cấu trúc dữ liệu của một Job
 */
export interface Job {
  id: string;
  title: string;
  category: string;
  skills: string[];
  salary: string;
  salaryMin: number;
  location: string;
  postedAt: string;
  isBookmarked: boolean;
  logo: string;
  jobType: string;
  experienceLevel: string;
  department: string;
}

/**
 * Interface cho dữ liệu bổ trợ (Metadata) 
 * Chứa các danh mục để hiển thị lên các bộ lọc (Sidebar, Scrollbar)
 */
export interface HomeMetadata {
  categories: string[];
  jobTypes: string[];
  experienceLevels: string[];
  departments: string[];
  salaryRanges: string[];
  skillTags: string[];
}

/**
 * Cấu trúc dữ liệu trả về khi lấy danh sách Job (bao gồm phân trang)
 */
export interface FetchJobsResponse {
  jobs: Job[];
  total: number;
  totalPages: number;
  currentPage: number;
}

/**
 * Cấu trúc các bộ lọc mà người dùng đang chọn
 */
export interface JobFilters {
  jobTypes: string[];
  experienceLevels: string[];
  departments: string[];
  salaryRanges: string[];
  skillTags: string[];
}

// Địa chỉ của Backend (JSON Server)
const API_URL = "http://localhost:5000";

/**
 * Hàm lấy toàn bộ các danh sách lọc (Metadata) từ server
 */
export const fetchMetadataApi = async (): Promise<HomeMetadata> => {
  try {
    // Chúng ta gửi nhiều yêu cầu cùng lúc để tiết kiệm thời gian
    const [catRes, typeRes, expRes, deptRes, salRes, skillRes] = await Promise.all([
      axios.get(`${API_URL}/categories`),
      axios.get(`${API_URL}/jobTypes`),
      axios.get(`${API_URL}/experienceLevels`),
      axios.get(`${API_URL}/departments`),
      axios.get(`${API_URL}/salaryRanges`),
      axios.get(`${API_URL}/skillTags`)
    ]);

    // Vì JSON Server yêu cầu dạng object {id: "..."} nên chúng ta map lại thành chuỗi đơn giản
    return {
      categories: catRes.data.map((item: any) => item.id),
      jobTypes: typeRes.data.map((item: any) => item.id),
      experienceLevels: expRes.data.map((item: any) => item.id),
      departments: deptRes.data.map((item: any) => item.id),
      salaryRanges: salRes.data.map((item: any) => item.id),
      skillTags: skillRes.data.map((item: any) => item.id)
    };
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu metadata:", error);
    throw error;
  }
};

/**
 * Hàm hỗ trợ kiểm tra xem mức lương có khớp với khoảng lọc không
 */
const checkSalaryInRange = (range: string, salaryValue: number): boolean => {
  if (range === "Under 10M VND") return salaryValue < 10;
  if (range === "10M - 20M VND") return salaryValue >= 10 && salaryValue < 20;
  if (range === "20M - 30M VND") return salaryValue >= 20 && salaryValue < 30;
  if (range === "> 30M VND") return salaryValue >= 30;
  return true; // "Negotiable" hoặc mặc định
};

/**
 * Hàm chính: Lấy danh sách Job dựa trên Category, Trang và các Bộ lọc
 */
export const fetchJobsApi = async (
  category: string,
  page: number,
  limit: number,
  filters?: JobFilters
): Promise<FetchJobsResponse> => {
  try {
    // 1. Lấy toàn bộ danh sách Job từ Server về máy client để lọc
    const response = await axios.get(`${API_URL}/jobs`);
    let result: Job[] = response.data;

    // 2. Lọc theo Danh mục (Category)
    if (category !== "View All") {
      result = result.filter(job => job.category === category);
    }

    // 3. Nếu có dùng bộ lọc Sidebar thì tiến hành lọc tiếp
    if (filters) {
      // Lọc theo Loại công việc
      if (filters.jobTypes.length > 0) {
        result = result.filter(job => filters.jobTypes.includes(job.jobType));
      }

      // Lọc theo Kinh nghiệm
      if (filters.experienceLevels.length > 0) {
        result = result.filter(job => filters.experienceLevels.includes(job.experienceLevel));
      }

      // Lọc theo Phòng ban
      if (filters.departments.length > 0) {
        result = result.filter(job => filters.departments.includes(job.department));
      }

      // Lọc theo Mức lương
      if (filters.salaryRanges.length > 0) {
        result = result.filter(job =>
          filters.salaryRanges.some(range => checkSalaryInRange(range, job.salaryMin))
        );
      }

      // Lọc theo Kỹ năng (Skill Tags) - Kiểm tra xem job có chứa ít nhất 1 kỹ năng đang lọc không
      if (filters.skillTags.length > 0) {
        result = result.filter(job =>
          job.skills.some(skill =>
            filters.skillTags.some(tag => skill.toLowerCase().includes(tag.toLowerCase()))
          )
        );
      }
    }

    // 4. Xử lý Phân trang (Pagination)
    const totalCount = result.length;
    const totalPages = Math.ceil(totalCount / limit);

    // Đảm bảo trang hiện tại không vượt quá tổng số trang
    const safePage = page > totalPages && totalPages > 0 ? totalPages : page;

    // Cắt mảng để lấy đúng số Job của trang hiện tại
    const start = (safePage - 1) * limit;
    const paginatedData = result.slice(start, start + limit);

    return {
      jobs: paginatedData,
      total: totalCount,
      totalPages: totalPages,
      currentPage: safePage,
    };
  } catch (error) {
    console.error("Lỗi khi lấy danh sách jobs:", error);
    throw error;
  }
};
