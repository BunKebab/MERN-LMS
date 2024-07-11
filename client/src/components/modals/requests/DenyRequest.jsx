import React from "react";
import { useDispatch } from "react-redux";
import { denyRequest } from "../../../actions/requestSlice";

const DenyRequest = ({request}) => {
  const dispatch = useDispatch();

  return (
    <>
      <button
        className="btn btn-error"
        onClick={() => document.getElementById(`deny_request_modal_${request._id}`).showModal()}
      >
        Deny
      </button>

      <dialog id={`deny_request_modal_${request._id}`} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Deny request</h3>
          <p className="py-4">Are you sure you want to deny this request?</p>
          <div className="modal-action flex justify-end">
            <button
              className="btn btn-error mr-2"
              onClick={() => {
                dispatch(denyRequest(request._id));
                // Close the modal
                document.getElementById(`deny_request_modal_${request._id}`).close();
              }}
            >
              Yes
            </button>
            <button
              className="btn btn-primary"
              onClick={() => {
                // Close the modal
                document.getElementById(`deny_request_modal_${request._id}`).close();
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

export default DenyRequest;
