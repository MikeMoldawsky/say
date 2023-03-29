
import React from 'react';

interface AddContextModalProps {
	onClose: () => void;
}

const AddContextModal: React.FC<AddContextModalProps> = ({ onClose }) => {
	return (
		<div className="fixed z-10 inset-0 overflow-y-auto">
			<div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
				<div className="fixed inset-0 transition-opacity" aria-hidden="true">
					<div className="absolute inset-0 bg-gray-500 opacity-75"></div>
				</div>
				<span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
				<div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
					{/* Add your modal content here */}
					<div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
						<h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
							Add Context
						</h3>
						<form>
							<div className="mb-4">
								<label htmlFor="title" className="block text-sm font-medium text-gray-700">
									Title
								</label>
								<input
									type="text"
									name="title"
									id="title"
									className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
								/>
							</div>
							<div className="mb-4">
								<label htmlFor="context" className="block text-sm font-medium text-gray-700">
									Context Message
								</label>
								<textarea
									name="context"
									id="context"
									rows={3}
									className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
								> That is the context</textarea>
							</div>
						</form>
					</div>
					<div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
						<button
							type="button"
							className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
						>
							Add
						</button>
						<button
							type="button"
							onClick={onClose}
							className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm"
						>
							Cancel
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AddContextModal;