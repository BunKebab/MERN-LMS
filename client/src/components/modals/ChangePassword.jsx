import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { updatePassword, reset } from "../../actions/authSlice";
import { toast } from "react-toastify";
import Loader from "../Loader";

const ChangePassword = () => {
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      toast.success(message);
    }

    if (isLoading) {
      <Loader />;
    }
    
    // Reset the state after displaying messages
    return () => {
      dispatch(reset());
    };
  }, [isError, isLoading, isSuccess, message, dispatch]);

  return (
    <>
      <button
        className="btn btn-warning w-full mt-5"
        onClick={() =>
          document.getElementById("change_password_modal").showModal()
        }
      >
        Change Password
      </button>

      <dialog id="change_password_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Update Password</h3>

          <div className="p-4">
            <Formik
              initialValues={{
                currentPassword: "",
                newPassword: "",
              }}
              validationSchema={Yup.object().shape({
                currentPassword: Yup.string().required(
                  "Current password is required"
                ),
                newPassword: Yup.string()
                  .min(8, "Password must be at least 8 characters")
                  .required("New password is required"),
              })}
              onSubmit={async (values, { setSubmitting }) => {
                try {
                  await dispatch(
                    updatePassword({
                      userId: user.id,
                      currentPassword: values.currentPassword,
                      newPassword: values.newPassword,
                    })
                  ).unwrap();
                  document.getElementById("change_password_modal").close();
                } catch (error) {
                  console.error("Failed to update password:", error);
                } finally {
                  setSubmitting(false);
                }
              }}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-4">
                  <div className="flex flex-col space-y-1">
                    <label
                      htmlFor="currentPassword"
                      className="block font-medium"
                    >
                      Current Password
                    </label>
                    <Field
                      type="password"
                      id="currentPassword"
                      name="currentPassword"
                      className="input input-bordered w-full"
                    />
                    <ErrorMessage
                      name="currentPassword"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div className="flex flex-col space-y-1">
                    <label htmlFor="newPassword" className="block font-medium">
                      New Password
                    </label>
                    <Field
                      type="password"
                      id="newPassword"
                      name="newPassword"
                      className="input input-bordered w-full"
                    />
                    <ErrorMessage
                      name="newPassword"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Updating..." : "Update Password"}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>

          <div className="modal-action">
            <button
              className="btn"
              onClick={() =>
                document.getElementById("change_password_modal").close()
              }
            >
              Close
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default ChangePassword;
