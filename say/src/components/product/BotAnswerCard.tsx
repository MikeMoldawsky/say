import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Bot } from '../../objects-api/bots';
import { useUserBotsContext } from '../react-context/UserBotsContext';
import Loader from '../Loader';

interface BotAnswerCardProps {
	bot: Bot;
	input: string | null;
}

const BotAnswerCard: React.FC<BotAnswerCardProps> = ({ bot, input }) => {
	const { botClient } = useUserBotsContext();
	const [answer, setAnswer] = useState<string | null>(null);

	useEffect(() => {
		const getAnswer = async () => {
			if (botClient !== null && input !== null) {
				const response = await botClient.answer(bot._id, { content: input });
				setAnswer(response); // Assuming the response is a string, adjust it based on the actual response
			}
		};

		getAnswer();
	}, [botClient, bot._id, input]);

	if (botClient === null || input === null) {
		return <Loader />;
	}

	return (
		<div className="h-screen overflow-auto p-4 flex flex-col">
			<div className="flex-grow flex flex-col items-center">
				<Image className="w-20 h-20 object-cover rounded-full mb-4" src={bot.imageUrl} alt={bot.name} width={80} height={80} />
				<h3 className="text-xl font-bold mb-2">{bot.name}</h3>
				<p className="text-base mb-2">{bot.description}</p>
			</div>
			<div className="mt-auto flex flex-col">
				<hr className="border-t border-gray-300 mb-4" />
				<div className="bg-gray-200 rounded-lg px-4 py-2 mb-4">
					<p className="font-semibold">Answer:</p>
					<p>{answer}</p>
				</div>
			</div>
		</div>
	);
};

export default BotAnswerCard;
