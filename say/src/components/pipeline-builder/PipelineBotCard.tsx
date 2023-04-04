import React, {useState, useEffect, useRef} from 'react';
import Image from 'next/image';
import { useUserBotsContext } from '../react-context/UserBotsContext';
import Loader from '../Loader';
import Button from "../Button";
import {faTrashAlt, faExchangeAlt} from "@fortawesome/free-solid-svg-icons";
import {PipelineBot} from "./PipelineBots";
import Switch from "react-switch";

interface PipelineBotCardProps {
	pipelineBot: PipelineBot;
	input: string | null;
	onDelete: () => void;
	onReplace: () => void;
	onUpdate: (pipelineBot: PipelineBot) => void;
	isLastBot: boolean
}

const PipelineBotCard: React.FC<PipelineBotCardProps> = ({ pipelineBot, input, onDelete, onReplace, onUpdate, isLastBot }) => {
	const { botClient } = useUserBotsContext();
	const [loading, setLoading] = useState(false);
	const prevInputRef = useRef(input);


	useEffect(() => {
		if (prevInputRef.current !== input) {
			prevInputRef.current = input;
			const getAnswer = async () => {
				if (botClient !== null && input !== null) {
					setLoading(true);
					const answer = await botClient.answer(pipelineBot.bot._id, {content: input});
					const newPipelineBot = {...pipelineBot, answer: answer}
					onUpdate(newPipelineBot);
					setLoading(false);
				}
			};

			getAnswer();
		}
	}, [botClient, pipelineBot, input, onUpdate]);

	const toggleOutput = () => {
		const newPipelineBot = {...pipelineBot, isOutputBot: !pipelineBot.isOutputBot}
		onUpdate(newPipelineBot);
	}

	const truncateString = (str: string, maxLength: number) => {
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
		<div className="bg-gray-200 p-4 rounded-lg shadow-md text-left hover:shadow-lg hover:scale-105 transition-all duration-300  flex items-start mt-1">
			<div className="flex flex-col flex-grow">
				<div className="flex items-center">
					<Image className="w-10 h-10 object-cover rounded-full" src={pipelineBot.bot.imageUrl} alt={pipelineBot.bot.name} width={40} height={40} />
						<div className="ml-2">
							<h3 className="text-lg font-bold mb-2">{truncateString(pipelineBot.bot.name, 15)}</h3>
						</div>
						<div className="flex flex-row ml-auto">
							<div >
								<Button onClick={onReplace} backgroundColor={"gray"} icon={faExchangeAlt}/>
							</div>
							<div className="ml-1">
								<Button onClick={onDelete} backgroundColor={"gray"}  icon={faTrashAlt}/>
							</div>
							<div className="ml-1">
									<Switch
										checked={pipelineBot.isOutputBot}
										onChange={toggleOutput}
										offColor="#6B7280"
										onColor="#3B82F6"
										disabled={isLastBot}
									/>
							</div >
						</div>
				</div>
				<div className="mt-2">
					<hr className="border-t border-gray-300 mb-2" />
					<div className="bg-white rounded-lg px-4 relative min-h-[100px]">
						{loading ? (
							<div className="absolute inset-0 flex items-center justify-center">
								<Loader />
							</div>
						) : (

							<div className={`overflow-hidden whitespace-normal ${(pipelineBot.bot.config.type === 'image') ? "break-all": "break-words"}`}>
								<span>{(pipelineBot.bot.config.type === 'image') && pipelineBot.answer ? truncateString(pipelineBot.answer, 150): pipelineBot.answer}</span>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default PipelineBotCard;
