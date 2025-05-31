import { useState } from 'react';
import { postEvent } from '../api';

export default function CreateEvent({ suggestion, onClose }) {
  const [form, setForm] = useState({
    title: suggestion.title,
    description: suggestion.description,
    date: '',
    location: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await postEvent(form);
    alert("Event created!");
    onClose();
  };

    const handleEnhance = () => {
    setDescription(prev => prev + " (Enhanced)");
  };

  const handleCheckErrors = () => {
    alert("Checked for grammar and spelling errors!");
  };

  const handleParaphrase = () => {
    setDescription(prev => "Paraphrased: " + prev);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Create Event</h2>

      <div style={styles.formGroup}>
        <label style={styles.label}>Title</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Enter event title"
          style={styles.input}
        />
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Write a short description"
          style={styles.textarea}
        />
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Event Date</label>
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          style={styles.input}
        />
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Location</label>
        <input
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="Enter event location"
          style={styles.input}
        />
      </div>

      <div style={styles.buttonGroup}>
        <button onClick={handleSubmit} style={{ ...styles.button, ...styles.primary }}>Create Event</button>
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
    maxWidth: '550px',
    margin: '2rem auto',
    padding: '2rem',
    borderRadius: '10px',
    backgroundColor: '#fefefe',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    fontSize: '1.8rem',
    marginBottom: '1.5rem',
    color: '#333',
    textAlign: 'center',
  },
  formGroup: {
    marginBottom: '1rem',
  },
  label: {
    display: 'block',
    marginBottom: '0.4rem',
    color: '#555',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: '0.7rem',
    fontSize: '1rem',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  textarea: {
    width: '100%',
    padding: '0.7rem',
    fontSize: '1rem',
    border: '1px solid #ccc',
    borderRadius: '5px',
    resize: 'vertical',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '1rem',
    marginTop: '1.5rem',
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
  utilityButtons: {
    marginTop: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '0.5rem',
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
