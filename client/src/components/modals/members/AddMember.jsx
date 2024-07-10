import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addMember } from "../../../actions/memberSlice";

const AddMember = () => {
  const dispatch = useDispatch();

  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required"),
    name: Yup.string().required("Name is required"),
    password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
  });

  // Initial form values
  const initialValues = {
    email: "",
    name: "",
    password: ""
  };

  // Form submission handler
  const handleSubmit = (values, { resetForm }) => {
    // Dispatch action to create member
    dispatch(addMember(values));
    // Reset form after submission
    resetForm();
    // Close modal
    document.getElementById("create_member_modal").close();
  };

  return (
    <div>
      {/* Button to open the modal */}
      <button
        className="btn btn-primary"
        onClick={() => document.getElementById("create_member_modal").showModal()}
      >
        Add member
      </button>

      {/* Modal */}
      <dialog id="create_member_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add New member</h3>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form autoComplete="off">
                {/* Email */}
                <div className="py-2">
                  <label htmlFor="email" className="block font-medium">
                    Email
                  </label>
                  <Field
                    type="text"
                    id="email"
                    name="email"
                    className="input input-bordered w-full"
                    autoComplete="off"
                  />
                  <ErrorMessage
                    name="email"
                    component="p"
                    className="text-red-500"
                  />
                </div>

                {/* Name */}
                <div className="py-2">
                  <label htmlFor="name" className="block font-medium">
                    Name
                  </label>
                  <Field
                    type="text"
                    id="name"
                    name="name"
                    className="input input-bordered w-full"
                    autoComplete="off"
                  />
                  <ErrorMessage
                    name="name"
                    component="p"
                    className="text-red-500"
                  />
                </div>

                {/* password */}
                <div className="py-2">
                  <label htmlFor="password" className="block font-medium">
                    Password
                  </label>
                  <Field
                    type="password"
                    id="password"
                    name="password"
                    className="input input-bordered w-full"
                    autoComplete="new-password"
                  />
                  <ErrorMessage
                    name="password"
                    component="p"
                    className="text-red-500"
                  />
                </div>

                {/* Modal action buttons */}
                <div className="modal-action">
                  <button type="submit" className="btn btn-primary">
                    Add member
                  </button>
                  <button
                    type="button"
                    className="btn ml-2"
                    onClick={() =>
                      document.getElementById("create_member_modal").close()
                    }
                  >
                    Cancel
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </dialog>
    </div>
  );
};

export default AddMember;
