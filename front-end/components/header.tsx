import Link from 'next/link';
import styles from '@/styles/Header.module.css';

const Header: React.FC = () => {
    return (
        <header className="header p-3 mb-4 border-bottom bg-black">
            <div className="container">
                <span className="brand fs-2 d-flex justify-content-center mb-3 text-white-50 text-decoration-none">
                    VHL
                </span>
                <nav className="nav justify-content-center">
                    <Link href="/" className={`nav-link px-4 fs-5 ${styles.navLink}`}>
                        Home
                    </Link>
                 
                     <div className={`nav-link px-4 fs-5 ${styles.navLink} ${styles.dropdown}`}>
                        <a href="#" className={styles.dropdownToggle}>Spelers</a>
                        <div className={styles.dropdownMenu}>
                            <Link href="/spelers/overview" className="dropdown-item">Overview</Link>
                            <Link href="/spelers/add" className="dropdown-item">Add</Link>
                            <Link href="/spelers/update" className="dropdown-item">Update</Link>
                            <Link href="/spelers/delete" className="dropdown-item">Delete</Link>
                        </div>
                    </div>
                    <div className={`nav-link px-4 fs-5 ${styles.navLink} ${styles.dropdown}`}>
                        <a href="#" className={styles.dropdownToggle}>Coaches</a>
                        <div className={styles.dropdownMenu}>
                            <Link href="/coaches/overview" className="dropdown-item">Overview</Link>
                            <Link href="/coaches/add" className="dropdown-item">Add</Link>
                            <Link href="/coaches/update" className="dropdown-item">Update</Link>
                            <Link href="/coaches/delete" className="dropdown-item">Delete</Link>
                        </div>
                    </div>
                    <div className={`nav-link px-4 fs-5 ${styles.navLink} ${styles.dropdown}`}>
                        <a href="#" className={styles.dropdownToggle}>Ploegen</a>
                        <div className={styles.dropdownMenu}>
                            <Link href="/ploegen/overview" className="dropdown-item">Overview</Link>
                            <Link href="/ploegen/add" className="dropdown-item">Add</Link>
                            <Link href="/ploegen/update" className="dropdown-item">Update</Link>
                            <Link href="/ploegen/delete" className="dropdown-item">Delete</Link>
                        </div>
                    </div>
                    <Link href="/zalen" className={`nav-link px-4 fs-5 ${styles.navLink}`}>
                        Zalen
                    </Link>
                    <Link href="/trainingsessions" className={`nav-link px-4 fs-5 ${styles.navLink}`}>
                        Training-Sessions
                    </Link>
                </nav>
            </div>
        </header>
    );
};

export default Header;