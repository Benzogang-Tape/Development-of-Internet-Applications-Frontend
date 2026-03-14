import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const SidebarNavigation: React.FC = () => {
  return (
    <nav className="sidebar-nav">
      <div className="sidebar-nav__brand">
        <Link className="sidebar-nav__logo" to="/">
          <h2>RoofMaster</h2>
        </Link>
      </div>
      <div className="sidebar-nav__links">
        <Nav.Link className="sidebar-nav__link" as={Link} to="/">
          Главная
        </Nav.Link>
        <Nav.Link className="sidebar-nav__link" as={Link} to="/materials">
          Кровельные материалы
        </Nav.Link>
      </div>
    </nav>
  );
};

export default SidebarNavigation;
