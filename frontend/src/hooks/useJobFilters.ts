export const useJobFilters = () => {
  const [filters, setFilters] = useState({
    keywords: "",
    minSalary: undefined,
    maxSalary: undefined,
    skillIds: [] as number[],
    location: "",
    categoryId: undefined,
    jobType: "",
    status: "" as "" | "DRAFT" | "ACTIVE" | "PAUSED" | "CLOSED",
  });

  const updateFilter = (key: string, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const resetFilters = () => {
    setFilters({
      keywords: "",
      minSalary: undefined,
      maxSalary: undefined,
      skillIds: [],
      location: "",
      categoryId: undefined,
      jobType: "",
      status: "",
    });
  };

  return { filters, updateFilter, resetFilters };
};