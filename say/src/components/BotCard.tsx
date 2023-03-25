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

const BotCard : React.FC<BotCardProps> = ({ bot }) => {
	return (
		<div>
			<h3>{bot.name}</h3>
			<p>{bot.behavior}</p>
			<Link href={`/configure-bot?id=${bot.id}`}>

				<button>Configure</button>
			</Link>
			<Link href={`/chat?id=${bot.id}`}>
					<button>Chat</button>

			</Link>
			<button>Delete</button>
		</div>
	);
};

export default BotCard;
