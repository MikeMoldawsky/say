import React, {useRef, useState} from 'react';
import {Bot} from "../../objects-api/bots";
import BotAnswerCard from "./BotAnswerCard";
import Loader from "../Loader";
import Image from "next/image";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDownload, faImage} from "@fortawesome/free-solid-svg-icons";


interface ProductBotsProps {
	input: string | null;
	sentenceGenerator : Bot;
	promptGenerator : Bot;
	imageGenerator : Bot;
}

const ProductBots: React.FC<ProductBotsProps> = ({sentenceGenerator, promptGenerator, imageGenerator, input}) => {
	const [answerSentenceGenerator, setAnswerSentenceGenerator] = useState<string | null>(null);
	const [answerPromptGenerator, setAnswerPromptGenerator] = useState<string | null>(null);
	const [answerImageGenerator, setAnswerImageGenerator] = useState<string | null>(null);
	const imageRef = useRef<HTMLImageElement | null>(null);

	const downloadImage = () => {
		console.log("Called downloadImage")
		const src = imageRef.current?.src ?? null;
		if (src) {
			console.log("In src")
			const link = document.createElement("a");
			link.href = src;
			link.download = "generated-image.png";
			link.click();
		}
	};


	if (input === null) {
		return <Loader />;
	}

	return (
		<div className="flex flex-col items-center w-full">
			<div className="w-full max-w-md mb-4">
				<BotAnswerCard bot={sentenceGenerator} input={input} setAnswer={setAnswerSentenceGenerator}/>
			</div>
			<div className="w-full max-w-md mb-4">
				<BotAnswerCard bot={promptGenerator} input={answerSentenceGenerator} setAnswer={setAnswerPromptGenerator}/>
			</div>
			<div className="w-full max-w-md mb-8">
				<BotAnswerCard bot={imageGenerator} input={answerPromptGenerator} setAnswer={setAnswerImageGenerator}/>
			</div>
			<div className="relative w-64 h-64 border border-gray-300 rounded-lg">
				<div className="absolute top-0 left-0 w-full h-[calc(100%-52px)]">
					<div className="border h-full flex items-center justify-center rounded-lg">
						{
							answerImageGenerator ?
								(<Image
										ref={imageRef}
										src={`data:image/png;base64,${answerImageGenerator}`}
										alt="Generated Image"
										width={256}
										height={256}
										className="max-h-full max-w-full"
									/>
								) : (
									<FontAwesomeIcon icon={faImage} className="text-gray-300" size="10x" />
								)
						}
					</div>
				</div>
				<button
					className="absolute bottom-0 left-0 w-full px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-b-lg"
					onClick={downloadImage}
				>
					<FontAwesomeIcon icon={faDownload} className="mr-2" />
					Download Image
				</button>
			</div>
		</div>
	);
};

export default ProductBots;