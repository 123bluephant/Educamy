import React, { useState } from 'react';
import { MessageSquare, Send, Paperclip, Image, File, CheckCheck, Clock, User, Users, Search } from 'lucide-react';

 
interface Message {
  id: number;
  sender: string;
  senderRole: 'parent' | 'teacher' | 'admin';
  content: string;
  timestamp: Date;
  read: boolean;
  attachments?: {
    name: string;
    type: 'image' | 'document';
    url: string;
  }[];
}

interface Conversation {
  id: number;
  participants: string[];
  isGroup: boolean;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
}

const DirectCommunication: React.FC = () => {
  // Sample conversations
  const [conversations, setConversations] = useState<Conversation[]>([
    { 
      id: 1, 
      participants: ['Ms. Johnson (Math Teacher)'], 
      isGroup: false, 
      lastMessage: 'Could we discuss John\'s recent test performance?', 
      lastMessageTime: new Date('2023-07-05T10:30:00'), 
      unreadCount: 0 
    },
    { 
      id: 2, 
      participants: ['Mr. Williams (Science Teacher)'], 
      isGroup: false, 
      lastMessage: 'The science project deadline has been extended.', 
      lastMessageTime: new Date('2023-07-04T15:45:00'), 
      unreadCount: 1 
    },
    { 
      id: 3, 
      participants: ['Class 5A Parents Group'], 
      isGroup: true, 
      lastMessage: 'Don\'t forget about the field trip next week!', 
      lastMessageTime: new Date('2023-07-03T09:15:00'), 
      unreadCount: 3 
    },
  ]);

  // Sample messages for the active conversation
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: 'You',
      senderRole: 'parent',
      content: 'Hello Ms. Johnson, I wanted to discuss John\'s recent math test performance.',
      timestamp: new Date('2023-07-05T10:15:00'),
      read: true
    },
    {
      id: 2,
      sender: 'Ms. Johnson',
      senderRole: 'teacher',
      content: 'Hi there! Yes, John did well on the conceptual questions but struggled with some of the algebraic equations.',
      timestamp: new Date('2023-07-05T10:20:00'),
      read: true
    },
    {
      id: 3,
      sender: 'You',
      senderRole: 'parent',
      content: 'I see. Is there anything specific we should work on at home?',
      timestamp: new Date('2023-07-05T10:25:00'),
      read: true
    },
    {
      id: 4,
      sender: 'Ms. Johnson',
      senderRole: 'teacher',
      content: 'I would recommend practicing equations with variables on both sides. I can share some practice worksheets.',
      timestamp: new Date('2023-07-05T10:28:00'),
      read: true,
      attachments: [
        {
          name: 'Algebra_Practice_Worksheet.pdf',
          type: 'document',
          url: '#'
        }
      ]
    },
    {
      id: 5,
      sender: 'You',
      senderRole: 'parent',
      content: 'That would be very helpful, thank you!',
      timestamp: new Date('2023-07-05T10:30:00'),
      read: true
    },
  ]);

  const [activeConversation, setActiveConversation] = useState<number>(1);
  const [newMessage, setNewMessage] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Filter conversations based on search query
  const filteredConversations = conversations.filter(conversation =>
    conversation.participants.some(participant =>
      participant.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  // Handle sending a new message
  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;

    const newMsg: Message = {
      id: messages.length + 1,
      sender: 'You',
      senderRole: 'parent',
      content: newMessage,
      timestamp: new Date(),
      read: false
    };

    setMessages([...messages, newMsg]);
    setNewMessage('');

    // Update the conversation list
    setConversations(conversations.map(conv =>
      conv.id === activeConversation
        ? { ...conv, lastMessage: newMessage, lastMessageTime: new Date() }
        : conv
    ));
  };

  return (
      <div className="min-h-screen bg-gray-50 p-8">
        <h1 className="text-3xl font-bold mb-8">Direct Communication</h1>

        <div className="flex h-[calc(100vh-200px)] bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Conversations Sidebar */}
          <div className="w-1/3 border-r border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {filteredConversations.map(conversation => (
                <div 
                  key={conversation.id} 
                  className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 ${activeConversation === conversation.id ? 'bg-blue-50' : ''}`}
                  onClick={() => setActiveConversation(conversation.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        {conversation.isGroup ? (
                          <div className="bg-indigo-100 rounded-full p-2">
                            <Users className="h-6 w-6 text-indigo-600" />
                          </div>
                        ) : (
                          <div className="bg-blue-100 rounded-full p-2">
                            <User className="h-6 w-6 text-blue-600" />
                          </div>
                        )}
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">
                          {conversation.isGroup 
                            ? conversation.participants[0] 
                            : conversation.participants[0]}
                        </p>
                        <p className="text-xs text-gray-500 truncate max-w-[180px]">
                          {conversation.lastMessage}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <p className="text-xs text-gray-500">
                        {conversation.lastMessageTime.toLocaleDateString()}
                      </p>
                      {conversation.unreadCount > 0 && (
                        <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-blue-600 rounded-full mt-1">
                          {conversation.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-gray-200">
              <button className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                <MessageSquare className="h-5 w-5 mr-2" />
                New Conversation
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="w-2/3 flex flex-col">
            {/* Conversation Header */}
            <div className="p-4 border-b border-gray-200 flex items-center">
              {activeConversation && (
                <>
                  <div className="flex-shrink-0">
                    {conversations.find(c => c.id === activeConversation)?.isGroup ? (
                      <div className="bg-indigo-100 rounded-full p-2">
                        <Users className="h-6 w-6 text-indigo-600" />
                      </div>
                    ) : (
                      <div className="bg-blue-100 rounded-full p-2">
                        <User className="h-6 w-6 text-blue-600" />
                      </div>
                    )}
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">
                      {conversations.find(c => c.id === activeConversation)?.participants[0]}
                    </p>
                    <p className="text-xs text-gray-500">
                      {conversations.find(c => c.id === activeConversation)?.isGroup 
                        ? 'Group conversation' 
                        : 'Direct message'}
                    </p>
                  </div>
                </>
              )}
            </div>

            {/* Messages List */}
            <div className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-4">
                {messages.map(message => (
                  <div 
                    key={message.id} 
                    className={`flex ${message.sender === 'You' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${message.sender === 'You' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-100 text-gray-800'}`}
                    >
                      <div className="flex items-center">
                        <p className="text-xs font-medium">{message.sender}</p>
                        <p className="text-xs text-opacity-70 ml-2">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                      <p className="mt-1">{message.content}</p>
                      
                      {message.attachments && message.attachments.length > 0 && (
                        <div className="mt-2 space-y-2">
                          {message.attachments.map((attachment, index) => (
                            <div 
                              key={index} 
                              className={`flex items-center p-2 rounded ${message.sender === 'You' 
                                ? 'bg-blue-700' 
                                : 'bg-gray-200'}`}
                            >
                              {attachment.type === 'image' ? (
                                <Image className="h-4 w-4 mr-2" />
                              ) : (
                                <File className="h-4 w-4 mr-2" />
                              )}
                              <span className="text-xs truncate">{attachment.name}</span>
                              <a 
                                href={attachment.url} 
                                className="ml-auto text-xs underline"
                                target="_blank" 
                                rel="noopener noreferrer"
                              >
                                View
                              </a>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      <div className="flex justify-end mt-1">
                        {message.read ? (
                          <CheckCheck className="h-3 w-3 text-opacity-70" />
                        ) : (
                          <Clock className="h-3 w-3 text-opacity-70" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center">
                <button className="p-2 rounded-full text-gray-500 hover:text-gray-700 focus:outline-none">
                  <Paperclip className="h-5 w-5" />
                </button>
                <input
                  type="text"
                  className="flex-1 mx-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button 
                  className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 focus:outline-none"
                  onClick={handleSendMessage}
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
              <p className="mt-2 text-xs text-gray-500 text-center">
                End-to-end encrypted conversation. Your messages are secure.
              </p>
            </div>
          </div>
        </div>

        {/* FERPA/GDPR Compliance Notice */}
        <div className="mt-6 bg-blue-50 rounded-lg p-4 border border-blue-200">
          <p className="text-sm text-blue-800">
            <strong>Privacy Notice:</strong> All communications are encrypted and compliant with FERPA and GDPR regulations. 
            Messages are only accessible to the intended recipients and authorized school administrators.
          </p>
        </div>
      </div>
  );
};

export default DirectCommunication;