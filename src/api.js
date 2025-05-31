export const dummySuggestions = [
  { id: 1, title: "Tree Plantation", description: "Planting trees near the campus gate." },
  { id: 2, title: "Tech Fest 2025", description: "Annual intercollege tech event." }
];

// Dummy API
export const postNewsStory = (data) => {
  console.log("Posting News & Story:", data);
  return Promise.resolve({ success: true });
};

export const postEvent = (data) => {
  console.log("Posting Event:", data);
  return Promise.resolve({ success: true });
};