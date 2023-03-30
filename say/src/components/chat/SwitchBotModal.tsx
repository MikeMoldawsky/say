import React, { useEffect } from 'react';
import { useUserBotsContext } from '../react-context/UserBotsContext';
import { useChatBotContext } from '../react-context/ChatBotContext';
import { useUserContext } from '../react-context/UserContext';
import { Bot } from '../../objects-api/bots';

interface SwitchBotModalProps {
	onClose: () => void;
}

const SwitchBotModal: React.FC<SwitchBotModalProps> = ({ onClose }) => {
	const { userId } = useUserContext();
	const { bots } = useUserBotsContext();
	const { loadBot } = useChatBotContext();

	useEffect(() => {
		document.body.classList.add('overflow-hidden');
		return () => {
			document.body.classList.remove('overflow-hidden');
		};
	}, []);

	const handleSwitchBot = (botId: string) => {
		if (userId) {
			loadBot(userId, botId);
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
								<img src={bot.imageUrl} alt={bot.name} className="w-10 h-10 object-cover rounded mr-4" />
								<p>{bot.name}</p>
							</div>
							<button
								className="bg-blue-500 text-white px-4 py-2 rounded-md"
								onClick={() => handleSwitchBot(bot._id)}
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
