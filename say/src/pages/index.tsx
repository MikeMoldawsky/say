import Header from '../components/Header';
import BotMain from "../components/bot/BotMain";

const IndexPage: React.FC = () => {
    return (
        <div>
            <Header />
            <div className="pt-20 px-4">
                <BotMain />
            </div>
        </div>
    );
};

export default IndexPage;

