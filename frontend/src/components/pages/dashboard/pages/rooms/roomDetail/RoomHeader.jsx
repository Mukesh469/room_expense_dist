import React, { useState, useContext } from "react";
import { FiMoreVertical, FiUsers, FiPlus } from "react-icons/fi";
import { formatDate } from "../../../../../../utils/formatDate";
import Activity from "./tabs/Activity";
import Expenses from "./tabs/Expenses";
import Members from "./tabs/Members";
import PendingMembers from "./tabs/PendingMembers";
import RoomContext from "../../../../../../context/room/RoomContext";

const RoomHeader = () => {
  const { currentRoomData, addRoomMember } = useContext(RoomContext);
  const [activeTab, setActiveTab] = useState("expenses");

  if (!currentRoomData) return null;

  const {
    _id,
    roomName,
    roomDesc,
    roomCreatedBy,
    members,
    pendingMembers,
    createdAt,
  } = currentRoomData;

  const onAddMember = async (memberInfo) => {
    const result = await addRoomMember(_id, memberInfo);
    return result;
  };

  return (
    <div className="w-full">

      {/* Room Info */}
      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-linear-to-br from-orange-400 to-orange-600 text-white flex items-center justify-center font-semibold">
              {roomName?.charAt(0)}
            </div>

            <div>
              <h1 className="text-lg font-semibold">{roomName}</h1>
              {roomDesc && (
                <p className="text-sm text-gray-500">{roomDesc}</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 text-sm text-gray-500">
            <span>
              Created by{" "}
              <span className="font-medium text-gray-700">
                {roomCreatedBy?.name}
              </span>
            </span>

            <span>•</span>

            <span>{formatDate(createdAt)}</span>

            <span>•</span>

            <span className="flex items-center gap-1">
              <FiUsers size={14} />
              {members?.length || 0} members
            </span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="sticky bottom-0 bg-white shadow-sm flex justify-between p-3 mt-4">

        <div className="flex gap-2 bg-orange-100 p-1 rounded-lg">
          {["expenses", "members", "pending", "activity"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 text-sm rounded-md capitalize transition ${activeTab === tab
                  ? "bg-orange-500 text-white"
                  : "text-orange-600"
                }`}
            >
              {tab}

              {/* Pending Badge */}
              {tab === "pending" && pendingMembers?.length > 0 && (
                <span className="ml-2 bg-white text-orange-600 px-2 rounded-full text-xs">
                  {pendingMembers.length}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-orange-600">
            <FiPlus size={16} />
            Add Expense
          </button>

          <button className="p-2 rounded-lg hover:bg-orange-50">
            <FiMoreVertical size={18} className="text-orange-600" />
          </button>
        </div>
      </div>

      <div className="mt-4">
        {activeTab === "expenses" && <Expenses />}

        {activeTab === "members" && (
          <Members members={members} onAddMember={onAddMember} />
        )}

        {activeTab === "pending" && (
          <PendingMembers pendingMembers={pendingMembers} />
        )}

        {activeTab === "activity" && <Activity />}
      </div>
    </div>
  );
};

export default RoomHeader;