import styles from "./JobTabs.module.css";

const tabs = ["Description", "Requirements", "Benefits", "Company"];

const JobTabs = ({ activeTab, setActiveTab, tabRefs }: any) => {
  return (
          <div className={styles.tabsContainer}>
            {["Description", "Requirements", "Benefits", "Company"].map((tab) => (
              <div
                key={tab}
                className={`${styles.tab} ${activeTab === tab ? styles.activeTab : ""}`}
                onClick={() => {
                  setActiveTab(tab);

                  tabRefs[tab]?.current?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }}
              >
                {tab}
              </div>
            ))}
          </div>
  );
};

export default JobTabs;