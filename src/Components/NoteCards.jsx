import React, { Component } from 'react';

class NoteCards extends Component {
  shortNoteText = (text) => text.substring(0, 70) + "...";
  shortNoteTitle = (title) => title.substring(0, 30) + "...";
  moreThanTwoTags = (noteTags) => {
    if (noteTags.length < 4 ) {
      return noteTags
    }
    else {
      const otherTagsNumber = "+" + (noteTags.length - 2);
      return [noteTags[0], noteTags[1], otherTagsNumber ]
    }
  }

  render() {
    let notes;
    console.log("notesrendering this.props.activeTag ", this.props.activeTag);
    console.log("notesrendering this.props.notes ", this.props.notes);
    const notesToFilter = this.props.notes;
    this.props.activeTag === "all" ? notes = notesToFilter : notes = notesToFilter.filter(note => note.noteTags.indexOf(this.props.activeTag) !== -1)
    console.log("start rensering  nodecards with this notes ", notes);

    return(
    <div className = "notesContainer">
      {notes.map((note, index) =>
        <div className="note" key = {note.title + index} id = {note.title} onClick = {this.props.editNote} >
          <h2 className="note_title">{this.shortNoteTitle(note.title)}</h2>
          <p className="note_text">{this.shortNoteText(note.text)}</p>
          <div className="note_tags">
              {this.moreThanTwoTags(note.noteTags).map(noteTag =>
                <span className="note_tag" key = {noteTag}> {noteTag} </span>)}
          </div>
          <div className="note_btns">
            <button className="note_btn note_btn--delete" id = {note.title} onClick = {this.props.deleteNote}> DELETE </button>
          </div>
          {/*}<div className="note_edit-mask" id = {note.title} ></div> */}
        </div>
      )}
    </div>

    )
  }
  }

export default NoteCards
