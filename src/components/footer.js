import React from "react";
import '../index.css';
import { connect } from 'react-redux';
import { enterSettings } from "../actions";

class Footer extends React.Component {
  constructor(props) { 
    super(props);
    
    this.openSettings = this.openSettings.bind(this);
  }

  openSettings () {this.props.dispatch(enterSettings());}

  render() {
    return(
      <>
        <div className="footer">
          <p>Created by Edgineer</p>
          <a onClick={this.openSettings}>Settings</a>
        </div>
        <p className="mentions">Sentences checked by <a href="https://languagetool.org/" title="Language Tool">Language Tool</a></p>
        <p className="mentions">Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a></p>
      </>
    )
  }
}

//Here to access dispatch for resetLanguage, maybe not required?
const mapStateToProps = (state) => ({})
export default connect(mapStateToProps)(Footer);
