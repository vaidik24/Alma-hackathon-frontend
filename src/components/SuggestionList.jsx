"use client"

import { useState } from "react"
import SuggestionModal from "./SuggestionModal"

export default function SuggestionList({ suggestions, selectedCID, onTakeAction }) {
  const [selectedSuggestion, setSelectedSuggestion] = useState(null)

  return (
    <div style={{ display: "grid", gap: "1.5rem" }}>
        Selected CID: {selectedCID} {/* Testing purpose... */}
      {suggestions.map((sug) => (
        <div
          key={sug.id}
          
          style={{
            backgroundColor: "white",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
            borderRadius: "0.75rem",
            padding: "1.5rem",
            border: "1px solid #e5e7eb",
            transition: "box-shadow 0.2s ease-in-out",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.1)"
          }}
        >
          <h3
            style={{
              fontSize: "1.25rem",
              fontWeight: "600",
              color: "#111827",
              marginBottom: "0.5rem",
            }}
          >
            {sug.title}
          </h3>
          <p style={{ color: "#4B5563", marginBottom: "1rem" }}>{sug.description}</p>
          <button
            // onClick={() => setSelectedSuggestion(sug)}
             onClick={() => onTakeAction(sug)}
            style={{
              backgroundColor: "#2563eb",
              color: "white",
              padding: "0.5rem 1rem",
              borderRadius: "0.375rem",
              border: "none",
              cursor: "pointer",
              transition: "background-color 0.2s ease-in-out",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#1e40af"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#2563eb"
            }}
          >
            Take Action
          </button>
        </div>
      ))}

      {selectedSuggestion && (
        <SuggestionModal
          suggestion={selectedSuggestion}
          onClose={() => setSelectedSuggestion(null)}
        />
      )}
    </div>
  )
}