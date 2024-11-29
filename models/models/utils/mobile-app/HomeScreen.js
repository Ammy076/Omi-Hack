import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, ScrollView } from 'react-native';

const HomeScreen = () => {
  const [conversation, setConversation] = useState('');
  const [summary, setSummary] = useState('');
  const [mood, setMood] = useState('');
  const [tasks, setTasks] = useState([]);

  const summarizeConversation = async () => {
    const response = await fetch('http://<your-backend-url>/summarize', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: conversation }),
    });
    const data = await response.json();
    setSummary(data.summary);
  };

  const analyzeMood = async () => {
    const response = await fetch('http://<your-backend-url>/analyze-sentiment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: conversation }),
    });
    const data = await response.json();
    setMood(`${data.mood.label} (${Math.round(data.mood.score * 100)}%)`);
  };

  const extractTasks = async () => {
    const response = await fetch('http://<your-backend-url>/extract-tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: conversation }),
    });
    const data = await response.json();
    setTasks(data.tasks);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>EchoLens</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your conversation"
        value={conversation}
        onChangeText={setConversation}
        multiline
      />
      <Button title="Summarize" onPress={summarizeConversation} />
      <Button title="Analyze Mood" onPress={analyzeMood} />
      <Button title="Extract Tasks" onPress={extractTasks} />
      <Text style={styles.result}>Summary: {summary}</Text>
      <Text style={styles.result}>Mood: {mood}</Text>
      <Text style={styles.result}>Tasks:</Text>
      {tasks.map((task, index) => (
        <Text key={index} style={styles.task}>{index + 1}. {task}</Text>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    textAlignVertical: 'top',
  },
  result: {
    marginTop: 10,
    fontSize: 16,
  },
  task: {
    marginLeft: 10,
  },
});

export default HomeScreen;
