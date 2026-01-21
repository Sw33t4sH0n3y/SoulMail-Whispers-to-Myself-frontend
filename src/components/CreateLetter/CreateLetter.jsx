import { useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import { UserContext } from '../../contexts/UserContext';
import NavBar from '../NavBar/NavBar';

const CreateLetter = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    mood: '',
    weather: '',
    temperature: '',
    location: '',
    currentSong: '',
    topHeadline: '',
    deliverAt: '',
    goals: []
  });
  const [goalInput, setGoalInput] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleMoodSelect = (mood) => {
    setFormData({ ...formData, mood });
  };

  const handleWeatherSelect = (weather) => {
    setFormData({ ...formData, weather });
  };

  const handleAddGoal = () => {
    if (goalInput.trim()) {
      setFormData({ 
        ...formData, 
        goals: [...formData.goals, { text: goalInput, completed: false }] 
      });
      setGoalInput('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // TODO: Call letterService.createLetter(formData)
      console.log('Letter data:', formData);
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="page-container">
      <div className="header">
        <div className="logo-box">LOGO AND SLOGAN</div>
        <NavBar />
      </div>

      <div className="create-letter-container">
        <div className="welcome">WELCOME {user?.username?.toUpperCase()}</div>
        <h2>Create a Letter</h2>

        <form onSubmit={handleSubmit}>
          {/* Title */}
          <div className="form-row">
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          {/* Delivery Date */}
          <div className="form-row">
            <label>Date you want to receive your letter?</label>
            <input
              type="date"
              name="deliverAt"
              value={formData.deliverAt}
              onChange={handleChange}
              required
            />
          </div>

          {/* Mood Selection */}
          <div className="form-section">
            <label>Mood:</label>
            <div className="mood-selector">
              <button
                type="button"
                className={`mood-btn ${formData.mood === 'happy' ? 'selected' : ''}`}
                onClick={() => handleMoodSelect('happy')}
              >
                😊 Happy
              </button>
              <button
                type="button"
                className={`mood-btn ${formData.mood === 'sad' ? 'selected' : ''}`}
                onClick={() => handleMoodSelect('sad')}
              >
                😢 Sad
              </button>
              <button
                type="button"
                className={`mood-btn ${formData.mood === 'angry' ? 'selected' : ''}`}
                onClick={() => handleMoodSelect('angry')}
              >
                😠 Angry
              </button>
              <button
                type="button"
                className={`mood-btn ${formData.mood === 'anxious' ? 'selected' : ''}`}
                onClick={() => handleMoodSelect('anxious')}
              >
                😰 Anxious
              </button>
              <button
                type="button"
                className={`mood-btn ${formData.mood === 'excited' ? 'selected' : ''}`}
                onClick={() => handleMoodSelect('excited')}
              >
                🤩 Excited
              </button>
              <button
                type="button"
                className={`mood-btn ${formData.mood === 'calm' ? 'selected' : ''}`}
                onClick={() => handleMoodSelect('calm')}
              >
                😌 Calm
              </button>
            </div>
          </div>

          {/* Weather, Temp, Location Row */}
          <div className="form-row-group">
            <div className="form-col">
              <label>Weather:</label>
              <div className="weather-selector">
                <button
                  type="button"
                  className={`weather-btn ${formData.weather === 'sunny' ? 'selected' : ''}`}
                  onClick={() => handleWeatherSelect('sunny')}
                >
                  ☀️
                </button>
                <button
                  type="button"
                  className={`weather-btn ${formData.weather === 'cloudy' ? 'selected' : ''}`}
                  onClick={() => handleWeatherSelect('cloudy')}
                >
                  ☁️
                </button>
                <button
                  type="button"
                  className={`weather-btn ${formData.weather === 'rainy' ? 'selected' : ''}`}
                  onClick={() => handleWeatherSelect('rainy')}
                >
                  🌧️
                </button>
                <button
                  type="button"
                  className={`weather-btn ${formData.weather === 'snowy' ? 'selected' : ''}`}
                  onClick={() => handleWeatherSelect('snowy')}
                >
                  ❄️
                </button>
              </div>
            </div>
            <div className="form-col">
              <label>Temperature:</label>
              <input
                type="number"
                name="temperature"
                value={formData.temperature}
                onChange={handleChange}
                placeholder="°F"
              />
            </div>
            <div className="form-col">
              <label>Location:</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Current Song */}
          <div className="form-row">
            <label>Current Song:</label>
            <input
              type="text"
              name="currentSong"
              value={formData.currentSong}
              onChange={handleChange}
            />
          </div>

          {/* Top Headline */}
          <div className="form-row">
            <label>Top Headline:</label>
            <input
              type="text"
              name="topHeadline"
              value={formData.topHeadline}
              onChange={handleChange}
            />
          </div>

          {/* Your Letter */}
          <div className="form-section">
            <label>What's on your mind?</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows="10"
              placeholder="Write your letter here..."
              required
            />
          </div>

          {/* Goals */}
          <div className="form-section">
            <label>Your Goals:</label>
            <div className="goal-input-row">
              <input
                type="text"
                value={goalInput}
                onChange={(e) => setGoalInput(e.target.value)}
                placeholder="Enter a goal"
              />
              <button type="button" onClick={handleAddGoal}>Add Goal</button>
            </div>
            <div className="goals-list">
              {formData.goals.map((goal, index) => (
                <div key={index} className="goal-item">
                  <input type="checkbox" disabled />
                  <span>{goal.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" className="submit-btn">Create Letter</button>
        </form>
      </div>
    </div>
  );
};

export default CreateLetter;