import React from "react";
import { useSelector } from "react-redux";

//import components
import DeleteBook from "./DeleteBook";
import EditBook from "./EditBook";
import RequestBook from "./RequestBook";

const BookRow = ({ book }) => {
  const { user } = useSelector((state) => state.auth);
  return (
    <>
      <tr
        className="cursor-pointer hover:bg-gray-200 border border-gray-300"
        onClick={() =>
          document.getElementById(`book_modal_${book._id}`).showModal()
        }
      >
        <td className="border border-gray-300">{book.title}</td>
        <td className="border border-gray-300">{book.author}</td>
      </tr>
      <dialog id={`book_modal_${book._id}`} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{book.title}</h3>
          <p className="">Author: {book.author}</p>
          <p className="">Category: {book.category}</p>
          <p className="">ISBN: {book.isbn}</p>
          <p className="">Reference ID: {book.refId}</p>
          <div className="modal-action flex justify-end gap-2 mt-4">
            {user.role === "Admin" ? (
              <>
                <EditBook book={book} />
                <DeleteBook book={book} />
              </>
            ) : (
              <RequestBook book={book}/>
            )}
            <button
              className="btn"
              onClick={() =>
                document.getElementById(`book_modal_${book._id}`).close()
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

export default BookRow;
