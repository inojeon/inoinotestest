import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export const LOCALSTORAGE_TOKEN = "oneSound-token";

interface IFormInput {
  id: String;
  password: String;
}

const Home = () => {
  const route = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFormInput>();

  useEffect(() => {
    const token = localStorage.getItem(LOCALSTORAGE_TOKEN);
    axios
      .get(`/api/me/`, {
        headers: { "x-jwt": token || "" },
      })
      .then((res) => {
        // console.log(res);
        const { ok } = res.data;
        if (ok) {
          route.push("/dashboard");
        }
      });
  }, []);

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const { id, password } = data;
    axios
      .get(`/api/login/`, {
        params: {
          id,
          password,
        },
      })
      .then((res) => {
        const { ok, token } = res.data;
        if (ok && token) {
          localStorage.setItem(LOCALSTORAGE_TOKEN, token);

          route.push("/dashboard");
        }
      });
  };
  return (
    <>
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-slate-900">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="text-white">
            <h1 className="text-center">admin : 1234</h1>
            {/* {isLoading ? "Loading.." : <h1 className="text-5xl">{user}</h1>} */}
          </div>
          <div className="flex flex-col justify-center items-center">
            <Image
              src="/logo.png"
              alt="Landscape picture"
              width={454}
              height={100}
            />
          </div>
          <h2 className="mt-6 text-center text-4xl font-extrabold text-white">
            OLoRa System
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md text-white">
          <div className=" pb-8 pt-2 px-4 shadow sm:rounded-lg sm:px-10 bg-slate-800">
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <p className="mt-2 text-center text-2xl text-gray-100">Log In</p>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-white"
                >
                  ID
                </label>
                <div className="mt-1">
                  <input
                    {...register("id")}
                    name="id"
                    type="id"
                    autoComplete="id"
                    required
                    className="text-gray-900 appearance-none block w-full px-3 py-2 border border-gray-100 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-white"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    {...register("password")}
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="text-gray-900 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
