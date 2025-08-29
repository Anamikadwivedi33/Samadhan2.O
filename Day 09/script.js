async function loadStudents() {
  const response = await fetch('/students');
  const data = await response.json();
  const tableBody = document.querySelector('#studentTable tbody');
  tableBody.innerHTML = ''; // Clear existing rows

  data.forEach(student => {
    const row = document.createElement('tr');
    row.innerHTML = `<td>${student.id}</td><td>${student.name}</td><td>${student.age}</td>`;
    tableBody.appendChild(row);
  });
}
