import React from 'react';
import BotCard, { Bot } from './BotCard';
import { useRouter } from 'next/router';

interface BotListProps {
	bots: Bot[];
	onConfigure: (bot: Bot) => void;
	onDelete: (bot: Bot) => void;
}

const BotList: React.FC<BotListProps> = ({bots, onConfigure, onDelete}) => {
	const router = useRouter();

	const handleChat = (bot: Bot) => {
		router.push(`/chat?id=${bot.id}`);
	};

	return (
		<div className="p-4">
			<h2 className="text-2xl font-semibold mb-4 text-primary">My Bots</h2>
			<div className="flex flex-wrap justify-center items-center gap-6">
				{bots.map((bot) => (
					<BotCard key={bot.id} bot={bot} onChat={handleChat} onConfigure={onConfigure} onDelete={onDelete} />
				))}
			</div>
		</div>
	);
};

export default BotList;

