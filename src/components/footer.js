import React from "react";
import '../index.css';
import { connect } from 'react-redux';
import { resetLanguage } from "../actions";

class Footer extends React.Component {
  constructor(props) { 
    super(props);
    
    this.changeLanguage = this.changeLanguage.bind(this);
  }

  changeLanguage() {
    localStorage.removeItem("language");
    localStorage.removeItem("voice");
    localStorage.removeItem("numWords");
    localStorage.removeItem("userInput");
    localStorage.removeItem("randWords");
    
    this.props.dispatch(resetLanguage());
  }

  render() {
    return(
      <>
        <div className="footer">
          <p>Created by Edgineer</p>
          <a onClick={this.changeLanguage}>Change Language</a>
        </div>
        <p className="mentions">Sentences checked by <a href="https://languagetool.org/" title="Language Tool">Language Tool</a></p>
        <p className="mentions">Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a></p>
      </>
    )
  }
}

export default connect(mapStateToProps)(Footer);
