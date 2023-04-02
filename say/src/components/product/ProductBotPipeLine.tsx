import React, {useEffect, useState} from 'react';
import {Bot} from "../../objects-api/bots";
import BotAnswerCard from "./BotAnswerCard";

interface ProductBotPipeLineProps {
	input: string | null;
	sentenceGenerator : Bot;
	promptGenerator : Bot;
	imageGenerator : Bot;
	setProductOutput: (output: string) => void;
}

const ProductBotPipeLine: React.FC<ProductBotPipeLineProps> = ({sentenceGenerator, promptGenerator, imageGenerator, input, setProductOutput}) => {
	const [answerSentenceGenerator, setAnswerSentenceGenerator] = useState<string | null>(null);
	const [answerPromptGenerator, setAnswerPromptGenerator] = useState<string | null>(null);
	const [answerImageGenerator, setAnswerImageGenerator] = useState<string | null>(null);

	useEffect(() => {
		if (answerImageGenerator) {
			setProductOutput(answerImageGenerator);
		}
	}, [answerImageGenerator, setProductOutput])

	return (
		<div className="flex flex-col items-center w-full">
			<div className="w-full p-4 bg-white border border-gray-200 shadow-md rounded-md">
				<h2 className="text-2xl mb-4">Pipeline</h2>
				<div className="w-full mb-4">
					<BotAnswerCard bot={sentenceGenerator} input={input} setAnswer={setAnswerSentenceGenerator} />
				</div>
				<div className="w-full mb-4">
					<BotAnswerCard bot={promptGenerator} input={answerSentenceGenerator} setAnswer={setAnswerPromptGenerator} />
				</div>
				<div className="w-full mb-8">
					<BotAnswerCard bot={imageGenerator} input={answerPromptGenerator} setAnswer={setAnswerImageGenerator} />
				</div>
			</div>
		</div>
	);

};

export default ProductBotPipeLine;