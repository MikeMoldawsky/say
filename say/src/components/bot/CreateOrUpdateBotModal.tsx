import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import React, {useState} from 'react';
import styles from '../../styles/AddBotPopup.module.css';
import {useUserBotsContext} from "../react-context/UserBotsContext";
import _ from "lodash";
import {CreateBotRequest, UpdateBotRequest} from "../../objects-api/bots";

interface CreateOrUpdateBotModalProps {
	onClose: () => void;
	createBot: (bot: CreateBotRequest) => void;
	updateBot: (botId: string, bot: UpdateBotRequest) => void;
}

const CreateOrUpdateBotModal: React.FC<CreateOrUpdateBotModalProps> = ({ onClose, createBot, updateBot}) => {
	const { selectedBot } = useUserBotsContext();

	const [name, setName] = useState( _.get(selectedBot, 'name', ''));
	const [description, setDescription] = useState(_.get(selectedBot, 'description', ''));
	const [systemMessage, setSystemMessage] = useState(_.get(selectedBot, 'config.systemMessage', ''));
	const [imageUrl, setImageUrl] = useState(_.get(selectedBot, 'imageUrl', ''));
	const [errors, setErrors] = useState({ name: '', description: '', systemMessage: '' });


	const botImages = [
		'https://i.imgur.com/sTgE6r6.gif',
		'https://i.imgur.com/eN19lDx.gif',
		'https://i.imgur.com/SfodzO0.jpeg',
		'https://i.imgur.com/sTgE6r6.gif',
		'https://i.imgur.com/eN19lDx.gif',
		'https://i.imgur.com/SfodzO0.jpeg',
		'https://i.imgur.com/sTgE6r6.gif',
		'https://i.imgur.com/eN19lDx.gif',
		'https://i.imgur.com/SfodzO0.jpeg',
		'https://i.imgur.com/SfodzO0.jpeg',
	];


	const handleImageSelect = (url: string) => {
		setImageUrl(url);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!name || !description || !systemMessage) {
			setErrors({
				name: !name ? 'Name is required' : '',
				description: !description ? 'Description is required' : '',
				systemMessage: !systemMessage ? 'System message is required' : '',
			});
			return;
		}
		const req = {
			type: 'chat',
			name,
			imageUrl,
			description,
			systemMessage,
		};
		if (selectedBot) {
			updateBot(selectedBot._id, req as UpdateBotRequest);
		} else {
			createBot(req as CreateBotRequest);
		}
	};

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
			<div className="bg-white rounded-lg w-full max-w-2xl mx-4 p-8 relative">
				<button className="absolute top-4 right-4 text-gray-800 hover:text-gray-900" onClick={onClose}>
					<FontAwesomeIcon icon={faTimes} />
				</button>
				<h2 className="text-2xl font-semibold mb-6">Add New Assistant</h2>
				<form onSubmit={handleSubmit}>
					<div className="relative mb-4">
						<div className={`relative ${styles.carousel}`} id="carousel">
							{botImages.map((url, index) => (
								<Image
									key={index}
									src={url}
									alt={`Bot Image ${index + 1}`}
									width={80}
									height={80}
									className={`cursor-pointer ${imageUrl === url ? 'border-4 border-blue-500' : ''}`}
									onClick={() => handleImageSelect(url)}
								/>
							))}
						</div>
						<label className="block text-sm font-medium text-gray-700">Name</label>
						<input
							required
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
							className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-blue-500 focus:bg-white focus:ring-0 form-input"
						/>
					</div>
					<div className="mb-4">
						<label className="block text-sm font-medium text-gray-700">Description</label>
						<input
							required
							type="text"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-blue-500 focus:bg-white focus:ring-0 form-input"
						/>
					</div>
					<div className="mb-4">
						<label className="block text-sm font-medium text-gray-700">System Message</label>
						<input
							required
							type="text"
							value={systemMessage}
							onChange={(e) => setSystemMessage(e.target.value)}
							className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-blue-500 focus:bg-white focus:ring-0 form-input"
						/>
					</div>
					<span className="text-sm text-red-500">{errors.name}</span>
					<button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition-all duration-300">
						Save Assistant
					</button>
				</form>
			</div>
		</div>
	);
};

export default CreateOrUpdateBotModal;
