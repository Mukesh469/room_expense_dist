import React, { useContext, useState } from 'react'
import RoomContext from '../../../../../context/room/RoomContext'
import InputField from '../../../../common/InputField';
import { validateRoomForm } from '../../../../../utils/inputValidation/validateRoomForm';
import toast from 'react-hot-toast';
import Button from '../../../../common/Button';

const CreateRoom = ({ onSuccess }) => {
    const { createRoom, loading } = useContext(RoomContext);
    const [error, setError] = useState({});

    const [roomInfo, setRoomInfo] = useState({
        name: "",
        desc: ""
    });

    const handleRoomSubmit = async (e) => {
        e.preventDefault();

        let newErrors = {};

        Object.keys(roomInfo).forEach((field) => {
            const error = validateRoomForm(field, roomInfo[field]);
            if (error) newErrors[field] = error;
        })

        setError(newErrors);

        if (Object.keys(newErrors).length > 0) return;
        console.log(roomInfo)
        try {
            const data = await createRoom(roomInfo);
            toast.success(data.message);
            setRoomInfo({ name: "", desc: "" });
            setError({});

            if (onSuccess) onSuccess();
        } catch (error) {
            console.log("Create Room Component Error: ", error);
            toast.error(error.message);
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        setRoomInfo((prev) => ({
            ...prev,
            [name]: value
        }));

        const errorMessage = validateRoomForm(name, value);
        setError((prev) => ({ ...prev, [name]: errorMessage }));
    }

    return (
        <div className=''>
            <form onSubmit={handleRoomSubmit} className='flex flex-col gap-2'>
                <InputField
                    name="name"
                    placeholder="Enter Room Name"
                    label="Room Name"
                    value={roomInfo.name}
                    required={true}
                    onChange={handleChange}
                    error={error.name}
                />

                <InputField
                    name="desc"
                    placeholder="Enter Room Desc"
                    label="Room Desc"
                    value={roomInfo.desc}
                    required={true}
                    onChange={handleChange}
                    error={error.desc}
                />

                <Button
                    type="submit"
                    loading={loading}
                >
                    Create
                </Button>
            </form>
        </div>
    )
}

export default CreateRoom