import { useEffect, useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

const NavigationBar: React.FC = () => {
  const location = useLocation();
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    setExpanded(false);
  }, [location]);

  return (
    <Navbar className={"navbar " + (expanded ? "navbar_expanded" : "")}>
      <div className="navbar__head">
        <Navbar.Brand>
          <Nav.Link className="navbar__logo" as={Link} to="/">
            <h2>RoofMaster</h2>
          </Nav.Link>
        </Navbar.Brand>
        <button
          className="navbar__togglebtn"
          onClick={() => setExpanded(!expanded)}
          aria-label="Меню"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>
      <div className="navbar__links">
        <Nav.Link
          className={
            "navbar__link " +
            (location.pathname === "/" ? "navbar__link_active" : "")
          }
          as={Link}
          to="/"
        >
          Главная
        </Nav.Link>
        <Nav.Link
          className={
            "navbar__link " +
            (location.pathname.startsWith("/materials")
              ? "navbar__link_active"
              : "")
          }
          as={Link}
          to="/materials"
        >
          Кровельные материалы
        </Nav.Link>
      </div>
      <div className="navbar__mobile-menu" onClick={(e) => e.stopPropagation()}>
        <Nav.Link
          className={
            "navbar__link " +
            (location.pathname === "/" ? "navbar__link_active" : "")
          }
          as={Link}
          to="/"
        >
          Главная
        </Nav.Link>
        <Nav.Link
          className={
            "navbar__link " +
            (location.pathname.startsWith("/materials")
              ? "navbar__link_active"
              : "")
          }
          as={Link}
          to="/materials"
        >
          Кровельные материалы
        </Nav.Link>
      </div>
    </Navbar>
  );
};

export default NavigationBar;
