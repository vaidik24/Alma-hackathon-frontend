import { useState } from 'react';
import { postNewsStory } from '../api';
import { paraphraseText, correctText, improveDescriptionText, improveTitleText, generateIntegratedContent } from '../textEnhacement';

export default function CreateNewsStory({ suggestion, onClose }) {
  const [title, setTitle] = useState(suggestion.title);
  const [description, setDescription] = useState(suggestion.description);
  const [loading, setLoading] = useState({
    enhance: false,
    checkErrors: false,
    paraphrase: false,
    improveTitle: false
  });

  const handleSubmit = async () => {
    try {
      await postNewsStory({ title, description });
      alert("News & Story created!");
      onClose();
    } catch (error) {
      alert("Error creating news story: " + error.message);
    }
  };

  const handleEnhance = async () => {
    if (!description.trim()) {
      alert("Please enter a description first");
      return;
    }

    setLoading(prev => ({ ...prev, enhance: true }));
    try {
      const response = await improveDescriptionText(description, 'news');
      
      if (response.result && response.result.length > 0) {
        setDescription(response.result[0]);
      } else {
        alert("No enhancement suggestions received");
      }
    } catch (error) {
      alert("Error enhancing text: " + error.message);
    } finally {
      setLoading(prev => ({ ...prev, enhance: false }));
    }
  };

  const handleCheckErrors = async () => {
    if (!description.trim()) {
      alert("Please enter a description first");
      return;
    }

    setLoading(prev => ({ ...prev, checkErrors: true }));
    try {
      const response = await correctText(description, 'news');
      
      if (response.result && response.result.length > 0) {
        setDescription(response.result[0]);
        alert("Grammar and spelling checked and corrected!");
      } else {
        alert("No corrections needed or no suggestions received");
      }
    } catch (error) {
      alert("Error checking grammar: " + error.message);
    } finally {
      setLoading(prev => ({ ...prev, checkErrors: false }));
    }
  };

  const handleParaphrase = async () => {
    if (!description.trim()) {
      alert("Please enter a description first");
      return;
    }

    setLoading(prev => ({ ...prev, paraphrase: true }));
    try {
      const response = await paraphraseText(description, 'news');
      
      if (response.result && response.result.length > 0) {
        setDescription(response.result[0]);
      } else {
        alert("No paraphrase suggestions received");
      }
    } catch (error) {
      alert("Error paraphrasing text: " + error.message);
    } finally {
      setLoading(prev => ({ ...prev, paraphrase: false }));
    }
  };

  const handleImproveTitle = async () => {
    if (!title.trim()) {
      alert("Please enter a title first");
      return;
    }

    setLoading(prev => ({ ...prev, improveTitle: true }));
    try {
      const response = await improveTitleText(title, 'newsletter');
      console.log(response);
      
      if (response.result && response.result.length > 0) { 
        setTitle(response.result[0]);
      } else {
        alert("No title improvement suggestions received");
      }
    } catch (error) {
      alert("Error improving title: " + error.message);
    } finally {
      setLoading(prev => ({ ...prev, improveTitle: false }));
    }
  };

  const handleGenerateContent = async () => {
    if (!title.trim()) {
      alert("Please enter news title information first");
      return;
    }
    if (!description.trim()) {
      alert("Please enter news description information first");
      return;
    }
    const newsInput = { title, description };

    setLoading(prev => ({ ...prev, generateContent: true }));
    try {
      const response = await generateIntegratedContent(newsInput, 'newsletter');
      
      if (response.result) {
        // Parse the JSON response from the integrated task
        const generatedContent = typeof response.result === 'string' 
          ? JSON.parse(response.result) 
          : response.result;
        
        setTitle(generatedContent.title || '');
        setDescription(generatedContent.description || '');
        // alert(`${contentType.charAt(0).toUpperCase() + contentType.slice(1)} content generated successfully!`);
      } else {
        alert("No content generated");
      }
    } catch (error) {
      console.error('Error generating content:', error);
      alert("Error generating content: " + error.message);
    } finally {
      // setLoading(prev => ({ ...prev, generateContent: false }));
    }
  };

  const handleClick = () => {
    console.log("Create button clicked");
    
  }
  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Create News & Story</h2>

      <label style={styles.label}>Title</label>
      <div style={styles.inputGroup}>
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Enter a title"
          style={styles.input}
        />
        <button 
          onClick={handleImproveTitle} 
          style={styles.miniBtn}
          disabled={loading.improveTitle}
        >
          {loading.improveTitle ? 'Improving...' : 'Improve Title'}
        </button>
      </div>

      <label style={styles.label}>Description</label>
      <textarea
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Write a short description"
        rows={4}
        style={styles.textarea}
      />

      <div style={styles.buttonGroup}>
        <button onClick={handleGenerateContent} style={{ ...styles.button, ...styles.primary }}>Generate Content</button>
        <button onClick={handleClick} style={{ ...styles.button, ...styles.primary }}>Create</button>
        <button onClick={onClose} style={{ ...styles.button, ...styles.secondary }}>Cancel</button>
      </div>

      <div style={styles.utilityButtons}>
        <button 
          onClick={handleEnhance} 
          style={styles.utilityBtn}
          disabled={loading.enhance}
        >
          {loading.enhance ? 'Enhancing...' : 'Enhance'}
        </button>
        <button 
          onClick={handleCheckErrors} 
          style={styles.utilityBtn}
          disabled={loading.checkErrors}
        >
          {loading.checkErrors ? 'Checking...' : 'Check for Errors'}
        </button>
        <button 
          onClick={handleParaphrase} 
          style={styles.utilityBtn}
          disabled={loading.paraphrase}
        >
          {loading.paraphrase ? 'Paraphrasing...' : 'Paraphrase'}
        </button>
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
  inputGroup: {
    display: 'flex',
    gap: '10px',
    marginBottom: '15px',
    alignItems: 'center'
  },
  miniBtn: {
    padding: '8px 12px',
    backgroundColor: '#17a2b8',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '12px',
    whiteSpace: 'nowrap'
  }
};
