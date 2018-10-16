import React, { Component } from 'react';
import AddNote from "./Components/AddNote";
import NoteCards from "./Components/NoteCards";
import TagFilter from "./Components/TagFilter";
import ChooseTags  from "./Components/ChooseTag";
import './App.css';

class App extends Component {
  state = {notes: [{title: "first note",
                 noteTags: ["receipt", "privat", "work"],
                 text: "my text"},
                 {title: "second note",
                 noteTags: ["receipt", "privat", "books"],
                 text: "my text"}
               ],
         tags: [{tagName: "receipt", active: false, filter: false},
                {tagName: "privat", active: false, filter: false},
                {tagName: "work", active: false, filter: false},
                 {tagName: "books", active: false, filter: false}],
        newTitle: "",
        newText: "",
        newTags: [],
        newTag: "",
        startFindTag: 0,
        noteStatus: "allNotes",
        showChooseTag: "choose-tag choose-tag--hidden",
        activeNote: {title: "first note",
                       noteTags: ["receipt", "privat", "work"],
                       text: "active note my text"} }
  //startFindTag - index helps if had #tags before cut off piece with previous tags from beginning

  onChangeTitle = ({ target: { value } }) => {
    this.setState({ newTitle: value });
  }

  //checking and getting tags from text by #
  getTagFromText  = (value) => {
  const str = value.substring(this.state.startFindTag);  //if  had #tags before cut off piece with previous tags from beginning
  if (str.indexOf("#") == -1) {
    return false
  }
  const restStr = str.substring(str.indexOf("#"));
  if (restStr.indexOf(" ") == -1){
    return false
  }
  return restStr.substring(1, restStr.indexOf(" "));
  }

  onChangeText = ({ target: { value } }) => {
    if (!this.getTagFromText(value)) {
      this.setState({ newText: value })
      //looking for tags by # in text of note
    } else {
      const tagFromText = this.getTagFromText(value);
      const { newTags } = this.state;
      const { tags } =  this.state;
      const { newText } = this.state;
      const newStartFindTag = newText.length; // cut off piece with previous tags from beginning
      this.setState({ newText: value, newTags: [...newTags, {tagName: tagFromText, active: true}],
                                      tags: [...tags, {tagName: tagFromText, active: true, filter: false}],
                                      newTag: "", startFindTag: newStartFindTag  });
      }
  }

  onSubmitForm = (e) => {
    e.preventDefault();
    const { notes } = this.state;
    const {newTags} = this.state;
    const {tags} = this.state;
    const newNoteTags = newTags.map(tag => tag.tagName);
    const newNote = {title: this.state.newTitle, noteTags: newNoteTags, text: this.state.newText };
    const updatedTags = tags.map(tag => ({tagName: tag.tagName, active: false, filter: tag.filter}))
    this.setState({ newTitle: "", newText: "", newTags: [], notes: [...notes, newNote], tags: updatedTags, noteStatus: "allNotes", });
    }

    onChangeOneTag = ({ target: { value } }) => {
      this.setState({ newTag: value });
    }

  onChangeTagCheckbox = ({ target: { id } }) => {
      const { tags} =  this.state;  //
      const clickedTag = tags.filter(tag => tag.tagName == id)
      if (clickedTag[0].active == true) return;
      const { newTags } = this.state;
      const updatedTags = tags.filter(tag => tag.tagName != id);
      const sortedTags = [...updatedTags, {tagName: id, active: true, filter: false} ].sort();
      this.setState({ newTags: [...newTags, {tagName: id, active: true, filter: false}], tags: sortedTags, });
  }

  addNewTag = () => {
    const { newTags } = this.state;
    const { tags} =  this.state;
    this.setState({ newTags: [...newTags, {tagName: this.state.newTag, active: true}], tags: [...tags, {tagName:this.state.newTag, active: true, filter: false}], newTag: ""  });
    }

  deleteNote = ({ target: { id } }) => {
    const { notes } = this.state;
    const newNotes = notes.filter(note => note.title != id);
    this.setState({ notes: newNotes})
  }

  editNote = () => {
    console.log("editing")
    console.log(this.state.activeNote.noteTags);
    const editedTags = this.state.activeNote.noteTags;
    const updatedTags = editedTags.map(tag => {
    return {tagName: tag, active: true}
    });
    this.setState({noteStatus: "editNote", newTitle: this.state.activeNote.title, newText: this.state.activeNote.text, newTags: updatedTags});
    const { tags} =  this.state;
    const mapTags = tags.map(tag => {
      let tagActivity = false;
      editedTags.forEach(etag => {
        console.log("tag ", tag.tagName, "etag ", etag)
        if (tag.tagName == etag){
        tagActivity = true;
        console.log(tag.tagName == etag)
        }
      });
      return {tagName: tag.tagName, active: tagActivity, filter: false}
    });
    console.log("map tags!", mapTags)
    this.setState({newTitle: this.state.activeNote.title, newText: this.state.activeNote.text, newTags: updatedTags, tags: mapTags});
  }

