import React from "react";

const BookRow = ({ book }) => {
  return (
    <>
      <tr
        className="cursor-pointer hover:bg-gray-200 border border-gray-300"
        onClick={() => document.getElementById(`book_modal_${book._id}`).showModal()}
      >
        <td className="border border-gray-300">{book.title}</td>
        <td className="border border-gray-300">{book.author}</td>
      </tr>
      <dialog id={`book_modal_${book._id}`} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{book.title}</h3>
          <p className="py-4">Author: {book.author}</p>
          <p className="py-4">Category: {book.category}</p>
          <p className="py-4">ISBN: {book.isbn}</p>
          <p className="py-4">Reference ID: {book.refId}</p>
          <div className="modal-action">
            <button className="btn" onClick={() => document.getElementById(`book_modal_${book._id}`).close()}>
              Close
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default BookRow;
