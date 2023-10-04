'use client';

import React, { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import styles from '../styles/temperatureChart.module.css';
import axios from 'axios';

const TemperatureChart = ({ selectedDevice }) => {
  const [sensorData, setSensorData] = useState([]);

  useEffect(() => {
    fetchSensorData(); // Fetch initial data
    const interval = setInterval(fetchSensorData, 5000); // Fetch data every 5 seconds

    return () => {
      clearInterval(interval); // Clear the interval on component unmount
    };
  }, []);

  useEffect(() => {
    filterData();
  }, [selectedDevice, sensorData]);

  const fetchSensorData = async () => {
    try {
      const response = await axios.get('/api/sensor-data/temperature_log');
      setSensorData(response.data);
    } catch (error) {
      console.error('Error fetching sensor data:', error);
    }
  };

  const filterData = () => {
    if (selectedDevice) {
      const deviceData = sensorData.filter(
        (data) => data.device_id === selectedDevice
      );
      const lastTenData = deviceData.slice(-20);
      setFilteredData(lastTenData);
    } else {
      setFilteredData([]);
    }
  };

  const deviceOptions = Array.from(
    new Set(sensorData.map((data) => data.device_id))
  );

  const [filteredData, setFilteredData] = useState([]);

  const getMaxChartWidth = () => {
    const windowWidth = window.innerWidth;
    const maxChartWidth = Math.min(800, windowWidth - 32); // Adjust the maximum width as needed
    return maxChartWidth;
  };

  return (
    <div className="temperature-chart-container col-12">
      {/* Device Selection */}
      <div className="col-12 d-flex justify-content-center">
        <div className="col-6 my-4"></div>
      </div>

      {/* Temperature Line Chart */}
      {selectedDevice && (
        <div className="chart-wrapper  d-flex justify-content-center">
          <LineChart
            className="line-chart"
            width={500}
            margin={{
              top: 15,
              right: 30,
              left: 20,
              bottom: 5,
            }}
            height={350}
            data={filteredData}
            style={{ maxWidth: '100%', overflowX: 'auto' }}
          >
            {/* <CartesianGrid strokeDasharray="3 3" /> */}
            <CartesianGrid
              stroke="#000000" // Color of the grid lines
              strokeDasharray="3 3" // Pattern of the grid lines (in this case, dashed lines)
              vertical={false} // Whether to show vertical grid lines
              horizontal={true} // Whether to show horizontal grid lines
            />
            <XAxis
              dataKey="timestamp"
              axisLine={{ stroke: '#000000' }}
              tick={{ fill: '#000000' }}
            />
            <YAxis
              axisLine={{ stroke: '#000000' }}
              tick={{ fill: '#000000' }}
            />
            {/* <Tooltip wrapperStyle={{ backgroundColor: "#008000", opacity: 0.7 }} /> */}
            <Tooltip
              contentStyle={{ backgroundColor: '#8884d8', color: '#000000' }}
              itemStyle={{ color: 'red' }}
              cursor={true}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="sensor_value"
              name={<span style={{ color: '#0056A2' }}>Temperature</span>}
              stroke="red"
              strokeWidth={1.5}
              dot={{ fill: '#2e4355', stroke: '#8884d8', strokeWidth: 2, r: 5 }}
              activeDot={{
                fill: '#2e4355',
                stroke: '#8884d8',
                strokeWidth: 5,
                r: 10,
              }}
            />
          </LineChart>
        </div>
      )}
    </div>
  );
};

export default TemperatureChart;
