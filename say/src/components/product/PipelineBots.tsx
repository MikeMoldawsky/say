import React, {useEffect, useState} from 'react';
import BotAnswerCard from "./BotAnswerCard";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowDown} from "@fortawesome/free-solid-svg-icons";
import {PipelineBot} from "../../pages/product";

interface PipelineBotsProps {
	input: string | null;
	pipelineBots: PipelineBot[];
	setBotAnswers: (updateFn: (prevBotAnswers: PipelineBot[]) => PipelineBot[]) => void;
	onDelete: (index: number) => void;
	onReplace: (index: number) => void;
}

const PipelineBots: React.FC<PipelineBotsProps> = ({input, pipelineBots, setBotAnswers, onDelete, onReplace}) => {
	const [localBotAnswers, setLocalBotAnswers] = useState<Array<string | null>>([]);

	useEffect(() => {
		const newBotAnswers = pipelineBots.map(bot => bot.answer);
		setLocalBotAnswers(newBotAnswers);
	}, [pipelineBots]);

	const setAnswer = (botIndex: number, answer: string) => {
		setBotAnswers((prevBotAnswers: PipelineBot[]) => {
			const newBotAnswers = [...prevBotAnswers];
			newBotAnswers[botIndex] = { ...newBotAnswers[botIndex], answer };
			return newBotAnswers;
		});
	};

	return (
		<>
			{pipelineBots.map((botAnswer, botIndex) => {
				return (
					<React.Fragment key={botAnswer.bot._id}>
						<div className="w-full mb-2">
							<BotAnswerCard
								bot={botAnswer.bot}
								input={botIndex === 0 ? input : localBotAnswers[botIndex - 1]}
								setAnswer={(answer) => setAnswer(botIndex, answer)}
								onDelete={() => onDelete(botIndex)}
								onReplace={() => onReplace(botIndex)}
							/>
						</div>
						{botIndex < pipelineBots.length - 1 && (
							<div className="flex justify-center">
								<FontAwesomeIcon icon={faArrowDown} className="mx-4" size="lg"/>
							</div>
						)}
					</React.Fragment>
				);
			})}
		</>
	);
};

export default PipelineBots;
