import React, { useContext, useState, useCallback } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { BeatLoader } from "react-spinners";
import { POST } from "@/API/postRepository";
import Cookies from "js-cookie";
import { NavContext } from "@/Context/Store";
import { useRouter } from "next/router";
import { Toast, ToastBody, ToastContainer } from "react-bootstrap";

const LoginForm = () => {
  const { setIsLoggedIn } = useContext(NavContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "" });
  const router = useRouter();

  const validationSchema = Yup.object({
    username: Yup.string().required("کد ملی خود را وارد کنید "),
    password: Yup.string().required("رمز عبور الزامی است"),
  });

  const handleSubmit = useCallback(
    async (values) => {
      setIsSubmitting(true);
      try {
        const response = await POST("accounts/login/", values);
        const data = await response.json();

        if (response.ok) {
          Cookies.set("token", data.token, { expires: 7 });
          setIsLoggedIn(true);
          router.push("/");
        } else {
          setToast({ show: true, message: "کد ملی یا رمز عبور اشتباه است" });
        }
      } catch (error) {
        setToast({
          show: true,
          message: "خطا در برقراری ارتباط، لطفاً دوباره تلاش کنید",
        });
      } finally {
        setIsSubmitting(false);
      }
    },
    [setIsLoggedIn, router]
  );

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative">
        <h1 className="text-2xl font-bold mb-6 text-center">ورود</h1>
        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={validationSchema}
          validateOnBlur={false}
          validateOnChange={false}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="space-y-4">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  کد ملی
                </label>
                <Field
                  name="username"
                  type="text"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  رمز عبور
                </label>
                <Field
                  name="password"
                  type="password"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <BeatLoader color="#ffffff" size={9} />
                  ) : (
                    "ورود"
                  )}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>

      {/* نمایش پیام خطا در صورت وجود */}
      <ToastContainer position="bottom-center" className="p-3 absolute">
        <Toast
          show={toast.show}
          onClose={() => setToast({ show: false, message: "" })}
          delay={5000}
          autohide
        >
          <ToastBody>{toast.message}</ToastBody>
        </Toast>
      </ToastContainer>
    </div>
  );
};

export default LoginForm;
