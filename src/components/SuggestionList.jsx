"use client"

import { useState, useMemo, useEffect, useCallback } from "react"
import SuggestionModal from "./SuggestionModal"

export default function SuggestionList({ suggestions, selectedCID }) {
  const [selectedSuggestion, setSelectedSuggestion] = useState(null)
  const [expandedDescriptions, setExpandedDescriptions] = useState({});
  const [selectedIndustry, setSelectedIndustry] = useState("all");
  const [customIndustry, setCustomIndustry] = useState("");
  const [isCustomMode, setIsCustomMode] = useState(false);
  const [customSearchResults, setCustomSearchResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchError, setSearchError] = useState(null);

  // 🔥 FIXED: Reset filters when CID changes
  useEffect(() => {
    // Reset to default state when CID changes
    setSelectedIndustry("all");
    setIsCustomMode(false);
    setCustomIndustry("");
    setCustomSearchResults(null);
    setSearchError(null);
    setExpandedDescriptions({});
    setSelectedSuggestion(null);
  }, [selectedCID]);

  const toggleDescription = (id) => {
    setExpandedDescriptions(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Get unique industries for the dropdown
  const uniqueIndustries = useMemo(() => {
    if (!suggestions?.suggestions) return [];
    const industries = suggestions.suggestions.map(sug => sug.industry_target);
    return [...new Set(industries)].filter(Boolean).sort();
  }, [suggestions]);

  // Debounced API call for custom search
  const searchCustomIndustry = useCallback(async (searchTerm) => {
    if (!searchTerm.trim()) {
      setCustomSearchResults(null);
      return;
    }

    setIsLoading(true);
    setSearchError(null);

    try {
      // Replace with your actual API endpoint
      const response = await fetch(`http://localhost:8080/api/newKeywordPool?cid=${selectedCID}&keyword=${searchTerm.trim()}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setCustomSearchResults(data);
    } catch (error) {
      console.error('Custom search error:', error);
      setSearchError('Failed to search. Please try again.');
      setCustomSearchResults(null);
    } finally {
      setIsLoading(false);
    }
  }, [selectedCID]);

  // Debounce the API call
  useEffect(() => {
    if (!isCustomMode) return;

    const timeoutId = setTimeout(() => {
      searchCustomIndustry(customIndustry);
    }, 500); // 500ms delay

    return () => clearTimeout(timeoutId);
  }, [customIndustry, isCustomMode, searchCustomIndustry]);

  // Re-search when CID changes in custom mode
  useEffect(() => {
    if (isCustomMode && customIndustry.trim()) {
      searchCustomIndustry(customIndustry);
    }
  }, [selectedCID, isCustomMode, customIndustry, searchCustomIndustry]);

  // Determine which suggestions to display
  const displaySuggestions = useMemo(() => {
    if (isCustomMode) {
      return customSearchResults?.suggestions || [];
    }
    
    if (!suggestions?.suggestions) return [];
    if (selectedIndustry === "all") return suggestions.suggestions;
    return suggestions.suggestions.filter(sug => sug.industry_target === selectedIndustry);
  }, [suggestions, selectedIndustry, isCustomMode, customSearchResults]);

  const truncateText = (text, maxLength = 150) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const handleModeSwitch = (customMode) => {
    setIsCustomMode(customMode);
    if (customMode) {
      setSelectedIndustry("all");
      setCustomSearchResults(null);
    } else {
      setCustomIndustry("");
      setCustomSearchResults(null);
      setSearchError(null);
    }
  };

  const handleClearCustomSearch = () => {
    setCustomIndustry("");
    setIsCustomMode(false);
    setSelectedIndustry("all");
    setCustomSearchResults(null);
    setSearchError(null);
  };

  return (
    <div style={{ display: "grid", gap: "1.5rem" }}>
      Selected CID: {selectedCID} {/* Testing purpose... */}
      
      {/* Industry Filter Dropdown */}
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="industry-filter" style={{ 
          display: 'block', 
          marginBottom: '0.5rem', 
          fontWeight: 'bold' 
        }}>
          Filter by Industry:
        </label>
        
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '10px' }}>
          <button
            onClick={() => handleModeSwitch(false)}
            style={{
              padding: '6px 12px',
              border: !isCustomMode ? '2px solid #007bff' : '1px solid #ccc',
              borderRadius: '4px',
              backgroundColor: !isCustomMode ? '#e7f3ff' : 'white',
              cursor: 'pointer',
              fontSize: '12px'
            }}
          >
            Predefined
          </button>
        </div>

        {!isCustomMode ? (
          <select
            id="industry-filter"
            value={selectedIndustry}
            onChange={(e) => setSelectedIndustry(e.target.value)}
            style={{
              padding: '8px 12px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '14px',
              minWidth: '200px',
              backgroundColor: 'white'
            }}
          >
            <option value="all">All Industries</option>
            {uniqueIndustries.map(industry => (
              <option key={industry} value={industry}>
                {industry}
              </option>
            ))}
          </select>
        ) : (
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <input
              type="text"
              placeholder="Type industry name to search..."
              value={customIndustry}
              onChange={(e) => setCustomIndustry(e.target.value)}
              style={{
                padding: '8px 12px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                fontSize: '14px',
                minWidth: '200px',
                flex: '1'
              }}
            />
            <button
              onClick={handleClearCustomSearch}
              style={{
                padding: '8px 12px',
                border: '1px solid #dc3545',
                borderRadius: '4px',
                backgroundColor: '#dc3545',
                color: 'white',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              Clear
            </button>
          </div>
        )}
        
        <div style={{ 
          marginTop: '8px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <span style={{ 
            fontSize: '14px', 
            color: '#666' 
          }}>
            ({displaySuggestions.length} suggestions)
            {isCustomMode && customIndustry.trim() && (
              <span style={{ fontStyle: 'italic' }}>
                {" "}matching "{customIndustry.trim()}"
              </span>
            )}
          </span>
          
          {isLoading && (
            <span style={{ 
              fontSize: '14px', 
              color: '#007bff',
              fontStyle: 'italic'
            }}>
              Searching...
            </span>
          )}
          
          {searchError && (
            <span style={{ 
              fontSize: '14px', 
              color: '#dc3545',
              fontStyle: 'italic'
            }}>
              {searchError}
            </span>
          )}
        </div>
      </div>

      {displaySuggestions.map((sug) => (
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
      
      {displaySuggestions.length === 0 && !isLoading && (
        <div style={{ 
          textAlign: 'center', 
          padding: '2rem', 
          color: '#666',
          fontStyle: 'italic' 
        }}>
          {isCustomMode && customIndustry.trim() 
            ? `No suggestions found matching "${customIndustry.trim()}"`
            : searchError 
              ? "Error occurred while searching. Please try again."
              : "No suggestions found for the selected industry."
          }
        </div>
      )}
    </div>
  )
}