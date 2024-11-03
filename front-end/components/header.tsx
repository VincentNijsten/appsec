import Link from "next/link";
import styles from "@/styles/Home.module.css"

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
                    <Link href="/spelers" className={`nav-link px-4 fs-5 ${styles.navLink}`}>
                        Spelers
                    </Link>
                    <Link href="/coaches" className={`nav-link px-4 fs-5 ${styles.navLink}`}>
                        Coaches
                    </Link>
                    <Link href="/ploegen" className={`nav-link px-4 fs-5 ${styles.navLink}`}>
                        Ploegen
                    </Link>
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
