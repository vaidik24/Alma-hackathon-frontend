import { useState } from 'react';
import { postEvent } from '../api';

export default function CreateEvent({ suggestion, onClose }) {
  const [form, setForm] = useState({
    title: suggestion.title,
    description: suggestion.description,
    date: '',
    location: '',
    organizer: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await postEvent(form);
    alert("Event created!");
    onClose();
  };

  return (
    <div>
      <h3>Create Event</h3>
      <input name="title" value={form.title} onChange={handleChange} placeholder="Title" /><br />
      <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" /><br />
      <input name="date" value={form.date} onChange={handleChange} placeholder="Event Date" /><br />
      <input name="location" value={form.location} onChange={handleChange} placeholder="Location" /><br />
      <input name="organizer" value={form.organizer} onChange={handleChange} placeholder="Organizer" /><br />
      <button onClick={handleSubmit}>Create Event</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
}