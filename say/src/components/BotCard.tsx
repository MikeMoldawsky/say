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

const BotCard = ({ bot }: BotCardProps) => {
	return (
		<div>
			<h3>{bot.name}</h3>
			<p>{bot.behavior}</p>
			<Link href={`/configure-bot?id=${bot.id}`}>
				<button as="a">Configure</button>
			</Link>
			<Link href={`/chat?id=${bot.id}`}>
				<button as="a">Chat</button>
			</Link>
			<button>Delete</button>
		</div>
	);
};

export default BotCard;
