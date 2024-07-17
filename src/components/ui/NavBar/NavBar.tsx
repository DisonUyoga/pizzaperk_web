import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Image from "next/image";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const nav_links = [
    {
      display: "Home",
      link: "/",
    },
    {
      display: "Orders",
      link: "/orders",
    },
    {
      display: "Profile",
      link: "/profile",
    },
  ];

  return (
    <nav className="bg-primary p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex gap-2 items-center">
          <Image
            src="/pizzaman.png"
            alt=""
            width={100}
            height={100}
            className={"w-6 h-6 rounded-full"}
          />
          <p className="text-white text-xl font-bold">PizaPerk</p>
        </div>
        <div className="hidden md:flex space-x-6">
          {nav_links.map((l) => (
            <Link href={l.link} className="text-white hover:text-gray-200">
              {l.display}
            </Link>
          ))}
        </div>
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            <FontAwesomeIcon
              icon={isOpen ? faTimes : faBars}
              className="text-gray-100 h-6 w-6"
            />
          </button>
        </div>
      </div>
      <div
        className={`flex flex-col gap-4 md:hidden transition-all duration-300 ${
          isOpen ? "block animate-slideDown" : "hidden animate-slideUp"
        }`}
      >
        {nav_links.map((l) => (
          <Link href={l.link} className="text-gray-100 hover:text-white">
            {l.display}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default NavBar;
