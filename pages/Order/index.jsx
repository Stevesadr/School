import { POST } from "@/API/postRepository";
import { ErrorMessage, FastField, Field, Form, Formik } from "formik";
import React, { useState, useCallback, useMemo } from "react";
import { Toast, ToastBody, ToastContainer } from "react-bootstrap";
import { BeatLoader } from "react-spinners";
import * as Yup from "yup";

const formFields = {
  name: "",
  email: "",
  identity: "",
  score_year: "",
  grade_year: "",
  name_of_last_school: "",
  phone_number: "",
  fathers_name: "",
  mothers_name: "",
  fathers_job: "",
  mothers_job: "",
  father_number: "",
  mother_number: "",
};

const validationSchema = Yup.object({
  name: Yup.string().required("نام و نام خانوادگی خود را وارد نمایید"),
  email: Yup.string().email().required("ایمیل خود را وارد نمایید"),
  identity: Yup.number()
    .min(10)
    .positive()
    .required("کد ملی خود را وارد نمایید"),
  score_year: Yup.number()
    .required()
    .test("score_year", "اعشار باید دو رقمی باشد", (value) => {
      if (!value) return true;
      return (value.toString().split(".")[1] || "").length <= 2;
    })
    .positive(),
  grade_year: Yup.number()
    .oneOf([10, 11, 12], "سال تحصیلی باید ۱۰، ۱۱ یا ۱۲ باشد")
    .required("سال تحصیلی خود را وارد نمایید"),
  phone_number: Yup.number()
    .min(11)
    .positive()
    .required("شماره موبایل خود را وارد نمایید"),
  fathers_name: Yup.string().required("نام پدر"),
  mothers_name: Yup.string().required("نام مادر"),
  fathers_job: Yup.string().required("شغل پدر"),
  mothers_job: Yup.string().required("شغل مادر"),
  father_number: Yup.number()
    .min(11)
    .positive()
    .required("شماره موبایل پدر را وارد نمایید"),
  mother_number: Yup.number()
    .min(11)
    .positive()
    .required("شماره موبایل مادر را وارد نمایید"),
});

const Index = () => {
  const [toast, setToast] = useState({ show: false, message: "" });

  const submitHandler = useCallback(async (values, { setSubmitting }) => {
    try {
      const response = await POST("order/register/", values);
      if (!response.ok) throw new Error("مشکلی در سرور رخ داده است");

      setToast({ show: true, message: "درخواست شما با موفقیت انجام شد!" });
    } catch (error) {
      setToast({
        show: true,
        message: "مشکلی در ارسال درخواست رخ داده است: " + error.message,
      });
    } finally {
      setSubmitting(false);
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center relative p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-6 text-center">فرم ثبت نام</h1>
        <h3 className="text-sm font-thin text-gray-500">
          در صورت حضور نداشتن پدر یا مادر در جمع خانواده اطلاعات یکی از آنها را
          به جای هر دو وارد کنید.
        </h3>
        <Formik
          initialValues={formFields}
          validationSchema={validationSchema}
          onSubmit={submitHandler}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    * نام و نام خانوادگی
                  </label>
                  <Field
                    name="name"
                    type="text"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    * ایمیل
                  </label>
                  <Field
                    name="email"
                    type="email"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div>
                  <label
                    htmlFor="identity"
                    className="block text-sm font-medium text-gray-700"
                  >
                    * کد ملی
                  </label>
                  <Field
                    name="identity"
                    type="text"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <ErrorMessage
                    name="identity"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div>
                  <label
                    htmlFor="score_year"
                    className="block text-sm font-medium text-gray-700"
                  >
                    * نمره سال گذشته
                  </label>
                  <Field
                    name="score_year"
                    type="text"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <ErrorMessage
                    name="score_year"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div>
                  <label
                    htmlFor="grade_year"
                    className="block text-sm font-medium text-gray-700"
                  >
                    * سال تحصیلی
                  </label>
                  <Field
                    name="grade_year"
                    as="select"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="">انتخاب کنید</option>
                    <option value="10">دهم</option>
                    <option value="11">یازدهم</option>
                    <option value="12">دوازدهم</option>
                  </Field>
                  <ErrorMessage
                    name="grade_year"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div>
                  <label
                    htmlFor="name_of_last_school"
                    className="block text-sm font-medium text-gray-700"
                  >
                    نام مدرسه قبلی
                  </label>
                  <Field
                    name="name_of_last_school"
                    type="text"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <ErrorMessage
                    name="name_of_last_school"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone_number"
                    className="block text-sm font-medium text-gray-700"
                  >
                    * شماره تلفن
                  </label>
                  <Field
                    name="phone_number"
                    type="text"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <ErrorMessage
                    name="phone_number"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div>
                  <label
                    htmlFor="fathers_name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    * نام پدر
                  </label>
                  <Field
                    name="fathers_name"
                    type="text"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <ErrorMessage
                    name="fathers_name"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div>
                  <label
                    htmlFor="mothers_name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    * نام مادر
                  </label>
                  <Field
                    name="mothers_name"
                    type="text"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <ErrorMessage
                    name="mothers_name"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div>
                  <label
                    htmlFor="fathers_job"
                    className="block text-sm font-medium text-gray-700"
                  >
                    * شغل پدر
                  </label>
                  <Field
                    name="fathers_job"
                    type="text"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <ErrorMessage
                    name="fathers_job"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div>
                  <label
                    htmlFor="mothers_job"
                    className="block text-sm font-medium text-gray-700"
                  >
                    * شغل مادر
                  </label>
                  <Field
                    name="mothers_job"
                    type="text"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <ErrorMessage
                    name="mothers_job"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div>
                  <label
                    htmlFor="father_number"
                    className="block text-sm font-medium text-gray-700"
                  >
                    * شماره پدر
                  </label>
                  <Field
                    name="father_number"
                    type="text"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <ErrorMessage
                    name="father_number"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div>
                  <label
                    htmlFor="mother_number"
                    className="block text-sm font-medium text-gray-700"
                  >
                    * شماره مادر
                  </label>
                  <Field
                    name="mother_number"
                    type="text"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <ErrorMessage
                    name="mother_number"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                >
                  {isSubmitting ? (
                    <BeatLoader color="#ffffff" size={9} />
                  ) : (
                    "ثبت نام"
                  )}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <ToastContainer
        position="bottom-end"
        className="p-3"
        style={{ zIndex: 1 }}
      >
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

export default Index;
