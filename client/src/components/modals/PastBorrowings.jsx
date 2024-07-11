import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPastBorrowings } from "../../actions/pastBorrowingSlice";

//import components
import Loader from '../Loader'

const PastBorrowings = ({ email }) => {
  const dispatch = useDispatch();
  const pastBorrowings = useSelector((state) => state.pastBorrowings.pastBorrowings);
  const isLoading = useSelector((state) => state.pastBorrowings.isLoading);

  useEffect(() => {
    dispatch(getPastBorrowings(email));
  }, [dispatch, email]);

  // Function to open modal
  const openModal = (id) => {
    document.getElementById(id).showModal();
  };

  // Function to close modal
  const closeModal = (id) => {
    document.getElementById(id).close();
  };

  return (
    <>
      {/* Button to open modal */}
      <button className="btn btn-info" onClick={() => openModal(`past_borrowings_modal_${email}`)}>
        Past borrowings
      </button>

      {/* Modal dialog */}
      <dialog id={`past_borrowings_modal_${email}`} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Past Borrowings</h3>
          {isLoading ? (
            <Loader />
          ) : (
            <div>
              {/* Table to display past borrowings */}
              <table className="w-full border border-gray-300 rounded-lg">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left">Reference ID</th>
                    <th className="px-4 py-2 text-left">Issue Date</th>
                    <th className="px-4 py-2 text-left">Return Date</th>
                  </tr>
                </thead>
                <tbody>
                  {pastBorrowings.map((borrowing) => (
                    <tr className="cursor-pointer hover:bg-gray-200 border border-gray-300" key={borrowing._id}>
                      <td className="border border-gray-300">{borrowing.redId}</td>
                      <td className="border border-gray-300">{borrowing.issueDate}</td>
                      <td className="border border-gray-300">{borrowing.returnDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Modal actions */}
          <div className="modal-action">
            <button className="btn" onClick={() => closeModal(`past_borrowings_modal_${email}`)}>
              Close
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default PastBorrowings;
