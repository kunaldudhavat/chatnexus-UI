import React from 'react';

const Profile = ({ closeProfile }) => {
    return (
        <div className="p-4 bg-gray-900 text-white h-full">
            <div className="flex justify-end">
                <button onClick={closeProfile} className="text-lg font-bold">X</button>
            </div>
            <div className="flex flex-col items-center">
                <div className="w-24 h-24 bg-gray-700 rounded-full mb-4"></div>
                <h2 className="text-xl font-bold">John Doe</h2>
                <p className="text-gray-400">Available</p>
            </div>
            <form className="mt-4 space-y-4">
                <div>
                    <label className="block text-sm">Bio</label>
                    <textarea className="w-full p-2 bg-gray-800 text-white rounded-lg focus:outline-none" placeholder="Enter your bio"></textarea>
                </div>
                <div>
                    <label className="block text-sm">Location</label>
                    <input type="text" className="w-full p-2 bg-gray-800 text-white rounded-lg focus:outline-none" placeholder="Enter your location" />
                </div>
                <div>
                    <label className="block text-sm">Website</label>
                    <input type="text" className="w-full p-2 bg-gray-800 text-white rounded-lg focus:outline-none" placeholder="Enter your website" />
                </div>
                <div className="flex justify-between">
                    <button type="button" onClick={closeProfile} className="text-gray-400">Cancel</button>
                    <button type="submit" className="text-white">Save</button>
                </div>
            </form>
        </div>
    );
};

export default Profile;
