import React from 'react';

interface ProductCardProps {
	title: string;
	children: React.ReactNode;
}

const ProductCard: React.FC<ProductCardProps> = ({ title, children }) => {
	return (
		<div className="border border-gray-300 bg-white shadow-sm rounded p-4 h-full flex flex-col">
			<h2 className="text-2xl mb-4">{title}</h2>
			{children}
		</div>
	);
};

export default ProductCard;
