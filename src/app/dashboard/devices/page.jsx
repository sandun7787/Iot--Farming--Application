"use client";

import DeviceList from "@/components/deviceList";
import SideBar from "@/components/sideBar";

const DeviceListPage = () => {
  return (
    <>
      <div className="d-flex device-list-page flex-wrap">
        <SideBar />

        <div className="flex-fill">
          <div
            className="d-flex flex-column justify-content-center"
            style={{ marginLeft: "20px", marginTop: "20px" }}
          >
            <DeviceList />
          </div>
        </div>
      </div>
    </>
  );
};

export default DeviceListPage;
