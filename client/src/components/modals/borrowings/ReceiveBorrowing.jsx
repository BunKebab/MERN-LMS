import React from "react";
import { useDispatch } from "react-redux";
import { receiveBorrowing } from "../../../actions/borrowingSlice";

const ReceiveBorrowing = ({borrowing}) => {
  const dispatch = useDispatch();

  return (
    <>
      <button
        className="btn btn-success"
        onClick={() => document.getElementById(`receive_borrowing_modal_${borrowing._id}`).showModal()}
      >
        Received
      </button>

      <dialog id={`receive_borrowing_modal_${borrowing._id}`} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Receive book</h3>
          <p className="py-4">Are you sure you have received the book?</p>
          <div className="modal-action flex justify-end">
            <button
              className="btn btn-success mr-2"
              onClick={() => {
                dispatch(receiveBorrowing(borrowing._id));
                // Close the modal
                document.getElementById(`receive_borrowing_modal_${borrowing._id}`).close();
              }}
            >
              Yes
            </button>
            <button
              className="btn btn-primary"
              onClick={() => {
                // Close the modal
                document.getElementById(`receive_borrowing_modal_${borrowing._id}`).close();
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

export default ReceiveBorrowing;
