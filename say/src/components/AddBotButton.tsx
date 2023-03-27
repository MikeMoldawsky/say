import React from 'react';

interface AddBotButtonProps {
	onClick?: () => void;
}

const AddBotButton: React.FC<AddBotButtonProps> = ({onClick}) => {
	return (
			<button onClick={onClick} className="bg-blue-500 text-white px-6 py-2 rounded-full flex items-center space-x-2 hover:bg-blue-600 transition-all duration-300 cursor-pointer">
				<span className="text-2xl font-bold">+</span>
				<span>New Assistant</span>
			</button>
	);
};

export default AddBotButton;
