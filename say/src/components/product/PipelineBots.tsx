import React, {useEffect, useState} from 'react';
import PipelineBotCard from "./PipelineBotCard";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowDown} from "@fortawesome/free-solid-svg-icons";
import {Bot} from "../../objects-api/bots";


export interface PipelineBot {
	bot: Bot;
	answer: string | null;
}

interface PipelineBotsProps {
	input: string | null;
	pipelineBots: PipelineBot[];
	setBotAnswer: (botIndex: number, answer: string) => void;
	onDelete: (index: number) => void;
	onReplace: (index: number) => void;
}

const PipelineBots: React.FC<PipelineBotsProps> = ({input, pipelineBots, setBotAnswer, onDelete, onReplace}) => {
	useEffect(() => {}, [pipelineBots]);

	return (
		<>
			{pipelineBots.map((botAnswer, botIndex) => {
				return (
					<React.Fragment key={botAnswer.bot._id}>
						<div className="w-full mb-2">
							<PipelineBotCard
								bot={botAnswer.bot}
								input={botIndex === 0 ? input : pipelineBots[botIndex - 1].answer}
								setAnswer={(answer) => setBotAnswer(botIndex, answer)}
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
