import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faImage } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

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
		<div className="border border-gray-300 bg-white shadow-sm rounded p-4 h-full flex flex-col">
			<h2 className="text-2xl mb-4">Output</h2>
			<div className="flex-grow relative">
				<div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
					{productOutput ? (
						<Image
							ref={imageRef}
							src={`data:image/png;base64,${productOutput}`}
							alt="Generated Image"
							width={256}
							height={256}
							className="max-h-full max-w-full"
						/>
					) : (
						<FontAwesomeIcon icon={faImage} className="text-gray-300" size="10x" />
					)}
				</div>
			</div>
			<button
				className="mt-auto py-2 text-white bg-blue-500 hover:bg-blue-600 rounded"
				onClick={downloadImage}
			>
				<FontAwesomeIcon icon={faDownload} className="mr-2" />
				Download Image
			</button>
		</div>
	);
};

export default ProductImageOutput;
