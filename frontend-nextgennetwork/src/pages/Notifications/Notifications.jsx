import { useState } from 'react';
import {
  Avatar,
  Typography,
  IconButton,
  Chip,
  Badge,
  Tooltip,
  Switch,
  Divider
} from '@mui/material';
import {
  Notifications as NotificationIcon,
  ThumbUp,
  Comment,
  Share,
  PersonAdd,
  Work,
  Event,
  Star,
  Delete,
  Settings,
  MarkAsUnread,
  Circle
} from '@mui/icons-material';
import './Notifications.css';

function Notifications() {
  const [filter, setFilter] = useState('all');
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'like',
      user: 'Sarah Johnson',
      action: 'liked your post about product management',
      time: '2 minutes ago',
      unread: true,
      avatar: 'https://picsum.photos/40/40?random=1',
      icon: '👍',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 2,
      type: 'comment',
      user: 'Michael Chen',
      action: 'commented on your article',
      content: 'Great insights! This really helped me understand the concept better.',
      time: '15 minutes ago',
      unread: true,
      avatar: 'https://picsum.photos/40/40?random=2',
      icon: '💬',
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 3,
      type: 'connection',
      user: 'Emily Davis',
      action: 'wants to connect with you',
      time: '1 hour ago',
      unread: true,
      avatar: 'https://picsum.photos/40/40?random=3',
      icon: '🤝',
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 4,
      type: 'job',
      user: 'TechCorp Inc.',
      action: 'posted a new job that matches your profile',
      content: 'Senior Software Engineer - Remote',
      time: '3 hours ago',
      unread: false,
      avatar: 'https://picsum.photos/40/40?random=4',
      icon: '💼',
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 5,
      type: 'share',
      user: 'David Wilson',
      action: 'shared your post',
      time: '5 hours ago',
      unread: false,
      avatar: 'https://picsum.photos/40/40?random=5',
      icon: '🔄',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      id: 6,
      type: 'event',
      user: 'NextGen Conference',
      action: 'starts tomorrow',
      content: 'Don\'t forget to join the virtual networking session at 2 PM',
      time: '1 day ago',
      unread: false,
      avatar: 'https://picsum.photos/40/40?random=6',
      icon: '📅',
      color: 'from-teal-500 to-blue-500'
    }
  ]);

  const filterTypes = [
    { key: 'all', label: 'All', count: notifications.length, icon: '🔔' },
    { key: 'unread', label: 'Unread', count: notifications.filter(n => n.unread).length, icon: '🔴' },
    { key: 'like', label: 'Likes', count: notifications.filter(n => n.type === 'like').length, icon: '👍' },
    { key: 'comment', label: 'Comments', count: notifications.filter(n => n.type === 'comment').length, icon: '💬' },
    { key: 'connection', label: 'Connections', count: notifications.filter(n => n.type === 'connection').length, icon: '🤝' }
  ];

  const filteredNotifications = filter === 'all' 
    ? notifications 
    : filter === 'unread'
    ? notifications.filter(n => n.unread)
    : notifications.filter(n => n.type === filter);

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, unread: false } : n
    ));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-3 rounded-2xl shadow-lg">
                <NotificationIcon className="text-white text-2xl" />
              </div>
              <div>
                <Typography variant="h4" className="font-bold text-white mb-1">
                  🔔 Notifications
                </Typography>
                <Typography variant="body1" className="text-purple-200">
                  Stay updated with your network activity
                </Typography>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Tooltip title="Mark all as read">
                <IconButton className="text-white/70 hover:text-white hover:bg-white/20 transition-all duration-300">
                  <MarkAsUnread />
                </IconButton>
              </Tooltip>
              <Tooltip title="Settings">
                <IconButton className="text-white/70 hover:text-white hover:bg-white/20 transition-all duration-300">
                  <Settings />
                </IconButton>
              </Tooltip>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {filterTypes.map((type) => (
              <div
                key={type.key}
                onClick={() => setFilter(type.key)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl cursor-pointer transition-all duration-300 whitespace-nowrap ${
                  filter === type.key
                    ? 'bg-white/20 backdrop-blur-sm border border-white/30 shadow-lg scale-105'
                    : 'bg-white/10 hover:bg-white/15 border border-white/20'
                }`}
              >
                <span className="text-lg">{type.icon}</span>
                <Typography variant="body2" className="font-semibold text-white">
                  {type.label}
                </Typography>
                {type.count > 0 && (
                  <div className="bg-gradient-to-r from-pink-500 to-red-500 text-white text-xs px-2 py-1 rounded-full font-bold min-w-[20px] text-center">
                    {type.count}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.map((notification, index) => (
            <div
              key={notification.id}
              className={`bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl group ${
                notification.unread ? 'ring-2 ring-yellow-400/50' : ''
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="p-6">
                <div className="flex items-start space-x-4">
                  {/* Avatar with Icon */}
                  <div className="relative">
                    <Avatar 
                      src={notification.avatar} 
                      className="w-12 h-12 ring-2 ring-white/30 shadow-lg" 
                    />
                    <div className={`absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r ${notification.color} rounded-full flex items-center justify-center text-xs shadow-lg border-2 border-white`}>
                      {notification.icon}
                    </div>
                    {notification.unread && (
                      <div className="absolute -top-1 -left-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse shadow-lg" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <Typography variant="body1" className="text-white font-semibold mb-1">
                          <span className="text-purple-200">{notification.user}</span>
                          <span className="text-white/80 ml-1">{notification.action}</span>
                        </Typography>
                        {notification.content && (
                          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 mt-2 border border-white/20">
                            <Typography variant="body2" className="text-purple-100 italic">
                              "{notification.content}"
                            </Typography>
                          </div>
                        )}
                        <Typography variant="caption" className="text-purple-300 mt-2 block">
                          ⏰ {notification.time}
                        </Typography>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {notification.unread && (
                          <Tooltip title="Mark as read">
                            <IconButton 
                              size="small"
                              className="text-white/70 hover:text-green-400 hover:bg-white/20 transition-all duration-300"
                              onClick={() => markAsRead(notification.id)}
                            >
                              <Circle className="text-xs" />
                            </IconButton>
                          </Tooltip>
                        )}
                        <Tooltip title="Delete">
                          <IconButton 
                            size="small"
                            className="text-white/70 hover:text-red-400 hover:bg-white/20 transition-all duration-300"
                            onClick={() => deleteNotification(notification.id)}
                          >
                            <Delete className="text-sm" />
                          </IconButton>
                        </Tooltip>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredNotifications.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 border border-white/20 shadow-xl">
              <div className="text-6xl mb-4">🔕</div>
              <Typography variant="h6" className="text-white font-bold mb-2">
                No notifications found
              </Typography>
              <Typography variant="body1" className="text-purple-200">
                You're all caught up! Check back later for updates.
              </Typography>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Notifications;