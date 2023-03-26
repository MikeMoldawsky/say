// BotInformation.tsx
import React from 'react';
import { Bot } from './Bot';

interface BotInformationProps {
	bot: Bot;
}

const BotInformation: React.FC<BotInformationProps> = ({ bot }) => {
	return (
		<div className="flex flex-col items-center">
			<img className="w-20 h-20 object-cover rounded-full mb-4" src={bot.imageUrl} alt={bot.name} />
			<h3 className="text-xl font-bold mb-2">{bot.name}</h3>
			<p className="text-base mb-2">{bot.description}</p>
			<p className="text-sm italic">{bot.behavior}</p>
		</div>
	);
};

export default BotInformation;
