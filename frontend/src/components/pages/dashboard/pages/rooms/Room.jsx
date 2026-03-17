import { useContext, useEffect, useState } from "react";
import CreateRoom from "./CreateRoom";
import Modal from "../../../../common/Modal";
import InputField from "../../../../common/InputField";
import AllRooms from "./AllRooms";
import RoomContext from "../../../../../context/room/RoomContext";

const Room = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { getAllRoom, roomList } = useContext(RoomContext);

  useEffect(() => {
    getAllRoom();
  }, []);

  const handleRoomCreated = () => {
    getAllRoom();
    setIsOpen(false);
  };


  return (
    <div className="">

      <div className="w-full flex justify-between sticky top-0 p-3  bg-white  rounded-md sm:rounded-xl z-40">
        <div className="w-1/2">
          <InputField placeholder="Search your rooms here" />
        </div>

        <button
          onClick={() => setIsOpen(true)}
          className="rounded-md py-1 px-3 bg-orange-400 text-white hover:bg-orange-500 hover:scale-105 duration-300"
        >
          + Create Room
        </button>
      </div>

      <AllRooms roomList={roomList} />

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Create New Room"
      >
        <CreateRoom onSuccess={handleRoomCreated} />
      </Modal>
    </div>
  );
};

export default Room