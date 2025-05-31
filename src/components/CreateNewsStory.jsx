import { useState } from 'react';
import { postNewsStory } from '../api';

export default function CreateNewsStory({ suggestion, onClose }) {
  const [title, setTitle] = useState(suggestion.title);
  const [description, setDescription] = useState(suggestion.description);

  const handleSubmit = async () => {
    await postNewsStory({ title, description });
    alert("News & Story created!");
    onClose();
  };

  const handleEnhance = () => {
    // Placeholder logic — you can integrate AI enhancement here
    setDescription(prev => prev + " (Enhanced)");
  };

  const handleCheckErrors = () => {
    // Placeholder logic — replace with grammar checking integration
    alert("Checked for grammar and spelling errors!");
  };

  const handleParaphrase = () => {
    // Placeholder logic — replace with paraphrasing logic
    setDescription(prev => "Paraphrased: " + prev);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Create News & Story</h2>

      <label style={styles.label}>Title</label>
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Enter a title"
        style={styles.input}
      />

      <label style={styles.label}>Description</label>
      <textarea
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Write a short description"
        rows={4}
        style={styles.textarea}
      />

      <div style={styles.buttonGroup}>
        <button onClick={handleSubmit} style={{ ...styles.button, ...styles.primary }}>Create</button>
        <button onClick={onClose} style={{ ...styles.button, ...styles.secondary }}>Cancel</button>
      </div>

      <div style={styles.utilityButtons}>
        <button onClick={handleEnhance} style={styles.utilityBtn}>Enhance</button>
        <button onClick={handleCheckErrors} style={styles.utilityBtn}>Check for Errors</button>
        <button onClick={handleParaphrase} style={styles.utilityBtn}>Paraphrase</button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '500px',
    margin: '2rem auto',
    padding: '2rem',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    marginBottom: '1.5rem',
    fontSize: '1.5rem',
    color: '#222',
  },
  label: {
    display: 'block',
    marginBottom: '0.5rem',
    marginTop: '1rem',
    color: '#444',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #ccc',
    borderRadius: '6px',
    fontSize: '1rem',
  },
  textarea: {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #ccc',
    borderRadius: '6px',
    fontSize: '1rem',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '1.5rem',
    gap: '1rem',
  },
  utilityButtons: {
    marginTop: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '0.5rem',
  },
  button: {
    padding: '0.5rem 1.5rem',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  primary: {
    backgroundColor: '#007bff',
    color: '#fff',
  },
  secondary: {
    backgroundColor: '#6c757d',
    color: '#fff',
  },
  utilityBtn: {
    flex: '1',
    padding: '0.5rem',
    backgroundColor: '#f1f1f1',
    color: '#333',
    border: '1px solid #ccc',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.95rem',
  },
};
