import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeRequest } from "../../../actions/requestSlice";

const RequestRenewal = ({ borrowing }) => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <button
        className="btn btn-success"
        onClick={() =>
          document.getElementById(`request_renewal_modal_${borrowing._id}`).showModal()
        }
      >
        Renew
      </button>

      <dialog id={`request_renewal_modal_${borrowing._id}`} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Request renewal</h3>
          <p className="py-4">Are you sure you want to make request?</p>
          <div className="modal-action flex justify-end">
            <button
              className="btn btn-success mr-2"
              onClick={() => {
                const userId = user.id;
                const borrowingId = borrowing._id;
                const requestData = {
                  userId,
                  borrowingId,
                  requestType: "Renew",
                };
                console.log(requestData)
                dispatch(makeRequest(requestData));
                // Close the modal
                document
                  .getElementById(`request_renewal_modal_${borrowing._id}`)
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
                  .getElementById(`request_renewal_modal_${borrowing._id}`)
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

export default RequestRenewal;
