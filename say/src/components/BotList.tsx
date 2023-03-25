import React from 'react';
import BotCard from './BotCard';
import AddBotButton from './AddBotButton';

interface Bot {
	id: number;
	name: string;
	behavior: string;
	imageUrl: string;
	description: string;
}

interface BotListProps {
	bots: Bot[];
}

const BotList: React.FC<BotListProps> = ({ bots }) => {
	return (
		<div className="p-4">
			<h2 className="text-2xl font-semibold mb-4 text-primary">My Bots</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{bots.map((bot) => (
					<BotCard key={bot.id} bot={bot} />
				))}
				<AddBotButton />
			</div>
		</div>
	);
};

export default BotList;
