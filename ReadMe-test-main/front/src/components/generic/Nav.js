import { Link } from "react-router-dom";

export function NavLinks({ user, clearStorage }) {
    return (
      <>
        <NavLink to="/bookinator">Bookinator</NavLink>
        {user ? (
          <>
            <NavLink to={`/user/${user._id}`}>Profile</NavLink>
            <button onClick={clearStorage} className="nav-link">
              Deconnexion
            </button>
          </>
        ) : (
          <>
            <NavLink to="/signup">Inscription</NavLink>
            <NavLink to="/login">Connexion</NavLink>
          </>
        )}
      </>
    );
}

export function NavLink({ to, children }) {
    return (
      <Link
        to={to}
        className="relative px-6 py-3 text-xl font-bold tracking-wider text-white uppercase transition-all font-doodles group"
      >
        <span className="relative z-10">{children}</span>
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path className="transition-all duration-300 ease-in-out" d="M10,10 Q30,5 50,10 T90,10 L95,90 Q70,95 50,90 T5,90 Z" fill="white" stroke="black" strokeWidth="4" vectorEffect="non-scaling-stroke" />
          <path className="transition-all duration-300 ease-in-out group-hover:translate-x-1 group-hover:translate-y-1" d="M10,10 Q30,5 50,10 T90,10 L95,90 Q70,95 50,90 T5,90 Z" fill="black" strokeWidth="0" />
        </svg>
      </Link>
    );
  }