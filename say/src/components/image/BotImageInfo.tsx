import React from 'react';
import Image from 'next/image';
import {BotResult} from "../../objects-api/bots";

interface BotImageInfoProps {
	bot: BotResult;
}

const BotImageInfo: React.FC<BotImageInfoProps> = ({ bot }) => {

	return (
		<div className="h-screen overflow-auto p-4 flex flex-col">
			<div className="flex-grow flex flex-col items-center">
				<Image className="w-20 h-20 object-cover rounded-full mb-4" src={bot.imageUrl} alt={bot.name} width={80} height={80} />
				<h3 className="text-xl font-bold mb-2">{bot.name}</h3>
				<p className="text-base mb-2">{bot.description}</p>

				{/* Line separator */}
				<hr className="border-t border-gray-300 w-full mb-4" />
			</div>

			{/* System message and switch assistant */}
			<div className="mt-auto flex flex-col">
				<hr className="border-t border-gray-300 mb-4" />
			</div>
		</div>
	);
};

export default BotImageInfo;
