import React from "react";

//import components
import RequestRenewal from "./RequestRenewal";

const BorrowedBook = ({ borrowing }) => {
  return (
    <>
      <div className="card bg-base-100 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">{borrowing.refId}</h2>
          <p>Issued at: {borrowing.issueDate}</p>
          <p>Due date: {borrowing.deadline}</p>
          <div className="card-actions justify-end">
            <RequestRenewal borrowing={borrowing} />
          </div>
        </div>
      </div>
    </>
  );
};

export default BorrowedBook;
