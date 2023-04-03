import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faImage } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Button from "../Button";

interface ProductImageOutputProps {
	productOutput: string | null;
}

const ProductImageOutput: React.FC<ProductImageOutputProps> = ({ productOutput }) => {
	const imageRef = React.useRef<HTMLImageElement | null>(null);

	const downloadImage = () => {
		const src = imageRef.current?.src ?? null;
		if (src) {
			const link = document.createElement("a");
			link.href = src;
			link.download = "generated-image.png";
			link.click();
		}
	};

	return (
		<>
			<div className="flex-grow relative">
				<div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
					{productOutput &&
					<>
						<Image
							ref={imageRef}
							src={`data:image/png;base64,${productOutput}`}
							alt="Generated Image"
							width={512}
							height={512}
							className="max-h-full max-w-full border-2 border-gray-300"
						/>
						<FontAwesomeIcon icon={faImage} className="text-gray-300" size="10x" />
					</>
					}
				</div>
			</div>
			<Button disabled={!productOutput} text={"Download Image"} onClick={downloadImage} icon={faDownload}/>
		</>
	);
};

export default ProductImageOutput;
