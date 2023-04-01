import React, { useState} from 'react';
import Loader from "../Loader";
import {useUserBotsContext} from "../react-context/UserBotsContext";
import BotImageInfo from "./BotImageInfo";
import GenerateImage from "./GenerateImage";



const GenerateImageWindow: React.FC = () => {
	const { selectedBot, botClient } = useUserBotsContext();
	const [selectedContext, setSelectedContext] = useState<number | null>(null);

	return (
		<div className="pt-20 px-4">
			{!selectedBot ? < Loader/> :
				<div className="bg-gray-100 min-h-screen flex flex-col">
					<div className="flex-grow flex">
						<div className="w-1/3 h-screen bg-white p-4 rounded-lg shadow overflow-auto">
							<BotImageInfo bot={selectedBot} />
						</div>
						<div className="w-2/3 h-screen bg-white rounded-lg shadow flex flex-col">
							<GenerateImage />
						</div>
					</div>
				</div>
			}
		</div>

	);
};


export default GenerateImageWindow

