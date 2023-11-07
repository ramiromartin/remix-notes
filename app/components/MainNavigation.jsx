import { NavLink } from "@remix-run/react";

function MainNavigation() {
  return (
    <nav id="main-navigation">
      <ul>
        <li className="nav-item">
          <NavLink prefetch="render" to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink prefetch="render" to="/notes">
            My Notes
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default MainNavigation;
