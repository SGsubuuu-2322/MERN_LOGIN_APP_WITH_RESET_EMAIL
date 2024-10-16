// import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/Username.module.css";
import extend from "../styles/Profile.module.css";
import avatar from "../assets/profile.png";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { profileValidation } from "../helper/validate";
import { useState } from "react";
import convertToBase64 from "../helper/convert";
import useFetch from "../hooks/fetch.hook";
import { updateUser } from "../helper/helper";
// import { useAuthStore } from '../store/store'

function Profile() {
  const navigate = useNavigate();
  const [file, setFile] = useState();
  const [{ isLoading, apiData, serverError }] = useFetch();
  // console.log(apiData);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName: apiData?.rest?.firstName || "",
      lastName: apiData?.rest?.lastName || "",
      email: apiData?.rest?.email || "",
      mobile: apiData?.rest?.mobile || "",
      address: apiData?.rest?.address || "",
    },
    validate: profileValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = await Object.assign(values, {
        profile: file || apiData?.rest?.profile || "",
      });
      // console.log(values);
      let updateUserPromise = updateUser(values);

      toast.promise(updateUserPromise, {
        loading: "Updating...",
        success: <b>Updation successfully...</b>,
        error: <b>Error in profile updation...</b>,
      });
    },
  });

  /** formik doensn't support file upload so we need to create this handler */
  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  };

  if (isLoading) return <h1 className="text-2xl font-bold">Loading...</h1>;
  if (serverError)
    return (
      <h1 className="text-2xl font-bold text-red-500">{serverError.message}</h1>
    );

  async function userLogout() {
    await localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>

      <div className="flex justify-center items-center h-screen">
        <div
          className={styles.glass}
          style={{ width: "45%", paddingTop: "1em" }}
        >
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Profile</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              You can update the details.
            </span>
          </div>

          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-1">
              <label htmlFor="profile">
                <img
                  src={apiData?.rest?.profile || file || avatar}
                  className={`${styles.profile_img}`}
                  alt="avatar"
                />
              </label>

              <input
                onChange={onUpload}
                type="file"
                id="profile"
                name="profile"
              />
            </div>

            <div className="textbox flex flex-col items-center gap-3">
              <div className="name flex w-3/4 gap-4">
                <input
                  {...formik.getFieldProps("firstName")}
                  className={`${styles.textbox}  ${extend.textbox}`}
                  type="text"
                  placeholder="FirstName"
                />
                <input
                  {...formik.getFieldProps("lastName")}
                  className={`${styles.textbox}  ${extend.textbox}`}
                  type="text"
                  placeholder="LastName"
                />
              </div>

              <div className="name flex w-3/4 gap-4">
                <input
                  {...formik.getFieldProps("mobile")}
                  className={`${styles.textbox}  ${extend.textbox}`}
                  type="text"
                  placeholder="Mobile No."
                />
                <input
                  {...formik.getFieldProps("email")}
                  className={`${styles.textbox}  ${extend.textbox}`}
                  type="text"
                  placeholder="Email*"
                />
              </div>

              <input
                {...formik.getFieldProps("address")}
                className={`${styles.textbox}  ${extend.textbox}`}
                type="text"
                placeholder="Address"
              />
              <button className={styles.btn} type="submit">
                Update
              </button>
            </div>

            <div className="text-center">
              <span className="text-gray-500">
                Come back later ?{" "}
                <button onClick={userLogout} className="text-red-500" to="/">
                  Logut
                </button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
