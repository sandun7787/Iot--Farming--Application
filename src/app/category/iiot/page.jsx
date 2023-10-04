"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "../../page.module.css";
import addDevice from "@/utils/registerDevice";
import withAuth from "@/components/withAuth";
import getLoggedUserId from "@/utils/getLoggedUserId";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const IIOTDeviceRegister = () => {
  const [userId, setUserId] = useState();
  const [buttonStatus, setButtonStatus] = useState(false);
  const [device, setDevice] = useState({
    deviceId: "",
    deviceName: "",
    activeStatus: true,
  });

  useEffect(() => {
    const { deviceId, deviceName } = device;
    if (deviceId && deviceName) setButtonStatus(true);
    else setButtonStatus(false);

    getLoggedUserId((userid) => {
      setUserId(userid);
    });
  });

  const notify = (msg) => {
    msg;
  };

  const handleChange = (e) => {
    const tempDevice = { ...device };
    tempDevice[e.target.name] = e.target.value;

    setDevice(tempDevice);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { deviceId, deviceName, activeStatus } = device;

    const data = {
      activeStatus,
      createdAt: new Date(),
      deviceName,
    };

    addDevice(userId, deviceId, data, (isSuccess, msg) => {
      if (isSuccess) {
        setDevice({
          deviceId: "",
          deviceName: "",
          activeStatus: true,
        });
        notify(
          toast.success(msg, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          })
        );
      }
    });
  };

  return (
    <>
      <ToastContainer />

      <div className="container">
        <div className="d-flex flex-wrap py-5">
          <div className="col-12 col-sm-6 d-flex justify-content-center">
            <Image
              src="/iiotLogo.svg"
              alt="IIOT-Image"
              className={styles.iiotImage}
              width={0}
              height={0}
            />
          </div>
          <div className="col-12 col-sm-6">
            <div>
              <div className={styles.iiotTitle}>
                <h1 className={`col-10`}>
                  Welcome to the Industrial IOT world!
                </h1>
              </div>
            </div>

            <div className="col-10 mx-auto">
              <div className="col-12 col-sm-11">
                <h5 className="my-4">Add your device</h5>
                <form>
                  <div className="mb-3">
                    <label htmlFor="userId" className="form-label">
                      User ID
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="userId"
                      name="userId"
                      value={userId}
                      disabled
                      readOnly
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="deviceId" className="form-label">
                      Device ID
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="deviceId"
                      name="deviceId"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="deviceName" className="form-label">
                      Device Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="deviceName"
                      name="deviceName"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="d-flex justify-content-center mt-5">
                    <button
                      type="submit"
                      className={`${styles.iiotSubmitButton} btn btn-primary`}
                      onClick={handleSubmit}
                      disabled={buttonStatus ? "" : "disabled"}
                    >
                      Add Device
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withAuth(IIOTDeviceRegister);
