// api/textEnhancement.js
const API_BASE_URL = 'http://localhost:8080'; 

export const enhanceText = async (task, input, category = 'content') => {
  try {
    // const response = await fetch(`${API_BASE_URL}/api/enhance`, {
    const response = await fetch('http://localhost:8080/api/enhance', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        task,
        input,
        category
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error enhancing text:', error);
    throw error;
  }
};

// Specific helper functions for each task
export const paraphraseText = (input, category = 'content') => {
  return enhanceText('paraphrase', input, category);
};

export const correctText = (input, category = 'content') => {
  return enhanceText('correct', input, category);
};

export const improveTitleText = (input, category = 'content') => {
  return enhanceText('improve_title', input, category);
};

export const improveDescriptionText = (input, category = 'content') => {
  return enhanceText('improve_description', input, category);
};

export const generateIntegratedContent = (input, category = 'content') => {
  return enhanceText('integrated', input, category);
};