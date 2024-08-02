
// File: helper.js
// This file contains helper functions for API calls

async function getUserIp() {
    const url = `https://forumhubjavaservices.azurewebsites.net/api/get-ip`;
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });
  
      if (!response.ok) {
        throw new Error(`API call failed with status ${response.status}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error getting ip:", error);
      return null;
    }
  }
  
  export { getUserIp};
  