import styles from "./JobTabs.module.css";

const tabs = ["Description", "Requirements", "Benefits", "Company"];

const JobTabs = ({ activeTab, onChange }) => {
  return (
    <div>
      {tabs.map((tab) => (
        <div key={tab} onClick={() => onChange(tab)}>
          {tab}
        </div>
      ))}
    </div>
  );
};

export default JobTabs;