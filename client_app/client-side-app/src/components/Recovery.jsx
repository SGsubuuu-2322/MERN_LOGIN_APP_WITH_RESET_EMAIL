// import React from "react";
import styles from "../styles/Username.module.css";
import toast, { Toaster } from "react-hot-toast";

import { useAuthStore } from "../store/store";
import { useEffect, useState } from "react";
import { generateOTP, verifyOTP } from "../helper/helper";
import { useNavigate } from "react-router-dom";

function Recovery() {
  const { username } = useAuthStore((state) => state?.auth);
  const [OTP, setOTP] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    generateOTP(username).then((OTP) => {
      if (OTP) {
        return toast.success("OTP has been sent to your email...");
      }

      return toast.error("Problem while generating OTP...");
    });
  }, [username]);

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      let { status } = await verifyOTP({ username, code: OTP });

      if (status === 201) {
        toast.success("OTP verified successfully");
        return navigate("/reset");
      }
    } catch (error) {
      return toast.error("Wrong OTP. Check email again!!!");
    }
  };

  const resendOTP = () => {
    let sendPromise = generateOTP(username);

    toast.promise(sendPromise, {
      loading: "Sending...",
      success: <b>OTP has been sent to your email...</b>,
      error: <b>Couldn&apos;t send the OTP!!!</b>,
    });

    // sendPromise.then((OTP) => {
    //   console.log(OTP);
    // });
  };

  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>

      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Recovery</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Enter OTP to recover your password.
            </span>
          </div>

          <form className="pt-20" onSubmit={onSubmit}>
            <div className="textbox flex flex-col items-center gap-3">
              <div className="input text-center">
                <span className="py-4 text-sm text-left text-gray-500">
                  Enter 6 digit OTP sent to your email address.
                </span>
                <input
                  onChange={(e) => setOTP(e.target.value)}
                  className={styles.textbox}
                  type="text"
                  placeholder="OTP"
                />
              </div>
              <button className={styles.btn} type="submit">
                Recover Now
              </button>
            </div>
          </form>

          <div className="text-center">
            <span className="text-gray-500">
              Can&apos;t get OTP ?{" "}
              <button
                onClick={resendOTP}
                className="text-red-500"
                to="/recovery"
              >
                Resend
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Recovery;
