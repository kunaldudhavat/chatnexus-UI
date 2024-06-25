import React from 'react';

const ChatMessages = () => {
    return (
        <div className="flex-1 p-4 overflow-y-auto bg-gray-900">
            <div className="flex flex-col space-y-2">
                <div className="self-start bg-gray-800 text-white p-3 rounded-lg max-w-xs">
                    <p>Hey, how's it going?</p>
                    <span className="text-xs text-gray-400 block mt-1">2:34 PM</span>
                </div>
                <div className="self-end bg-green-600 text-white p-3 rounded-lg max-w-xs">
                    <p>I'm doing great, thanks for asking!</p>
                    <span className="text-xs text-gray-400 block mt-1">2:35 PM</span>
                </div>
                <div className="self-start bg-gray-800 text-white p-3 rounded-lg max-w-xs">
                    <p>That's good to hear. Did you see the new update?</p>
                    <span className="text-xs text-gray-400 block mt-1">2:36 PM</span>
                </div>
                <div className="self-end bg-green-600 text-white p-3 rounded-lg max-w-xs">
                    <p>Yeah, I just installed it. Looks great!</p>
                    <span className="text-xs text-gray-400 block mt-1">2:37 PM</span>
                </div>
            </div>
        </div>
    );
};

export default ChatMessages;
