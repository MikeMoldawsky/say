import React from 'react';
import Link from 'next/link';

const AddBotButton: React.FC = () => {
	return (
		<Link href="/add-bot">
			<button className="bg-blue-500 text-white px-6 py-2 rounded-full flex items-center space-x-2 hover:bg-blue-600 transition-all duration-300 cursor-pointer">
				<span className="text-2xl font-bold">+</span>
				<span>New Assistant</span>
			</button>
		</Link>
	);
};

export default AddBotButton;
