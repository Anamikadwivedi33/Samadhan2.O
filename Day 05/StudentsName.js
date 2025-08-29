const http = require('http');

const PORT = 3000;

// Sample list of students
const students = [
  { id: 1, name: 'Alice', age: 20 },
  { id: 2, name: 'Bob', age: 21 },
  { id: 3, name: 'Charlie', age: 19 }
];

// Create the HTTP server
const server = http.createServer((req, res) => {
  // Only respond with JSON for /students route
  if (req.url === '/students') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(students));
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Not Found' }));
  }
});

// Start server
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
