// components/Sidebar.tsx
import React from 'react';
import Link from 'next/link';

interface SidebarProps {
	isOpen: boolean;
	toggleSidePanel: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidePanel }) => {
	return (
		<aside
			className={`${
				isOpen ? 'translate-x-0' : '-translate-x-full'
			} bg-secondary text-white fixed top-0 left-0 h-full w-3/4 sm:w-1/2 lg:w-1/4 xl:w-1/6 transition-transform duration-300 ease-in-out z-10`}
		>
			<nav className="mt-16">
				<ul>
					<li className="mb-4">
						<Link href="/">
							<div
								onClick={toggleSidePanel}
								className="text-lg font-semibold hover:text-blue-300 cursor-pointer"
							>
								My Bots
							</div>
						</Link>
					</li>
					<li className="mb-4">
						<Link href="/about">
							<div
								onClick={toggleSidePanel}
								className="text-lg font-semibold hover:text-blue-300 cursor-pointer"
							>
								About
							</div>
						</Link>
					</li>
					<li className="mb-4">
						<Link href="/contact">
							<div
								onClick={toggleSidePanel}
								className="text-lg font-semibold hover:text-blue-300 cursor-pointer"
							>
								Contact
							</div>
						</Link>
					</li>
					{/* Add more menu items here */}
				</ul>
			</nav>
		</aside>
	);
};

export default Sidebar;
