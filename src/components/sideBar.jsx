'use client';

import Link from 'next/link';
import styles from '../styles/dashboard.module.css';
import { useEffect, useState } from 'react';
import activeTab from '@/utils/activeTab';
import { getFirebaseAuth } from '../../database/firebaseConfig';
import { useRouter } from 'next/navigation';

const SideBar = () => {
  const [activeButton, setActiveButton] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const tab = activeTab();
    setActiveButton(tab);
  });

  const handleSignout = () => {
    const auth = getFirebaseAuth();

    auth
      .signOut()
      .then(() => {
        // Sign-out successful
        router.push('/login');
      })
      .catch((error) => {
        // Handle sign-out errors
        console.error('Error signing out:', error);
      });
  };

  return (
    <>
      <div className={`${styles.sideBar} col-12 col-sm-2`}>
        <div
          className={`d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary`}
          style={{ height: '100%' }}
        >
          <Link
            href="/dashboard"
            className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
          >
            <svg className="bi pe-none me-2" width={40} height={32}>
              <use xlinkHref="#bootstrap" />
            </svg>
            <span className={`${styles.dashTopic} fs-4`}>Dashboard</span>
          </Link>
          <hr />
          <ul className="nav nav-pills flex-column mb-auto">
            <li className="nav-item">
              <Link
                href="/dashboard"
                className={`
                ${
                  activeButton === 'dashboard'
                    ? `nav-link active ${styles.btnActive}`
                    : 'nav-link link-body-emphasis'
                }
                `}
              >
                <svg className="bi pe-none me-2" width={16} height={16}>
                  <use xlinkHref="#home" />
                </svg>
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/devices"
                className={`
                ${
                  activeButton === 'devices'
                    ? `nav-link active ${styles.btnActive}`
                    : 'nav-link link-body-emphasis'
                }
                `}
              >
                <svg className="bi pe-none me-2" width={16} height={16}>
                  <use xlinkHref="#speedometer2" />
                </svg>
                Devices
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/statistics"
                className={`
                ${
                  activeButton === 'statistics'
                    ? `nav-link active ${styles.btnActive}`
                    : 'nav-link link-body-emphasis'
                }
                `}
              >
                <svg className="bi pe-none me-2" width={16} height={16}>
                  <use xlinkHref="#table" />
                </svg>
                Statistic
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className={`
                ${
                  activeButton === 'settings'
                    ? `nav-link active ${styles.btnActive}`
                    : 'nav-link link-body-emphasis'
                }
                `}
              >
                <svg className="bi pe-none me-2" width={16} height={16}>
                  <use xlinkHref="#grid" />
                </svg>
                Settings
              </Link>
            </li>
          </ul>
          <hr className="mt-5" />
          <div className="d-flex justify-content-center">
            <button
              type="button"
              className={`btn btn-outline-primary px-5 ${styles.signout}`}
              onClick={handleSignout}
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;
