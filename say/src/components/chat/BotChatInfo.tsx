import React, {useState} from 'react';
import Image from 'next/image';
import {Bot} from "../../objects-api/bots";
import {BotContext} from "../../objects-api/contexts";
import BotChatContextCard from "./BotChatContextCard";
import AddContextModal from "./AddContextModal";

interface BotChatInfoProps {
	bot: Bot;
	contexts: BotContext[];
}

const BotChatInfo: React.FC<BotChatInfoProps> = ({ bot, contexts }) => {
	const [selectedContext, setSelectedContext] = useState<number | null>(null);
	const [showAddContextModal, setShowAddContextModal] = useState(false);

	const handleSwitchContext = (index: number) => {
		setSelectedContext(index);
	}

	const handleEditContext = (index: number) => {
		alert("Not implemented yet");
	}

	return (
		<div className="h-screen overflow-auto p-4 flex flex-col">
			<div className="flex-grow flex flex-col items-center">
				<Image className="w-20 h-20 object-cover rounded-full mb-4" src={bot.imageUrl} alt={bot.name} width={80} height={80} />
				<h3 className="text-xl font-bold mb-2">{bot.name}</h3>
				<p className="text-base mb-2">{bot.description}</p>

				{/* Line separator */}
				<hr className="border-t border-gray-300 w-full mb-4" />

				{/* Bot contexts */}

				<div className="w-full mb-4">
					<button onClick={() => setShowAddContextModal(true)} className="w-full bg-blue-500 text-white px-5 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 mb-4">
						New Context
					</button>
					{contexts.map((context, index) => (
						<BotChatContextCard
							key={index}
							index={index}
							title={context.name}
							isSelected={selectedContext === index}
							onSwitchContext={() => handleSwitchContext(index)}
							onEditContext={() => handleEditContext(index)}
						/>
					))}
				</div>
			</div>

			{/* System message and switch assistant */}
			<div className="mt-auto flex flex-col">
				<hr className="border-t border-gray-300 mb-4" />
				<div className="bg-gray-200 rounded-lg px-4 py-2 mb-4">
					<p className="font-semibold">System Message:</p>
					<p>{bot.systemMessage}</p>
				</div>
				<button
					onClick={() => alert("This feature is not yet implemented.")}
					className="bg-blue-500 text-white px-5 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
				>
					Switch Assistant
				</button>
			</div>
		</div>
	);
};

export default BotChatInfo;
