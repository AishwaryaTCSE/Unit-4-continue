# MindTrack - Student Mental Wellness & Study Habit Journal

A comprehensive platform for students to track their daily study habits, reflect on mental wellness, and receive personalized insights and guidance from academic mentors.

## 🌟 Features

### For Students
- **Daily Study & Wellness Tracker**: Log study hours, break time, sleep, stress levels, and focus
- **Markdown Journaling**: Write detailed reflections with markdown support
- **Streak Tracking**: Visual streak counter with motivational messages
- **Productivity Heatmap**: Calendar view of productive days
- **Personalized Insights**: AI-powered insights after 7 days of logging
- **PDF Export**: Download monthly journal summaries
- **Real-time Data**: Firebase integration for cloud storage

### For Academic Mentors
- **Student Dashboard**: View anonymized student entries
- **Progress Monitoring**: Track student wellness and study patterns
- **Comment System**: Add positive feedback and guidance
- **Insight Generation**: Automated recommendations for student improvement
- **Role-based Access**: Secure mentor-only features

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Firebase project (for backend)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mindtrack
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Firebase Setup**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Realtime Database
   - Update `src/firebase/config.js` with your Firebase configuration

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 📱 Usage

### Student Workflow
1. **Register/Login**: Create an account as a student
2. **Daily Logging**: Fill out the daily study and wellness form
3. **Reflection**: Write markdown-formatted reflections
4. **Track Progress**: View streaks, insights, and heatmap
5. **Export Data**: Download PDF summaries of your journal

### Mentor Workflow
1. **Register/Login**: Create an account as an academic mentor
2. **View Students**: Access the mentor dashboard
3. **Monitor Progress**: Review student entries and patterns
4. **Provide Guidance**: Add comments and suggestions
5. **Generate Insights**: Use automated recommendations

## 🛠️ Technology Stack

- **Frontend**: React 19, Vite
- **Styling**: Tailwind CSS
- **Backend**: Firebase Realtime Database
- **Authentication**: Firebase Auth (local storage for demo)
- **PDF Generation**: jsPDF
- **Markdown**: React Markdown
- **Heatmap**: React Calendar Heatmap
- **Routing**: React Router DOM

## 📊 Data Structure

### User Model
```javascript
{
  id: "uuid",
  name: "string",
  email: "string",
  password: "string", // In production, use proper hashing
  role: "student" | "mentor",
  createdAt: "timestamp"
}
```

### Log Entry Model
```javascript
{
  id: "uuid",
  studyHours: "number",
  breakTime: "number",
  sleep: "number",
  stress: "number (1-10)",
  focus: "number (1-10)",
  reflection: "string (markdown)",
  date: "YYYY-MM-DD",
  timestamp: "timestamp",
  userId: "string",
  comments: "array (mentor comments)"
}
```

## 🎯 Core Features Explained

### Insight Engine
- Analyzes patterns in study habits and wellness metrics
- Provides personalized recommendations after 7 days
- Correlates sleep, stress, and focus levels with study performance

### Streak System
- Tracks consecutive days of logging
- Provides motivational messages based on streak length
- Calculates longest and current streaks

### Heatmap Visualization
- Shows productivity levels over the past 365 days
- Color-coded based on study hours, focus, and stress
- Helps identify patterns and trends

### PDF Export
- Generates comprehensive monthly summaries
- Includes statistics, insights, and recent entries
- Professional formatting with recommendations

## 🔒 Security Considerations

- **Production Ready**: Implement proper authentication with Firebase Auth
- **Data Privacy**: Student data is protected and anonymized for mentors
- **Input Validation**: Comprehensive form validation and sanitization
- **Error Handling**: Graceful error handling throughout the application

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Firebase for backend services
- React community for excellent documentation
- Tailwind CSS for beautiful styling
- All contributors and users of MindTrack

## 📞 Support

For support, email support@mindtrack.com or create an issue in the repository.

---

**Built with ❤️ for student wellness and academic success**
