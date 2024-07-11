import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeRequest } from "../../../actions/requestSlice";

const RequestBook = ({ book }) => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <button
        className="btn btn-success"
        onClick={() =>
          document.getElementById(`request_book_modal_${book._id}`).showModal()
        }
      >
        Request
      </button>

      <dialog id={`request_book_modal_${book._id}`} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Request book</h3>
          <p className="py-4">Are you sure you want to make request?</p>
          <div className="modal-action flex justify-end">
            <button
              className="btn btn-success mr-2"
              onClick={() => {
                const userId = user.id;
                const bookId = book._id;
                const requestData = {
                  userId,
                  bookId,
                  requestType: "Borrow",
                };
                dispatch(makeRequest(requestData));
                // Close the modal
                document
                  .getElementById(`request_book_modal_${book._id}`)
                  .close();
              }}
            >
              Yes
            </button>
            <button
              className="btn btn-primary"
              onClick={() => {
                // Close the modal
                document
                  .getElementById(`request_book_modal_${borrowing._id}`)
                  .close();
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

export default RequestBook;
