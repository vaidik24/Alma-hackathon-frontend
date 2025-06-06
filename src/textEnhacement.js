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
    // console.log(response);    

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data.result);
    if(task === "correct")
        return data.result;
    if(task ==='improve_title' || task === 'improve_description' || task === 'paraphrase')
        return JSON.parse(data.result)[0];
    if (task !== 'integrated') {
        return data.result[0];
    }

    console.log(`Enhancement result for task "${task}":`, JSON.parse(data.result));
    
    return JSON.parse(data.result);
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
    console.log(category);
    
  return enhanceText('integrated', input, category);
};