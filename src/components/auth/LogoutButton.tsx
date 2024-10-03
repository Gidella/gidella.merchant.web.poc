
"use client";

import { handleLogout } from "@/actions/auth";

const LogoutButton = () => {
  
  const _handleLogout = () => { handleLogout() };

  return (
    <button onClick={_handleLogout} className="btn btn-danger">
      Logout
    </button>
  );
};

export default LogoutButton;