// components/Header.tsx
import React, { useState } from 'react';
import Sidebar from './Sidebar';

const Header: React.FC = () => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleSidePanel = () => {
		setIsOpen(!isOpen);
	};

	return (
		<>
			<header className="fixed w-full top-0 bg-primary text-white shadow-md py-4 z-20">
				<div className="container mx-auto px-4 flex justify-center items-center">
					<button
						onClick={toggleSidePanel}
						className="absolute left-4 text-2xl focus:outline-none"
					>
						{isOpen ? '×' : '☰'}
					</button>
					<span className="text-4xl font-bold">Say</span>
				</div>
			</header>
			<Sidebar isOpen={isOpen} toggleSidePanel={toggleSidePanel} />
		</>
	);
};

export default Header;
