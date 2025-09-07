# Clinical Trial Management System

A full-stack web application for managing clinical trial patient applications with AI-   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```
   The frontend will run on `http://localhost:3000`

4. For production build:
   ```bash
   npm run build
   ```

## Running the Application

1. Start the backend server (if not already running):
   ```bash
   # From the root directory
   .\venv\Scripts\activate  # On Windows
   python app.py
   ```

2. Start the frontend development server:
   ```bash
   # From the frontend directory
   npm start
   ```

3. Access the application:
   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost:5000`

## Testing

### Backend Testing
```bash
python test_api.py
```

### Frontend Testing
```bash
cd frontend
npm test
```

## Production Deployment

For production deployment:
1. Set appropriate environment variables for database credentials
2. Build the frontend: `cd frontend && npm run build`
3. Serve the static files from the Flask application
4. Configure CORS settings for production
5. Use a production-grade WSGI server (e.g., Gunicorn)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for detailsed eligibility assessment. The system helps streamline the process of patient enrollment in clinical trials by using machine learning to predict patient eligibility based on their medical data.

## Features

- **Patient Registration**: Secure patient data collection with comprehensive medical information forms
- **AI-Powered Assessment**: Advanced machine learning algorithms for accurate eligibility predictions
- **Admin Dashboard**: Comprehensive management interface for reviewing and processing applications
- **Real-time Results**: Instant eligibility assessments with detailed reporting
- **Secure Authentication**: Role-based access control for patients and administrators
- **Responsive Design**: Mobile-friendly interface for accessibility across devices

## Tech Stack

### Backend
- Flask 2.3.3 (Python web framework)
- MySQL (Database)
- scikit-learn/XGBoost (Machine Learning)
- Flask-CORS 4.0.0 (Cross-origin resource sharing)
- Flask-Bcrypt 1.0.1 (Password hashing)
- Joblib (Model serialization)

### Frontend
- React 18 with TypeScript
- React Router v6 (Navigation)
- Axios (HTTP client)
- CSS3 (Styling)
- React Scripts 5.0.1

## Prerequisites

Before running the application, ensure you have the following installed:
- Python 3.8 or higher
- Node.js 16 or higher
- MySQL Server
- npm or yarn package manager

## Project Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd clinical-trial-app
```

### 2. Backend Setup

1. Create a Python virtual environment (recommended):
   ```bash
   python -m venv venv
   # On Windows
   .\venv\Scripts\activate
   # On macOS/Linux
   source venv/bin/activate
   ```

2. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Set up MySQL database:
   ```sql
   CREATE DATABASE clinical_trial;
   USE clinical_trial;
   
   CREATE TABLE users (
       id INT AUTO_INCREMENT PRIMARY KEY,
       username VARCHAR(50) UNIQUE NOT NULL,
       password VARCHAR(255) NOT NULL,
       role ENUM('admin', 'patient') NOT NULL
   );
   
   CREATE TABLE patient_forms (
       id INT AUTO_INCREMENT PRIMARY KEY,
       user_id INT,
       Age INT,
       Sex INT,
       Weight_kg DECIMAL(5,2),
       Height_cm DECIMAL(5,2),
       BMI DECIMAL(5,2),
       Cohort INT,
       ALT DECIMAL(8,2),
       Creatinine DECIMAL(8,4),
       SBP INT,
       DBP INT,
       HR INT,
       Temp_C DECIMAL(4,2),
       AdverseEvent INT,
       eligibility VARCHAR(20),
       FOREIGN KEY (user_id) REFERENCES users(id)
   );
   ```

4. Configure Database Connection:
   - Open `app.py`
   - Update the MySQL connection parameters:
     ```python
     db = mysql.connector.connect(
         host="localhost",
         user="your_username",
         password="your_password",
         database="clinical_trial"
     )
     ```

5. Start the Backend Server:
   ```bash
   # Using the provided batch file on Windows
   start.bat
   
   # Or directly with Python
   python app.py
   ```
   The backend will run on `http://localhost:5000`

### 3. Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```
   The frontend will run on `http://localhost:3000`

## Usage

### For Patients
1. Register with role "patient"
2. Login to access the patient form
3. Fill out the comprehensive medical information form
4. Submit and wait for admin review

### For Administrators
1. Register with role "admin"
2. Login to access the admin dashboard
3. View all patient applications
4. Click "Check Eligibility" to run AI assessment
5. View results (Accepted/Rejected) based on ML model predictions

## API Endpoints

### Authentication
- `POST /register` - User registration
- `POST /login` - User login
- `POST /logout` - User logout

### Patient Operations
- `POST /patient_form` - Submit patient form data

### Admin Operations
- `GET /admin_dashboard` - Get all patient applications
- `GET /check/<patient_id>` - Run eligibility check for specific patient

## Development

### Backend Development
The Flask app supports both traditional form submissions and JSON API calls, making it compatible with both server-side rendered templates and the React frontend.

### Frontend Development
The React app uses:
- TypeScript for type safety
- Context API for state management
- Axios for API calls with automatic CORS handling
- Protected routes based on user roles

### Building for Production

1. **Build the React app**:
   ```bash
   cd frontend
   npm run build
   ```

2. **Serve the built files** through Flask or a web server like Nginx

## Security Features

- Password hashing with bcrypt
- Session-based authentication
- Role-based access control
- CORS protection
- Input validation and sanitization

## Machine Learning Model

The system uses a pre-trained model (`general_model.pkl`) that evaluates patient eligibility based on:
- Demographics (Age, Sex)
- Physical measurements (Weight, Height, BMI)
- Medical parameters (ALT, Creatinine, Blood Pressure, Heart Rate, Temperature)
- Cohort information
- Adverse event history

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.