import React from 'react';
import BotCard from './BotCard';
import AddBotButton from './AddBotButton';

interface Bot {
	id: number;
	name: string;
	behavior: string;
}

interface BotListProps {
	bots: Bot[];
}

const BotList: React.FC<BotListProps> = ({ bots }) => {
	return (
		<div>
			<h2>My Bots</h2>
			<div>
				{bots.map((bot) => (
					<BotCard key={bot.id} bot={bot} />
				))}
				<AddBotButton />
			</div>
		</div>
	);
};

export default BotList;
