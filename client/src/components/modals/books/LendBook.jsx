import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import axios from "axios";
import { createBorrowing } from "../../../actions/borrowingSlice";
import { toast } from "react-toastify";

const LendBook = () => {
  const dispatch = useDispatch();

  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required"),
    refId: Yup.string().required("Book reference ID is required"),
  });

  // Initial form values
  const initialValues = {
    email: "",
    refId: "",
  };

  // Form submission handler
  const handleSubmit = async (values, { resetForm }) => {
    try {
      const { email, refId } = values;

      // Prepare borrowing data
      const today = new Date();
      const oneWeekLater = new Date(today);
      oneWeekLater.setDate(today.getDate() + 7);
      const borrowingData = {
        email,
        refId,
        issueDate: today.toISOString(),
        deadline: oneWeekLater.toISOString(),
      };
      console.log(borrowingData)

      // Dispatch action to create borrowing
      dispatch(createBorrowing(borrowingData));

      // Reset form after submission
      resetForm();

      // Close modal
      document.getElementById("lend_book_modal").close();
    } catch (error) {
      toast.error("Error creating borrowing entry:", error);
    }
  };

  return (
    <div>
      {/* Button to open the modal */}
      <button
        className="btn btn-primary"
        onClick={() => document.getElementById("lend_book_modal").showModal()}
      >
        Lend Book
      </button>

      {/* Modal */}
      <dialog id="lend_book_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Lend Book</h3>
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
                    User Email
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

                {/* refId */}
                <div className="py-2">
                  <label htmlFor="refId" className="block font-medium">
                    Book Reference ID
                  </label>
                  <Field
                    type="text"
                    id="refId"
                    name="refId"
                    className="input input-bordered w-full"
                    autoComplete="off"
                  />
                  <ErrorMessage
                    name="refId"
                    component="p"
                    className="text-red-500"
                  />
                </div>

                {/* Modal action buttons */}
                <div className="modal-action">
                  <button type="submit" className="btn btn-primary">
                    Confirm
                  </button>
                  <button
                    type="button"
                    className="btn ml-2"
                    onClick={() =>
                      document.getElementById("lend_book_modal").close()
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

export default LendBook;
