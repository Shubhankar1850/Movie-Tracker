import "./Header.css"
import { useEffect, useState } from 'react';
import { RiMovie2Line } from "react-icons/ri";
import HeaderSearch from "./HeaderSearch/HeaderSearch";
import { Avatar, Flex} from 'antd';
import { AiOutlineUser } from "react-icons/ai";
import { Link } from "react-router";
function Header() {
    const [scrolled, setScrolled] = useState(false);

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
    return (
        <Flex className={`header ${scrolled?"frosted-glass":""}`} gap="middle" align="start" justify="space-between">
            <Flex align="flex-end" justify="space-around" style={{width:"400px"}}>
            <Avatar
                size={54}
                icon={<RiMovie2Line />}/>
            <Link to={"/"}>Movies</Link>
            <Link to={"/favourites"}>Favorites</Link>
            </Flex>
            <Flex align="flex-end" justify="space-around" style={{width:"400px", marginRight:"2%"}}>
                <HeaderSearch/>
                <Avatar
                    size={54}
                    icon={<AiOutlineUser />}
                />
            </Flex>
        </Flex>
    );
}

export default Header;