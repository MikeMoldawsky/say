import React from 'react';
import Header from '../components/Header';
import BotConfiguration from '../components/BotConfiguration';

const ConfigureBotPage: React.FC = () => {
    return (
        <div>
            <Header />
            <div className="pt-20 px-4">
                <BotConfiguration />
            </div>
        </div>
    );
};

export default ConfigureBotPage;
