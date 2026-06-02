export const formatSalary = (salary?: number) => {
  if (!salary) return "Negotiable";

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(salary);
};