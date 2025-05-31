import { useState } from 'react';
import { dummySuggestions } from '../api';
import SuggestionModal from '../components/SuggestionModal';

export default function AdminSuggestions() {
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);

  return (
    <div>
      <h2>Admin Suggestion List</h2>
      {dummySuggestions.map((sug) => (
        <div class="suggession_card" key={sug.id} style={{ border: '1px solid gray', padding: '10px', margin: '10px' }}>
          <h3>{sug.title}</h3>
          <p>{sug.description}</p>
          <p class="industry-chip">industry</p>
          <button onClick={() => setSelectedSuggestion(sug)}>Take Action</button>
        </div>
      ))}

      {selectedSuggestion && (
        <SuggestionModal
          suggestion={selectedSuggestion}
          onClose={() => setSelectedSuggestion(null)}
        />
      )}
    </div>
  );
}