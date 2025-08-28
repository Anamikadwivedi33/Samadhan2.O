import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // Load all notes on page load
  useEffect(() => {
    axios.get("http://localhost:5000/notes").then(res => setNotes(res.data));
  }, []);

  // Add new note
  const addNote = async () => {
    if (!title || !content) return alert("Please fill all fields");
    const res = await axios.post("http://localhost:5000/notes", { title, content });
    setNotes([...notes, res.data]);
    setTitle("");
    setContent("");
  };

  // Delete note
  const deleteNote = async (id) => {
    await axios.delete(`http://localhost:5000/notes/${id}`);
    setNotes(notes.filter(n => n._id !== id));
  };

  return (
    <div style={{ padding: "20px" }}>
      {/* Heading of Notes App */}
      <h1>Notes App</h1>

      {/* Input for title */}
      <input 
        value={title} 
        onChange={e => setTitle(e.target.value)} 
        placeholder="Title" 
      />

      {/* Input for content */}
      <input 
        value={content} 
        onChange={e => setContent(e.target.value)} 
        placeholder="Content" 
      />

      {/* Button to add new note */}
      <button onClick={addNote}>Add Note</button>

      {/* List of notes */}
      <ul>
        {notes.map(n => (
          <li key={n._id}>
            <b>{n.title}</b>: {n.content}
            {/* Button to delete note */}
            <button onClick={() => deleteNote(n._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
