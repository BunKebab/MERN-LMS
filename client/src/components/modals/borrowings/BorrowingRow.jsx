import React from "react";

//import components
import ReceiveBorrowing from "./ReceiveBorrowing";
import RenewBorrowing from "./RenewBorrowing";

const BorrowingRow = ({ borrowing }) => {
  return (
    <>
      <tr
        className="cursor-pointer hover:bg-gray-200 border border-gray-300"
        onClick={() =>
          document
            .getElementById(`borrowing_modal_${borrowing._id}`)
            .showModal()
        }
      >
        <td className="border border-gray-300">{borrowing.email}</td>
        <td className="border border-gray-300">{borrowing.refId}</td>
      </tr>
      <dialog id={`borrowing_modal_${borrowing._id}`} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Book reference ID: {borrowing.refId}
          </h3>
          <h3 className="font-bold text-lg">Member email: {borrowing.email}</h3>
          <p className="">Issue date: {borrowing.issueDate}</p>
          <p className="">Deadline: {borrowing.deadline}</p>
          <p className="">Fine: {borrowing.fine}</p>
          <div className="modal-action flex justify-end gap-2 mt-4">
            <RenewBorrowing borrowing={borrowing} />
            <ReceiveBorrowing borrowing={borrowing} />
            <button
              className="btn"
              onClick={() =>
                document
                  .getElementById(`borrowing_modal_${borrowing._id}`)
                  .close()
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

export default BorrowingRow;
