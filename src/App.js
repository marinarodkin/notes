import React, { Component } from 'react';

import './App.css';

class App extends Component {
  state = {notes: [{title: "first note",
                 noteTags: ["receipt", "privat", "work"],
                 text: "my text"},
                 {title: "second note",
                 noteTags: ["receipt", "privat", "books"],
                 text: "my text"}
               ],
         tags: [{tagName: "receipt", active: false},
                {tagName: "privat", active: false},
                {tagName: "work", active: false},
                 {tagName: "books", active: false}],
        newTitle: "",
        newText: "",
        newTags: [],
        newTag: "",
        startFindTag: 0,
        tagsForChoose: [{tagName: "receipt", active: false},
               {tagName: "privat", active: false},
               {tagName: "work", active: false},
                {tagName: "books", active: false}],
               };
  //startFindTag - index helps if had #tags before cut off piece with previous tags from beginning
  // tagsForChoose - array with tags to choose during creating newNote

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
      const { tags} =  this.state;
      const {tagsForChoose} = this.state;
      const {newText} = this.state;
      const newTagsForChoose = [...tagsForChoose, {tagName: tagFromText, active: true}];
      const newStartFindTag = newText.length; // cut off piece with previous tags from beginning
      this.setState({ newText: value, newTags: [...newTags, {newTagName: tagFromText, active: true}],
                      tags: [...tags, {tagName: tagFromText, active: false}], tagsForChoose: newTagsForChoose,
                      newTag: "", startFindTag: newStartFindTag  });
      }

  }

  onSubmitForm = (e) => {
    e.preventDefault();
    const { notes } = this.state;
    const {newTags} = this.state;
    const {tags} = this.state;
    const newNoteTags = newTags.map(tag => tag.newTagName);
    const newNote = {title: this.state.newTitle, noteTags: newNoteTags, text: this.state.newText };
    this.setState({ newTitle: "", newText: "", newTags: [], notes: [...notes, newNote], tagsForChoose: tags });

  }
  onChangeOneTag = ({ target: { value } }) => {
    this.setState({ newTag: value });
  }

  onChangeTagCheckbox = ({ target: { id } }) => {
      const { newTags } = this.state;
      this.setState({ newTags: [...newTags, {newTagName:id, active: true}] });
      const {tagsForChoose} = this.state;
      const newTagsForChoose = tagsForChoose.filter(tag => tag.tagName !== id)
      this.setState({ tagsForChoose: [...newTagsForChoose, {tagName: id, active: true}] })

  }

  addNewTag = () => {
    const { newTags } = this.state;
    const { tags} =  this.state;
    const {tagsForChoose} = this.state;
    const newTagsForChoose = [...tagsForChoose, {tagName: this.state.newTag, active: true}];
    this.setState({ newTags: [...newTags, {newTagName: this.state.newTag, active: true}], tags: [...tags, {tagName:this.state.newTag, active: false}], tagsForChoose: newTagsForChoose, newTag: ""  });
    }

  render() {
      console.log("rendering App with this.state", this.state)

    return (
      <div className="App">
        <header>
          <div className = "header"></div>
        </header>
        <div className = "container">
          <TagFilter tags = {this.state.tags} />
          <div className = "right-side">
            <div className = "addNoteBtn"></div>
            <NoteCards notes = {this.state.notes} onChangeTitle = {this.onChangeTitle} newTitle ={this.state.newTitle}/>
          </div>
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

        </div>
      </div>
    );
  }
}


export default App;

class TagFilter extends Component {
  render(){
    return(
      <div className = "tagsFilter">
        <ul className = "tagsFilter_list">
          {this.props.tags.map(tag =>
            <li className = "tagsFilter" key = {tag.tagName}>
              <input type = "checkbox" id={tag.tagName} className = "tagsFilter_checkbox " onChange = {this.props.onChange} checked = {tag.active} />
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
        <div className="note" key = {note.title}>
          <div className="note-tags">
              {note.noteTags.map(noteTag =>
                <span className="note-tag" key = {noteTag}> {noteTag} </span>)}
          </div>
          <h2 className="note-title">{note.title}</h2>
          <p className="note-text">{note.text}</p>
          <div className="note_btns">
            <button className="note_btn note_btn--edit">Edit</button>
            <button className="note_btn note_btn--delete">delete</button>
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
                <span className="add-note_newtags-block"> {tag.newTagName} </span>)}
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
              {this.props.tagsForChoose.map(tag =>
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
