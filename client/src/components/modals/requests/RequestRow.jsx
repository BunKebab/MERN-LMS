import React from "react";
import { useSelector } from "react-redux";

//import components
import DenyRequest from "./DenyRequest";
import ApproveRequest from "./ApproveRequest";

const RequestRow = ({ request }) => {
  const { user } = useSelector((state) => state.auth);
  return (
    <>
      <tr
        className="cursor-pointer hover:bg-gray-200 border border-gray-300"
        onClick={() =>
          document.getElementById(`request_modal_${request._id}`).showModal()
        }
      >
        <td className="border border-gray-300">{request.email}</td>
        <td className="border border-gray-300">{request.refId}</td>
      </tr>
      <dialog id={`request_modal_${request._id}`} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{request.email}</h3>
          <p className="">
            Requested to {request.requestType} {request.refId}
          </p>
          <div className="modal-action flex justify-end gap-2 mt-4">
            <ApproveRequest request={request} />
            <DenyRequest request={request} />
            <button
              className="btn"
              onClick={() =>
                document.getElementById(`request_modal_${request._id}`).close()
              }
            >
              Close
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default RequestRow;
