import React, { Component } from 'react';

class NoteCards extends Component {
  render() {
    return(
    <div className = "notesContainer">
      {this.props.notes.map(note =>
        <div className="note" key = {note.title} onClick = {this.props.editNote} >
          <h2 className="note-title">{note.title}</h2>
          <p className="note-text">{note.text}</p>
          <div className="note-tags">
              {note.noteTags.map(noteTag =>
                <span className="note-tag" key = {noteTag}> {noteTag} </span>)}
          </div>
          <div className="note_btns">
            <button className="note_btn note_btn--delete" id = {note.title} onClick = {this.props.deleteNote}>delete</button>
          </div>
        </div>
      )}
    </div>

    )
  }
  }

export default NoteCards
