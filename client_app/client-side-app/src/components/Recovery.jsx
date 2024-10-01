// import React from "react";
import styles from "../styles/Username.module.css";
import { Toaster } from "react-hot-toast";

// import { useAuthStore } from '../store/store'

function Recovery() {
  const onSubmit = (e) => {
    console.log(e);
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
                  className={styles.textbox}
                  type="text"
                  placeholder="OTP"
                />
              </div>
              <button className={styles.btn} type="submit">
                Recover Now
              </button>
            </div>

            <div className="text-center">
              <span className="text-gray-500">
                Can&apos;t get OPT ?{" "}
                <button className="text-red-500" to="/recovery">
                  Resend
                </button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Recovery;
