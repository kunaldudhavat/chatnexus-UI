import React, { useState } from 'react';
import { BiArrowBack } from 'react-icons/bi';

const GroupDetails = ({ onCreateGroup, onBack }) => {
    const [groupName, setGroupName] = useState('');
    const [groupImage, setGroupImage] = useState(null);

    const handleGroupImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setGroupImage(e.target.files[0]);
        }
    };

    const handleSubmit = () => {
        onCreateGroup({ name: groupName, image: groupImage });
    };

    return (
        <div className="flex flex-col h-full">
            <div className="p-4 border-b border-gray-700 flex items-center">
                <BiArrowBack className="text-2xl cursor-pointer mr-4" onClick={onBack} />
                <h2 className="text-xl font-bold text-white">Create Group</h2>
            </div>
            <div className="p-4 flex flex-col items-center">
                <label className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center cursor-pointer">
                    <input
                        type="file"
                        className="hidden"
                        onChange={handleGroupImageChange}
                    />
                    {groupImage ? (
                        <img
                            src={URL.createObjectURL(groupImage)}
                            alt="Group"
                            className="w-full h-full rounded-full object-cover"
                        />
                    ) : (
                        <span className="text-gray-400">Add Image</span>
                    )}
                </label>
                <input
                    type="text"
                    placeholder="Group Name"
                    className="mt-4 bg-gray-800 rounded-full p-2 text-white focus:outline-none w-full"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                />
            </div>
            <div className="p-4">
                <button
                    className="w-full bg-green-600 text-white rounded-full p-2"
                    onClick={handleSubmit}
                >
                    Create Group
                </button>
            </div>
        </div>
    );
};

export default GroupDetails;
