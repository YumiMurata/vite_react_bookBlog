import React from "react";

import ReactDOM from "react-dom";
import ContentEditable from "react-contenteditable";
import sanitizeHtml from "sanitize-html";

import styles from './Editable.module.css'

class Editable extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        html: props.value || "",
        editable: true
      };
    }
    handleKeyDown = (event) => {
      if (event.key === "Enter") {
        event.preventDefault(); // Prevent default new paragraph behavior
        document.execCommand("insertHTML", false, "<br><br>"); // Inserts a <br>
      }
    };

    handleChange = (evt) => {
        const sanitizedHtml = sanitizeHtml(evt.target.value, this.sanitizeConf);
        this.setState({ html: sanitizedHtml });
        this.props.onChange(sanitizedHtml); // Send sanitized value to parent
    };
    handleFontSizeChange = (size) => {
        const selection = window.getSelection();
        const range = selection.getRangeAt(0); // Get the selected range
        const newElement = document.createElement('span'); // Create a temporary span element
        newElement.style.fontSize = size; // Set the custom font size (e.g., "20px", "1.5em", etc.)
        
        // Wrap the selected text with the new element
        range.surroundContents(newElement);
      };
    sanitizeConf = {
      allowedTags: ["b", "i", "em", "strong", "a", "p", "h1","h2","h3","li", "ul","br"],
      allowedAttributes: { a: ["href"] }
    };
  
    sanitize = () => {
      this.setState({ html: sanitizeHtml(this.state.html, this.sanitizeConf) });
    };
  
    toggleEditable = () => {
      this.setState({ editable: !this.state.editable });
    };
  
    render = () => {
      return (
        <div>
          <h3 className={styles.editableTitle}>Book Review</h3>
          <EditButton cmd="italic" />
          <EditButton cmd="bold" />
          <EditButton cmd="formatBlock" arg="h3" name="Title" />
          <EditButton cmd="formatBlock" arg="p" name="Paragraph" />
          <p>Click on Cntrl + Enter to write on a new line</p>
          <ContentEditable
            className={styles.editable}
            tagName="div"
            html={this.props.value} // innerHTML of the editable div
            disabled={false} // use true to disable edition
            onChange={this.handleChange} // handle innerHTML change
            onBlur={this.sanitize}
            onKeyDown={this.handleKeyDown} // Attach event listener

          />



        </div>
      );
    };
  }
  function EditButton(props) {
    return (
      <button
        type="button"
        key={props.cmd}
        onMouseDown={evt => {
          evt.preventDefault(); // Avoids loosing focus from the editable area
          document.execCommand(props.cmd, false, props.arg); // Send the command to the browser
        }}
      >
        {props.name || props.cmd}
      </button>
    );
  }


  export default Editable
  
