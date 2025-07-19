import React, { useState, useEffect } from "react";
import { getProfile, updateProfile } from "../../utils/localStorageUtils";


const ProfileSettings = () => {
  const [profile, setProfile] = useState({ name: "", avatar: "" });

  useEffect(() => {
    setProfile(getProfile());
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    updateProfile(profile);
    alert("Profile saved!");
  };

  return (
    <div className="p-4 text-white">
      <h1 className="text-2xl font-bold mb-4">Profile Settings</h1>
      <input
        className="block mb-2 p-2 bg-gray-700 rounded w-full"
        name="name"
        placeholder="Enter name"
        value={profile.name}
        onChange={handleChange}
      />
      <input
        className="block mb-2 p-2 bg-gray-700 rounded w-full"
        name="avatar"
        placeholder="Avatar image URL"
        value={profile.avatar}
        onChange={handleChange}
      />
      <button onClick={handleSave} className="bg-green-600 px-4 py-2 rounded">
        Save Profile
      </button>
    </div>
  );
};

export default ProfileSettings;
