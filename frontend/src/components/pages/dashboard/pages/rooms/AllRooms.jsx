import React from "react";
import { NavLink } from "react-router-dom";
import { FiArrowRightCircle, FiUsers, FiCalendar } from "react-icons/fi";
import { capitalizeLetter } from "../../../../../utils/capitalizeLetter";
import Button from "../../../../common/Button";
import { formatDate } from "../../../../../utils/formatDate";

const AllRooms = React.memo(({ roomList }) => {
    return (
        <div className="p-8 grid gap-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {roomList?.map(room => (
                <div
                    key={room._id}
                    className="group bg-white border border-gray-200 rounded-2xl p-6 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-105"
                >   
                    <div className="flex items-start gap-3 mb-4">
                        <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-orange-100 text-orange-600 font-semibold">
                            {room.roomName?.charAt(0).toUpperCase()}
                        </div>

                        <div>
                            <h2 className="text-md font-semibold text-gray-800 leading-tight">
                                {capitalizeLetter(room.roomName)}
                            </h2>

                            <p className="text-xs text-gray-500 truncate max-w-40">
                                {room.roomCreatedBy?.email}
                            </p>
                        </div>
                    </div>

                    <p className="text-sm text-gray-500 line-clamp-2 mb-4">
                        {capitalizeLetter(room.roomDesc)}
                    </p>

                    <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                            <FiCalendar className="text-gray-400" size={14} />
                            <span>{formatDate(room.createdAt)}</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <FiUsers className="text-gray-400" size={14} />
                            <span>{room.totalMembers} Members</span>
                        </div>
                    </div>

                    <div className="mt-6">
                        <NavLink to={`/dashboard/room/${room._id}/room-detail-page`}>
                            <Button
                                className="w-full flex items-center justify-center gap-2 transition group-hover:bg-orange-500 group-hover:text-white"
                                icon={<FiArrowRightCircle size={18} />}
                            >
                                Open Room
                            </Button>
                        </NavLink>
                    </div>
                </div>
            ))}
        </div>
    );
});

export default AllRooms;