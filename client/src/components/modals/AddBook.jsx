import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";

const CreateBookForm = () => {
  const dispatch = useDispatch();

  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    author: Yup.string().required("Author is required"),
    category: Yup.string().required("Category is required"),
    ISBN: Yup.string().required("ISBN is required"),
    refId: Yup.string().required("Reference ID is required"),
  });

  // Initial form values
  const initialValues = {
    title: "",
    author: "",
    category: "",
    ISBN: "",
    refId: "",
  };

  // Form submission handler
  const handleSubmit = (values, { resetForm }) => {
    // Dispatch action to create book
    // Reset form after submission
    resetForm();
    // Close modal
    document.getElementById("create_book_modal").close();
  };

  return (
    <div>
      {/* Button to open the modal */}
      <button
        className="btn"
        onClick={() => document.getElementById("create_book_modal").showModal()}
      >
        Add Book
      </button>

      {/* Modal */}
      <dialog id="create_book_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Create New Book</h3>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form>
                {/* Title */}
                <div className="py-2">
                  <label htmlFor="title" className="block font-medium">
                    Title
                  </label>
                  <Field
                    type="text"
                    id="title"
                    name="title"
                    className="input input-bordered w-full"
                  />
                  <ErrorMessage
                    name="title"
                    component="p"
                    className="text-red-500"
                  />
                </div>

                {/* Author */}
                <div className="py-2">
                  <label htmlFor="author" className="block font-medium">
                    Author
                  </label>
                  <Field
                    type="text"
                    id="author"
                    name="author"
                    className="input input-bordered w-full"
                  />
                  <ErrorMessage
                    name="author"
                    component="p"
                    className="text-red-500"
                  />
                </div>

                {/* Category */}
                <div className="py-2">
                  <label htmlFor="category" className="block font-medium">
                    Category
                  </label>
                  <Field
                    as="select"
                    id="category"
                    name="category"
                    className="input input-bordered w-full"
                  >
                    <option value="">Select Category</option>
                    <option value="Novel">Novel</option>
                    <option value="Non-fiction">Non-fiction</option>
                    <option value="Helping-book">Helping-book</option>
                  </Field>
                  <ErrorMessage
                    name="category"
                    component="p"
                    className="text-red-500"
                  />
                </div>

                {/* ISBN */}
                <div className="py-2">
                  <label htmlFor="ISBN" className="block font-medium">
                    ISBN
                  </label>
                  <Field
                    type="text"
                    id="ISBN"
                    name="ISBN"
                    className="input input-bordered w-full"
                  />
                  <ErrorMessage
                    name="ISBN"
                    component="p"
                    className="text-red-500"
                  />
                </div>

                {/* Reference ID */}
                <div className="py-2">
                  <label htmlFor="refId" className="block font-medium">
                    Reference ID
                  </label>
                  <Field
                    type="text"
                    id="refId"
                    name="refId"
                    className="input input-bordered w-full"
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
                    Create Book
                  </button>
                  <button
                    type="button"
                    className="btn ml-2"
                    onClick={() => document.getElementById("create_book_modal").close()}
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

export default AddBook;
