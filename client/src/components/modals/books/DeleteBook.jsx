import React from "react";
import { useDispatch } from "react-redux";
import { deleteBook } from "../../../actions/bookSlice";

const DeleteBook = ({book}) => {
  const dispatch = useDispatch();

  return (
    <>
      <button
        className="btn btn-error"
        onClick={() => document.getElementById(`delete_book_modal_${book._id}`).showModal()}
      >
        Remove
      </button>

      <dialog id={`delete_book_modal_${book._id}`} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Remove book</h3>
          <p className="py-4">Are you sure you want to remove this book?</p>
          <div className="modal-action flex justify-end">
            <button
              className="btn btn-error mr-2"
              onClick={() => {
                dispatch(deleteBook(book._id));
                // Close the modal
                document.getElementById(`delete_book_modal_${book._id}`).close();
              }}
            >
              Yes
            </button>
            <button
              className="btn btn-primary"
              onClick={() => {
                // Close the modal
                document.getElementById(`delete_book_modal_${book._id}`).close();
              }}
            >
              No
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default DeleteBook;
