import { useState, useEffect } from 'react';
import axios from "axios";
import SuggestionModal from '../components/SuggestionModal';
import CIDSelector from '../components/CIDSelector';
import SuggestionList from '../components/SuggestionList';

export default function AdminSuggestions() {
  const [selectedCID, setSelectedCID] = useState('1');
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);

  const handleCIDChange = (e) => {
    setSelectedCID(e.target.value);
  };

  const [suggestions, setSuggestions] = useState({ suggestions: [] });

  useEffect(() => {
    axios.get(`http://localhost:8080/api/fetchSuggestions?cid=${selectedCID}`)
      .then((response) => {
        const res = response.data;
        const transformedSuggestions = res.suggestions.map(suggestion => ({
          ...suggestion,
          title: suggestion.source_title,
          description: suggestion.suggestion_content,
        }));

        setSuggestions({
          ...res,
          suggestions: transformedSuggestions
        });
      })
      .catch((error) => {
        console.error("Error fetching suggestions:", error);
      });
  }, [selectedCID]);

  return (
    <div>
      
      {/* <h2>Admin Suggestion List</h2> */}

      <CIDSelector selectedCID={selectedCID} onChange={handleCIDChange} />

      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>
        Admin Suggestions
      </h1>
      <SuggestionList
        suggestions={suggestions}
        selectedCID={selectedCID}
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
