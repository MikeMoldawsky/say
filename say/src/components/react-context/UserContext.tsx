import React, {createContext, useContext, useEffect, useState} from 'react';

interface UserContextType {
	userId: string | null;
}

interface UserProviderProps {
	children: React.ReactNode;
}


const UserContext = createContext<UserContextType>({
	userId: null,
});

const CONSTANT_USER_ID = '6422d27a79b10a5364ed8cd0';

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
	const [userId, setUserId] = useState<string | null>(null);

	useEffect(() => {
		login();
	}, []);

	const login = () => {
		// TODO: replace mock login with real login
		console.log("Logging in", CONSTANT_USER_ID)
		setUserId(CONSTANT_USER_ID);
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
