import Header from '../components/header/Header';
interface LayoutProps {
    children: React.ReactNode;
  }
const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <>
            <Header/>
            {children}
        </>
    );
}

export default Layout;