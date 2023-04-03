import React, {useEffect, useState} from 'react';
import {Bot} from "../../objects-api/bots";
import BotAnswerCard from "./BotAnswerCard";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowDown} from "@fortawesome/free-solid-svg-icons";

interface ProductBotPipeLineProps {
	input: string | null;
	bots: Bot[];
	setProductOutput: (output: string) => void;
}

const ProductBotPipeLine: React.FC<ProductBotPipeLineProps> = ({bots, input, setProductOutput}) => {
	const [answers, setAnswers] = useState<(string | null)[]>(bots.map(() => null));

	useEffect(() => {
		if (answers[answers.length - 1] !== null) {
			setProductOutput(answers[answers.length - 1] as string);
		}
	}, [answers, setProductOutput])


	const setAnswer = (botIndex: number, answer: string) => {
		setAnswers(prevAnswers => {
			const newAnswers = [...prevAnswers];
			newAnswers[botIndex] = answer;
			return newAnswers;
		});
	};

	return (
		<div className="flex flex-col items-center w-full">
			<div className="w-full p-4 bg-white border border-gray-200 shadow-md rounded-md">
				<h2 className="text-2xl mb-4">Pipeline</h2>
				{bots.map((bot, botIndex) => {
					return (
						<React.Fragment key={bot._id}>
							<div className="w-full mb-2">
								<BotAnswerCard
									bot={bot}
									input={botIndex === 0 ? input : answers[botIndex - 1]}
									setAnswer={(answer) => setAnswer(botIndex, answer)}
								/>
							</div>
							{botIndex < bots.length - 1 && (
								<div className="flex justify-center">
									<FontAwesomeIcon icon={faArrowDown} className="mx-4" size="lg"/>
								</div>
							)}
						</React.Fragment>
					);
				})}
			</div>
		</div>
	);

};

export default ProductBotPipeLine;
