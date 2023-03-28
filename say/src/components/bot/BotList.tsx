import React from 'react';
import BotCard from './BotCard';
import {Bot} from "../../objects-api/bots";

interface BotListProps {
	bots: Bot[];
	onChat: (bot: Bot) => void;
	onConfigure: (bot: Bot) => void;
	onDelete: (bot: Bot) => void;
}

const BotList: React.FC<BotListProps> = ({bots, onConfigure, onDelete, onChat}) => {
	return (
		<div className="p-4">
			<h2 className="text-2xl font-semibold mb-4 text-primary">My Bots</h2>
			<div className="flex flex-wrap justify-center items-center gap-6">
				{bots.map((bot) => (
					<BotCard key={bot._id} bot={bot} onChat={onChat} onConfigure={onConfigure} onDelete={onDelete} />
				))}
			</div>
		</div>
	);
};

export default BotList;

