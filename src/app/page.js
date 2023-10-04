"use client";

import Stack from "@mui/material/Stack";
import Image from "next/image";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import styles from "../styles/home.module.css";
import { useEffect, useState } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const originalText = "How it works?";
  const typingSpeed = 100;

  useEffect(() => {
    let charIndex = 0;
    const typingInterval = setInterval(() => {
      setText(originalText.slice(0, charIndex));
      charIndex++;
      if (charIndex > originalText.length) {
        clearInterval(typingInterval);
      }
    }, typingSpeed);

    return () => {
      clearInterval(typingInterval);
    };
  }, []);

  return (
    <>
      <div className={styles.container}>
        <div className="d-flex col-12 flex-wrap">
          <div className="col-12 col-sm-7 d-flex justify-content-center">
            <div className={`col-10 ${styles.imageFrame}`}>
              <Image
                src="/home.png"
                alt="Landing page image"
                width={1000}
                height={750}
                className={styles.image}
              />
            </div>
          </div>
          <div className="col-12 col-sm-5 d-flex align-items-center">
            <div className="px-4 px-sm-0 col-12 col-sm-8">
              <h1 className={styles.homeHeader}>{text}</h1>

              <p className={styles.paraAlign}>
                So, what is an IoT Platform exactly? IoT platforms are the
                support software that connects everything in an IoT system. An
                IoT platform facilitates communication, data flow, device
                management, and the functionality of applications.
              </p>

              <Stack direction="row" spacing={2}>
                <Link href="#">
                  <Button
                    variant="contained"
                    style={{
                      padding: 10,
                      backgroundColor: "#0353a4",
                      background:
                        "linear-gradient(to right, #0353a4, #0353a4,#002855)",
                    }}
                  >
                    Try It Now
                  </Button>
                </Link>
                <Link href="#">
                  <Button
                    variant="contained"
                    style={{
                      padding: 10,
                      backgroundColor: "#0353a4",
                      background:
                        "linear-gradient(to right, #0353a4, #0353a4,#002855)",
                    }}
                  >
                    Learn More
                  </Button>
                </Link>
              </Stack>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
