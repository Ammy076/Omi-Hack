import re

def extract_tasks(text):
    task_pattern = r"\b(need to|should|must|have to|task:)\b\s*(.+)"
    tasks = re.findall(task_pattern, text, re.IGNORECASE)
    return [task[1] for task in tasks]
