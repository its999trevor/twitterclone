// EditProfileModal.jsx
import React, { useState } from "react";
import api from "./api";
import Avatar from "react-avatar";

const EditProfileModal = ({ profileData, onClose, onSave }) => {
    const [fullname, setFullname] = useState(profileData.fullname);
    const [bio, setBio] = useState(profileData.bio || "");
    const [pfp, setPfp] = useState(profileData.pfp || null);
    const [cover, setCover] = useState(profileData.cover || null);

    const handleSave = async () => {
        try {
            const updatedProfile = {
                ...profileData,
                fullname,
                bio,
                pfp,
                cover
            };
            await api.put("/user/", updatedProfile);
            onSave(updatedProfile);
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    const handleFileChange = (event, type) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (type === "pfp") {
                    setPfp(reader.result);
                } else if (type === "cover") {
                    setCover(reader.result);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
                <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
                <label htmlFor="cover">
                    <img className="cursor-pointer hover:bg-gray-900" style={{height:"100px", width:"100%"}} src={cover || "https://pbs.twimg.com/profile_banners/1581707412922200067/1693248932/1080x360"} alt="banner" />
                </label>
                <input
                    name="cover"
                    onChange={(e) => handleFileChange(e, "cover")}
                    style={{ display: 'none' }}
                    type='file'
                    id="cover"
                />

                <div className='absolute top-80 mx-2 my-4 cursor-pointer hover:bg-gray-900  rounded-full'>
                    <label htmlFor="pfp">
                        <Avatar className="rounded-full" src={pfp || "https://pbs.twimg.com/profile_images/1703261403237502976/W0SFbJVS_400x400.jpg"} style={{height:"100%",width:"100%",border:"black 1px solid"}} size="70" round={true} />
                    </label>
                </div>
                <input
                    name="pfp"
                    onChange={(e) => handleFileChange(e, "pfp")}
                    style={{ display: 'none' }}
                    type='file'
                    id="pfp"
                />

                <label className="block mb-2">
                    Full Name
                    <input
                        type="text"
                        value={fullname}
                        onChange={(e) => setFullname(e.target.value)}
                        className="block w-full p-2 border border-gray-300 rounded"
                    />
                </label>
                <label className="block mb-2">
                    Bio
                    <textarea
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        className="block w-full p-2 border border-gray-300 rounded"
                    />
                </label>
                <div className="flex justify-end mt-4">
                    <button onClick={onClose} className="px-4 py-2 mr-2 bg-gray-200 rounded">Cancel</button>
                    <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
                </div>
            </div>
        </div>
    );
};

export default EditProfileModal;
