import React from 'react';
import {Bot} from "../../objects-api/bots";
import BotAnswerCard from "./BotAnswerCard";


interface ProductBotsProps {
	sentenceGenerator : Bot;
	promptGenerator : Bot;
	imageGenerator : Bot;
}

const ProductBots: React.FC<ProductBotsProps> = ({sentenceGenerator, promptGenerator, imageGenerator}) => {

	return (
		<div>
			<div className="bots-container">
				<BotAnswerCard bot={sentenceGenerator} input={"How are you?"}/>
			</div>
			<div className="bots-container">
				<BotAnswerCard bot={promptGenerator} input={"How are you?"}/>
			</div>
			<div className="bots-container">
				<BotAnswerCard bot={imageGenerator} input={"How are you?"}/>
			</div>
		</div>
	);
};

export default ProductBots;
