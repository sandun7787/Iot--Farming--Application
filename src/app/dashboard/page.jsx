'use client';

import { useEffect, useState } from 'react';
import fetchAllData from '@/utils/fetchSensorData';
import SideBar from '@/components/sideBar';
import VibCard from '@/components/vibCard';
import TempCard from '@/components/tempCard';
import styles from '../../styles/dashboard.module.css';
import TemperatureChart from '@/components/TemperatureChart';
import withAuth from '@/components/withAuth';
import VibrationChart from '@/components/vibrationChart';
import { fetchData } from '../../utils/deviceDataFetching';
import getLoggedUserId from '../../utils/getLoggedUserId';
import { Container } from '@mui/material';

const Dashboard = () => {
  const [sensorData, setSensorData] = useState({
    temperature: null,
    vibration: null,
  });
  const [deviceData, setDeviceData] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState('');

  useEffect(() => {
    getLoggedUserId((loggedUserId) => {
      fetchData(loggedUserId, setDeviceData);
    });
  }, []);

  useEffect(() => {
    if (selectedDevice) {
      fetchAllData((data) => {
        const { temperature, vibratin } = data[selectedDevice];
        setSensorData({
          temperature: temperature.data,
          vibration: vibratin.data,
        });
      });
    }
  }, [selectedDevice]);

  const handleOptionChange = (event) => {
    const selectedDevice = event.target.value;
    setSelectedDevice(selectedDevice);
  };

  return (
    <>
      <div className="d-flex flex-wrap">
        <SideBar />

        <div className="flex-fill">
          <select
            style={{
              backgroundColor: '#f2f2f2',
              color: '#0353a4',
              padding: '8px',
              margin: '10px',
              marginLeft: '50px',
              border: 'none',
              borderRadius: '4px',
              width: '200px',
              fontSize: '16px',
              cursor: 'pointer',
              outline: 'none',
            }}
            onChange={handleOptionChange}
          >
            <option disabled selected>
              Select Device
            </option>
            {deviceData.map((item) => (
              <option key={item.deviceId} value={item.deviceId}>
                {item.deviceId}
              </option>
            ))}
          </select>
          <div className="col-12 pb-1">
            <div className="d-flex flex-wrap">
              <div className={`${styles.plot} pt-2 col-12 col-sm-6`}>
                <TempCard temperature={sensorData.temperature} />
              </div>
              <div className={`${styles.plot} pt-2 col-12 col-sm-6`}>
                <VibCard vibration={sensorData.vibration} />
              </div>
            </div>
          </div>

          <hr />

          <div className="d-flex flex-wrap">
            <div className="mt-sm-2 mb-sm-5 mx-sm-5">
              <div
                className={`text-center py-4 pt-2 pb-1 `}
                style={{ fontSize: '20px', color: 'rgb(3, 83, 164)' }}
              >
                - Temperature Monitor -
              </div>
              <div
                className={`d-flex justify-content-center mb-0 pb-0 ${styles.dashboardChartContainer}`}
              >
                <TemperatureChart selectedDevice={selectedDevice} />
              </div>
            </div>

            <div className="mt-sm-2 mb-sm-5 mx-sm-5">
              <div
                className={`text-center py-4 pt-2 pb-1`}
                style={{ fontSize: '20px', color: 'rgb(3, 83, 164)' }}
              >
                - Vibration Monitor -
              </div>
              <div
                className={`d-flex justify-content-center mb-0 pb-0 ${styles.dashboardChartContainer}`}
              >
                <VibrationChart selectedDevice={selectedDevice} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withAuth(Dashboard);
