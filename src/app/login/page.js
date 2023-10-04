import React from "react";
import Login from "@/components/login";

export default function page() {
  return (
    <div
      style={{
        maxWidth: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        margin: "50px auto",
      }}
    >
      <Login />
    </div>
  );
}
