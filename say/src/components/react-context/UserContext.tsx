import React, {createContext, useContext, useEffect, useState} from 'react';

interface UserContextType {
	userId: string | null;
}

const UserContext = createContext<UserContextType>({
	userId: null,
});

export const UserProvider: React.FC = ({ children }) => {
	const [userId, setUserId] = useState<string | null>(null);

	useEffect(() => {
		login();
	}, []);

	const login = () => {
		// TODO: replace mock login with real login
		setUserId('6422d27a79b10a5364ed8cd0');
	};

	return (
		<UserContext.Provider value={{ userId }}>
			{children}
		</UserContext.Provider>
	);
};


export const useUserContext = () => {
	return useContext(UserContext);
};
