import { NavContext } from "@/Context/Store";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useContext } from "react";
import Logo from "../../public/cropped-photo_6005693113080860372_y.png";
import { RiLoginBoxLine } from "react-icons/ri";
import { MdOutlineMapsHomeWork } from "react-icons/md";
import { MdOutlineAppRegistration } from "react-icons/md";
import { GrScorecard } from "react-icons/gr";
import { PiHandDepositBold } from "react-icons/pi";
import { CgProfile } from "react-icons/cg";
import { useRouter } from "next/router";

const Nav = () => {
  const { isOpen, setIsOpen } = useContext(NavContext);
  const { isLoading } = useContext(NavContext);
  const router = useRouter();
  const clickHandler = () => {
    router.push("/");
  };

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isOpen]);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="z-50 ">
      <nav className="bg-gray-200 p-4 z-50">
        <div className="container mx-auto flex justify-between md:justify-start items-center">
          <div className="text-white text-lg font-bold ">
            <Image src={Logo} className="w-16 " onClick={clickHandler} />
          </div>
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none bg-slate-400"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            </button>
          </div>
          <div className="hidden md:flex md:space-x-4 z-50">
            {isLoading ? (
              <div className="w-[350px] flex items-center justify-around">
                <Link
                  href={""}
                  className="flex items-center justify-center bg-gray-100 p-1 rounded-md"
                >
                  <GrScorecard />
                  <span className=" mx-4">نمرات </span>
                </Link>
                <Link
                  href={""}
                  className="flex items-center justify-center bg-gray-100 p-1 rounded-md"
                >
                  <PiHandDepositBold />
                  <samp className=" mx-4">واریز </samp>
                </Link>
                <Link
                  href={""}
                  className="flex items-center justify-center bg-gray-100 p-1 rounded-md"
                >
                  <CgProfile />
                  <span className=" mx-4">پروفایل </span>
                </Link>
              </div>
            ) : (
              <div className="w-96 flex items-center justify-around">
                <Link
                  href={"./Order"}
                  className="flex items-center justify-center bg-gray-100  p-1 rounded-md"
                >
                  <MdOutlineAppRegistration />
                  <span className="mx-4">پیش ثبت نام</span>
                </Link>
                <Link
                  href={""}
                  className="flex items-center justify-center bg-gray-100 p-1 rounded-md "
                >
                  <RiLoginBoxLine />
                  <span className=" mx-4">ورود</span>
                </Link>
                <Link
                  href={""}
                  className="flex items-center justify-center bg-gray-100 p-1 rounded-md"
                >
                  <MdOutlineMapsHomeWork />
                  <samp className=" mx-4"> کارد اجرایی</samp>
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-gray-300 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } z-50`}
      >
        <div className="p-4">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
        <div className="mt-4 z-50">
          {isLoading ? (
            <div className="flex flex-col p-4">
              <Link
                href={"./Order"}
                className=" my-3 flex items-center justify-center bg-gray-100 p-1 rounded-md"
              >
                <MdOutlineAppRegistration />
                <span className="mx-4">پیش ثبت نام</span>
              </Link>
              <Link
                href={""}
                className="my-3 flex items-center justify-center bg-gray-100 p-1 rounded-md"
              >
                <GrScorecard />
                <span className=" mx-4">نمرات </span>
              </Link>
              <Link
                href={""}
                className="my-3 flex items-center justify-center bg-gray-100 p-1 rounded-md"
              >
                <PiHandDepositBold />
                <samp className=" mx-4">واریز </samp>
              </Link>
              <Link
                href={""}
                className="my-3 flex items-center justify-center bg-gray-100 p-1 rounded-md"
              >
                <CgProfile />
                <span className=" mx-4">پروفایل </span>
              </Link>
            </div>
          ) : (
            <div className=" flex flex-col p-4">
              <Link
                href={""}
                className="my-3 flex items-center justify-center bg-gray-100 p-1 rounded-md"
              >
                <RiLoginBoxLine />
                <span className=" mx-4">ورود</span>
              </Link>
              <Link
                href={""}
                className="flex items-center justify-center bg-gray-100 p-1 rounded-md"
              >
                <MdOutlineMapsHomeWork />
                <samp className=" mx-4"> کارد اجرایی</samp>
              </Link>
            </div>
          )}
        </div>
      </div>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleMenu}
        ></div>
      )}
    </div>
  );
};

export default Nav;
