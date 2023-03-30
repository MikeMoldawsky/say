import React from 'react';
import Image from 'next/image';
import { useUserBotsContext } from '../react-context/UserBotsContext';
import { useUserContext } from '../react-context/UserContext';
import { Bot } from '../../objects-api/bots';

interface SwitchBotModalProps {
	onClose: () => void;
}

const SwitchBotModal: React.FC<SwitchBotModalProps> = ({ onClose }) => {
	const { userId } = useUserContext();
	const { bots, setSelectedBot } = useUserBotsContext();

	const handleSwitchBot = (bot: Bot) => {
		if (userId) {
			setSelectedBot(bot);
			onClose();
		}
	};

	return (
		<div className="fixed inset-0 flex items-center justify-center p-4 bg-gray-900 bg-opacity-50">
			<div className="bg-white w-full max-w-2xl rounded-lg shadow-md p-6 overflow-auto" style={{ maxHeight: 'calc(100% - 4rem)' }}>
				<div className="flex items-center justify-between mb-4">
					<h2 className="text-xl font-bold">Switch Bot</h2>
					<button className="text-gray-600 hover:text-gray-800" onClick={onClose}>
						&times;
					</button>
				</div>
				<ul>
					{bots && bots.map((bot: Bot) => (
						<li key={bot._id} className="flex items-center justify-between p-2 mb-2 border border-gray-300 rounded-md">
							<div className="flex items-center">
								<Image src={bot.imageUrl} alt={bot.name} className="w-10 h-10 object-cover rounded mr-4" width={80} height={80} />
								<p>{bot.name}</p>
							</div>
							<button
								className="bg-blue-500 text-white px-4 py-2 rounded-md"
								onClick={() => handleSwitchBot(bot)}
							>
								Switch
							</button>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default SwitchBotModal;
