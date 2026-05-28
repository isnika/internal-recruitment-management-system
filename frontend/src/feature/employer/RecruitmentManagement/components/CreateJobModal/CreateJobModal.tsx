import React, {
  useEffect,
  useMemo,
  useState,
  KeyboardEvent,
} from "react";

import styles from "./CreateJobModal.module.css";
import Modal from "../../../shared/componnets/Modal/Modal";

import { useJobMetadata } from "../../../../../hooks/useJobMetadata";

import type {
  CreateJobRequest,
  Job,
  JobStatus,
} from "../../../../../types/job";

import GeneralInfoTab from "./tabs/GeneralInfoTab";
import DescriptionTab from "./tabs/DescriptionTab";
import RequirementsTab from "./tabs/RequirementsTab";
import BenefitsTab from "./tabs/BenefitsTab";
import StatusTab from "./tabs/StatusTab";

      
// TYPES
      
interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (
    payload: CreateJobRequest,
    jobId?: number
  ) => Promise<void>;
  initialData?: Job | null;
}

type FormState = {
  title: string;
  location: string;
  type: string;
  salaryMin: string;
  salaryMax: string;
  categoryId: string;
  experienceLevelId: string;
  companyId: string;
  skillIds: number[];
  deadline: string;
  description: string;
  requirements: string;
  benefits: string;
  status: JobStatus;
};

      
// CONSTANTS
      
const TABS = [
  "General Information",
  "Description",
  "Requirements",
  "Benefits",
  "Status",
] as const;

const DEFAULT_FORM: FormState = {
  title: "",
  location: "",
  type: "",
  salaryMin: "",
  salaryMax: "",
  categoryId: "",
  experienceLevelId: "",
  companyId: "",
  skillIds: [],
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
     
  // STATE
     
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const [formData, setFormData] = useState<FormState>(DEFAULT_FORM);
  const [submitting, setSubmitting] = useState(false);

  //  metadata hook (NON-BLOCKING)
  const { metadata } = useJobMetadata();

  // INIT FORM
     
  useEffect(() => {
    if (!isOpen) return;

    setActiveTab(TABS[0]);

    if (initialData) {
      setFormData({
        title: initialData.title || "",
        location: initialData.location || "",
        type: initialData.type || "",
        salaryMin: String(initialData.salaryMin || ""),
        salaryMax: String(initialData.salaryMax || ""),
        categoryId: String(initialData.category?.id || ""),
        experienceLevelId: String(
          initialData.experienceLevel?.id || ""
        ),
        companyId: String(initialData.company?.id || ""),
        skillIds: initialData.skills?.map((s) => s.id) || [],
        deadline: initialData.deadline
          ? initialData.deadline.split("T")[0]
          : "",
        description: initialData.description || "",
        requirements: initialData.requirements || "",
        benefits: initialData.benefits || "",
        status: initialData.status || "DRAFT",
      });
    } else {
      setFormData(DEFAULT_FORM);
    }
  }, [isOpen, initialData]);

     
  // HANDLE CHANGE
     
  const handleChange = <K extends keyof FormState>(
    field: K,
    value: FormState[K]
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

     
  // BULLET INPUT
     
  const handleKeyDown = (
    e: KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.key !== "Enter") return;

    e.preventDefault();

    const target = e.target as HTMLTextAreaElement;
    const cursor = target.selectionStart;

    const newValue =
      target.value.substring(0, cursor) +
      "\n- " +
      target.value.substring(cursor);

    handleChange(
      target.name as keyof FormState,
      newValue as never
    );
  };

     
  // VALIDATION
     
  const isValid = useMemo(() => {
    return (
      formData.title.trim() !== "" &&
      formData.description.trim() !== "" &&
      formData.requirements.trim() !== "" &&
      formData.benefits.trim() !== "" &&
      formData.location.trim() !== "" &&
      formData.type.trim() !== "" &&
      formData.salaryMin !== "" &&
      formData.salaryMax !== "" &&
      Number(formData.salaryMax) >=
        Number(formData.salaryMin) &&
      formData.categoryId !== "" &&
      formData.experienceLevelId !== "" &&
      formData.companyId !== "" &&
      formData.deadline !== "" &&
      formData.skillIds.length > 0
    );
  }, [formData]);

     
  // PAYLOAD
     
  const buildPayload = (): CreateJobRequest => ({
    title: formData.title.trim(),
    location: formData.location.trim(),
    type: formData.type,
    salaryMin: Number(formData.salaryMin),
    salaryMax: Number(formData.salaryMax),
    categoryId: Number(formData.categoryId),
    experienceLevelId: Number(formData.experienceLevelId),
    companyId: Number(formData.companyId),
    skillIds: formData.skillIds,
    deadline: formData.deadline,
    description: formData.description,
    requirements: formData.requirements,
    benefits: formData.benefits,
    status: formData.status,
  });

     
  // SUBMIT
     
  const handleSubmit = async () => {
    if (!isValid) return;

    try {
      setSubmitting(true);

    console.log(buildPayload());

      await onSubmit(buildPayload(), initialData?.id);
    } finally {
      setSubmitting(false);
    }
  };

     
  // RENDER TAB
     
  const renderTab = () => {
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
          <StatusTab
            formData={formData}
            handleChange={handleChange}
          />
        );

      default:
        return null;
    }
  };


  //Skill
  const [isSkillsDropdownOpen, setIsSkillsDropdownOpen] =
    useState(false);

  const toggleSkill = (skillId: number) => {
    setFormData((prev) => ({
      ...prev,
      skillIds: prev.skillIds.includes(skillId)
        ? prev.skillIds.filter((id) => id !== skillId)
        : [...prev.skillIds, skillId],
    }));
  };
     

     
  // UI
     
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.modalWrapper}>
        {/* HEADER */}
        <div className={styles.header}>
          <h2>{initialData ? "Edit Job" : "Create Job"}</h2>
        </div>

        {/* TABS */}
        <div className={styles.tabs}>
          {TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={
                activeTab === tab
                  ? styles.activeTab
                  : styles.tab
              }
            >
              {tab}
            </button>
          ))}
        </div>

        {/* CONTENT (NO BLOCKING LOADING) */}
        <div className={styles.tabContent}>
          {renderTab()}
        </div>

        {/* FOOTER */}
        <div className={styles.footer}>
          <button
            type="button"
            onClick={onClose}
            className={styles.cancelBtn}
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={!isValid || submitting}
            onClick={handleSubmit}
            className={styles.submitBtn}
          >
            {submitting
              ? "Submitting..."
              : initialData
              ? "Update Job"
              : "Create Job"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default React.memo(CreateJobModal);