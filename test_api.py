import requests
import json

BASE_URL = "http://localhost:5000"

def test_api():
    print("Testing Clinical Trial API...")
    
    # Test home endpoint
    try:
        response = requests.get(f"{BASE_URL}/")
        print(f"✅ Home endpoint: {response.status_code} - {response.json()}")
    except Exception as e:
        print(f"❌ Home endpoint failed: {e}")
    
    # Test database connection
    try:
        response = requests.get(f"{BASE_URL}/testdb")
        print(f"✅ Database test: {response.status_code} - {response.json()}")
    except Exception as e:
        print(f"❌ Database test failed: {e}")
    
    # Test registration
    try:
        test_user = {
            "username": "testuser",
            "password": "testpass",
            "role": "patient"
        }
        response = requests.post(f"{BASE_URL}/register", json=test_user)
        print(f"✅ Registration test: {response.status_code} - {response.json()}")
    except Exception as e:
        print(f"❌ Registration test failed: {e}")
    
    # Test login
    try:
        login_data = {
            "username": "testuser",
            "password": "testpass"
        }
        response = requests.post(f"{BASE_URL}/login", json=login_data)
        print(f"✅ Login test: {response.status_code} - {response.json()}")
    except Exception as e:
        print(f"❌ Login test failed: {e}")

if __name__ == "__main__":
    test_api()