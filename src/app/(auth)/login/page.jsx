"use client"; // Render in client side

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";

import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

/**
 * @Author Santi Rijal
 */

const Login = () => {
  const [err, setErr] = useState(null); // Keep track of login errors
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  // Handle login
  const onSubmit = (data) => {
    const { email, password } = data; // Destructure data

    // Attempt to signin using given email and password
    signIn("credentials", {
      email,
      password,
      redirect: false,
    })
      .then((value) => {
        if (value.ok) {
          router.push("/home");
        } else {
          setErr(value.error);
        }
      })
      .catch((err) => setErr(err));
  };

  return (
    <div className="max-w-[100vw] min-h-[100vh] md:flex items-center justify-center">
      <div className="relative sm:block md:flex h-[100vh] lg:w-[70%] lg:h-[40%] rounded bg-[url('../images/loginImage.jpeg')] bg-cover bg-no-repeat overflow-hidden">
        <div className="sm:w-[100%] h-[100%] md:w-[60%] md:border-r-2 md:border-dark-gold flex flex-col px-[3rem] justify-evenly">
          <button type="button" onClick={() => router.back()} className="w-fit">
            <IoIosArrowBack className="text-white mt-[20px] w-[2.5rem] h-[2.5rem]" />
          </button>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col justify-center items-end lg:px-[5rem] pt-[5rem] pb-[10rem] gap-y-[1.2rem]"
          >
            {err !== null && (
              <p className="w-[100%] flex justify-center text-dark-gold">{`**${err}**`}</p>
            )}

            <section className="flex flex-col w-[100%] gap-y-[8px]">
              <label htmlFor="email" className="text-white text-[1.3rem]">
                Email
              </label>
              <input
                className="outline-none p-[10px] rounded"
                id="email"
                type="email"
                placeholder="test@gmail.com"
                {...register("email", { required: true })}
              />
            </section>

            <section className="flex flex-col w-[100%] gap-y-[8px]">
              <label htmlFor="password" className="text-white text-[1.3rem]">
                Password
              </label>
              <input
                className="outline-none p-[10px] rounded"
                id="password"
                type="password"
                placeholder="Test123#"
                {...register("password", { required: true })}
              />
            </section>

            <Link href={"#"} className="">
              <span className="text-light-gold">Forgot password?</span>
            </Link>

            <input
              type="submit"
              value="Login"
              className="bg-light-brown w-[100%] p-[10px] rounded text-white hover:cursor-pointer active:opacity-[50%]"
            />

            <p className="text-white flex items-center justify-center gap-x-[10px] w-[100%]">
              Don&rsquo;t have an account?
              <Link href={"/register"}>
                <span className="text-light-gold active:opacity-[50%]">
                  Register
                </span>
              </Link>
            </p>

            <p className="text-white flex items-center justify-center gap-x-[10px] w-[100%]">
              <Link href={"/home"}>
                <span className="text-light-gold active:opacity-[50%]">
                  Return to Home Page.
                </span>
              </Link>
            </p>
          </form>
        </div>

        <div className="hidden md:flex w-[40%] justify-center items-center">
          <p className="text-light-gold w-[100%] h-[100%] flex items-center text-center text-[2.5rem] backdrop-blur-sm">
            Welcome back to Culinary Explorer!
          </p>
        </div>

        <a
          className="absolute right-0 p-[10px] text-white opacity-40"
          href="https://www.freepik.com/free-photo/pots-vegetables-harvest_1440232.htm#fromView=search&page=2&position=37&uuid=d9d546fb-3f26-4fc2-a00f-881e75893a91"
        >
          Image by freepik
        </a>
      </div>
    </div>
  );
};

export default Login;
