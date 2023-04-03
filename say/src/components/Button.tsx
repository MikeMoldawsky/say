import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IconDefinition} from "@fortawesome/fontawesome-common-types";


interface ButtonProps {
	text: string;
	onClick: () => void;
	icon: IconDefinition;

}

const Button: React.FC<ButtonProps> = ({text, onClick, icon}) => {
	return (
			<button onClick={onClick} className="bg-blue-500 text-white px-2 py-2 rounded-full flex items-center space-x-2 hover:bg-blue-600 transition-all duration-300 cursor-pointer">
				<FontAwesomeIcon icon={icon} className="" size="xl" />
				<span>{text}</span>
			</button>
	);
};

export default Button;
