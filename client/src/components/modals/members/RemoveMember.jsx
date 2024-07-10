import React from "react";
import { useDispatch } from "react-redux";
import { deleteMember } from "../../../actions/memberSlice";

const DeleteMember = ({member}) => {
  const dispatch = useDispatch();

  return (
    <>
      <button
        className="btn btn-error"
        onClick={() => document.getElementById(`delete_member_modal_${member._id}`).showModal()}
      >
        Remove Member
      </button>

      <dialog id={`delete_member_modal_${member._id}`} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Remove member</h3>
          <p className="py-4">Are you sure you want to remove this member?</p>
          <div className="modal-action flex justify-end">
            <button
              className="btn btn-error mr-2"
              onClick={() => {
                dispatch(deleteMember(member._id));
                // Close the modal
                document.getElementById(`delete_member_modal_${member._id}`).close();
              }}
            >
              Yes
            </button>
            <button
              className="btn btn-primary"
              onClick={() => {
                // Close the modal
                document.getElementById(`delete_member_modal_${member._id}`).close();
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

export default DeleteMember;
