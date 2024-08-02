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
      const ip = parseIpFromResponse(data.ip);
      return { ip };
    } catch (error) {
      console.error("Error getting IP:", error);
      return null;
    }
  }
  
  function parseIpFromResponse(ipString) {
    if (ipString) {
      const ip = ipString.split(':')[0]; // Split by colon and take the first part
      return ip;
    }
    return null;
  }
  
  export { getUserIp };
  