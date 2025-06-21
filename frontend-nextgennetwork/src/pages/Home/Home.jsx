import { useState } from 'react';
import './HomePage.css';

function Home() {
  const [postText, setPostText] = useState('');
  
  // Sample data for posts
  const posts = [
    {
      id: 1,
      user: {
        name: 'Jane Doe',
        headline: 'Software Engineer at Tech Company',
        avatar: null
      },
      time: '2h',
      content: 'Excited to share that I\'ve started a new position as Software Engineer at Tech Company!',
      likes: 142,
      comments: 18
    },
    {
      id: 2,
      user: {
        name: 'John Smith',
        headline: 'Marketing Director | Digital Strategy | Brand Development',
        avatar: null
      },
      time: '1d',
      content: 'Just published an article on the future of digital marketing. Check it out and let me know your thoughts!',
      image: true,
      likes: 65,
      comments: 7
    },
    {
      id: 3,
      user: {
        name: 'Sarah Johnson',
        headline: 'Product Manager | UX Enthusiast',
        avatar: null
      },
      time: '3d',
      content: 'We\'re hiring! Looking for talented developers to join our team. DM me if interested or tag someone who might be a good fit.',
      likes: 89,
      comments: 32
    }
  ];

  // Sample news data
  const news = [
    {
      id: 1,
      title: 'Top companies are hiring now',
      time: '2h ago',
      readers: '15,342 readers'
    },
    {
      id: 2,
      title: 'Tech layoffs continue amid economic uncertainty',
      time: '1d ago',
      readers: '8,765 readers'
    },
    {
      id: 3,
      title: 'Remote work trends in 2024',
      time: '3d ago',
      readers: '5,432 readers'
    },
    {
      id: 4,
      title: 'AI skills in high demand across industries',
      time: '4d ago',
      readers: '12,654 readers'
    },
    {
      id: 5,
      title: 'New startup funding reaches record high',
      time: '5d ago',
      readers: '3,987 readers'
    }
  ];

  return (
    <div className="home-container">
      <div className="main-content">
        {/* Left sidebar */}
        <aside className="left-sidebar">
          <div className="profile-card">
            <div className="profile-background"></div>
            <div className="profile-content">
              <div className="profile-photo">
                <img src={`https://picsum.photos/72/72?random=${Math.floor(Math.random() * 1000)}`} alt="Profile" />
              </div>
              <h2 className="profile-name">Your Name</h2>
              <p className="profile-headline">Your Headline Here</p>
            </div>
            
            <div className="profile-stats">
              <div className="stat-item">
                <span className="stat-label">Who's viewed your profile</span>
                <span className="stat-value">38</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Impressions of your post</span>
                <span className="stat-value">418</span>
              </div>
            </div>
            
            <div className="premium-section">
              <a href="#" className="premium-link">Access exclusive tools & insights</a>
            </div>
          </div>
        </aside>
        
        {/* Feed */}
        <main className="feed">
          {/* Post form */}
          <div className="post-form">
            <div className="post-form-header">
              <div className="user-avatar"></div>
              <div 
                className="post-input"
                onClick={() => alert('Post creation not implemented in this demo')}
              >
                Start a post
              </div>
            </div>
            
            <div className="post-actions">
              <div className="post-action-btn">
                <span className="post-action-icon photo">📷</span>
                Photo
              </div>
              <div className="post-action-btn">
                <span className="post-action-icon video">🎥</span>
                Video
              </div>
              <div className="post-action-btn">
                <span className="post-action-icon event">📅</span>
                Event
              </div>
              <div className="post-action-btn">
                <span className="post-action-icon article">📝</span>
                Write article
              </div>
            </div>
          </div>
          
          {/* Posts */}
          {posts.map(post => (
            <div className="post" key={post.id}>
              <div className="post-header">
                <div className="user-avatar"></div>
                <div className="post-user-info">
                  <div className="post-user-name">{post.user.name}</div>
                  <div className="post-user-headline">{post.user.headline}</div>
                  <div className="post-time">{post.time}</div>
                </div>
              </div>
              
              <div className="post-content">
                <p>{post.content}</p>
                {post.image && (
                  <div className="post-image">Image placeholder</div>
                )}
              </div>
              
              <div className="post-stats">
                <div className="post-reactions">
                  <div className="reaction-icon"></div>
                  <span>{post.likes}</span>
                </div>
                <div className="post-comments-count">
                  {post.comments} comments
                </div>
              </div>
              
              <div className="post-actions-buttons">
                <div className="post-action">
                  <span className="nav-icon">👍</span>
                  <span className="post-action-text">Like</span>
                </div>
                <div className="post-action">
                  <span className="nav-icon">💬</span>
                  <span className="post-action-text">Comment</span>
                </div>
                <div className="post-action">
                  <span className="nav-icon">↪️</span>
                  <span className="post-action-text">Share</span>
                </div>
                <div className="post-action">
                  <span className="nav-icon">📤</span>
                  <span className="post-action-text">Send</span>
                </div>
              </div>
            </div>
          ))}
        </main>
        
        {/* Right sidebar */}
        <aside className="right-sidebar">
          <div className="news-card">
            <div className="card-header">
              NextGenNetwork News
            </div>
            
            <div className="news-list">
              {news.map(item => (
                <div className="news-item" key={item.id}>
                  <div className="news-bullet"></div>
                  <div className="news-content">
                    <div className="news-title">{item.title}</div>
                    <div className="news-meta">
                      {item.time} • {item.readers}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="show-more">
              Show more
            </div>
          </div>
          
          <div className="ad-card">
            <div className="ad-text">Ad</div>
            <div className="ad-image">Advertisement</div>
            <div className="ad-text">Master the skills most in-demand</div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default Home;