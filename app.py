from flask import Flask, request, session, jsonify
from flask_cors import CORS
import joblib, numpy as np
import mysql.connector
from flask_bcrypt import Bcrypt
import os

app = Flask(__name__)
app.secret_key = "supersecretkey"  # In production, use environment variable
bcrypt = Bcrypt(app)

# Configure CORS for production
CORS(app, supports_credentials=True, origins=[
    "http://localhost:3000",
    "https://your-render-frontend-url.onrender.com"  # Add your Render frontend URL when available
])

# Load model
model = joblib.load("general_model.pkl")

# Database configuration
db_config = {
    "host": os.getenv("DB_HOST", "localhost"),
    "user": os.getenv("DB_USER", "root"),
    "password": os.getenv("DB_PASSWORD", "Pranav@7756"),
    "database": os.getenv("DB_NAME", "clinical_trial")
}

# Connect MySQL
db = mysql.connector.connect(**db_config)
)
cursor = db.cursor(dictionary=True)

@app.route('/')
def home():
    return jsonify({"message": "Clinical Trial API", "status": "running"})

# Register API
@app.route('/register', methods=['POST'])
def register():
    try:
        # Handle both JSON and form data
        if request.is_json:
            data = request.get_json()
        else:
            data = request.form.to_dict()
        
        username = data.get('username')
        password = data.get('password')
        role = data.get('role')
        
        if not username or not password or not role:
            return jsonify({"success": False, "message": "Missing required fields"}), 400
        
        # Check if user already exists
        cursor.execute("SELECT * FROM users WHERE username=%s", (username,))
        existing_user = cursor.fetchone()
        
        if existing_user:
            return jsonify({"success": False, "message": "Username already exists"}), 400
        
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
        cursor.execute("INSERT INTO users (username, password, role) VALUES (%s,%s,%s)", (username, hashed_password, role))
        db.commit()
        
        return jsonify({"success": True, "message": "Registration successful"})
        
    except Exception as e:
        print(f"Registration error: {str(e)}")
        return jsonify({"success": False, "message": f"Registration failed: {str(e)}"}), 500

# Login API
@app.route('/login', methods=['POST'])
def login():
    try:
        # Handle both JSON and form data
        if request.is_json:
            data = request.get_json()
        else:
            data = request.form.to_dict()
        
        username = data.get('username')
        password = data.get('password')
        
        if not username or not password:
            return jsonify({"success": False, "message": "Missing username or password"}), 400
        
        cursor.execute("SELECT * FROM users WHERE username=%s", (username,))
        user = cursor.fetchone()
        
        if user and bcrypt.check_password_hash(user['password'], password):
            session['user_id'] = user['id']
            session['role'] = user['role']
            session['username'] = user['username']
            
            return jsonify({
                "success": True,
                "user": {
                    "id": user['id'],
                    "username": user['username'],
                    "role": user['role']
                }
            })
        else:
            return jsonify({"success": False, "message": "Invalid credentials"}), 401
            
    except Exception as e:
        print(f"Login error: {str(e)}")
        return jsonify({"success": False, "message": f"Login failed: {str(e)}"}), 500

# Patient form API
@app.route('/patient_form', methods=['POST'])
def patient_form():
    if 'role' not in session or session['role'] != 'patient':
        return jsonify({"success": False, "message": "Unauthorized - Patient access required"}), 401
    
    try:
        # Handle both JSON and form data
        if request.is_json:
            form_data = request.get_json()
        else:
            form_data = request.form.to_dict()
        
        # Validate required fields
        required_fields = ['Age', 'Sex', 'Weight_kg', 'Height_cm', 'BMI', 'Cohort', 
                          'ALT', 'Creatinine', 'SBP', 'DBP', 'HR', 'Temp_C', 'AdverseEvent']
        
        for field in required_fields:
            if field not in form_data:
                return jsonify({"success": False, "message": f"Missing field: {field}"}), 400
        
        data = (
            session['user_id'],
            float(form_data['Age']), int(form_data['Sex']), float(form_data['Weight_kg']),
            float(form_data['Height_cm']), float(form_data['BMI']), int(form_data['Cohort']),
            float(form_data['ALT']), float(form_data['Creatinine']), int(form_data['SBP']),
            int(form_data['DBP']), int(form_data['HR']), float(form_data['Temp_C']),
            int(form_data['AdverseEvent'])
        )
        
        cursor.execute("""
            INSERT INTO patient_forms 
            (user_id, Age, Sex, Weight_kg, Height_cm, BMI, Cohort, ALT, Creatinine, SBP, DBP, HR, Temp_C, AdverseEvent) 
            VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)
        """, data)
        db.commit()
        
        return jsonify({"success": True, "message": "Form submitted successfully!"})
        
    except Exception as e:
        print(f"Patient form error: {str(e)}")
        return jsonify({"success": False, "message": f"Submission failed: {str(e)}"}), 500

