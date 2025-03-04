import React, { useEffect, useState } from 'react';
import styles from './Navbar.module.css';
import logo from '../assets/logo.svg';
import { Link } from 'react-router-dom';
import { RxHamburgerMenu } from "react-icons/rx";
import { useAuthContext } from '../hooks/useAuthContext';
import { useAuth } from '../hooks/useAuth';


export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [showOptions, setShowOptions] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const { user } = useAuthContext()
    const { logout } = useAuth()
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };

        window.addEventListener("scroll", handleScroll);
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const handleMenuToggle = () => {
        if (showOptions) {
            setIsClosing(true);
            setTimeout(() => {
                setIsClosing(false);
                setShowOptions(false);
            }, 200);
        } else {
            setShowOptions(true);
        }
    };

    const closeMenu = () => {
        handleMenuToggle()
    };
    const handleLogout = async () => {
        try {
            logout(); 
        } catch (error) {
            console.error(error);
        } 
    };
    
    return (
        <header className={styles.header}>

            <div className={styles.container}>
                <div className={styles.logoContainer}>
                    <Link to='/'><img src={logo} alt="Despesitas" /></Link>
                </div>
                {screenWidth <= 600 && (
                    <button className={styles.closeBtn} onClick={handleMenuToggle}>
                        <RxHamburgerMenu />
                    </button>
                )}
                <ul
                    className={`${styles.nav} ${isClosing ? styles.closing : ''}`}
                    style={{ display: screenWidth > 600 || showOptions ? 'flex' : 'none' }}
                >
                    {screenWidth <= 600 && (
                        <button className={styles.closeBtn} onClick={handleMenuToggle}>
                            <RxHamburgerMenu />
                        </button>
                    )}
                    <li><Link to="/Despesas" onClick={closeMenu}>Despesas</Link></li>
                    <li><Link to="/Recebimentos" onClick={closeMenu}>Recebimentos</Link></li>
                    <li onClick={user ? handleLogout :() => setShowOptions(false)}>
                        <Link to={user ? "/" : "/login"}>
                            <span>{screenWidth <= 600 ? "Sair" : user && user.name.split(" ")[0] || "Login"}</span>
                        </Link>
                    </li>

                </ul>
            </div>

        </header>
    );
}
