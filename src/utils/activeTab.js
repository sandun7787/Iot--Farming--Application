export default function activeTab() {
  const currentPath = window.location.pathname;

  switch (currentPath) {
    case "/dashboard":
      return "dashboard";

    case "/dashboard/devices":
      return "devices";

    case "/dashboard/statistics":
      return "statistics";
  }
}
