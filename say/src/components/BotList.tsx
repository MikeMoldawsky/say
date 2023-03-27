import React from 'react';
import BotCard, { Bot } from './BotCard';


interface BotListProps {
	bots: Bot[];
}

const BotList: React.FC<BotListProps> = ({ bots }) => {
	return (
		<div className="p-4">
			<h2 className="text-2xl font-semibold mb-4 text-primary">My Bots</h2>
			<div className="flex flex-wrap justify-center items-center gap-6">
				{bots.map((bot) => (
					<BotCard key={bot.id} bot={bot} />
				))}
			</div>
		</div>
	);
};

export default BotList;
