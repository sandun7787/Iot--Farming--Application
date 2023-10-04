import React from "react";
import SignUp from "@/components/signUp";

export default function Page() {
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
      <SignUp />
    </div>
  );
}
