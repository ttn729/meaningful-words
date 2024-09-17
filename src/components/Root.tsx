import { Typography } from "@mui/material";
import { Link, Outlet } from "react-router-dom";

export default function Root() {
  return (
    <>
      <div id="sidebar">
        <h1>Nhum Tools</h1>
        <nav>
          <ul>
            <Typography variant="h6" fontWeight="bold">
              <a href="/">Meaningful Words</a>
            </Typography>
            {/* <li>
              <Link to={`/create-worksheet`}>Create Worksheet</Link>
            </li> */}
            <li>
              <Link to={`/manage-wordpack`}>Manage Word Pack</Link>
            </li>
          </ul>
        </nav>
      </div>

      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}
