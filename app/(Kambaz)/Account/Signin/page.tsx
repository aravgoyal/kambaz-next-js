"use client";
import Link from "next/link";
import { redirect } from "next/dist/client/components/navigation";
import { setCurrentUser } from "../reducer";
import { useDispatch } from "react-redux";
import { useState } from "react";
import * as db from "../../Database";
import { FormControl, Button } from "react-bootstrap";
import * as client from "../client";

export default function Signin() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
 const [credentials, setCredentials] = useState<any>({});
 const dispatch = useDispatch();
 const signin = async () => {
    console.log("Signing in with credentials:", credentials);
    const user =  await client.signin(credentials);
    console.log("Received user from signin:", user);
    if (!user) return;
    console.log("Signed in user:", user);
    dispatch(setCurrentUser(user));
    redirect("/Dashboard");
  };

  return (
    <div id="wd-signin-screen">
      <h1>Sign in</h1>
      <FormControl defaultValue={credentials.username}
             onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
             className="mb-2" placeholder="username" id="wd-username" />
      <FormControl defaultValue={credentials.password}
             onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
             className="mb-2" placeholder="password" type="password" id="wd-password" />
      <Button onClick={signin} id="wd-signin-btn" className="w-100" > Sign in </Button>
      <Link id="wd-signup-link" href="/Kambaz/Account/Signup"> Sign up </Link>
    </div>
);}
