"use client";

import styles from "@/styles/dashboard.module.css";
import SideBar from "@/components/sideBar";

const Dashboard = () => {
  return (
    <>
      <div className="d-flex device-list-page flex-wrap">
        <SideBar />

        <div className="flex-fill">
          <div className="mt-sm-2 mb-sm-5 mx-sm-5">
            <div className={`text-center py-4 ${styles.chartTitle}`}>
              - Stat: Racoon AI -
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
