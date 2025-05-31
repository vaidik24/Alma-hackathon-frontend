import { useState } from 'react';
import CreateNewsStory from './CreateNewsStory';
import CreateEvent from './CreateEvent';

export default function SuggestionModal({ suggestion, onClose }) {
  const [choice, setChoice] = useState('');

  return (
    <div style={{ background: '#fff', border: '1px solid #000', padding: 20 }}>
      <h3 class="suggessionModal_heading">What do you want to do with this suggestion?</h3>
      {!choice && (
        <>
          <button onClick={() => setChoice('news')}>Create News & Story</button>
          <button class="create_event_btn" onClick={() => setChoice('event')}>Create Event</button>
          <button class="cancel_button" onClick={onClose}>Cancel</button>
        </>
      )}

      {choice === 'news' && (
        <CreateNewsStory suggestion={suggestion} onClose={onClose} />
      )}
      {choice === 'event' && (
        <CreateEvent suggestion={suggestion} onClose={onClose} />
      )}
    </div>
  );
}
