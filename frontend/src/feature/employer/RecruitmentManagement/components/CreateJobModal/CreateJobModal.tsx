import React, { useState, useEffect, KeyboardEvent } from "react";
import styles from "./CreateJobModal.module.css";
import Modal from "../../../shared/componnets/Modal/Modal";
import { fetchMetadataApi } from "../../../../../service/jobApi";
import type { HomeMetadata, Job } from "../../../../../types/job";

// Import Tabs
import GeneralInfoTab from "./tabs/GeneralInfoTab";
import DescriptionTab from "./tabs/DescriptionTab";
import RequirementsTab from "./tabs/RequirementsTab";
import BenefitsTab from "./tabs/BenefitsTab";
import StatusTab from "./tabs/StatusTab";

interface CreateJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (job: Partial<Job>) => void;
  initialData?: Job | null;
}

const TABS = [
  "General Information",
  "Description",
  "Requirements",
  "Benefits & Company Work",
  "Status",
];

const DEFAULT_FORM = {
  title: "",
  department: "",
  jobType: "",
  experienceLevel: "",
  salaryRange: "",
  skills: [] as string[],
  vacancies: "",
  location: "",
  applicationDeadline: "",
  description: "",
  requirements: "",
  benefits: "",
  companyName: "",
  companyAddress: "",
  workingHours: "",
  status: "Posted",
};

const CreateJobModal: React.FC<CreateJobModalProps> = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const [metadata, setMetadata] = useState<HomeMetadata | null>(null);

  // Form State
  const [formData, setFormData] = useState({ ...DEFAULT_FORM });

  // Pre-fill form when editing, reset when creating
  useEffect(() => {
    if (isOpen && initialData) {
      setFormData({
        title: initialData.title || "",
        department: initialData.department || initialData.category || "",
        jobType: initialData.jobType || "",
        experienceLevel: initialData.experienceLevel || "",
        salaryRange: "",
        skills: initialData.skills || [],
        vacancies: "",
        location: initialData.location || "",
        applicationDeadline: initialData.deadline || "",
        description: Array.isArray(initialData.description) ? initialData.description.map(line => line.startsWith("- ") ? line : `- ${line}`).join("\n") : (initialData.description || ""),
        requirements: Array.isArray(initialData.requirements) ? initialData.requirements.map(line => line.startsWith("- ") ? line : `- ${line}`).join("\n") : (initialData.requirements || ""),
        benefits: Array.isArray(initialData.benefits) ? initialData.benefits.map(line => line.startsWith("- ") ? line : `- ${line}`).join("\n") : (initialData.benefits || ""),
        companyName: initialData.company?.name || "",
        companyAddress: initialData.company?.address || "",
        workingHours: initialData.workingHours || "",
        status: "Posted",
      });
      setActiveTab(TABS[0]);
    } else if (isOpen && !initialData) {
      setFormData({ ...DEFAULT_FORM });
      setActiveTab(TABS[0]);
    }
  }, [isOpen, initialData]);

  const [isSkillsDropdownOpen, setIsSkillsDropdownOpen] = useState(false);

  useEffect(() => {
    const loadMetadata = async () => {
      try {
        const data = await fetchMetadataApi();
        setMetadata(data);
      } catch (err) {
        console.error("Failed to load metadata", err);
      }
    };
    loadMetadata();
  }, []);

  const bulletFields = ["description", "requirements", "benefits"];

  const handleChange = (field: string, value: any) => {
    if (bulletFields.includes(field) && typeof value === "string") {
      const prevValue = formData[field as keyof typeof formData] as string;
      // Auto-add "- " only when going from empty to first keystroke
      if (prevValue === "" && value.length === 1) {
        value = `- ${value}`;
      }
    }
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const target = e.target as HTMLTextAreaElement;
      const start = target.selectionStart;
      const end = target.selectionEnd;
      const value = target.value;

      const newValue = value.substring(0, start) + "\n- " + value.substring(end);

      handleChange(target.name, newValue);

      // Restore cursor position slightly after render
      setTimeout(() => {
        target.selectionStart = target.selectionEnd = start + 3;
      }, 0);
    }
  };

  const toggleSkill = (skill: string) => {
    setFormData((prev) => {
      const isSelected = prev.skills.includes(skill);
      if (isSelected) {
        return { ...prev, skills: prev.skills.filter((s) => s !== skill) };
      } else {
        return { ...prev, skills: [...prev.skills, skill] };
      }
    });
  };

  const isGeneralInfoValid =
    formData.title && formData.department && formData.jobType &&
    formData.experienceLevel && formData.salaryRange && formData.skills.length > 0 &&
    formData.vacancies && formData.location && formData.applicationDeadline;

  const isFormValid =
    isGeneralInfoValid && formData.description && formData.requirements &&
    formData.benefits && formData.companyName && formData.companyAddress && formData.workingHours;

  const handleSubmit = () => {
    if (!isFormValid) return;

    // Convert description, requirements, benefits into array of strings
    const newJob: Partial<Job> = {
      id: initialData?.id || Date.now().toString(),
      title: formData.title,
      department: formData.department,
      jobType: formData.jobType,
      experienceLevel: formData.experienceLevel,
      location: formData.location,
      skills: formData.skills,
      deadline: formData.applicationDeadline,
      postedAt: new Date().toLocaleDateString("vi-VN"),
      description: formData.description.split("\n").filter(Boolean),
      requirements: formData.requirements.split("\n").filter(Boolean),
      benefits: formData.benefits.split("\n").filter(Boolean),
      company: {
        name: formData.companyName,
        address: formData.companyAddress,
      },
      workingHours: formData.workingHours,
      salary: { min: 10, max: 20, currency: "VND" },
      createdBy: initialData?.createdBy || "company1",
    };

    onSubmit(newJob);
    onClose();
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "General Information":
        return (
          <GeneralInfoTab
            formData={formData}
            handleChange={handleChange}
            metadata={metadata}
            isSkillsDropdownOpen={isSkillsDropdownOpen}
            setIsSkillsDropdownOpen={setIsSkillsDropdownOpen}
            toggleSkill={toggleSkill}
          />
        );
      case "Description":
        return <DescriptionTab formData={formData} handleChange={handleChange} handleKeyDown={handleKeyDown} />;
      case "Requirements":
        return <RequirementsTab formData={formData} handleChange={handleChange} handleKeyDown={handleKeyDown} />;
      case "Benefits & Company Work":
        return <BenefitsTab formData={formData} handleChange={handleChange} handleKeyDown={handleKeyDown} />;
      case "Status":
        return <StatusTab formData={formData} handleChange={handleChange} />;
      default:
        return null;
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.modalHeader}>
        <h2 className={activeTab === "Status" ? styles.modalTitleRed : styles.modalTitle}>
          {activeTab === "Status" ? "Update Status Job" : (initialData ? "Edit Job" : "Create Job")}
        </h2>
      </div>

      <div className={styles.tabs}>
        {TABS.map((tab) => (
          <div
            key={tab}
            className={`${styles.tab} ${activeTab === tab ? styles.activeTab : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </div>
        ))}
      </div>

      <div className={styles.tabContent}>
        {renderTabContent()}
      </div>

      <div className={styles.modalFooter}>
        <div className={styles.validationText}></div>
        <button className={styles.cancelBtn} onClick={onClose}>Cancel</button>
        <button
          className={styles.submitBtn}
          disabled={!isFormValid}
          onClick={handleSubmit}
        >
          {activeTab === "Status" ? "Save changes" : (initialData ? "Save changes" : "Create Job")}
        </button>
      </div>
    </Modal>
  );
};

export default CreateJobModal;
