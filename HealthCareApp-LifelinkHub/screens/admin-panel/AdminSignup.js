const data = {
  firstName: '',
  lastName: '',
  email: ''
};

fetch('http://192.168.15.92:4000/api/generate-password', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
})
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log('Response:', data);
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });
