'use client';

import { useState } from 'react';
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Avatar,
  CircularProgress,
  Paper,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import styles from './page.module.css';

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      const aiMessage = { role: 'assistant', content: data.response };
      setMessages((prevMessages) => [...prevMessages, aiMessage]);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" alignItems="center" mb={4}>
        <Avatar
          alt="Sidemen Logo"
          src="/sidemen-logo.png"
          sx={{ width: 56, height: 56, mr: 2 }}
        />
        <Typography variant="h4" fontWeight="bold" color="#333">
          Sidemen Chatbot
        </Typography>
      </Box>

      <Paper
        elevation={3}
        className={styles.chatWindow}
        sx={{
          bgcolor: '#ffffff', // Light background for better readability
          borderRadius: 2,
          p: 2,
          mb: 2,
          height: 400,
          overflowY: 'auto',
        }}
      >
        {messages.map((message, index) => (
          <Box
            key={index}
            className={message.role === 'user' ? styles.userMessage : styles.botMessage}
            sx={{
              textAlign: message.role === 'user' ? 'right' : 'left',
            }}
          >
            <Typography variant="body1" gutterBottom>
              {message.content}
            </Typography>
          </Box>
        ))}
        {loading && (
          <Box textAlign="center" mt={2}>
            <CircularProgress size={24} color="primary" />
          </Box>
        )}
      </Paper>

      <Box display="flex" alignItems="center">
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Ask anything about the Sidemen..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          sx={{ mr: 2, bgcolor: '#ffffff', borderRadius: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={sendMessage}
          endIcon={<SendIcon />}
          disabled={loading}
        >
          Send
        </Button>
      </Box>
    </Container>
  );
}
