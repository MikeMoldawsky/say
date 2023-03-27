import React from 'react';
import BotCard from './BotCard';
import AddBotButton from './AddBotButton';

interface Bot {
	id: number;
	name: string;
	behavior: string;
	imageUrl: string;
	description: string;
	systemMessage: string;
}

interface BotListProps {
	bots: Bot[];
	setBots: React.Dispatch<React.SetStateAction<Bot[]>>;
}

const BotList: React.FC<BotListProps> = ({ bots, setBots }) => {
	const handleNewAssistant = () => {
		const newAssistant = {
			id: bots.length + 1,
			name: `Assistant ${bots.length + 1}`,
			behavior: 'friendly',
			description: 'A new assistant',
			imageUrl: 'https://via.placeholder.com/150',
			systemMessage: 'Your new assistant is ready to chat.',
		};
		setBots((prevBots) => [...prevBots, newAssistant]);
	}

	return (
		<div className="p-4">
			<h2 className="text-2xl font-semibold mb-4 text-primary">My Bots</h2>
			<div className="flex flex-wrap justify-center items-center gap-6">
				{bots.map((bot) => (
					<BotCard key={bot.id} bot={bot} />
				))}
			</div>
			<div className="mt-8 w-full flex justify-center">
				<AddBotButton onClick={handleNewAssistant} />
			</div>
		</div>
	);
};

export default BotList;
