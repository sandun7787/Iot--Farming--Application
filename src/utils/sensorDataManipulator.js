import { createSQLDBConnection } from "../../database/sqlDBConfig";
import sqlTable from "./sqlTableFinder";

const connection = createSQLDBConnection();

const sensorDataManipulator = (deviceId, dataset) => {
  // Device Type
  const deviceType = "IIOT_Mini";

  // if (deviceId) {
  //   isDeviceRegistered(deviceId, (result) => {
  //     if (!result) {
  //       createDevice(deviceId, deviceType);
  //       return;
  //     }

  //     Object.keys(dataset).forEach((key) => {
  //       const sensorDataType = key;
  //       const { data } = dataset[key];

  //       const table = sqlTable(sensorDataType);

  //       if (deviceId !== "Device0001a" || deviceId !== "Device0002a")
  //         createSensorData(table, deviceId, data);
  //     });
  //   });
  // }

  if (deviceId !== "Device0001a") {
    console.log(deviceId, dataset);
  }
};

export default sensorDataManipulator;

// Check whether the device register or not
const isDeviceRegistered = (deviceId, callback) => {
  const query = `SELECT * FROM device WHERE device_id='${deviceId}'`;

  connection.query(query, (err, results) => {
    if (results.length === 0) {
      console.log("No matching records found.");
      callback(false);
      return;
    }

    console.log("Query results:", results);
    callback(true);
  });
};

// Register new device
const createDevice = (deviceId, deviceType) => {
  const query = `INSERT INTO device VALUES('${deviceId}', '${deviceType}')`;

  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error executing MySQL query: " + err.stack);
      return;
    }

    console.log("Query results:", results);
  });
};

// Create sensor data record
const createSensorData = (tableName, deviceId, sensorValue) => {
  const query = `
    INSERT INTO ${tableName}(device_id, sensor_value)
    SELECT '${deviceId}', ${sensorValue}
    FROM ${tableName}
    WHERE (SELECT sensor_value FROM ${tableName} ORDER BY id DESC LIMIT 1) <> ${sensorValue}
    LIMIT 1;
  `;

  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error executing MySQL query: " + err.stack);
      return;
    }

    console.log("Query results:", results);
  });
};
