import React from 'react';
import Image from 'next/image';
import { Bot } from '../../objects-api/bots';

interface BotCardProps {
	bot: Bot;
	onDelete: (bot: Bot) => void;
	onConfigure: (bot: Bot) => void;
	onChat: (bot: Bot) => void;
}

const BotCard: React.FC<BotCardProps> = ({ bot, onConfigure, onChat, onDelete }) => {
	return (
		<div className="bg-white p-4 rounded-lg shadow-md text-center hover:shadow-lg hover:scale-105 transition-all duration-300 mb-4 flex items-start">
			<div className="mr-4">
				<span className="bg-gray-300 text-xl px-2 py-0.5 rounded">{bot.config.type}</span>
				<Image className="w-20 h-20 object-cover rounded-full mt-2" src={bot.imageUrl} alt={bot.name} width={80} height={80} />
			</div>
			<div className="flex flex-col flex-grow">
				<div>
					<h3 className="text-xl font-bold mb-2">{bot.name}</h3>
					<p className="text-sm mb-2">{bot.description}</p>
				</div>
				<div className="mt-auto">
					<div className="flex justify-center space-x-2 mb-4">
						<button
							className="bg-blue-500 text-white px-2 py-1 rounded shadow mr-1 hover:bg-blue-600 transition-all duration-300"
							onClick={() => onConfigure(bot)}
						>
							Configure
						</button>
						<button
							className="bg-green-500 text-500 text-white px-2 py-1 rounded shadow mr-1 hover:bg-green-600 transition-all duration-300"
							onClick={() => onChat(bot)}
						>
							Chat
						</button>
						<button
							className="bg-red-500 text-white px-2 py-1 rounded shadow hover:bg-red-600 transition-all duration-300"
							onClick={() => onDelete(bot)}
						>
							Delete
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BotCard;
