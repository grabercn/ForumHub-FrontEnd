// This is a simple example of how to make an API call using the Fetch API. This example fetches data from an API endpoint and logs the retrieved data to the console.

// This is the customer data object that will be sent to the API endpoint
const customerObject = {
    name: 'Owen',
    password: 'password',
    email: 'owen@gmail.com',
};

async function createCustomer(customerObject) {
    const url = 'http://localhost:8080/api/customers';
    try {
      const response = await fetch(url, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(customerObject) // Body expects JSON string
      });

      if (!response.ok) {
          throw new Error(`API call failed with status ${response.status}`);
      }

      const data = await response.json();
      console.log("Customer created successfully:", data);
  }
  catch(error) {
      console.error("Error creating customer:", error);
  }
}

// Export the functions to be used in other files
// export { createCustomer };

createCustomer(customerObject);

