import { NavLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import AuthProvider from "./AuthProvider";
import { getCurrentUser } from "@/config/session";
import NavbarButton from "./NavbarButton";

const Navbar = async () => {
  const session = await getCurrentUser();
  return (
    <nav className="flexBetween navbar">
      <div className="flex-1 flexStart gap-10">
        <Link href="/">
          <Image src="/logo.png" width={64} height={43} alt="devTech" />
        </Link>
        <ul className="lg:flex hidden text-small gap-7">
          {NavLinks.map((link) => (
            <Link href={link.href} key={link.key}>
              {link.text}
            </Link>
          ))}
        </ul>
      </div>

      <div className="flexCenter gap-4">
        {session?.user ? (
          <>
            <NavbarButton session={session} />
            <Link href="/create-project">Share work</Link>
          </>
        ) : (
          <AuthProvider />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
