import React from "react";

const MemberRow = ({ member }) => {
  return (
    <>
      <tr
        className="cursor-pointer hover:bg-gray-200 border border-gray-300"
        onClick={() =>
          document.getElementById(`member_modal_${member._id}`).showModal()
        }
      >
        <td className="border border-gray-300">{member.name}</td>
        <td className="border border-gray-300">{member.email}</td>
      </tr>
      <dialog id={`member_modal_${member._id}`} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{member.name}</h3>
          <p className="">Email: {member.email}</p>
          <div className="modal-action flex justify-end gap-2 mt-4">
            <button
              className="btn"
              onClick={() =>
                document.getElementById(`member_modal_${member._id}`).close()
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

export default MemberRow;
