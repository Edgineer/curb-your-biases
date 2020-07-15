import React from "react";
import './index.css';

var frenchWords = require("../french.json");

class Session extends React.Component {
  constructor(props){
    super(props);
    this.state= { 
      numWords: 0,
      randWords: [],
      isClicked: []
    }
    this.reset = this.reset.bind(this);
    this.mouseClick = this.mouseClick.bind(this);
  }

  reset () {
    var num = Math.floor(Math.random() * (5 - 2)) + 2;
    var initHover = Array(num).fill(false);
    var newWords = [];
    for (let i = 0; i < num; i++) {
      var randWord = frenchWords[Math.floor(Math.random()*frenchWords.length)];
      newWords.push({"word": randWord.word, "translation": randWord.translation});
    }
    this.setState(() => {
      return { 
        numWords: num,
        randWords: [...newWords],
        isClicked: [...initHover]
      }
    });
  }

  componentDidMount() {
    this.reset();
  }

  mouseClick(index) {
    this.setState((state) => {
      const isClicked = state.isClicked.map((item,i) => {
        if (index === i) {return !item;}
        else {return item;}
      });
      console.log(this.state.isClicked);
      return {isClicked};
    });
  }

  render() {
    const randWordList = this.state.randWords.map((randWord, i) =>(
      <li>
        <button onClick={() => this.mouseClick(i)}>
          {this.state.isClicked[i] ? randWord.translation : randWord.word}
        </button>
      </li>
    ));
    return (
    <>
      <h1>Mumbo Jumbo!</h1>
      <p> Create a sentence that contains the following words:</p>
      <ul>{randWordList}</ul>
      <textarea placeholder="Be creative!" />
      <button id="submit" onClick={this.reset}>Submit!</button>
      <hr />
      <span>
        <p className="footer">Created by Edgineer</p>
        <p className="footer">Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a></p>
      </span>
    </>
    );
  }
}

export default Session;