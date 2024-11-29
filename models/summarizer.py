from transformers import pipeline

summarizer = pipeline("summarization")

def summarize_text(text):
    try:
        summary = summarizer(text, max_length=100, min_length=25, do_sample=False)
        return summary[0]['summary_text']
    except Exception as e:
        return f"Error summarizing text: {str(e)}"
