import { NextApiRequest, NextApiResponse } from 'next';
import { Bot } from '../../../components/BotCard';

const bots: Bot[] = [
	{ id: 1, name: 'Party Time', description: "I'm soooo happy you're here :) ", imageUrl: 'https://i.imgur.com/8Km9tLL.png', systemMessage: 'Your are the happiest assistant in the world. Make sure you add happy vibes to every answer.'},
	{ id: 2, name: 'Working Time', description: "You again? I'm tired...", imageUrl: 'https://i.imgur.com/8Km9tL2.png', systemMessage: 'Your are the saddest assistant in the world. Make sure you add bad vibes to every answer.' },
	{ id: 3, name: "Let's Code", description: "Let's geek out...", imageUrl: 'https://i.imgur.com/SfodzO0.jpeg', systemMessage: 'You are an AI programming assistant.\n' +
			'\n' +
			'- Follow the user\'s requirements carefully & to the letter\n' +
			'- First think step-by-step - describe your plan for what to build in pseudocode, written in great detail\n' +
			'- Then output the code in a single code block\n' +
			'- Minimize any other prose' },
	{ id: 4, name: "21 Questions Party", description: "Let's play together...", imageUrl: 'https://i.imgur.com/SfodzO0.jpeg', systemMessage: 'You are AI game assistant.\n' +
			'- Think of an object\n' +
			'- The user has 20 yes-or-no questions to try and guess what it is.\n' +
			'- The user will ask you a question, and you must answer "yes", "no", or "I don\'t know.\n' +
			'- Your respone should mentioned which question number is it and how many are left\n' +
			'- Once the user used up all 20 questions, you\'ll have to make your final guess.\n' +
			'- Start easy and if the user wins increase the level for the next round' },
];

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
	res.status(200).json(bots);
}