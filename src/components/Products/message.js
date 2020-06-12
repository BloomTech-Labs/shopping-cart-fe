import React, { useState, useEffect } from 'react';

const Message = ({ message }) => {
	const [ messageType, setMessageType ] = useState();

	useEffect(
		() => {
			if (!message) {
				return console.log('message');
			}
			else {
				return message.includes('Deleted') ? setMessageType('red') : setMessageType('green');
			}
		},
		[ message ]
	);

	message ? console.log(message.length) : console.log('nope');

	return (
		<div className={message ? '' : 'hidden'}>
			<div className={messageType === 'red' ? 'messageContainerRed' : 'messageContainerGreen'}>
				<h3 className={messageType === 'red' ? 'messageTextRed' : 'messageTextGreen'}> {message} </h3>
			</div>
		</div>
	);
};

export default Message;
