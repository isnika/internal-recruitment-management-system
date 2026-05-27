import React, { useState, useEffect, KeyboardEvent } from "react";
import styles from "./CreateJobModal.module.css";
import Modal from "../../../shared/componnets/Modal/Modal";

import { jobApi } from "../../../../../service/jobApi";
import type { HomeMetadata, Job } from "../../../../../types/job";

import GeneralInfoTab from "./tabs/GeneralInfoTab";
import DescriptionTab from "./tabs/DescriptionTab";
import RequirementsTab from "./tabs/RequirementsTab";
import BenefitsTab from "./tabs/BenefitsTab";
import StatusTab from "./tabs/StatusTab";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (job: Job) => void;
  initialData?: Job | null;
}

const TABS = [
  "General Information",
  "Description",
  "Requirements",
  "Benefits",
  "Status",
];

const DEFAULT_FORM = {
  title: "",
  location: "",
  type: "",
  salaryMin: "",
  salaryMax: "",
  categoryId: "",
  experienceLevelId: "",
  skillIds: [] as number[],
  companyId: "",

  deadline: "",

  description: "",
  requirements: "",
  benefits: "",

  status: "DRAFT",
};

const CreateJobModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) => {
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const [formData, setFormData] = useState({ ...DEFAULT_FORM });

  const [metadata, setMetadata] = useState<HomeMetadata | null>(null);

  useEffect(() => {
    if (isOpen && initialData) {
      setFormData({
        title: initialData.title || "",
        location: initialData.location || "",
        type: initialData.type || "",
        salaryMin: String(initialData.salaryMin || ""),
        salaryMax: String(initialData.salaryMax || ""),
        categoryId: String(initialData.category?.id || ""),
        experienceLevelId: String(initialData.experienceLevel?.id || ""),
        skillIds: initialData.skills?.map((s) => s.id) || [],
        companyId: String(initialData.company?.id || ""),
        deadline: initialData.deadline || "",
        description: initialData.description || "",
        requirements: initialData.requirements || "",
        benefits: initialData.benefits || "",
        status: initialData.status || "DRAFT",
      });
    } else if (isOpen) {
      setFormData({ ...DEFAULT_FORM });
    }
  }, [isOpen, initialData]);

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const target = e.target as HTMLTextAreaElement;

      const value =
        target.value.substring(0, target.selectionStart) +
        "\n- " +
        target.value.substring(target.selectionEnd);

      handleChange(target.name, value);
    }
  };

  const isValid =
    formData.title &&
    formData.location &&
    formData.type &&
    formData.salaryMin &&
    formData.salaryMax &&
    formData.categoryId &&
    formData.experienceLevelId &&
    formData.companyId &&
    formData.deadline;

  const handleSubmit = async () => {
    if (!isValid) return;

    const payload = {
      title: formData.title,
      location: formData.location,
      type: formData.type,

      salaryMin: Number(formData.salaryMin),
      salaryMax: Number(formData.salaryMax),

      categoryId: Number(formData.categoryId),
      experienceLevelId: Number(formData.experienceLevelId),
      companyId: Number(formData.companyId),

      skillIds: formData.skillIds,

      deadline: formData.deadline,

      description: formData.description.split("\n").filter(Boolean),
      requirements: formData.requirements.split("\n").filter(Boolean),
      benefits: formData.benefits.split("\n").filter(Boolean),

      status: formData.status,
    };

    try {
      const res = await jobApi.create(payload);
      onSubmit(res);
      onClose();
    } catch (err) {
      console.error("Create job failed:", err);
    }
  };

  const renderTab = () => {
    switch (activeTab) {
      case "General Information":
        return (
          <GeneralInfoTab
            formData={formData}
            handleChange={handleChange}
            metadata={metadata}
          />
        );

      case "Description":
        return (
          <DescriptionTab
            formData={formData}
            handleChange={handleChange}
            handleKeyDown={handleKeyDown}
          />
        );

      case "Requirements":
        return (
          <RequirementsTab
            formData={formData}
            handleChange={handleChange}
            handleKeyDown={handleKeyDown}
          />
        );

      case "Benefits":
        return (
          <BenefitsTab
            formData={formData}
            handleChange={handleChange}
            handleKeyDown={handleKeyDown}
          />
        );

      case "Status":
        return (
          <StatusTab formData={formData} handleChange={handleChange} />
        );
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2>{initialData ? "Edit Job" : "Create Job"}</h2>

      <div className={styles.tabs}>
        {TABS.map((tab) => (
          <div
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={activeTab === tab ? styles.activeTab : styles.tab}
          >
            {tab}
          </div>
        ))}
      </div>

      <div className={styles.tabContent}>{renderTab()}</div>

      <div className={styles.footer}>
        <button onClick={onClose}>Cancel</button>

        <button disabled={!isValid} onClick={handleSubmit}>
          {initialData ? "Update" : "Create"}
        </button>
      </div>
    </Modal>
  );
};

export default CreateJobModal;