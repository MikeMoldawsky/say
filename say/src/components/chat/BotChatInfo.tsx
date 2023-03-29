import React from 'react';
import Image from 'next/image';
import {Bot} from "../../objects-api/bots";

interface BotInformationProps {
	bot: Bot;
}

const BotChatInfo: React.FC<BotInformationProps> = ({ bot }) => {

	return (
		<div className="h-screen overflow-auto p-4 flex flex-col">
			<div className="flex-grow flex flex-col items-center">
				<Image className="w-20 h-20 object-cover rounded-full mb-4" src={bot.imageUrl} alt={bot.name} width={80} height={80} />
				<h3 className="text-xl font-bold mb-2">{bot.name}</h3>
				<p className="text-base mb-2">{bot.description}</p>
			</div>
			<div className="mt-4 bg-gray-200 rounded-lg px-4 py-2 mb-4">
				<p className="font-semibold">System Message:</p>
				<p className="">{bot.systemMessage}</p>
			</div>
			<button
				onClick={() => alert("This feature is not yet implemented.")}
				className="bg-blue-500 text-white px-5 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
			>
				Switch Assistant
			</button>
		</div>
	);
};

export default BotChatInfo;
