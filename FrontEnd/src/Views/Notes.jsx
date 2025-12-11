import { useEffect, useState } from "react";
import { getNotes, postNote, deleteNote } from "../Services/NotesService";

function Notes({ currentUser }) {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  async function getdata() {
    const allNotes = await getNotes();
    setNotes(allNotes.filter(n => n.studentID === currentUser.studentID));
  }

  useEffect(() => {
    getdata();
  }, []);

  const addNote = async () => {
    const newNote = {
      title: title,
      description: content,
      studentID: currentUser.studentID
    };

    await postNote(newNote);
    setTitle("");
    setContent("");

    await getdata();
  };

  const removeNote = async (id) => {
    await deleteNote(id);
    await getdata();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && e.ctrlKey) {
      addNote();
    }
  };

  return (
    
    <div className="p-8 max-w-7xl mx-auto">
      <h2 className="text-4xl font-extrabold mb-10 text-center">Notes</h2>
  
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
  
        <div className="lg:col-span-2 bg-white border rounded-3xl p-6 shadow-xl">
          <h3 className="text-2xl font-bold mb-6">Create Note</h3>
  
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter note title"
                className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
  
            <div>
              <label className="block text-sm font-semibold mb-2">Content</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter note content"
                rows="8"
                className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>
  
            <button
              onClick={addNote}
              className="cursor-pointer w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition shadow-md"
            >
              Add Note
            </button>
          </div>
        </div>

        <div className="lg:col-span-1 bg-white border rounded-3xl p-6 shadow-xl">
          <h3 className="text-2xl font-bold mb-6">Your Notes ({notes.length})</h3>
  
          {notes.length === 0 ? (
            <p className="text-gray-500 text-center py-10">No notes yet. Create one to get started!</p>
          ) : (
            <div className="space-y-4 max-h-[75vh] overflow-y-auto pr-2">
              {notes.map((note) => (
                <div
                  key={note.noteID}
                  className="bg-yellow-50 p-5 rounded-xl border border-yellow-200 shadow hover:shadow-lg transition"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-xl">{note.title || "Untitled"}</h4>
                    <button 
                      onClick={() => removeNote(note.noteID)}
                      className="text-red-500 hover:text-red-700 cursor-pointer font-bold text-xl"
                    >
                      ✕
                    </button>
                  </div>
                  <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{note.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
  
      </div>
    </div>
  );
  
}

export default Notes;