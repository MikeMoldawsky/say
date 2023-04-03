import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faImage } from "@fortawesome/free-solid-svg-icons";
import Button from "../Button";

interface TextOutputProps {
	output: string | null;
}

const TextOutput: React.FC<TextOutputProps> = ({ output }) => {
	return (
		<>
			<div className="flex-grow relative">
				<div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
					{output &&
						<>
						<div className={"text-4xl"}>{output}</div>
						</>
					}
				</div>
			</div>
			<Button disabled={!output} text={"Copy"} onClick={() => {}} icon={faDownload}/>
		</>
	);
};

export default TextOutput;
