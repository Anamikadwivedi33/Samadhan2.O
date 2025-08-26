const http = require('http');
const fs = require('fs');
const path = require('path');
const PORT = 3000;

const getStudents = () => {
    const data = fs.readFileSync('students.json');
    return JSON.parse(data);
};

const saveStudents = (students) => {
    fs.writeFileSync('students.json', JSON.stringify(students, null, 2));
};

const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/') {
        // Serve frontend page
        const filePath = path.join(__dirname, 'index.html');
        const content = fs.readFileSync(filePath);
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content);

    } else if (req.method === 'GET' && req.url === '/students') {
        const students = getStudents();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(students));

    } else if (req.method === 'POST' && req.url === '/students') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            const newStudent = JSON.parse(body);
            const students = getStudents();
            newStudent.id = students.length ? students[students.length - 1].id + 1 : 1;
            students.push(newStudent);
            saveStudents(students);
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(newStudent));
        });

    } else if (req.method === 'PUT' && req.url.startsWith('/students/')) {
        const id = parseInt(req.url.split('/')[2]);
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            const updatedData = JSON.parse(body);
            const students = getStudents();
            const index = students.findIndex(s => s.id === id);
            if (index !== -1) {
                students[index] = { ...students[index], ...updatedData };
                saveStudents(students);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(students[index]));
            } else {
                res.writeHead(404);
                res.end(JSON.stringify({ message: 'Student not found' }));
            }
        });

    } else if (req.method === 'DELETE' && req.url.startsWith('/students/')) {
        const id = parseInt(req.url.split('/')[2]);
        const students = getStudents();
        const filtered = students.filter(s => s.id !== id);
        if (students.length !== filtered.length) {
            saveStudents(filtered);
            res.writeHead(200);
            res.end(JSON.stringify({ message: 'Student deleted' }));
        } else {
            res.writeHead(404);
            res.end(JSON.stringify({ message: 'Student not found' }));
        }

    } else {
        res.writeHead(404);
        res.end('Route not found');
    }
});

server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
