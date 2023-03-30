import Header from '../components/Header';
import BotMain from "../components/bot/BotMain";
import {UserBotsProvider} from "../components/react-context/UserBotsContext";

const IndexPage: React.FC = () => {
    return (
        <div>
            <Header />
            <div className="pt-20 px-4">
                <UserBotsProvider>
                    <BotMain />
                </UserBotsProvider>
            </div>
        </div>
    );
};

export default IndexPage;

