import React from 'react';
import RiseLoader from "react-spinners/RiseLoader";


const Loader: React.FC = () => {
	return (
		<div className="flex h-screen items-center">
			<div className="mx-auto">
				<RiseLoader  color="#36d7b7" />
			</div>
		</div>
	);
};

export default Loader;