  tagAddClick = () => {
    this.setState({showChooseTag: "choose-tag choose-tag--active"})
  }

  addNoteClick = () => {
    this.setState({noteStatus: "addNote"})
  }

  render() {
      console.log("rendering App with this.state", this.state)
      let upperNote;
      if (this.state.noteStatus == "addNote") {
        upperNote = (
        <div className = "addNote">
          <AddNote onChangeTitle = {this.onChangeTitle} newTitle ={this.state.newTitle}
                                    onChangeText = {this.onChangeText} newText ={this.state.newText}
                                    onChangeTags = {this.onChangeTags} newTags ={this.state.newTags}
                                    onSubmitForm = {this.onSubmitForm}
                                    onChangeOneTag = {this.onChangeOneTag} newTag = {this.state.newTag}
                                    tags = {this.state.tags}
                                    onChangeTagCheckbox = {this.onChangeTagCheckbox}
                                    addNewTag =  {this.addNewTag}
                                    tagsForChoose = {this.state.tagsForChoose}
                                    tagAddClick = {this.tagAddClick}
                                    showChooseTag = {this.state.showChooseTag}
                                    />
        </div>)
      }

      else if (this.state.noteStatus == "editNote"){
        upperNote = (
        <div className = "edit"> <EditNote onChangeTitle = {this.onChangeTitle} newTitle ={this.state.newTitle}
                                  onChangeText = {this.onChangeText} newText ={this.state.newText}
                                  onChangeTags = {this.onChangeTags} newTags ={this.state.newTags}
                                  onSubmitForm = {this.onSubmitForm}
                                  onChangeOneTag = {this.onChangeOneTag} newTag = {this.state.newTag}
                                  tags = {this.state.tags}
                                  onChangeTagCheckbox = {this.onChangeTagCheckbox}
                                  addNewTag =  {this.addNewTag}
                                  activeNote = {this.state.activeNote}

                                  />
      </div> )
    } else {
      upperNote = (
        <div className = "addNoteBtn" onClick = {this.addNoteClick}>Take a note...</div>
      )}

    return (
      <div className="App">
        <header>
          <div className = "header"></div>
        </header>
        <div className = "container">
          <TagFilter tags = {this.state.tags} />
          <div className = "notes-field">
            {upperNote}
            <NoteCards notes = {this.state.notes} onChangeTitle = {this.onChangeTitle} newTitle ={this.state.newTitle}
                       editNote = {this.editNote} deleteNote = {this.deleteNote} />
          </div>
          {/*
          <div className="add">
            <AddNote onChangeTitle = {this.onChangeTitle} newTitle ={this.state.newTitle}
                                      onChangeText = {this.onChangeText} newText ={this.state.newText}
                                      onChangeTags = {this.onChangeTags} newTags ={this.state.newTags}
                                      onSubmitForm = {this.onSubmitForm}
                                      onChangeOneTag = {this.onChangeOneTag} newTag = {this.state.newTag}
                                      tags = {this.state.tags}
                                      onChangeTagCheckbox = {this.onChangeTagCheckbox}
                                      addNewTag =  {this.addNewTag}
                                      tagsForChoose = {this.state.tagsForChoose}
                                      />
          </div>
          <div className="edit">
            <EditNote onChangeTitle = {this.onChangeTitle} newTitle ={this.state.newTitle}
                                      onChangeText = {this.onChangeText} newText ={this.state.newText}
                                      onChangeTags = {this.onChangeTags} newTags ={this.state.newTags}
                                      onSubmitForm = {this.onSubmitForm}
                                      onChangeOneTag = {this.onChangeOneTag} newTag = {this.state.newTag}
                                      tags = {this.state.tags}
                                      onChangeTagCheckbox = {this.onChangeTagCheckbox}
                                      addNewTag =  {this.addNewTag}
                                      activeNote = {this.state.activeNote}
                                      />
          </div>
          */}
        </div>
      </div>
    );
  }
}

export default App;

class EditNote extends Component {

