//@ts-nocheck
'use client'
import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Minimize2 } from 'lucide-react';

const MiniChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [chatId, setChatId] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);
  const API_URL = 'http://localhost:5000/api';
  const SOCKET_URL = 'http://localhost:5000';

  // Получить или создать sessionId
  useEffect(() => {
    let sid = localStorage.getItem('chat_session_id');
    if (!sid) {
      sid = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('chat_session_id', sid);
    }
    setSessionId(sid);
  }, []);

  // Инициализация Socket.IO
  useEffect(() => {
    if (!sessionId) return;

    // Динамическая загрузка socket.io-client
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/socket.io/4.5.4/socket.io.min.js';
    script.async = true;
    script.onload = () => {
      socketRef.current = window.io(SOCKET_URL, {
        transports: ['websocket', 'polling']
      });

      socketRef.current.on('connect', () => {
        console.log('✅ Підключено до Socket.IO');
        setIsConnected(true);
      });

      socketRef.current.on('disconnect', () => {
        console.log('❌ Відключено від Socket.IO');
        setIsConnected(false);
      });

      socketRef.current.on('new-message', (message) => {
        setMessages(prev => [...prev, message]);
        
        if (!isOpen || isMinimized) {
          setUnreadCount(prev => prev + 1);
        }
      });

      socketRef.current.on('error', (error) => {
        console.error('Socket помилка:', error);
      });
    };
    document.body.appendChild(script);

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [sessionId, isOpen, isMinimized]);

  // Загрузить или создать чат
  useEffect(() => {
    if (!sessionId) return;

    const initChat = async () => {
      try {
        const savedChatId = localStorage.getItem('chat_id');
        
        if (savedChatId) {
          const response = await fetch(`${API_URL}/chats/${savedChatId}`);
          if (response.ok) {
            const data = await response.json();
            setChatId(savedChatId);
            setMessages(data.chat.messages || []);
            
            if (socketRef.current) {
              socketRef.current.emit('join-chat', savedChatId);
            }
            return;
          }
        }

        const response = await fetch(`${API_URL}/chats/start`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId })
        });

        const data = await response.json();
        const newChatId = data.chat.id;
        
        setChatId(newChatId);
        localStorage.setItem('chat_id', newChatId);

        if (socketRef.current) {
          socketRef.current.emit('join-chat', newChatId);
        }
      } catch (error) {
        console.error('Помилка ініціалізації чату:', error);
      }
    };

    initChat();
  }, [sessionId]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const messageContent = inputValue.trim();
    setInputValue('');

    try {
      // Если нет chatId, создаем чат сначала
      let currentChatId = chatId;
      
      if (!currentChatId && sessionId) {
        const response = await fetch(`${API_URL}/chats/start`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId })
        });
        const data = await response.json();
        currentChatId = data.chat.id;
        setChatId(currentChatId);
        localStorage.setItem('chat_id', currentChatId);
        
        if (socketRef.current) {
          socketRef.current.emit('join-chat', currentChatId);
        }
      }

      if (socketRef.current && isConnected && currentChatId) {
        socketRef.current.emit('client-message', {
          chatId: currentChatId,
          content: messageContent
        });
      } else if (currentChatId) {
        await fetch(`${API_URL}/chats/${currentChatId}/messages`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ content: messageContent })
        });
      }
    } catch (error) {
      console.error('Помилка відправки повідомлення:', error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
    if (!isOpen) {
      setUnreadCount(0);
    }
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
    if (isMinimized) {
      setUnreadCount(0);
    }
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('uk-UA', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="relative bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg transition-all duration-200 hover:scale-110"
        >
          <MessageCircle size={28} />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </button>
      )}

      {isOpen && (
        <div className={`bg-white rounded-lg shadow-2xl flex flex-col transition-all duration-300 ${
          isMinimized ? 'w-80 h-14' : 'w-96 h-[500px]'
        }`}>
          <div className="bg-blue-600 text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageCircle size={20} />
              <div>
                <h3 className="font-semibold">Підтримка</h3>
                <p className="text-xs opacity-80">
                  {isConnected ? '● Онлайн' : '○ Офлайн'}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={toggleMinimize}
                className="hover:bg-blue-700 rounded p-1 transition"
              >
                <Minimize2 size={18} />
              </button>
              <button
                onClick={toggleChat}
                className="hover:bg-blue-700 rounded p-1 transition"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
                {messages.length === 0 ? (
                  <div className="text-center text-gray-500 mt-8">
                    <MessageCircle size={48} className="mx-auto mb-2 opacity-50" />
                    <p>Напишіть нам повідомлення!</p>
                    <p className="text-sm">Ми відповімо якомога швидше</p>
                  </div>
                ) : (
                  messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.fromAdmin ? 'justify-start' : 'justify-end'}`}
                    >
                      <div
                        className={`max-w-[75%] rounded-lg p-3 ${
                          msg.fromAdmin
                            ? 'bg-white text-gray-800 shadow'
                            : 'bg-blue-600 text-white'
                        }`}
                      >
                        <p className="text-sm break-words">{msg.content}</p>
                        <p
                          className={`text-xs mt-1 ${
                            msg.fromAdmin ? 'text-gray-500' : 'text-blue-100'
                          }`}
                        >
                          {formatTime(msg.createdAt)}
                        </p>
                      </div>
                    </div>
                  ))
                )}
                <div ref={messagesEndRef} />
              </div>

              <div className="p-4 border-t bg-white rounded-b-lg">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Напишіть повідомлення..."
                    className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim()}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg px-4 py-2 transition"
                  >
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default MiniChat;