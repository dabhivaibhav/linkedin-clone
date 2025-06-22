import { useState, useEffect, useRef } from 'react';
import {
  Box,
  Paper,
  Avatar,
  Typography,
  TextField,
  IconButton,
  Badge,
  Divider,
  InputAdornment,
  Chip,
  Menu,
  MenuItem,
  Tooltip,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  LinearProgress
} from '@mui/material';
import {
  Search,
  Send,
  AttachFile,
  EmojiEmotions,
  MoreVert,
  Circle,
  Mic,
  MicOff,
  Image,
  VideoCall,
  Phone,
  ThumbUp,
  Favorite,
  Reply,
  Delete,
  Edit,
  Close
} from '@mui/icons-material';
import './Messaging.css';

function Messaging() {
  const [selectedChat, setSelectedChat] = useState(0);
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [fileDialog, setFileDialog] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const conversations = [
    {
      id: 1,
      name: 'Sarah Johnson',
      lastMessage: 'Thanks for connecting! Looking forward to collaborating.',
      time: '2m',
      unread: 2,
      online: true,
      avatar: 'https://picsum.photos/40/40?random=1'
    },
    {
      id: 2,
      name: 'Michael Chen',
      lastMessage: 'The project proposal looks great. When can we schedule a call?',
      time: '1h',
      unread: 0,
      online: true,
      avatar: 'https://picsum.photos/40/40?random=2'
    },
    {
      id: 3,
      name: 'Emily Davis',
      lastMessage: 'I saw your post about the new marketing strategy. Very insightful!',
      time: '3h',
      unread: 1,
      online: false,
      avatar: 'https://picsum.photos/40/40?random=3'
    },
    {
      id: 4,
      name: 'David Wilson',
      lastMessage: 'Could you share the design files we discussed?',
      time: '1d',
      unread: 0,
      online: false,
      avatar: 'https://picsum.photos/40/40?random=4'
    }
  ];

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'Sarah Johnson',
      content: 'Hi! Thanks for connecting with me on NextGenNetwork.',
      time: '10:30 AM',
      isOwn: false,
      reactions: [{ emoji: '👍', count: 1 }],
      type: 'text'
    },
    {
      id: 2,
      sender: 'You',
      content: 'Hello Sarah! Great to connect. I really enjoyed your recent article on product management.',
      time: '10:32 AM',
      isOwn: true,
      reactions: [],
      type: 'text'
    },
    {
      id: 3,
      sender: 'Sarah Johnson',
      content: 'Thank you! I\'d love to hear your thoughts on it. Are you working on any interesting projects lately?',
      time: '10:35 AM',
      isOwn: false,
      reactions: [{ emoji: '❤️', count: 1 }],
      type: 'text'
    },
    {
      id: 4,
      sender: 'You',
      content: 'project-proposal.pdf',
      time: '10:38 AM',
      isOwn: true,
      reactions: [],
      type: 'file'
    },
    {
      id: 5,
      sender: 'Sarah Johnson',
      content: 'Thanks for connecting! Looking forward to collaborating.',
      time: '10:40 AM',
      isOwn: false,
      reactions: [],
      type: 'text'
    }
  ]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (message.length > 0) {
      setIsTyping(true);
      const timer = setTimeout(() => setIsTyping(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        sender: 'You',
        content: message,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isOwn: true,
        reactions: [],
        type: 'text'
      };
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  const handleReaction = (messageId, emoji) => {
    setMessages(messages.map(msg => {
      if (msg.id === messageId) {
        const existingReaction = msg.reactions.find(r => r.emoji === emoji);
        if (existingReaction) {
          return {
            ...msg,
            reactions: msg.reactions.map(r => 
              r.emoji === emoji ? { ...r, count: r.count + 1 } : r
            )
          };
        } else {
          return {
            ...msg,
            reactions: [...msg.reactions, { emoji, count: 1 }]
          };
        }
      }
      return msg;
    }));
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileDialog(true);
      setUploadProgress(0);
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              setFileDialog(false);
              const newMessage = {
                id: messages.length + 1,
                sender: 'You',
                content: file.name,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                isOwn: true,
                reactions: [],
                type: 'file'
              };
              setMessages([...messages, newMessage]);
            }, 500);
            return 100;
          }
          return prev + 10;
        });
      }, 100);
    }
  };

  const emojis = ['👍', '❤️', '😂', '😮', '😢', '😡'];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-12 gap-6 h-[calc(100vh-120px)]">
          {/* Conversations List */}
          <div className="col-span-4">
            <Paper className="h-full flex flex-col hover-lift" elevation={2}>
              <div className="p-4 border-b">
                <Typography variant="h6" className="font-semibold text-gray-800 mb-3">
                  Messages
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Search messages"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search className="text-gray-400" />
                      </InputAdornment>
                    ),
                    className: 'bg-gray-50 rounded-lg'
                  }}
                />
              </div>
              
              <div className="flex-1 overflow-y-auto">
                {conversations.map((conv, index) => (
                  <div
                    key={conv.id}
                    onClick={() => setSelectedChat(index)}
                    className={`p-4 cursor-pointer transition-all duration-200 hover:bg-blue-50 ${
                      selectedChat === index ? 'bg-blue-100 border-r-4 border-blue-500' : ''
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Avatar src={conv.avatar} className="w-12 h-12" />
                        {conv.online && (
                          <Circle className="absolute -bottom-1 -right-1 text-green-500 text-xs bg-white rounded-full" />
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center">
                          <Typography variant="subtitle2" className="font-semibold text-gray-900 truncate">
                            {conv.name}
                          </Typography>
                          <div className="flex items-center space-x-2">
                            <Typography variant="caption" className="text-gray-500">
                              {conv.time}
                            </Typography>
                            {conv.unread > 0 && (
                              <Chip
                                label={conv.unread}
                                size="small"
                                className="bg-blue-500 text-white text-xs min-w-[20px] h-5"
                              />
                            )}
                          </div>
                        </div>
                        <Typography variant="body2" className="text-gray-600 truncate mt-1">
                          {conv.lastMessage}
                        </Typography>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Paper>
          </div>

          {/* Chat Area */}
          <div className="col-span-8">
            <Paper className="h-full flex flex-col hover-lift" elevation={2}>
              {/* Chat Header */}
              <div className="p-4 border-b bg-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Avatar src={conversations[selectedChat]?.avatar} className="w-10 h-10" />
                      {conversations[selectedChat]?.online && (
                        <Circle className="absolute -bottom-1 -right-1 text-green-500 text-xs bg-white rounded-full online-indicator" />
                      )}
                    </div>
                    <div>
                      <Typography variant="h6" className="font-semibold text-gray-900">
                        {conversations[selectedChat]?.name}
                      </Typography>
                      <Typography variant="caption" className="text-green-600">
                        {isTyping ? (
                          <span className="flex items-center space-x-1">
                            <span>typing</span>
                            <div className="flex space-x-1">
                              <div className="w-1 h-1 bg-green-500 rounded-full animate-bounce"></div>
                              <div className="w-1 h-1 bg-green-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                              <div className="w-1 h-1 bg-green-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                            </div>
                          </span>
                        ) : conversations[selectedChat]?.online ? 'Active now' : 'Last seen 2h ago'}
                      </Typography>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Tooltip title="Voice call">
                      <IconButton className="text-gray-500 hover:text-blue-500 transition-colors">
                        <Phone />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Video call">
                      <IconButton className="text-gray-500 hover:text-blue-500 transition-colors">
                        <VideoCall />
                      </IconButton>
                    </Tooltip>
                    <IconButton 
                      className="text-gray-500 hover:text-gray-700"
                      onClick={(e) => setAnchorEl(e.currentTarget)}
                    >
                      <MoreVert />
                    </IconButton>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 chat-scroll">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex animate-fadeIn group ${
                      msg.isOwn ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div className="relative">
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl shadow-sm message-bubble cursor-pointer ${
                          msg.isOwn
                            ? 'bg-blue-500 text-white rounded-br-md'
                            : 'bg-white text-gray-800 rounded-bl-md'
                        }`}
                        onClick={(e) => {
                          setSelectedMessage(msg.id);
                          setAnchorEl(e.currentTarget);
                        }}
                      >
                        {msg.type === 'file' ? (
                          <div className="flex items-center space-x-2">
                            <AttachFile className="text-sm" />
                            <Typography variant="body2" className="leading-relaxed">
                              {msg.content}
                            </Typography>
                          </div>
                        ) : (
                          <Typography variant="body2" className="leading-relaxed">
                            {msg.content}
                          </Typography>
                        )}
                        <Typography
                          variant="caption"
                          className={`block mt-1 ${
                            msg.isOwn ? 'text-blue-100' : 'text-gray-500'
                          }`}
                        >
                          {msg.time}
                        </Typography>
                        {msg.reactions.length > 0 && (
                          <div className="flex space-x-1 mt-2">
                            {msg.reactions.map((reaction, idx) => (
                              <Chip
                                key={idx}
                                label={`${reaction.emoji} ${reaction.count}`}
                                size="small"
                                className="text-xs h-6"
                              />
                            ))}
                          </div>
                        )}
                      </div>
                      
                      {/* Quick reactions */}
                      <div className={`absolute top-0 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1 ${
                        msg.isOwn ? '-left-20' : '-right-20'
                      }`}>
                        {['👍', '❤️', '😂'].map(emoji => (
                          <IconButton
                            key={emoji}
                            size="small"
                            className="bg-white shadow-md hover:scale-110 transition-transform"
                            onClick={() => handleReaction(msg.id, emoji)}
                          >
                            <span className="text-sm">{emoji}</span>
                          </IconButton>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="p-4 border-t bg-white">
                <div className="flex items-center space-x-2">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    className="hidden"
                    accept="*/*"
                  />
                  <Tooltip title="Attach file">
                    <IconButton 
                      className="text-gray-500 hover:text-blue-500 transition-colors"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <AttachFile />
                    </IconButton>
                  </Tooltip>
                  
                  <Tooltip title="Send image">
                    <IconButton className="text-gray-500 hover:text-blue-500 transition-colors">
                      <Image />
                    </IconButton>
                  </Tooltip>
                  
                  <TextField
                    fullWidth
                    multiline
                    maxRows={3}
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSendMessage())}
                    variant="outlined"
                    size="small"
                    className="flex-1"
                    InputProps={{
                      className: 'rounded-full bg-gray-50',
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton 
                            className="text-gray-500 hover:text-blue-500"
                            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                          >
                            <EmojiEmotions />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                  
                  <Tooltip title={isRecording ? "Stop recording" : "Voice message"}>
                    <IconButton 
                      className={`transition-colors ${
                        isRecording ? 'bg-red-500 text-white animate-pulse' : 'text-gray-500 hover:text-blue-500'
                      }`}
                      onClick={() => setIsRecording(!isRecording)}
                    >
                      {isRecording ? <MicOff /> : <Mic />}
                    </IconButton>
                  </Tooltip>
                  
                  <Tooltip title="Send message">
                    <IconButton 
                      className="bg-blue-500 text-white hover:bg-blue-600 transition-colors send-button"
                      onClick={handleSendMessage}
                      disabled={!message.trim()}
                    >
                      <Send />
                    </IconButton>
                  </Tooltip>
                </div>
                
                {/* Emoji Picker */}
                {showEmojiPicker && (
                  <div className="mt-2 p-2 bg-white border rounded-lg shadow-lg">
                    <div className="flex space-x-2">
                      {emojis.map(emoji => (
                        <IconButton
                          key={emoji}
                          size="small"
                          onClick={() => {
                            setMessage(message + emoji);
                            setShowEmojiPicker(false);
                          }}
                        >
                          {emoji}
                        </IconButton>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Paper>
          </div>
        </div>
        
        {/* Context Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
        >
          <MenuItem onClick={() => setAnchorEl(null)}>
            <Reply className="mr-2" /> Reply
          </MenuItem>
          <MenuItem onClick={() => setAnchorEl(null)}>
            <Edit className="mr-2" /> Edit
          </MenuItem>
          <MenuItem onClick={() => setAnchorEl(null)}>
            <Delete className="mr-2" /> Delete
          </MenuItem>
        </Menu>
        
        {/* File Upload Dialog */}
        <Dialog open={fileDialog} onClose={() => setFileDialog(false)}>
          <DialogTitle>Uploading File</DialogTitle>
          <DialogContent>
            <div className="w-80 p-4">
              <LinearProgress variant="determinate" value={uploadProgress} className="mb-2" />
              <Typography variant="body2" className="text-center">
                {uploadProgress}% complete
              </Typography>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default Messaging;