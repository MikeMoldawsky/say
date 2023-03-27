import React from 'react';
import { Bot } from './BotCard';
import { useRouter } from 'next/router';

interface BotInformationProps {
	bot: Bot;
}

const BotInformation: React.FC<BotInformationProps> = ({ bot }) => {
	const router = useRouter();

	const switchBot = () => {
		const newBotId = bot.id === 1 ? 2 : 1;
		router.push(`/chat?id=${newBotId}`);
	};

	const buttonText = bot.id === 1 ? "Change to Sad Assistant" : "Change to Happy Assistant";

	return (
		<div className="h-screen overflow-auto p-4 flex flex-col">
			<div className="flex-grow flex flex-col items-center">
				<img className="w-20 h-20 object-cover rounded-full mb-4" src={bot.imageUrl} alt={bot.name} />
				<h3 className="text-xl font-bold mb-2">{bot.name}</h3>
				<p className="text-base mb-2">{bot.description}</p>
			</div>
			<div className="mt-4 bg-gray-200 rounded-lg px-4 py-2 mb-4">
				<p className="font-semibold">System Message:</p>
				<p className="">{bot.systemMessage}</p>
			</div>
			<button
				onClick={switchBot}
				className="bg-blue-500 text-white px-5 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
			>
				{buttonText}
			</button>
		</div>
	);
};

export default BotInformation;
