import React from "react";
import './index.css';

var frenchWords = require("../french.json");

class Session extends React.Component {
  constructor(props){
    super(props);
    this.state= { 
      numWords: 0,
      words: [],
      hover: []
    }
    this.reset = this.reset.bind(this);
    this.mouseChange = this.mouseChange.bind(this);
  }

  reset () {
    var newNum = Math.floor(Math.random() * (5 - 2)) + 2;
    var initHover = Array(newNum).fill(false);
    var newWords = [];
    for (let index = 0; index < newNum; index++) {
      var randomWord = frenchWords[Math.floor(Math.random()*frenchWords.length)];
      newWords.push({"word": randomWord.word, "translation": randomWord.translation});
    }
    console.log(newWords);
    this.setState(() => {
      return { 
        numWords: newNum,
        words: [...this.state.words, ...newWords],
        hover: [...this.state.hover, ...initHover]
      }
    });
  }

  componentDidMount() {
    this.reset();
  }

  mouseChange(index) {
    this.setState((state) => {
      const hover = state.hover.map((item,i) => {
        if (index === i) {return !item;}
        else {return item;}
      });
      console.log(this.state.hover);
      return {hover};
    });
  }

  render() {
    const wordList = this.state.words.map((word, index) =>(
      <li>
        <button onClick={() => this.mouseChange(index)}>
          {this.state.hover[index] ? word.translation : word.word}
        </button>
      </li>
    ));
    return (
    <>
      <h1>Mumbo Jumbo!</h1>
      <p> Create a sentence that contains the following words:</p>
      <ul>{wordList}</ul>
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