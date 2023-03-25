import React from 'react';
import Link from 'next/link';

const AddBotButton: React.FC = () => {
	return (
		<Link href="/add-bot">
			<button className="bg-blue-500 text-white w-16 h-16 flex items-center justify-center rounded-full hover:bg-blue-600 transition-all duration-300 cursor-pointer">
				<span className="text-4xl font-bold">+</span>
			</button>
		</Link>
	);
};

export default AddBotButton;
