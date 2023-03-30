import React from 'react';
import BotCard from './BotCard';
import {Bot} from "../../objects-api/bots";
import {useUserBotsContext} from "../react-context/UserBotsContext";
import Loader from "../Loader";
import {useRouter} from "next/router";

interface BotCardListProps {
	onSelect: (bot: Bot) => void;
}

const BotCardList: React.FC<BotCardListProps> = ({onSelect}) => {
	const router = useRouter();

	const routeToChat = (bot: Bot) => {
		router.push(`/chat?id=${bot._id}`);
	};

	const { bots } = useUserBotsContext();
	return (
		<div className="p-4">
			<h2 className="text-2xl font-semibold mb-4 text-primary">My Bots</h2>
			<div className="flex flex-wrap justify-center items-center gap-6">
				{ bots === null ?
					<Loader /> :
					bots.map((bot) => (
					<BotCard key={bot._id} bot={bot} onChat={routeToChat} onConfigure={onSelect} />
				))}
			</div>
		</div>
	);
};

export default BotCardList;

