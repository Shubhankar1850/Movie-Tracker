import "./Header.css"
import { useEffect, useState } from 'react';
import { RiMovie2Line } from "react-icons/ri";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import HeaderSearch from "./HeaderSearch/HeaderSearch";
import { Avatar, Flex } from 'antd';
import { AiOutlineUser } from "react-icons/ai";
import { Link } from "react-router";
import useMobile from "../../CustomHooks/useMobile";

function Header() {
    const [scrolled, setScrolled] = useState<Boolean>(false);
    const [menuOpen, setMenuOpen] = useState<Boolean>(false);
    const {isDesktop}= useMobile();
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };
    
    return (
        <header className={`header ${scrolled ? "frosted-glass" : ""} ${menuOpen ? "menu-open" : ""}`}>
            <Flex className="header-content" gap="middle" align="center" justify="space-between">
                <Flex className="header-logo-section" align="center">
                    <Avatar
                        className="logo"
                        icon={<RiMovie2Line />}/>
                    <div className="main-nav">
                        <Link to={"/"}>Movies</Link>
                        <Link to={"/favorites"}>Favorites</Link>
                    </div>
                </Flex>

                <div className="header-right-section">
                    <HeaderSearch />
                    <Avatar
                        className="user-avatar"
                        icon={<AiOutlineUser />}
                    />
                </div>

                <button className="menu-toggle" onClick={toggleMenu}>
                    {menuOpen ? <RiCloseLine /> : <RiMenu3Line />}
                </button>
            </Flex>

            {  !isDesktop && <div className="mobile-menu">
                <div className="mobile-menu-content">
                    <HeaderSearch isMobile={true} />
                    <div className="mobile-nav">
                        <Link to={"/"} onClick={() => setMenuOpen(false)}>Movies</Link>
                        <Link to={"/favorites"} onClick={() => setMenuOpen(false)}>Favorites</Link>
                    </div>
                    <div className="mobile-user">
                        <Avatar
                            className="user-avatar-mobile"
                            icon={<AiOutlineUser />}
                        />
                        <span>My Account</span>
                    </div>
                </div>
                </div>
            }
        </header>
    );
}

export default Header;