import Header from '../components/header/Header';
interface LayoutProps {
    children: React.ReactNode;
  }
const Layout: React.FC<LayoutProps> = ({ children }) => {
    // Can add other layout here like footer etc.
    return (
        <>
            <Header/>
            {children}
        </>
    );
}

export default Layout;