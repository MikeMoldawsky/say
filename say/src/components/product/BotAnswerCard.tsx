import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Bot } from '../../objects-api/bots';
import { useUserBotsContext } from '../react-context/UserBotsContext';
import Loader from '../Loader';

interface BotAnswerCardProps {
	bot: Bot;
	input: string | null;
	setAnswer: (string) => void;
	isImage?: boolean;
}

const BotAnswerCard: React.FC<BotAnswerCardProps> = ({ bot, input, setAnswer, isImage }) => {
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

	const truncateString = (str, maxLength) => {
		if(!str) return str;
		if (str.length > maxLength) {
			return str.slice(0, maxLength) + '...';
		}
		return str;
	};

	if (botClient === null) {
		return <Loader />;
	}

	return (
		<div className="bg-gray-200 p-4 rounded-lg shadow-md text-left hover:shadow-lg hover:scale-105 transition-all duration-300 m-8 flex items-start">
			<div className="flex flex-col flex-grow">
				<div className="flex items-center">
					<Image className="w-10 h-10 object-cover rounded-full" src={bot.imageUrl} alt={bot.name} width={40} height={40} />
					<div className="ml-4">
						<h3 className="text-2xl font-bold mb-2">{bot.name}</h3>
					</div>
				</div>
				<div className="mt-4">
					<hr className="border-t border-gray-300 mb-4" />
					<p className="font-semibold">Output:</p>
					<div className="bg-white rounded-lg px-4 py-2 mb-4 relative min-h-[100px]">
						{loading ? (
							<div className="absolute inset-0 flex items-center justify-center">
								<Loader />
							</div>
						) : (

							<div className={`overflow-hidden whitespace-normal ${isImage ? "break-all": "break-words"}`}>
								<span>{isImage? truncateString(output, 150): output}</span>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default BotAnswerCard;
