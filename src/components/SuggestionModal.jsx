import { useState } from 'react';
import CreateNewsStory from './CreateNewsStory';
import CreateEvent from './CreateEvent';

export default function SuggestionModal({ suggestion, onClose }) {
  const [choice, setChoice] = useState('');

  return (
    <div style={{ background: '#fff', padding: 20 }}>
      <h3 class="suggessionModal_heading">What do you want to do with this suggestion?</h3>
      {!choice && (
        <>
          <button onClick={() => setChoice('news')}>Create News & Story</button>
          <button class="create_event_btn">Create Campaign</button>
          <button class="create_event_btn">Create Post</button>
          <button class="create_event_btn">Create Poll</button>
          <button class="create_event_btn">Create Event</button>
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
