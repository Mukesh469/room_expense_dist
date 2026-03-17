import React from "react";

const PendingMembers = ({ pendingMembers }) => {
  if (!pendingMembers?.length) {
    return (
      <div className="text-center text-gray-500 py-10">
        No pending invitations
      </div>
    );
  }

  return (
    <div className="bg-white border rounded-xl p-4">
      <h2 className="font-semibold mb-4">Pending Invitations</h2>

      <div className="space-y-3">
        {pendingMembers.map((member) => (
          <div
            key={member._id}
            className="flex items-center justify-between border rounded-lg p-3"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gray-400 text-white flex items-center justify-center">
                {member?.name?.charAt(0)}
              </div>

              <div>
                <p className="font-medium">{member.name}</p>
                <p className="text-xs text-gray-500">{member.email}</p>
              </div>
            </div>

            <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
              Pending
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PendingMembers;