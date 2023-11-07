import { NavLink } from "@remix-run/react";

function MainNavigation() {
  return (
    <nav id="main-navigation">
      <ul>
        <li className="nav-item">
          <NavLink prefetch="none" to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink prefetch="none" to="/notes">
            My Notes
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default MainNavigation;
