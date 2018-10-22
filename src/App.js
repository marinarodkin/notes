 import React, { Component } from 'react';
import AddNote from "./Components/AddNote";
import NoteCards from "./Components/NoteCards";
import TagFilter from "./Components/TagFilter";
import ChooseTags  from "./Components/ChooseTag";
import CreateTag  from "./Components/CreateTag";
import './App.scss';


class App extends Component {
  state = {notes: [{title: "first note",
                 noteTags: ["receipt", "privat", "work"],
                 text: "my text"},
                 {title: "second note",
                 noteTags: ["receipt", "privat", "books"],
                 text: "my text"}
               ],

                activeTag: "all",
         tags: [{tagName: "receipt", active: false, filter: false},
                {tagName: "privat", active: false, filter: false},
                {tagName: "work", active: false, filter: false},
                 {tagName: "books", active: false, filter: false}],
        newTitle: "",
        newText: "",
        newTags: [],
        newTag: "",
        startFindTag: 0,
        tagChange: false,
        noteStatus: "allNotes",
        showChooseTag: "choose-tag choose-tag--hidden",
        activeNote: {title: "first note",
                       noteTags: ["receipt", "privat", "work"],
                       text: "active note my text"} }
  //startFindTag - index helps if had #tags before cut off piece with previous tags from beginning
  compareTags = (a, b) => {
    if (a.tagName > b.tagName) return 1;
    if (a.tagName < b.tagName) return -1;
  }


  showCreateTag = () => {
    this.setState({tagChange: !this.state.tagChange})
  }

