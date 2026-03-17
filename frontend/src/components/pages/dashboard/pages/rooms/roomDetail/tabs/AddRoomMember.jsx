import React, { useState } from "react";
import InputField from "../../../../../../common/InputField";
import toast from "react-hot-toast";

const AddRoomMember = ({ onAddMember, onClose }) => {

  const [memberInfo, setMemberInfo] = useState({
    email: "",
    phone: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setMemberInfo((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRoomMember = async (e) => {
    e.preventDefault();

    const result = await onAddMember(memberInfo);

    if (!result) {
      toast.error("Something went wrong");
      return;
    }

    if (result.success) {
      toast.success(result.message);
      setMemberInfo({ email: "", phone: "" });
      onClose();
    } else {
      toast.error(result.message);
    }
  };

  return (
    <form onSubmit={handleRoomMember} className="space-y-4 w-full">

      <InputField
        name="email"
        type="email"
        label="Email"
        placeholder="Enter email"
        value={memberInfo.email}
        onChange={handleChange}
        required
      />

      <InputField
        name="phone"
        type="text"
        label="Phone"
        placeholder="Enter phone number"
        value={memberInfo.phone}
        onChange={handleChange}
        required
      />

      <button
        type="submit"
        className="bg-orange-500 text-white px-4 py-2 rounded-lg w-full hover:bg-orange-600 transition"
      >
        Invite Member
      </button>

    </form>
  );
};

export default AddRoomMember;