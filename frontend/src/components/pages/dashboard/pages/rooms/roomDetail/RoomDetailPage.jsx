import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import RoomContext from '../../../../../../context/room/RoomContext'
import RoomHeader from './RoomHeader'
import toast from "react-hot-toast";


const RoomDetailPage = () => {
  const { roomId } = useParams();
  const { currentRoomData, getCurrentRoom } = useContext(RoomContext);

  useEffect(() => {
    const fetchRoom = async () => {
      if (!roomId) return;

      const result = await getCurrentRoom(roomId);

      if (!result.success) {
        toast.error(result.message);
      }
    };

    fetchRoom();
  }, [roomId]);

  if (!currentRoomData) {
    return <div className="text-center py-20 text-gray-500">Loading room...</div>;
  }

  return (
    <div>
      <RoomHeader />
    </div>
  )
}

export default RoomDetailPage;