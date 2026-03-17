import React, { useState, useContext } from "react";
import { FiUser, FiUserPlus } from "react-icons/fi";
import AddRoomMember from "./AddRoomMember";
import Modal from "../../../../../../common/Modal";
import RoomContext from "../../../../../../../context/room/RoomContext";

const Members = ({ onAddMember }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { currentRoomData } = useContext(RoomContext);
    const members = currentRoomData?.members || [];

    return (
        <div className="mt-4">
            <div className="flex items-center justify-between mb-3 px-10">
                <h2 className="text-sm font-semibold text-gray-700">Members ({members.length})</h2>
                <button
                    onClick={() => setIsOpen(true)}
                    className="flex items-center gap-2 bg-orange-500 text-white px-3 py-1.5 rounded-lg text-xs sm:text-sm hover:bg-orange-600 transition"
                >
                    <FiUserPlus size={16} /> Add Member
                </button>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl divide-y">
                {members.map((member) => (
                    <div key={member._id || member.email || Math.random()} className="flex items-center justify-between p-4 hover:bg-gray-50 hover:rounded-xl transition">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center font-semibold">
                                {member.name?.charAt(0) || <FiUser />}
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-gray-800">{member.name || "Pending Member"}</p>
                                <p className="text-xs text-gray-500">{member.email || "No email yet"}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            {member.isAdmin && <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-md font-medium">Admin</span>}
                            <span className={`text-xs px-2 py-1 rounded-md font-medium ${member.status === "accepted" ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-600"}`}>
                                {member.status || "pending"}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Add New Member">
                <AddRoomMember onAddMember={onAddMember} onClose={() => setIsOpen(false)} />
            </Modal>
        </div>
    );
};

export default Members;