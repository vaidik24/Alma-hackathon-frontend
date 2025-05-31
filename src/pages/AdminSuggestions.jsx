import { useState } from 'react';
import { dummySuggestions } from '../api';
import SuggestionModal from '../components/SuggestionModal';
import CIDSelector from '../components/CIDSelector';
import SuggestionList from '../components/SuggestionList';

export default function AdminSuggestions() {
  const [selectedCID, setSelectedCID] = useState('1');
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);

  const handleCIDChange = (e) => {
    setSelectedCID(e.target.value);
  };

  const handleTakeAction = (sug) => {
    setSelectedSuggestion(sug);
  };

  return (
    <div>
      
      {/* <h2>Admin Suggestion List</h2> */}

      <CIDSelector selectedCID={selectedCID} onChange={handleCIDChange} />

      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>
        Admin Suggestions
      </h1>
      <SuggestionList
        suggestions={dummySuggestions}
        selectedCID={selectedCID}
        onTakeAction={handleTakeAction}
      />

      {selectedSuggestion && (
        <SuggestionModal
          suggestion={selectedSuggestion}
          onClose={() => setSelectedSuggestion(null)}
        />
      )}
    </div>
  );
}