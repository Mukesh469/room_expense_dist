import { useState } from "react";
import RoomContext from "./RoomContext"

const RoomState = ({ children }) => {
    const [currentRoomData, setCurrentRoomData] = useState(null);
    const [newRoom, setNewRoom] = useState(null);
    const [roomList, setRoomList] = useState([]);
    const [loading, setLoading] = useState(false);

    const host = import.meta.env.VITE_BACKEND_URL;

    const getHeaders = () => ({
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
    });

    const createRoom = async ({ name, desc }) => {
        setLoading(true)
        try {
            const res = await fetch(`${host}/api/room/create`, {
                method: "POST",
                headers: getHeaders(),
                body: JSON.stringify({ name, desc })
            })
            const response = await res.json();
            console.log(`room response api: `, response)

            if (!response.success) {
                throw new Error(response.message);
            }
            setNewRoom(response.newRoom);
            setRoomList((prev) => [response.newRoom, ...prev]);
            return { message: response.message || "Room created successfully." }

        } catch (error) {
            console.log(`Error createRoom api: `, error.message);
            setNewRoom(null);
            throw error;
        } finally {
            setLoading(false)
        }
    }

    const getAllRoom = async () => {
        setLoading(true)
        try {
            const res = await fetch(`${host}/api/room`, {
                method: "GET",
                headers: getHeaders(),
            })
            const response = await res.json();

            if (response.success) {
                setRoomList(response.rooms);
                return { message: response.message || "Rooms fetched successfully." }
            }
        } catch (error) {
            console.log(`Error createRoom api: `, error.message);
            setNewRoom(null)
        } finally {
            setLoading(false)
        }
    }

    const getCurrentRoom = async (roomId) => {
        try {
            const res = await fetch(`${host}/api/room/${roomId}`, {
                headers: getHeaders(),
            });

            const response = await res.json();

            if (!res.ok || !response.success) {
                return {
                    success: false,
                    message: response.message || "Failed to fetch room"
                };
            }

            setCurrentRoomData(response.room);

            return {
                success: true,
                data: response.room
            };

        } catch (error) {
            console.log("Error fetching room:", error);

            return {
                success: false,
                message: "Something went wrong while fetching room"
            };
        }
    };

    const addRoomMember = async (roomId, memberInfo) => {
        try {
            const res = await fetch(`${host}/api/room/${roomId}/addmember`, {
                method: "POST",
                headers: getHeaders(),
                body: JSON.stringify(memberInfo)
            });

            const data = await res.json();

            if (data.success) {
                setCurrentRoomData((prev) => ({
                    ...prev,
                    members: [...prev.members, data.member],
                }));
            }

            return data;

        } catch (err) {
            console.error("Add Room Member:", err.message);

            return {
                success: false,
                message: "Something went wrong"
            };
        }
    };

    return (
        <RoomContext.Provider value={{
            loading,
            newRoom,
            roomList,
            currentRoomData,
            createRoom,
            getAllRoom,
            getCurrentRoom,
            addRoomMember,
        }}>
            {children}
        </RoomContext.Provider>
    )
}
export default RoomState;