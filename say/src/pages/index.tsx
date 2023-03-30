import Header from '../components/Header';
import {useRouter} from "next/router";
import {Bot} from "../objects-api/bots";
import BotMain from "../components/bot/BotMain";
import {UserBotsProvider} from "../components/react-context/UserBotsContext";

const IndexPage: React.FC = () => {
    const router = useRouter();

    const openChat = (bot: Bot) => {
        router.push(`/chat?id=${bot._id}`);
    };


    return (
        <div>
            <Header />
            <div className="pt-20 px-4">
                <UserBotsProvider>
                    <BotMain  openChat={openChat} />
                </UserBotsProvider>
            </div>
        </div>
    );
};

export default IndexPage;

