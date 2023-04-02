import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Bot } from '../../objects-api/bots';
import { useUserBotsContext } from '../react-context/UserBotsContext';
import Loader from '../Loader';

interface BotAnswerCardProps {
	bot: Bot;
	input: string | null;
	setAnswer: (string) => void;
}

const BotAnswerCard: React.FC<BotAnswerCardProps> = ({ bot, input, setAnswer }) => {
	const { botClient } = useUserBotsContext();
	const [output, setOutput] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const getAnswer = async () => {
			if (botClient !== null && input !== null) {
				setLoading(true);
				const response = await botClient.answer(bot._id, { content: input });
				setOutput(response);
				setAnswer(response);
				setLoading(false);
			}
		};

		getAnswer();
	}, [botClient, bot._id, input, setAnswer]);

	if (botClient === null) {
		return <Loader />;
	}

	return (
		<div className="bg-white p-4 rounded-lg shadow-md text-center hover:shadow-lg hover:scale-105 transition-all duration-300 mb-4 flex items-start w-1/2 mx-auto">
			<div className="mr-4">
				<Image className="w-20 h-20 object-cover rounded-full" src={bot.imageUrl} alt={bot.name} width={80} height={80} />
			</div>
			<div className="flex flex-col flex-grow">
				<div>
					<h3 className="text-xl font-bold mb-2">{bot.name}</h3>
					<p className="text-sm mb-2">{bot.description}</p>
				</div>
			<div className="mt-auto">
				<hr className="border-t border-gray-300 mb-4" />
				<div className="bg-gray-200 rounded-lg px-4 py-2 mb-4">
					<p className="font-semibold">Answer:</p>
					{loading ? (
						<Loader />
					) : (
						<p className="break-words">{output}</p>
					)}
				</div>
			</div>
		</div>
	</div>
	);
};

export default BotAnswerCard;
