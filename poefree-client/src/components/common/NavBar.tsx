import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";

export default function NavBar() {
  const [isScrollingUp, setIsScrollingUp] = useState(true);
  const [lastScrollPosition, setLastScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPosition = window.scrollY;

      // Determine scroll direction
      setIsScrollingUp(currentScrollPosition < lastScrollPosition);
      setLastScrollPosition(currentScrollPosition);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollPosition]);

  return (
    <header id="poefree-navigation" className={isScrollingUp ? "show" : "hide"}>
      <Logo fontSize="30px" iconSize={25} />
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/write">Write</Link>
        <Link to="/profile">Profile</Link>
      </nav>
    </header>
  );
}
