import { useState, useEffect } from 'react';
import axios from "axios";
import SuggestionModal from '../components/SuggestionModal';

export default function AdminSuggestions() {
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);
  const [suggestions, setSuggestions] = useState({ suggestions: [] });
  const [expandedDescriptions, setExpandedDescriptions] = useState({});

  useEffect(() => {
    axios.get('http://localhost:8080/api/fetchSuggestions')
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
  }, []);

  const toggleDescription = (id) => {
    setExpandedDescriptions(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const truncateText = (text, maxLength = 150) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div>
      <h2>Admin Suggestion List</h2>
      {suggestions.suggestions.map((sug) => (
        <div className="suggession_card" key={sug.id} style={{ border: '1px solid gray', padding: '10px', margin: '10px' }}>
          <h3>{sug.title}</h3>
          <div>
            <p>
              {expandedDescriptions[sug.id]
                ? sug.description
                : truncateText(sug.description)
              }
            </p>
            {sug.description && sug.description.length > 150 && (
              <button
                onClick={() => toggleDescription(sug.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#007bff',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  fontSize: '14px',
                  padding: '0',
                  margin: '5px 0'
                }}
              >
                {expandedDescriptions[sug.id] ? 'Show Less ▲' : 'Show More ▼'}
              </button>
            )}
          </div>
          <p className="industry-chip">{sug.industry_target}</p>
          <button onClick={() => setSelectedSuggestion(prev =>
            prev?.id === sug.id ? null : sug
            )}>
            {selectedSuggestion?.id === sug.id ? 'Close Action' : 'Take Action'}
          </button>

          {/* ✅ Show modal right below the selected suggestion */}
          {selectedSuggestion?.id === sug.id && (
            <SuggestionModal
              suggestion={selectedSuggestion}
              onClose={() => setSelectedSuggestion(null)}
            />
          )}
        </div>
      ))}
    </div>
  );
}
