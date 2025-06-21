import { useState } from 'react';
import './Jobs.css';

function Jobs() {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');

  const jobs = [
    {
      id: 1,
      title: 'Senior Software Engineer',
      company: 'TechCorp Inc.',
      location: 'San Francisco, CA',
      type: 'Full-time',
      posted: '2 days ago',
      applicants: '47 applicants',
      logo: `https://picsum.photos/48/48?random=1`
    },
    {
      id: 2,
      title: 'Product Manager',
      company: 'StartupXYZ',
      location: 'New York, NY',
      type: 'Full-time',
      posted: '1 week ago',
      applicants: '23 applicants',
      logo: `https://picsum.photos/48/48?random=2`
    },
    {
      id: 3,
      title: 'UX Designer',
      company: 'DesignStudio',
      location: 'Remote',
      type: 'Contract',
      posted: '3 days ago',
      applicants: '31 applicants',
      logo: `https://picsum.photos/48/48?random=3`
    },
    {
      id: 4,
      title: 'Data Scientist',
      company: 'AI Solutions',
      location: 'Seattle, WA',
      type: 'Full-time',
      posted: '5 days ago',
      applicants: '18 applicants',
      logo: `https://picsum.photos/48/48?random=4`
    },
    {
      id: 5,
      title: 'Marketing Manager',
      company: 'BrandCo',
      location: 'Los Angeles, CA',
      type: 'Full-time',
      posted: '1 day ago',
      applicants: '62 applicants',
      logo: `https://picsum.photos/48/48?random=5`
    }
  ];

  return (
    <div className="jobs-container">
      <div className="jobs-content">
        <aside className="jobs-sidebar">
          <div className="search-card">
            <div className="search-form">
              <div className="search-field">
                <input 
                  type="text" 
                  placeholder="Search jobs" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="search-field">
                <input 
                  type="text" 
                  placeholder="Location" 
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              <button className="search-btn">Search</button>
            </div>
          </div>

          <div className="filters-card">
            <div className="filters-header">
              <h3>🔍 Filters</h3>
              <button className="clear-filters">Clear all</button>
            </div>
            
            <div className="filter-section">
              <div className="filter-title">
                <span className="filter-icon">💼</span>
                <h4>Job Type</h4>
              </div>
              <div className="filter-options">
                <label className="filter-option">
                  <input type="checkbox" />
                  <span className="checkmark"></span>
                  <span className="option-text">Full-time</span>
                  <span className="option-count">(24)</span>
                </label>
                <label className="filter-option">
                  <input type="checkbox" />
                  <span className="checkmark"></span>
                  <span className="option-text">Part-time</span>
                  <span className="option-count">(8)</span>
                </label>
                <label className="filter-option">
                  <input type="checkbox" />
                  <span className="checkmark"></span>
                  <span className="option-text">Contract</span>
                  <span className="option-count">(12)</span>
                </label>
                <label className="filter-option">
                  <input type="checkbox" />
                  <span className="checkmark"></span>
                  <span className="option-text">Remote</span>
                  <span className="option-count">(18)</span>
                </label>
              </div>
            </div>
            
            <div className="filter-section">
              <div className="filter-title">
                <span className="filter-icon">📊</span>
                <h4>Experience Level</h4>
              </div>
              <div className="filter-options">
                <label className="filter-option">
                  <input type="checkbox" />
                  <span className="checkmark"></span>
                  <span className="option-text">Entry level</span>
                  <span className="option-count">(15)</span>
                </label>
                <label className="filter-option">
                  <input type="checkbox" />
                  <span className="checkmark"></span>
                  <span className="option-text">Mid level</span>
                  <span className="option-count">(28)</span>
                </label>
                <label className="filter-option">
                  <input type="checkbox" />
                  <span className="checkmark"></span>
                  <span className="option-text">Senior level</span>
                  <span className="option-count">(19)</span>
                </label>
              </div>
            </div>
            
            <div className="filter-section">
              <div className="filter-title">
                <span className="filter-icon">💰</span>
                <h4>Salary Range</h4>
              </div>
              <div className="filter-options">
                <label className="filter-option">
                  <input type="checkbox" />
                  <span className="checkmark"></span>
                  <span className="option-text">$40k - $60k</span>
                  <span className="option-count">(12)</span>
                </label>
                <label className="filter-option">
                  <input type="checkbox" />
                  <span className="checkmark"></span>
                  <span className="option-text">$60k - $80k</span>
                  <span className="option-count">(22)</span>
                </label>
                <label className="filter-option">
                  <input type="checkbox" />
                  <span className="checkmark"></span>
                  <span className="option-text">$80k+</span>
                  <span className="option-count">(28)</span>
                </label>
              </div>
            </div>
          </div>
        </aside>

        <main className="jobs-main">
          <div className="jobs-header">
            <h2>Recommended jobs</h2>
            <span className="jobs-count">{jobs.length} jobs</span>
          </div>

          <div className="jobs-list">
            {jobs.map(job => (
              <div className="job-card" key={job.id}>
                <div className="job-header">
                  <img src={job.logo} alt={job.company} className="company-logo" />
                  <div className="job-info">
                    <h3 className="job-title">{job.title}</h3>
                    <p className="company-name">{job.company}</p>
                    <p className="job-location">{job.location}</p>
                    <div className="job-meta">
                      <span className="job-type">{job.type}</span>
                      <span className="job-posted">{job.posted}</span>
                    </div>
                    <p className="job-applicants">{job.applicants}</p>
                  </div>
                  <button className="save-btn">💾</button>
                </div>
                <div className="job-actions">
                  <button className="apply-btn">Easy Apply</button>
                  <button className="save-text-btn">Save</button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Jobs;