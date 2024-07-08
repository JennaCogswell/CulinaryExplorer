"use client"; // Render client side

import React, { useId, useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";

import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";

/**
 * @Author Santi Rijal
 */

const Register = () => {
  const [err, setErr] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const id = useId();

  // Watch the 'password' fields
  const password = watch("password", "");

  const router = useRouter();

  // Handle registration.
  const onSubmit = async (data) => {
    const { name, email, password } = data;

    const n = name ? name : `User${id}`;

    // Try to register user.
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          n,
          email,
          password,
        }),
      });

      //If successful take to login page.
      res.status === 201 &&
        router.push("/login?success=Account has been created");

      setErr(res.statusText);
    } catch (err) {
      console.log(err);
    }
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
            className="flex flex-col justify-center items-end lg:px-[5rem] pt-[3rem] pb-[6rem] gap-y-[15px]"
          >
            {err !== null && (
              <p className="w-[100%] flex justify-center text-dark-gold">{`**${err}**`}</p>
            )}

            <section className="flex flex-col w-[100%] gap-y-[8px]">
              <label
                htmlFor="username"
                className="text-white text-[1.3rem] flex items-center gap-x-[10px]"
              >
                Username{" "}
                <span className="text-[0.8rem] opacity-[80%]">(Optional)</span>
              </label>
              <input
                className="outline-none p-[10px] rounded"
                id="username"
                type="text"
                placeholder="Test"
                {...register("name", { required: false })}
              />
            </section>

            <section className="flex flex-col w-[100%] gap-y-[8px]">
              <label htmlFor="email" className="text-white text-[1.3rem]">
                Email
              </label>
              <input
                className="outline-none p-[10px] rounded"
                id="email"
                name="email"
                type="email"
                placeholder="test@gmail.com"
                {...register("email", {
                  required: true,
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Not a valid email format.",
                  },
                })}
              />
              {errors?.email && (
                <p className="text-dark-gold text-[0.9rem]">
                  {errors?.email?.message}
                </p>
              )}
            </section>

            <section className="flex flex-col w-[100%] gap-y-[8px]">
              <label htmlFor="password" className="text-white text-[1.3rem]">
                Password
              </label>
              <input
                className="outline-none p-[10px] rounded"
                id="password"
                name="password"
                type="password"
                placeholder="Test123#"
                {...register("password", {
                  required: true,
                  pattern: {
                    value:
                      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message:
                      "Passwords must be at at least 8 characters long. With at least one number and special character.",
                  },
                })}
              />
              {errors?.password && (
                <p className="text-dark-gold text-[0.9rem]">
                  {errors?.password?.message}
                </p>
              )}
            </section>

            <section className="flex flex-col w-[100%] gap-y-[8px]">
              <label htmlFor="cPassword" className="text-white text-[1.3rem]">
                Confirm Password
              </label>
              <input
                className="outline-none p-[10px] rounded"
                id="cPassword"
                name="cPassword"
                type="password"
                placeholder="Test123#"
                {...register("cPassword", {
                  required: true,
                  validate: (value) =>
                    value === password || "The passwords do not match",
                })}
              />

              {errors?.cPassword && (
                <p className="text-dark-gold text-[0.9rem]">
                  {errors?.cPassword?.message}
                </p>
              )}
            </section>

            <input
              type="submit"
              value="Register"
              className="bg-light-brown w-[100%] p-[10px] rounded text-white hover:cursor-pointer active:opacity-[50%] mt-[20px]"
            />

            <p className="text-white flex items-center justify-center gap-x-[10px] w-[100%]">
              Already have an account?
              <Link href={"/login"}>
                <span className="text-light-gold active:opacity-[50%]">
                  Login
                </span>
              </Link>
            </p>
          </form>
        </div>

        <div className="hidden md:flex w-[40%] justify-center items-center">
          <p className="text-light-gold w-[100%] h-[100%] flex items-center justify-center px-[10px] text-center text-[2.5rem] backdrop-blur-sm">
            Welcome to Culinary Explorer!
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

export default Register;
