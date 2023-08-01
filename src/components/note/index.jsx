import React, { useState } from "react";
import Showdown from "showdown";
import 'bootstrap/dist/css/bootstrap.css';
import './../../assets/style.css';


const converter = new Showdown.Converter();

function Note() {
  const [notes, setNotes] = useState(
    JSON.parse(localStorage.getItem("notes")) || [
      { id: Date.now(), titre: "First note", contenu: "Write here (markdown format)" }
    ]
  );

  const [selectedNote, setSelectedNote] = useState(notes.id);

  const updateNote = (id, titre, contenu) => {
    const newNotes = notes.map(note =>
      note.id === id ? { id, titre, contenu } : note
    );
    
    setNotes(newNotes);
    saveNote();
  };

  const saveNote = () => {
    localStorage.setItem("notes", JSON.stringify(notes));
  };

  const deleteNote = (id) => {
    const newNotes = notes.filter(note => note.id !== id);
    saveNote();
    setNotes(newNotes);
  };

  const addNote = () => {
    const newNote = { id: Date.now(), titre: "", contenu: "" };
    setNotes([newNote, ...notes]);
    setSelectedNote(newNote.id);
  };


// html part of the code


  return (
  <div className="container">
    <div className="row">
        <div className="col-4">
            <button className="btn-primary my-3" onClick={addNote}>Add a new note</button>
            {notes.map(note => (
                <div className="card my-2" key={note.id} onClick={() => setSelectedNote(note.id)}>
                    <div className="card-header">
                        <h5>{note.titre}</h5>
                        <p>{note.contenu.length > 15 ? note.contenu.substring(0, 15) + '...' : note.contenu}</p>
                    </div>
                </div>
                ))}
            </div>
            <div className="col-8">
                {notes.filter(note => note.id === selectedNote).map(note => (
                    <div className="card my-2" key={note.id}>
                        <div className="card-header">
                            <h2>{note.titre}</h2>
                            <div dangerouslySetInnerHTML={{ __html: converter.makeHtml( note.contenu) }} />
                        </div>
                        <div className="card-body">
                            <input
                                className="form-control my-2"
                                value={note.titre}
                                onChange={e => updateNote(note.id, e.target.value, note.contenu)}
                            />
                            <textarea
                                className="form-control my-2"
                                value={note.contenu}
                                onChange={e => updateNote(note.id, note.titre, e.target.value)}
                            />
                            <button className="btn-primary mr-2" onClick={saveNote} disabled={!note.titre.trim() || !note.contenu.trim()}>Save Note</button>
                            <button className="btn-danger" onClick={() => deleteNote(note.id)}>Delete</button>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </div>
  );
}

export default Note;
