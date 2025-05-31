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

  return (
    <div>
      <h3>Create News & Story</h3>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" /><br />
      <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" /><br />
      <button onClick={handleSubmit}>Create</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
}