// BotChatContextCard.tsx
import React from 'react';
import AddContextModal from './AddContextModal';

interface BotChatContextCardProps {
	index: number;
	title: string;
	isSelected: boolean;
	onSwitchContext: (index: number) => void;
	onEditContext: (index: number) => void;
}

const BotChatContextCard: React.FC<BotChatContextCardProps> = ({
																   index,
																   title,
																   isSelected,
																   onSwitchContext,
																   onEditContext,
															   }) => {
	const [showEditModal, setShowEditModal] = React.useState(false);

	const handleEditContext = () => {
		setShowEditModal(true);
		onEditContext(index);
	};

	return (
		<div
			className={`p-4 rounded-lg border-2 ${
				isSelected ? 'border-blue-500' : 'border-gray-200'
			}`}
		>
			{showEditModal && (
				<AddContextModal onClose={() => setShowEditModal(false)} />
			)}
			<div className="flex items-center justify-between">
				<h4 className="font-semibold">{title}</h4>
				<div className="flex items-center space-x-2">
					<button
						disabled={isSelected}
						onClick={() => onSwitchContext(index)}
						className={`px-2 py-1 rounded-md ${
							isSelected
								? 'bg-gray-300 text-gray-500 cursor-not-allowed'
								: 'bg-blue-500 text-white hover:bg-blue-600'
						}`}
					>
						Switch
					</button>
					<button
						onClick={handleEditContext}
						className="px-2 py-1 rounded-md bg-yellow-500 text-white hover:bg-yellow-600"
					>
						Edit
					</button>
				</div>
			</div>
		</div>
	);
};

export default BotChatContextCard;
