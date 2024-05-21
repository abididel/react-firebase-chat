import React from 'react';
import styled from 'styled-components';

const avatarSideSize = 50; // px
const outerFrameMargin = 10; // px
const imgToChatBubbleMargin = 10; // px
const fontSize = 25; //px


// Styling for the container including the avatar and the message bubble
const MessageContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: ${props => (props.isUser ? 'flex-end' : 'flex-start')};
  flex-direction: ${props => (props.isUser ? 'row-reverse' : 'row')};
  ${props => (props.isUser ? 'margin-left' : 'margin-right')}: auto;
  ${props => (props.isUser ? 'margin-right' : 'margin-left')}: ${outerFrameMargin}px;
  font-family: Arial, sans-serif;
  text-align: left;
  max-width: calc(100% - ${props => (props.isUser ? avatarSideSize + outerFrameMargin : 0)}px - ${2 * imgToChatBubbleMargin}px); /* Ensure the container doesn't exceed the viewport width minus avatar size */
  margin-top: 5px;
  margin-buttom: 5px;
  margin-right: ${outerFrameMargin}px;
  font-size: ${fontSize}px;
  `;

// Styling for the avatar
const Avatar = styled.img`
  width: ${avatarSideSize}px; // Set the size of the avatar
  height: ${avatarSideSize}px;
  border-radius: 50%; // Circular avatar
  margin: ${props => (props.isUser ? `0 0 0 ${imgToChatBubbleMargin}px` : `0 ${imgToChatBubbleMargin}px 0 0`)}; // Space between avatar and message bubble
`;

// Styling for the message bubble
const MessageBubble = styled.div`
  background-color: ${props => (props.isUser ? '#e0e0e0' : '#f2f2f2')};
  padding: 10px 15px;
  border-radius: ${props => (props.isUser ? '8px 0 8px 8px' : '0 8px 8px 8px')};
  margin: 5px 0;
  text-align: left;
  display: inline-block;
  word-wrap: break-word;
  overflow-wrap: break-word;
  word-break: break-all;
  box-sizing: border-box; /* Ensures padding is included in the width calculation */
`;

// Styling for the button container
const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 0px;
`;

// Styling for the buttons
const Button = styled.button`
  background-color: #104f89;
  color: white;
  border: none;
  padding: 8px 15px;
  margin: 5px 0; // Changed from 5px auto to 5px 0 to align to the start
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  width: auto; /* Ensure buttons are auto-sized based on their content */
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:hover {
    background-color: rgba(24, 119, 206, 1);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(16, 79, 137, 0.5);
  }
`;

// Styling for the button text
const ButtonText = styled.span`
  flex-grow: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
`;

// Styling for the button arrow
const ButtonArrow = styled.span`
  margin-left: 10px; // Space between text and arrow
  flex-shrink: 0;
`;

// Styling for the message content container
const MessageContent = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 100%;
  align-items: flex-start; /* Ensure all items inside are aligned to the top */
`;

const ChatMessage = ({ avatar, messages, buttons, isUser }) => {
  return (
    <MessageContainer isUser={isUser}>
      {!isUser && <Avatar src={avatar} alt="Chat Avatar" />}
      <MessageContent>
        {messages && messages.length > 0 && (
          messages.map((message, index) => (
          <MessageBubble key={index} isUser={isUser}>
            {message}
          </MessageBubble>
        )))}
        {buttons && buttons.length > 0 && (
          <ButtonContainer>
            {buttons.map((button, index) => (
              button && (
                <Button key={index} onClick={button.onClick}>
                  <ButtonText>{button.label}</ButtonText>
                  <ButtonArrow>&rarr;</ButtonArrow>
                </Button>
              )
            ))}
          </ButtonContainer>
        )}
      </MessageContent>
    </MessageContainer>
  );
};

export default ChatMessage;
