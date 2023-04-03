import React from 'react';
import Image from 'next/image';
import { useUserBotsContext } from '../react-context/UserBotsContext';
import { useUserContext } from '../react-context/UserContext';
import { Bot } from '../../objects-api/bots';
import Button from "../Button";
import {createComputedPropertyName} from "@ts-morph/common/lib/typescript";

interface SelectBotModalProps {
	buttonText: string;
	onClose: () => void;
	setSelectedBot: (bot: Bot) => void;
	prevSelectedBot?: Bot;
}

const SelectBotModal: React.FC<SelectBotModalProps> = ({ onClose, buttonText, setSelectedBot, prevSelectedBot }) => {
	const { userId } = useUserContext();
	const { bots } = useUserBotsContext();

	const handleSelectBot = (bot: Bot) => {
		if (userId) {
			setSelectedBot(bot);
			onClose();
		}
	};
	console.log("prevSelectedBot", prevSelectedBot);

	return (
		<div className="fixed inset-0 flex items-center justify-center p-4 bg-gray-900 bg-opacity-50">
			<div className="bg-white w-full max-w-2xl rounded-lg shadow-md p-6 overflow-auto" style={{ maxHeight: 'calc(100% - 4rem)' }}>
				<div className="flex items-center justify-between mb-4">
					<h2 className="text-4xl font-bold">Select Bot</h2>
					<button className="text-gray-600 hover:text-gray-800" onClick={onClose}>
						&times;
					</button>
				</div>
				<ul>
					{bots && bots.map((bot: Bot) => (
						<li key={bot._id} className="flex items-center justify-between p-2 mb-2 border border-gray-300 rounded-md hover:bg-gray-100">
							<div className="flex items-center">
								<Image src={bot.imageUrl} alt={bot.name} className="w-12 h-12 object-cover rounded mr-4" width={80} height={80} />
								<span className="text-xl font-bold">{bot.name}</span>
							</div>
							<Button disabled={prevSelectedBot && prevSelectedBot._id === bot._id} onClick={() => handleSelectBot(bot)}  text={buttonText}/>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default SelectBotModal;
