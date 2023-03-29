import React from 'react';

interface BotChatContextCardProps {
	title: string;
	message: string;
	isSelected: boolean;
	onSwitch: () => void;
}

const BotChatContextCard: React.FC<BotChatContextCardProps> = ({ title, message, isSelected, onSwitch }) => {
	return (
		<div
			className={`p-4 bg-white rounded-lg shadow mb-4 border-2 ${
				isSelected ? 'border-blue-500' : 'border-transparent'
			}`}
		>
			<h4 className="font-semibold mb-2">{title}</h4>
			<p className="text-sm mb-4">{message}</p>
			<button
				onClick={onSwitch}
				className="bg-blue-500 text-white px-5 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
			>
				Switch
			</button>
		</div>
	);
};

export default BotChatContextCard;
