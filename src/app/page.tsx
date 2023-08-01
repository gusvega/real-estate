"use client";

import { useState } from "react";
import SignIn from "./components/signin";
import SignUp from "./components/signup";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  let [authInfo, setAuthInfo] = useState({
    isloggedIn: false,
  });

  let [current, setCurrent] = useState(true);

  const handleClick = () => {
    setCurrent(!current);
  };

  const handleSubmitClick = () => {
    router.push("/home");
  };

  return (
    <div className="text-white">
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-xl font-bold leading-9 tracking-tight text-white">
            Welcome to my Real Estate Analysis Tool! 
            <br></br>
            <br></br>
            Looks like you are not signed in...
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="flex mb-6">
            <button
              type="submit"
              className={`flex w-full justify-center rounded-md ${
                current == false ? "bg-gray-300" : "bg-indigo-600"
              } m-1 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
              onClick={handleClick}
            >
              Sign In
            </button>
            <button
              type="submit"
              className={`flex w-full justify-center rounded-md ${
                current ? "bg-gray-300" : "bg-indigo-600"
              } m-1 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
              onClick={handleClick}
            >
              Sign Up
            </button>
          </div>
          <form className="space-y-6" action="#" method="POST">
            {authInfo.isloggedIn ? (
              <>dd</>
            ) : current == true ? (
              <SignIn />
            ) : (
              <SignUp />
            )}
          </form>
          <button
            type="submit"
            className={`flex w-full justify-center rounded-md bg-indigo-600 mt-10 p-4 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
            onClick={handleSubmitClick}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
