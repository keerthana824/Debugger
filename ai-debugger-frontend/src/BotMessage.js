// BotMessage.js
import React from 'react';
import ReactMarkdown from 'react-markdown';

const BotMessage = ({ content }) => (
  <div className="botMessage">
    <ReactMarkdown>{content}</ReactMarkdown>
  </div>
);

export default BotMessage;
