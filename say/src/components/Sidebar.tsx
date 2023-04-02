import {useRouter} from "next/router";
import React, {useState} from 'react';
import Loader from "./Loader";

interface SidebarProps {
	isOpen: boolean;
	toggleSidePanel: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidePanel }) => {
	const router = useRouter();
	const [isLoading, setLoading] =  useState(false)

	const routeTo = async (path: string) => {
		toggleSidePanel();
		setLoading(true);
		await router.push(`/${path}`);
		setLoading(false);
	};

	return (
		<>
			{
		isLoading ? <Loader /> :

		<aside
			className={`${
				isOpen ? 'translate-x-0' : '-translate-x-full'
			} bg-secondary text-white fixed top-0 left-0 h-full w-3/4 sm:w-1/2 lg:w-1/4 xl:w-1/6 transition-transform duration-300 ease-in-out z-10`}
		>
			<nav className="mt-16">
				<ul>
					<li className="mb-4">

						<div
							onClick={() => routeTo('')}
							className="text-lg font-semibold hover:text-blue-300 cursor-pointer"
						>
							My Bots
						</div>

					</li>
					<li className="mb-4">
						<div
							onClick={() => routeTo("image-generator")}
							className="text-lg font-semibold hover:text-blue-300 cursor-pointer"
						>
							Image Generator
						</div>
					</li>
					<li className="mb-4">
						<div
							onClick={() => routeTo("product")}
							className="text-lg font-semibold hover:text-blue-300 cursor-pointer"
						>
							Product
						</div>
					</li>
					{/* Add more menu items here */}
				</ul>
			</nav>
		</aside>
			}
		</>
	);
};

export default Sidebar;
