from flask import Flask, request, jsonify
from flask_cors import CORS
from models.summarizer import summarize_text
from models.sentiment import analyze_sentiment
from utils.task_extractor import extract_tasks

app = Flask(__name__)
CORS(app)

@app.route('/summarize', methods=['POST'])
def summarize():
    data = request.json
    text = data.get('text', '')
    if not text:
        return jsonify({"error": "No text provided"}), 400
    summary = summarize_text(text)
    return jsonify({"summary": summary})

@app.route('/analyze-sentiment', methods=['POST'])
def sentiment():
    data = request.json
    text = data.get('text', '')
    if not text:
        return jsonify({"error": "No text provided"}), 400
    mood = analyze_sentiment(text)
    return jsonify({"mood": mood})

@app.route('/extract-tasks', methods=['POST'])
def tasks():
    data = request.json
    text = data.get('text', '')
    if not text:
        return jsonify({"error": "No text provided"}), 400
    tasks = extract_tasks(text)
    return jsonify({"tasks": tasks})

if __name__ == '__main__':
    app.run(debug=True)
