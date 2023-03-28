import React from 'react';

export interface User {
	id: string;
}

interface UserCardProps {
	user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user}) => {
	return (
		<></>
	);
};

export default UserCard;
