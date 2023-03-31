import React, { useState} from 'react';
import  { SayMessage } from './ChatMessage';
import ChatMessages from './ChatMessages';
import BotChatInfo from './BotChatInfo';
import { toChatGPTMessages } from "../../frontend/utils/messageConverter";
import { v4 as uuidv4 } from 'uuid';
import Loader from "../Loader";
import {useUserBotsContext} from "../react-context/UserBotsContext";
import {chatWithChatGPT} from "../../frontend/clients/chatClient";
import {ChatCompletionRequest} from "../../objects-api/chat";



// Todo: Move to database
const contexts = [
	{_id: "1", name:"Birds Blog", message:"Birds are fascinating creatures with a range of unique adaptations that make them stand out in the animal kingdom. With feathers that enable them to fly and stay warm, birds have a lightweight skeleton that helps them soar through the skies with ease. Many species of birds have developed specific beak shapes adapted to their diets, such as the toucan's curved beak for reaching fruit in trees. Some bird species are known for their beautiful songs, while others are the largest birds in the world, like the ostrich. Birds have keen eyesight and are able to see in color, including ultraviolet light, making them well-suited to finding prey and navigating their environment. Found in almost every environment on Earth, birds are a diverse group of animals that continue to fascinate and inspire us."},
	{_id: "2", name:"Dog Blog", message:"Dogs are beloved pets known for their loyalty and affection towards their owners. They are highly social animals that have been domesticated for thousands of years, forming close bonds with humans. With their acute sense of smell, dogs are often used for tasks like detecting drugs, searching for missing persons, and guiding people with visual impairments."},
	{_id: "3", name:"Cat Blog", message:"Cats are also popular pets, known for their independence and graceful movements. They are skilled hunters, with sharp claws and teeth, and are able to jump up to six times their own body length. Cats are also known for their ability to purr, a unique trait that scientists believe may be linked to their ability to heal themselves and cope with stress."},
	{_id: "4", name:"Dolphin Blog", message:"Dolphins are highly intelligent and social marine mammals that have captured the public's imagination with their playful behavior and acrobatics. They use a complex system of clicks and whistles to communicate with each other, and are able to swim at speeds of up to 20 miles per hour. They have been known to display altruistic behavior, helping stranded or injured individuals of their own or other species."},
	{_id: "5", name:"Monkey Blog", message:"Monkeys are primates known for their dexterous hands and complex social behavior. They are able to use tools and solve problems, and are known for their curiosity and playfulness. Many species of monkeys form close social bonds and have hierarchies within their groups. They are found in a variety of habitats, from tropical rainforests to deserts."},
	{_id: "6", name:"Lion Blog", message:"Lions are apex predators that are often referred to as the king of the jungle. They are social animals that live in groups called prides, with females doing most of the hunting while males defend the territory. Lions are strong and agile, with sharp teeth and claws, and are able to run at speeds of up to 50 miles per hour. Their distinctive roar can be heard up to five miles away, and is used to communicate with other lions and establish their territory."},
];


const ChatWindow: React.FC = () => {
	const { selectedBot } = useUserBotsContext();
	const [messages, setMessages] = useState<SayMessage[]>([]);
	const [selectedContext, setSelectedContext] = useState<number | null>(null);

	const switchContext = (index: number) => {
		setSelectedContext(index);
		setMessages([]);
	}

	const handleNewMessage = async (userContent: string) => {
		if(selectedBot === null) return;
		const systemMessages: SayMessage[] = [{ id: uuidv4(), role: 'system', content: selectedBot.systemMessage, createdAt: new Date() }];

		// Make sure to use the updated messages state for the chatGPTMessages
		const userSayMessage = { id: uuidv4(), role: 'user', content: userContent, createdAt: new Date() };

		// Add user message and system message to the messages state
		setMessages((prevMessages) => [
			...prevMessages,
			{ id: uuidv4(), role: 'user', content: userContent, createdAt: new Date() },
		]);

		let sayMessages: SayMessage[] = [
			...systemMessages,
			...messages,
			userSayMessage
		];

		if (selectedContext !== null) {
			const contextMessage = { id: uuidv4(), role: 'user', content: contexts[selectedContext].message, createdAt: new Date() };
			sayMessages.splice(1, 0, contextMessage);
		}

		try {
			const chatCompletionRequest: ChatCompletionRequest =  {messages: toChatGPTMessages(sayMessages)};
			const assistantMessage = await chatWithChatGPT(chatCompletionRequest);
			setMessages((prevMessages) => [
				...prevMessages,
				{ id: uuidv4(), role: 'assistant', content: assistantMessage, createdAt: new Date() },
			]);
		} catch (error) {
			console.error('Error getting ChatGPT response:', error);
		}
	};


	return (
		<div className="pt-20 px-4">
			{!selectedBot ? < Loader/> :
			<div className="bg-gray-100 min-h-screen flex flex-col">
				<div className="flex-grow flex">
					<div className="w-1/3 h-screen bg-white p-4 rounded-lg shadow overflow-auto">
						<BotChatInfo bot={selectedBot} contexts={contexts} selectedContext={selectedContext} switchContext={switchContext}/>
					</div>
					<div className="w-2/3 h-screen bg-white rounded-lg shadow flex flex-col">
						<ChatMessages messages={messages} title="Your Wish Is My Command" onNewMessage={handleNewMessage} />
					</div>
				</div>
			</div>
			}
		</div>

	);
};

export default ChatWindow;

