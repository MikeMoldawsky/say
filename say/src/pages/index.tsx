import React, { useState } from 'react';
import Header from '../components/Header';
import BotList from '../components/BotList';

const IndexPage: React.FC = () => {
    const [bots, setBots] = useState([
        { id: 1, name: 'Bot 1', behavior: 'happy' },
        { id: 2, name: 'Bot 2', behavior: 'sad' },
    ]);

    return (
        <div>
            <Header />
            <BotList bots={bots} />
        </div>
    );
};

export default IndexPage;
