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
		<div className="bg-white p-4 rounded-lg shadow-md w-full sm:w-72 m-4">
			<h3 className="font-bold text-xl mb-2">{bot.name}</h3>
			<p className="text-gray-700 mb-4">{bot.behavior}</p>
			<div className="flex justify-between">
				<Link href={`/configure-bot?id=${bot.id}`}>
					<button className="bg-blue-500 text-white px-4 py-2 rounded-md">Configure</button>
				</Link>
				<Link href={`/chat?id=${bot.id}`}>
					<button className="bg-green-500 text-white px-4 py-2 rounded-md">Chat</button>
				</Link>
				<button className="bg-red-500 text-white px-4 py-2 rounded-md">Delete</button>
			</div>
		</div>
	);
};

export default BotCard;
