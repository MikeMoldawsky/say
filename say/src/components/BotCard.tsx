import React from 'react';
import Link from 'next/link';
import { Bot } from './Bot';

interface BotCardProps {
	bot: Bot;
}

const BotCard: React.FC<BotCardProps> = ({ bot }) => {
	return (
		<div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg hover:scale-105 transition-all duration-300 mb-4 flex items-center">
			<img className="w-40 h-40 object-cover rounded-full mr-8" src={bot.imageUrl} alt={bot.name} />
			<div>
				<h3 className="text-3xl font-bold mb-4">{bot.name}</h3>
				<p className="text-lg mb-4">{bot.description}</p>
				<p className="text-base mb-6 italic">{bot.behavior}</p>
				<div className="flex justify-center space-x-2 mb-6">
					<Link href={`/configure-bot?id=${bot.id}`}>
						<button className="bg-blue-500 text-white px-4 py-2 rounded shadow mr-2 hover:bg-blue-600 transition-all duration-300">Configure</button>
					</Link>
					<Link href={`/chat?id=${bot.id}`}>
						<button className="bg-green-500 text-white px-4 py-2 rounded shadow mr-2 hover:bg-green-600 transition-all duration-300">Chat</button>
					</Link>
					<button className="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600 transition-all duration-300">Delete</button>
				</div>
			</div>
		</div>
	);
};

export default BotCard;