# Admin Dashboard API
@app.route('/admin_dashboard', methods=['GET'])
def admin_dashboard():
    if 'role' not in session or session['role'] != 'admin':
        return jsonify({"success": False, "message": "Unauthorized - Admin access required"}), 401
    
    try:
        cursor.execute("SELECT * FROM patient_forms ORDER BY id DESC")
        patients = cursor.fetchall()
        return jsonify({"success": True, "patients": patients})
        
    except Exception as e:
        print(f"Admin dashboard error: {str(e)}")
        return jsonify({"success": False, "message": f"Failed to fetch patients: {str(e)}"}), 500

# Check eligibility API (Admin only)
@app.route('/check/<int:patient_id>', methods=['GET'])
def check(patient_id):
    if 'role' not in session or session['role'] != 'admin':
        return jsonify({"success": False, "message": "Unauthorized - Admin access required"}), 401
    
    try:
        cursor.execute("SELECT * FROM patient_forms WHERE id=%s", (patient_id,))
        patient = cursor.fetchone()
        
        if not patient:
            return jsonify({"success": False, "message": "Patient not found"}), 404

        features = [
            float(patient['Age']), int(patient['Sex']), float(patient['Weight_kg']), 
            float(patient['Height_cm']), float(patient['BMI']), int(patient['Cohort']), 
            float(patient['ALT']), float(patient['Creatinine']), int(patient['SBP']), 
            int(patient['DBP']), int(patient['HR']), float(patient['Temp_C']), 
            int(patient['AdverseEvent'])
        ]
        
        prediction = model.predict(np.array(features).reshape(1, -1))[0]
        result = "Accepted" if prediction == 1 else "Rejected"

        # Update DB
        cursor.execute("UPDATE patient_forms SET eligibility=%s WHERE id=%s", (result, patient_id))
        db.commit()

        return jsonify({"success": True, "patient": patient, "result": result})
        
    except Exception as e:
        print(f"Eligibility check error: {str(e)}")
        return jsonify({"success": False, "message": f"Eligibility check failed: {str(e)}"}), 500

# Logout API
@app.route('/logout', methods=['POST'])
def logout():
    session.clear()
    return jsonify({"success": True, "message": "Logged out successfully"})

# Check session API
@app.route('/check_session', methods=['GET'])
def check_session():
    if 'user_id' in session and 'role' in session:
        return jsonify({
            "authenticated": True,
            "user": {
                "id": session['user_id'],
                "username": session.get('username', ''),
                "role": session['role']
            }
        })
    else:
        return jsonify({"authenticated": False})

@app.route("/testdb")
def testdb():
    try:
        conn = mysql.connector.connect(
            host="localhost",
            user="root",
            password="Pranav@7756",
            database="clinical_trial"
        )
        cursor = conn.cursor()
        cursor.execute("SELECT DATABASE();")
        db_name = cursor.fetchone()
        cursor.close()
        conn.close()
        return jsonify({"status": "success", "message": f"Connected to database: {db_name[0]}"})
    except Exception as e:
        return jsonify({"status": "error", "message": f"Database connection failed: {str(e)}"}), 500


if __name__ == "__main__":
    app.run(debug=True)
