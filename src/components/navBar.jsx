'use client';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/navbar.module.css';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getFirebaseAuth } from '../../database/firebaseConfig';
import getLoggedUsername from '@/utils/getLoggedUsername';

const NavBar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [profileName, setUserName] = useState('User Name');
  const router = useRouter();

  useEffect(() => {
    const auth = getFirebaseAuth();
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsAuthenticated(true);
        setUserName(user.displayName);
      } else {
        setIsAuthenticated(false);
        setUserName('');
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = () => {
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

  getLoggedUsername((userId) => {
    setUserName(userId);
  });

  return (
    <div className={styles.navFrame}>
      <nav
        className={`${styles.cusNavBar} navbar navbar-expand-lg fixed-top`}
        style={{ color: 'white !important' }}
      >
        <div className="container-fluid">
          <Link className="navbar-brand" href="/" as={'/'}>
            <Image
              src="/logo.svg"
              alt="Logo"
              className={styles.logo}
              width={0}
              height={0}
              priority={true}
            />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span>
              <Image
                src="/menu.svg"
                alt="menu_icon"
                className={styles.menu}
                width={0}
                height={0}
              />
            </span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul
              className={`navbar-nav me-auto mb-2 mb-lg-0 ${styles.navOption}`}
            >
              <li className="nav-item">
                <Link
                  className="nav-link font-white active"
                  aria-current="page"
                  href="/"
                >
                  Home
                </Link>
              </li>

              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle font-white"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Categories
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" href="/category/iiot">
                      IIOT
                    </Link>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Smart Farming
                    </a>
                  </li>
                  <li></li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Health Care
                    </a>
                  </li>
                </ul>
              </li>

              <li className={`nav-item ${styles.pcDash}`}>
                <Link className="nav-link font-white" href="/dashboard">
                  Dashboard
                </Link>
              </li>
              <li className={`nav-item dropdown ${styles.mobileDash}`}>
                <Link
                  className="nav-link dropdown-toggle font-white"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Dashboard
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" href="/dashboard">
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/dashboard/devices">
                      Devices
                    </a>
                  </li>
                  <li></li>
                  <li>
                    <a className="dropdown-item" href="/dashboard/statistics">
                      Statistic
                    </a>
                  </li>
                </ul>
              </li>

              <li className={`${styles.navLi} nav-item`}>
                <Link className="nav-link font-white" href="#">
                  Profile
                </Link>
              </li>

              <li className={`${styles.navLi} nav-item`}>
                <Link className="nav-link font-white" href="#">
                  Sign out
                </Link>
              </li>
            </ul>

            {isAuthenticated && (
              <div className={`${styles.userControl} dropdown`}>
                <a
                  href="#"
                  className="d-flex align-items-center link-body-emphasis text-decoration-none"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src="/user.svg"
                    alt
                    width={45}
                    height={45}
                    className="rounded-circle me-2"
                  />
                  <strong className="font-white px-2">{profileName}</strong>
                  <div className="font-white dropdown-toggle" />
                </a>
                <ul className="dropdown-menu text-small shadow">
                  <li>
                    <a className="dropdown-item" href="#">
                      Profile
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={handleSignOut}
                    >
                      Sign out
                    </a>
                  </li>
                </ul>
              </div>
            )}

            {!isAuthenticated && (
              <>
                <li style={{ listStyle: 'none', marginRight: '15px' }}>
                  <button
                    style={{
                      background: 'none',
                      color: 'white',
                      padding: '4px',
                      borderRadius: '15px',
                      border: 'none',
                      marginRight: '2px',
                    }}
                    onClick={() => router.push('/login')}
                  >
                    Login
                  </button>
                </li>
                <li style={{ listStyle: 'none' }}>
                  <button
                    style={{
                      background: 'none',
                      color: 'white',
                      padding: '4px',
                      borderRadius: '15px',
                      border: 'none',
                      marginRight: '2px',
                    }}
                    onClick={() => router.push('/signup')}
                  >
                    Signup
                  </button>
                </li>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
