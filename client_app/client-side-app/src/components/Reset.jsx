// import React from "react";
import styles from "../styles/Username.module.css";
import avatar from "../assets/profile.png";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { resetPasswordValidation } from "../helper/validate";
import { useAuthStore } from "../store/store";
import { resetPassword } from "../helper/helper";
import { Navigate, useNavigate } from "react-router-dom";
import useFetch from "../hooks/fetch.hook";

function Reset() {
  const [{ isLoading, apiData, status, serverError }] =
    useFetch("createResetSession");

  const navigate = useNavigate();
  const { username } = useAuthStore((state) => state.auth);
  const formik = useFormik({
    initialValues: {
      password: "Admin@123",
      confirm_pwd: "Admin@123",
    },
    validate: resetPasswordValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      // console.log(values);
      let resetPromise = resetPassword({ username, password: values.password });

      toast.promise(resetPromise, {
        loading: "Updating...",
        success: <b>Password reset successfully...</b>,
        error: <b>Failed to reset password...</b>,
      });

      resetPromise.then(() => {
        navigate("/password");
      });
    },
  });

  if (isLoading) return <h1 className="text-2xl font-bold">Loading...</h1>;
  if (serverError)
    return (
      <h1 className="text-2xl font-bold text-red-500">{serverError.message}</h1>
    );

  if (status && status !== 201)
    <Navigate to={"/password"} replace={true}></Navigate>;
  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>

      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass} style={{ width: "50%" }}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Reset</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Enter new password
            </span>
          </div>

          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <img src={avatar} className={styles.profile_img} alt="avatar" />
            </div>

            <div className="textbox flex flex-col items-center gap-3">
              <input
                {...formik.getFieldProps("password")}
                className={styles.textbox}
                type="text"
                placeholder="Password"
              />
              <input
                {...formik.getFieldProps("confirm_pwd")}
                className={styles.textbox}
                type="text"
                placeholder="Repeat Password"
              />
              <button className={styles.btn} type="submit">
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Reset;
