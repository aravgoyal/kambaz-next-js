"use client";

import Link from "next/link";
import { FormControl, FormSelect, Button } from "react-bootstrap";

export default function Profile() {
  return (
    <div id="wd-profile-screen" className="p-3" style={{ maxWidth: "400px", margin: "0 auto" }}>
      <h1 className="mb-3">Profile</h1>

      <FormControl
        defaultValue="alice"
        placeholder="Username"
        className="mb-2"
        id="wd-username"
      />

      <FormControl
        defaultValue="123"
        placeholder="Password"
        type="password"
        className="mb-2"
        id="wd-password"
      />

      <FormControl
        defaultValue="Alice"
        placeholder="First Name"
        className="mb-2"
        id="wd-firstname"
      />

      <FormControl
        defaultValue="Wonderland"
        placeholder="Last Name"
        className="mb-2"
        id="wd-lastname"
      />
      <FormControl
        defaultValue="2000-01-01"
        type="date"
        className="mb-2"
        id="wd-dob"
      />
      <FormControl
        defaultValue="alice@wonderland"
        type="email"
        placeholder="Email"
        className="mb-2"
        id="wd-email"
      />
      <FormSelect defaultValue="FACULTY" className="mb-3" id="wd-role">
        <option value="USER">User</option>
        <option value="ADMIN">Admin</option>
        <option value="FACULTY">Faculty</option>
        <option value="STUDENT">Student</option>
      </FormSelect>
      <Link href="/Account/Signin" className="btn btn-danger w-100">
        Sign Out
      </Link>
    </div>
  );
}
