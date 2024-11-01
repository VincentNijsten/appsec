import Link from "next/link";

const Header: React.FC = () => {
    return (
        <header className="header p-3 mb-4 border-bottom bg-dark bg-gradient">
            <div className="container">
                <span className="brand fs-2 d-flex justify-content-center mb-3 text-white-50 text-decoration-none">
                    VHL
                </span>
                <nav className="nav justify-content-center">
                    <Link href="/" className="nav-link px-4 fs-5 text-white">
                        Home
                    </Link>
                    <Link href="/spelers" className="nav-link px-4 fs-5 text-white">
                        Spelers
                    </Link>
                    <Link href="/ploegen" className="nav-link px-4 fs-5 text-white">
                        Ploegen
                    </Link>
                </nav>
            </div>
        </header>
    );  
};

export default Header;
