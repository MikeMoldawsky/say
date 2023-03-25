import React from 'react';
import Link from 'next/link';

interface Bot {
	id: number;
	name: string;
	behavior: string;
}

interface BotCardProps {
	bot: Bot;
}

const BotCard: React.FC<BotCardProps> = ({ bot }) => {
	return (
		<div className="bg-yellow-300 p-6 rounded-lg shadow-md text-center hover:shadow-lg hover:scale-105 transition-all duration-300">
			<h3 className="text-3xl font-bold mb-4">{bot.name}</h3>
			<p className="text-lg mb-6">{bot.behavior}</p>
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
	);
};

export default BotCard;
