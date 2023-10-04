export default function sqlTable(sensorDataType) {
  switch (sensorDataType) {
    case "temperature":
      return "temperature_log";

    case "vibratin":
      return "vibration_log";
  }
}
