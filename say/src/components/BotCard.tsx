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
		<div className="bg-yellow-300 p-6 rounded-lg shadow-md text-center">
			<h3 className="text-2xl font-bold mb-2">{bot.name}</h3>
			<p className="text-lg mb-4">{bot.behavior}</p>
			<Link href={`/configure-bot?id=${bot.id}`}>
				<button className="bg-blue-500 text-white px-4 py-2 rounded shadow mr-2">Configure</button>
			</Link>
			<Link href={`/chat?id=${bot.id}`}>
				<button className="bg-green-500 text-white px-4 py-2 rounded shadow mr-2">Chat</button>
			</Link>
			<button className="bg-red-500 text-white px-4 py-2 rounded shadow">Delete</button>
		</div>
	);
};

export default BotCard;