  render() {
    console.log()
    return(
      <div className="edit-note">
        <form action="" className="add-note_form"  onSubmit={this.props.onSubmitForm} >
          <div className="add-note_form-group">
            <input type="text" className="add-note_input-title" placeholder = {this.props.activeNote.title} value ={this.props.newTitle}  onChange={this.props.onChangeTitle}/>
            <textarea className="add-note_input-text" placeholder = {this.props.activeNote.text} value ={this.props.newText}  onChange={this.props.onChangeText}/>
            <div className="add-note_tags-block">
              Tags: {this.props.newTags.map(tag =>
              <span className="add-note_newtags-block"> {tag.tagName} </span>)}
            </div>
             <button type="Add Note" className="btn add-note_btn">edit</button>
             <ChooseTags onChangeOneTag = {this.props.onChangeOneTag} newTag = {this.props.newTag} tags = {this.props.tags}
                                          onChangeTagCheckbox = {this.props.onChangeTagCheckbox}
                                          addNewTag =  {this.props.addNewTag}  />
          </div>
        </form>
      </div>

    )}
  }



















/*
class TagFilter extends Component {
  render(){
    return(
      <div className = "tagsFilter">
        <ul className = "tagsFilter_list">
          {this.props.tags.map(tag =>
            <li className = "tagsFilter" key = {tag.tagName}>
              <input type = "checkbox" id={tag.tagName} className = "tagsFilter_checkbox " onChange = {this.props.onChange} checked = {tag.filter} />
              <label htmlFor = {tag.tagName} className = "tagsFilter_label">{tag.tagName}</label>
            </li>
            )}
        </ul>
      </div>
    )
  }
}

class NoteCards extends Component {
  render() {
    return(
    <div className = "notesContainer">
      {this.props.notes.map(note =>
        <div className="note" key = {note.title} onClick = {this.props.editNote} >
          <div className="note-tags">
              {note.noteTags.map(noteTag =>
                <span className="note-tag" key = {noteTag}> {noteTag} </span>)}
          </div>
          <h2 className="note-title">{note.title}</h2>
          <p className="note-text">{note.text}</p>
          <div className="note_btns">
            <button className="note_btn note_btn--delete" id = {note.title} onClick = {this.props.deleteNote}>delete</button>
          </div>
        </div>
      )}
    </div>

    )
  }
  }

  class AddNote extends Component {

    render() {
      //console.log("rendering addnote");
      //console.log("title", this.props.newTitle)
      //console.log('this.props.newTag', this.props.newTag)
      return(
        <div className="add-note">
          <form action="" className="add-note_form"  onSubmit={this.props.onSubmitForm} >
            <div className="add-note_form-group">
              <input type="text" className="add-note_input-title" placeholder = "Title" value ={this.props.newTitle}  onChange={this.props.onChangeTitle}/>
              <textarea className="add-note_input-text" placeholder = "My text..." value ={this.props.newText}  onChange={this.props.onChangeText}/>
              <div className="add-note_tags-block">
                Tags: {this.props.newTags.map(tag =>
                <span className="add-note_newtags-block"> {tag.tagName} </span>)}
              </div>
               <button type="Add Note" className="btn add-note_btn">add</button>
               <ChooseTags onChangeOneTag = {this.props.onChangeOneTag} newTag = {this.props.newTag} tags = {this.props.tags}
                                            onChangeTagCheckbox = {this.props.onChangeTagCheckbox}
                                            addNewTag =  {this.props.addNewTag}  tagsForChoose = {this.props.tagsForChoose}/>
            </div>
          </form>
        </div>

      )}
    }

    class ChooseTags extends Component {
      render() {
        //console.log('rendering choosetag')
        //console.log('this.props.tagsForChoose', this.props.tagsForChoose)
        return(
          <div className="choose-tags">
            <h3 className="choose-tags_title">Note Tags</h3>
            <input type="text" className="choose-tags_input-newtag" placeholder = "Type tag here" value ={this.props.newTag}  onChange={this.props.onChangeOneTag}/>
            <div className="choose-tags_newtag-plus" onClick = {this.props.addNewTag}>+ Add {this.props.newTag}</div>
            <div className="choose-tags_checkboxes">
              {this.props.tags.map(tag =>
                <li className = "choose-tags_list" key = {"choose-tags"+tag.tagName}>
                  <input type = "checkbox" id={tag.tagName} className = "choose-tags_checkbox " onChange = {this.props.onChangeTagCheckbox} checked = {tag.active} />
                  <label htmlFor = {tag.tagName} className = "choose-tags_label">{tag.tagName}</label>
                </li>
                )}
            </div>
          </div>
    )
  }
}

*/


/*
{this.props.tagsForChoose.map(tag =>
  <li className = "choose-tags_list" key = {"choose-tags"+tag.tagName}>
    <input type = "checkbox" id={tag.tagName} className = "choose-tags_checkbox " onChange = {this.props.onChangeTagCheckbox} checked = {tag.active} />
    <label htmlFor = {tag.tagName} className = "choose-tags_label">{tag.tagName}</label>
  </li>
)}*/
