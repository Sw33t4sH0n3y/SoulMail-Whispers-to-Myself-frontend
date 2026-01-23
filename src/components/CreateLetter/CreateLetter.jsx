import { useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import { UserContext } from '../../contexts/UserContext';
import NavBar from '../NavBar/NavBar';
import * as letterService from '../../services/letterService';


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
        topHeadLine: '',
        deliveredAt: '',
        deliveryInterval: '',
        customIntervalNumber: '',
        customIntervalUnit: 'days',
        goals: []
    });
    const [goalInput, setGoalInput] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrorMessage('');
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
        
        const selectedDate = new Date(formData.deliveredAt);
        const tomorrow = new Date();
        tomorrow.setHours(tomorrow.getHours() + 24);
        
        if (selectedDate < tomorrow) {
            setErrorMessage('Delivery date must be at least 24 hours in the future.');
            return;
        }
        
        try {
            const cleanedData = { ...formData };
            if (!cleanedData.mood) delete cleanedData.mood;
            if (!cleanedData.deliveryInterval) delete cleanedData.deliveryInterval;
            if (!cleanedData.weather) delete cleanedData.weather;
            if (!cleanedData.temperature) delete cleanedData.temperature;
            if (!cleanedData.location) delete cleanedData.location;
            if (!cleanedData.currentSong) delete cleanedData.currentSong;
            if (!cleanedData.topHeadLine) delete cleanedData.topHeadLine;
            
            await letterService.create(cleanedData);
            navigate('/');
        } catch (err) {
            console.error('Full error:', err);
            setErrorMessage(err.message || 'Failed to create letter. Please check all fields and try again.');
        }
    };

    const moods = [
        { value: '☺️', label: 'Happy' },
        { value: '😢', label: 'Sad' },
        { value: '😰', label: 'Anxious' },
        { value: '🤩', label: 'Excited' },
        { value: '🙏', label: 'Grateful' },
        { value: '😫', label: 'Frustrated' }
    ];

    const deliveryIntervals = [
        { value: '1week', label: 'Weekly' },
        { value: '2weeks', label: 'Bi-Weekly' },
        { value: '1month', label: 'Monthly' },
        { value: '6months', label: '6 Months' },
        { value: '1year', label: 'Yearly' },
        { value: '5years', label: '5 Years' },
        { value: 'custom', label: 'Custom Interval:' }
    ];

    const today = new Date().toISOString().split('T')[0];

    return (
        <div className="page-container">
            <div className="header">
                <img src="/images/logo.png" alt="SoulMail Logo" className="logo-image" />
                <NavBar />
            </div>

            <div className="create-letter-wrapper">
                <div className="welcome">
                    This page belongs to you, {user?.username}
                </div>

                <div className="form-inner-box">
                    <h2 className="form-title">Create a Letter</h2>
                    <p className="required-note">* Required fields</p>
                    
                    {errorMessage && (
                        <div className="error-message">
                            {errorMessage}
                        </div>
                    )}
                    
                    <form onSubmit={handleSubmit}>
                        <div className="form-row">
                            <label>Title: <span className="required-asterisk">*</span></label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-row-split">
                            <div className="form-col-half">
                                <label>Letter Delivery Date: <span className="required-asterisk">*</span></label>
                                <input
                                    type="date"
                                    name="deliveredAt"
                                    value={formData.deliveredAt}
                                    onChange={handleChange}
                                    min={today}
                                    required
                                />
                            </div>
                            <div className="form-col-half">
                                <label>Delivery Interval:</label>
                                <select
                                    value={formData.deliveryInterval}
                                    onChange={(e) => setFormData({ ...formData, deliveryInterval: e.target.value })}
                                    className="delivery-dropdown"
                                >
                                    <option value="">Select your frequency...</option>
                                    {deliveryIntervals.map(deliveryInterval => (
                                        <option key={deliveryInterval.value} value={deliveryInterval.value}>
                                            {deliveryInterval.label}
                                        </option>
                                    ))}
                                </select>
                                
                                {formData.deliveryInterval === 'custom' && (
                                    <div style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
                                        <input
                                            type="number"
                                            name="customIntervalNumber"
                                            value={formData.customIntervalNumber || ''}
                                            onChange={handleChange}
                                            placeholder="Number"
                                            min="1"
                                            style={{ flex: 1 }}
                                        />
                                        <select
                                            name="customIntervalUnit"
                                            value={formData.customIntervalUnit || 'days'}
                                            onChange={handleChange}
                                            style={{ flex: 1 }}
                                        >
                                            <option value="days">Days</option>
                                            <option value="weeks">Weeks</option>
                                            <option value="months">Months</option>
                                            <option value="years">Years</option>
                                        </select>
                                    </div>
                                )}
                            </div>

                            <div className="form-col-half">
                                <label>Mood:</label>
                                <select
                                    value={formData.mood}
                                    onChange={(e) => setFormData({ ...formData, mood: e.target.value })}
                                    className="mood-dropdown"
                                >
                                    <option value="">Select your mood...</option>
                                    {moods.map(mood => (
                                        <option key={mood.value} value={mood.value}>
                                            {mood.value} {mood.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="form-row-group">
                            <div className="form-col">
                                <label>Weather:</label>
                                <div className="weather-selector">
                                    <button
                                        type="button"
                                        className={`weather-btn ${formData.weather === 'sunny' ? 'selected' : ''}`}
                                        onClick={() => handleWeatherSelect('sunny')}
                                        title="Sunny"
                                    >
                                        ☀️
                                    </button>
                                    <button
                                        type="button"
                                        className={`weather-btn ${formData.weather === 'cloudy' ? 'selected' : ''}`}
                                        onClick={() => handleWeatherSelect('cloudy')}
                                        title="Cloudy"
                                    >
                                        ☁️
                                    </button>
                                    <button
                                        type="button"
                                        className={`weather-btn ${formData.weather === 'rainy' ? 'selected' : ''}`}
                                        onClick={() => handleWeatherSelect('rainy')}
                                        title="Rainy"
                                    >
                                        🌧️
                                    </button>
                                    <button
                                        type="button"
                                        className={`weather-btn ${formData.weather === 'snowy' ? 'selected' : ''}`}
                                        onClick={() => handleWeatherSelect('snowy')}
                                        title="Snowy"
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
                                <label>Your current location:</label>
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <label>Song I'm currently listening to:</label>
                            <input
                                type="text"
                                name="currentSong"
                                value={formData.currentSong}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-row">
                            <label>Top Headline:</label>
                            <input
                                type="text"
                                name="topHeadLine"
                                value={formData.topHeadLine}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-section">
                            <label className="large-label">What's on your mind? <span className="required-asterisk">*</span></label>
                            <textarea
                                name="content"
                                value={formData.content}
                                onChange={handleChange}
                                rows="12"
                                placeholder="Write your letter to yourself here..."
                                required
                            />
                        </div>

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
                                {formData.goals.length === 0 ? (
                                    <p className="goals-placeholder">Your goals will appear here</p>
                                ) : (
                                    formData.goals.map((goal, index) => (
                                        <div key={index} className="goal-item">
                                            <input type="checkbox" disabled />
                                            <span>{goal.text}</span>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                        <button type="submit" className="submit-btn">Create Letter</button>

                        <div className="cancel-link">
                            <a onClick={() => navigate('/')}>Cancel and return to Dashboard</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateLetter;