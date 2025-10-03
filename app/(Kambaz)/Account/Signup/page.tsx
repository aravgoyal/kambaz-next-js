"use client";

import Link from "next/link";
import { FormControl, Button } from "react-bootstrap";

export default function Signup() {
  return (
    <div id="wd-signup-screen" className="p-3" style={{ maxWidth: "400px", margin: "0 auto" }}>
      <h1 className="mb-3">Sign up</h1>

      <FormControl
        id="wd-username"
        placeholder="Username"
        className="mb-2"
      />
      <FormControl
        id="wd-password"
        placeholder="Password"
        type="password"
        className="mb-2"
      />
      <FormControl
        id="wd-password-verify"
        placeholder="Verify Password"
        type="password"
        className="mb-3"
      />
      <Link
        href="/Account/Profile"
        id="wd-signup-btn"
        className="btn btn-primary w-100 mb-2 text-center"
      >
        Sign up
      </Link>
      <div className="text-center">
        <Link id="wd-signin-link" href="/Account/Signin">
          Already have an account? Sign in
        </Link>
      </div>
    </div>
  );
}