  onClickTagFilter = ({target: {id}}) => {
    console.log("click");
    //const { notes} =  this.state;
    //let newSortedNotes;
    if (this.state.noteStatus == "addNote" || this.state.noteStatus == "allNotes"){
      this.setState({activeTag: id, newTags: [{tagName: id, active: true}]})
    } else {
    this.setState({activeTag: id})
  }
}

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
    console.log("blur")
    e.preventDefault();
    const { notes } = this.state;
    const {newTags} = this.state;
    const {tags} = this.state;
    const newNoteTags = newTags.map(tag => tag.tagName);
    const newNote = {title: this.state.newTitle, noteTags: newNoteTags, text: this.state.newText };
    const updatedTags = tags.map(tag => ({tagName: tag.tagName, active: false, filter: tag.filter}))
    let contentForNewTags = [];
    if (this.state.activeTag != "all"){
      contentForNewTags = [{tagName: this.state.activeTag, active: true}]
    }
    this.setState({ newTitle: "", newText: "", newTags: contentForNewTags, notes: [...notes, newNote], tags: updatedTags, noteStatus: "allNotes", });
    }

    onChangeOneTag = ({ target: { value } }) => {
      if (this.state.newTag.length > 20) return;
      this.setState({ newTag: value });
    }



  onChangeTagCheckbox = (e) => {
      e.stopPropagation()

      let sortedTags;
      const id = e.target.id.substring(3);
      const { tags} =  this.state;  //
      const clickedTag = tags.filter(tag => tag.tagName == id) //define clicked tag
      const { newTags } = this.state;
      const updatedTags = tags.filter(tag => tag.tagName != id); //cut clicked tag of tags arr in state
      if (clickedTag[0].active == true) {
        sortedTags = [...updatedTags, {tagName: id, active: false, filter: false} ].sort(this.compareTags);

        const updatedNewTags = newTags.filter(tag => tag.tagName != id); //cut clicked tag of Newtags arr in state
        this.setState({ newTags: [...updatedNewTags], tags: sortedTags, });
      } else {
        sortedTags = [...updatedTags, {tagName: id, active: true, filter: false} ].sort(this.compareTags);;
        this.setState({ newTags: [...newTags, {tagName: id, active: true, filter: false}], tags: sortedTags, });
        }
  }

  addNewTag = () => {
    console.log("this.state.newTag ",  this.state.newTag);
    if (this.state.newTag == "") return;
    const { newTags } = this.state;
    const { tags} =  this.state;
    this.setState({ newTags: [...newTags, {tagName: this.state.newTag, active: true}], tags: [...tags, {tagName:this.state.newTag, active: true, filter: false}], newTag: ""  });
    }

  deleteNote = (e) => {
    e.stopPropagation()
    const id = e.target.id;
    const { notes } = this.state;
    const newNotes = notes.filter(note => note.title != id);
    this.setState({ notes: newNotes})
  }



  editNote = ({ target}) => {
    const id = target.parentNode.id;
    console.log(target.parentNode.id);
    const { notes } = this.state;
    const editedNote = notes.filter(note => note.title == id)[0]; //
    console.log("id =", id, "editedNote", editedNote);
    const restNotes = notes.filter(note => note.title !== id);
    const editedTags = editedNote.noteTags;
    const updatedTags = editedTags.map(tag => {
    return {tagName: tag, active: true}
    });
    this.setState({noteStatus: "editNote", newTitle: editedNote.title, newText: editedNote.text, newTags: updatedTags, notes: restNotes});
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
    this.setState({newTitle: editedNote.title, newText: editedNote.text, newTags: updatedTags, tags: mapTags});
  }

  deleteEditedNote = () => {
    const id = this.state.activeNote.title;
    const { notes } = this.state;
    const newNotes = notes.filter(note => note.title != id);
    this.setState({ notes: newNotes, noteStatus: "allNotes"})
  }

  tagAddClick = () => {
    this.setState({showChooseTag: "choose-tag choose-tag--active"})
  }

  addNoteClick = () => {
    this.setState({noteStatus: "addNote"})
  }

  onClickHideChooseTag = (e) => {
    e.preventDefault();
    this.setState({showChooseTag: "choose-tag choose-tag--hidden"})
  }

  onFocusTag = ( {target } ) => {
    console.log("onFocus");
    const newTagContent = target.id + target.value
  this.setState({ newTag: newTagContent });
  }

  onSumbmitCreateTag = (e) => {
    e.preventDefault();
    const { tags} =  this.state;
    this.setState({ tags: [...tags, {tagName:this.state.newTag, active: true, filter: false}], newTag: ""  });
    }




  editTag = ( {target } ) => {
    if (this.state.newTag == ""){
      const newTagContent = target.id + target.value
    this.setState({ newTag: newTagContent });
    return
  } else {
    console.log("editingTag");
    //if (this.state.newTag == "") return;if (this.state.newTag.length > 20) return;
    this.setState({ newTag: target.value });
    //console.log(id);
    const { tags} =  this.state;
    //this.setState({ newTag: id });
    }
  }

  render() {

      console.log("rendering App with this.state", this.state)
      let upperNote;
      if (this.state.noteStatus == "addNote") {
        upperNote = (
        <div className = "add-note_up">
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
                                    onClickHideChooseTag = {this.onClickHideChooseTag}
                                    noteStatus = {this.state.noteStatus}
                                    activeTag = {this.state.activeTag}

                                    />
        </div>)
      }

      else if (this.state.noteStatus === "editNote"){
        upperNote = (
        <div className = "add-note_up add-note_up--edit">

           <AddNote onChangeTitle = {this.onChangeTitle} newTitle ={this.state.newTitle}
                                  onChangeText = {this.onChangeText} newText ={this.state.newText}
                                  onChangeTags = {this.onChangeTags} newTags ={this.state.newTags}
                                  onSubmitForm = {this.onSubmitForm}
                                  onChangeOneTag = {this.onChangeOneTag} newTag = {this.state.newTag}
                                  tags = {this.state.tags}
                                  onChangeTagCheckbox = {this.onChangeTagCheckbox}
                                  addNewTag =  {this.addNewTag}
                                  activeNote = {this.state.activeNote}
                                  tagAddClick = {this.tagAddClick}
                                  onClickHideChooseTag = {this.onClickHideChooseTag}
                                  showChooseTag = {this.state.showChooseTag}
                                  deleteEditedNote = {this.deleteEditedNote}
                                  maskClass = "add-note_edit-mask"

            />
      </div> )
    } else {
      upperNote = (
        <div className = "add-note_short" onClick = {this.addNoteClick}>
            <textarea className="add-note_input-text add-note_input-text--short" placeholder = "Take a note..." disabled value ={this.props.newText}  onChange={this.props.onChangeText}/>
          </div>
      )}


    return (
      <div className="App">
        <header>
          <div className = "header">
            <div className="app-logo">Text Notes</div>
          </div>
        </header>
        <div className = "app-container">
          <TagFilter tags = {this.state.tags} showCreateTag = {this.showCreateTag} onClickTagFilter = {this.onClickTagFilter} activeTag = {this.state.activeTag}/>
          <div className = "notes-field">
            {upperNote}
            <NoteCards notes = {this.state.notes} onChangeTitle = {this.onChangeTitle} newTitle ={this.state.newTitle}
                       editNote = {this.editNote} deleteNote = {this.deleteNote} activeTag = {this.state.activeTag} />
          </div>
          {this.state.tagChange === false ? null :
          <CreateTag newTag = {this.props.newTag} onChangeOneTag = {this.onChangeOneTag} addNewTag = {this.addNewTag} tags = {this.state.tags}
                               showCreateTag = {this.showCreateTag} editTag = {this.editTag} onFocusTag = {this.OnFocusTag}
                             onSumbmitCreateTag ={this.onSumbmitCreateTag} />
          }

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
