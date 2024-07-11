import React from "react";
import { useDispatch } from "react-redux";
import { approveRequest } from "../../../actions/requestSlice";

const ApproveRequest = ({ request }) => {
  const dispatch = useDispatch();
  console.log(request._id)

  const handleApprove = () => {
    const issueDate = new Date();
    const deadline = new Date(issueDate);
    deadline.setDate(deadline.getDate() + 7);

    const approvalData =
      request.requestType === "Borrow"
        ? { issueDate: issueDate.toISOString(), deadline: deadline.toISOString() }
        : { newDeadline: deadline.toISOString() };

    dispatch(approveRequest({ requestId: request._id, approvalData }));
    console.log(requestId, approvalData)
    // Close the modal
    document.getElementById(`approve_request_modal_${request._id}`).close();
  };

  return (
    <>
      <button
        className="btn btn-success"
        onClick={() =>
          document.getElementById(`approve_request_modal_${request._id}`).showModal()
        }
      >
        Approve
      </button>

      <dialog id={`approve_request_modal_${request._id}`} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Approve request</h3>
          <p className="py-4">Are you sure you want to approve this request?</p>

          <div className="modal-action flex justify-end">
            <button
              className="btn btn-success mr-2"
              onClick={handleApprove}
            >
              Yes
            </button>
            <button
              className="btn btn-primary"
              onClick={() => {
                // Close the modal
                document.getElementById(`approve_request_modal_${request._id}`).close();
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

export default ApproveRequest;
