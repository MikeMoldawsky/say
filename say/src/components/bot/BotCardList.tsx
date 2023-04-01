import React, {useState} from 'react';
import BotCard from './BotCard';
import {Bot} from "../../objects-api/bots";
import {useUserBotsContext} from "../react-context/UserBotsContext";
import Loader from "../Loader";
import {useRouter} from "next/router";

interface BotCardListProps {
	onConfigure: (bot: Bot) => void;
}

const BotCardList: React.FC<BotCardListProps> = ({onConfigure}) => {
	const { botClient, refreshBots, bots, setSelectedBot  } = useUserBotsContext();
	const [isLoading, setLoading] =  useState(false)
	const router = useRouter();

	const handleDelete = async (bot: Bot) => {
		setLoading(true);
		if (botClient === null) {
			throw new Error("Bot client is null");
		}
		await botClient.deleteBot(bot._id);
		await refreshBots();
		setLoading(false);
	}

	const routeToChat = (bot: Bot) => {
		setLoading(true);
		setSelectedBot(bot);
		router.push(`/chat`);
	};

	return (
		<div className="p-4">
			<h2 className="text-2xl font-semibold mb-4 text-primary">My Bots</h2>
			<div className="flex flex-wrap justify-center items-center gap-6">
				{ (bots === null || isLoading) ?
					<Loader /> :
					bots.map((bot) => (
					<BotCard key={bot._id} bot={bot} onChat={routeToChat} onConfigure={onConfigure} onDelete={handleDelete} />
				))}
			</div>
		</div>
	);
};

export default BotCardList;

