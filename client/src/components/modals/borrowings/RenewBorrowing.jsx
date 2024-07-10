import React from "react";
import { useDispatch } from "react-redux";
import { renewBorrowing } from "../../../actions/borrowingSlice";

const RenewBorrowing = ({ borrowing }) => {
  const dispatch = useDispatch();

  return (
    <>
      <button
        className="btn btn-primary"
        onClick={() =>
          document
            .getElementById(`renew_borrowing_modal_${borrowing._id}`)
            .showModal()
        }
      >
        Renew
      </button>

      <dialog id={`renew_borrowing_modal_${borrowing._id}`} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Renew book</h3>
          <p className="py-4">Are you sure you want to renew the book?</p>
          <div className="modal-action flex justify-end">
            <button
              className="btn btn-primary mr-2"
              onClick={() => {
                const today = new Date();
                const oneWeekLater = new Date(today);
                oneWeekLater.setDate(today.getDate() + 7);
                const borrowingId = borrowing._id
                dispatch(renewBorrowing({borrowingId, newDeadline: oneWeekLater.toISOString()}));
                // Close the modal
                document
                  .getElementById(`renew_borrowing_modal_${borrowing._id}`)
                  .close();
              }}
            >
              Yes
            </button>
            <button
              className="btn"
              onClick={() => {
                // Close the modal
                document
                  .getElementById(`renew_borrowing_modal_${borrowing._id}`)
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

export default RenewBorrowing;
