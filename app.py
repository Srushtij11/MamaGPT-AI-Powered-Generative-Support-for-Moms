from flask import Flask, request, jsonify, render_template
import requests

app = Flask(__name__)

GEMINI_API_URL = "https://api.gemini.com/v1/order/new"  # Replace with the correct endpoint
API_KEY = "AIzaSyAxnlGovAVs2xmttq-qUCyRNG3Xm_gbKvQ"  # Replace with your actual API key

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/ask', methods=['POST'])
def ask():
    user_question = request.json.get('question')

    # Call the Gemini API
    response = requests.post(GEMINI_API_URL, json={
        "prompt": user_question,
        "api_key": API_KEY
    })
    
    if response.status_code == 200:
        answer = response.json().get('answer', 'Sorry, I could not find an answer.')
    else:
        answer = 'Error connecting to the API.'

    return jsonify({"answer": answer})

if __name__ == '__main__':
    app.run(debug=True)
