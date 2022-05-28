import React, { Component } from 'react';
import '../styles/hangman.css';
import { randomWord } from './words.js';
import { FaSadTear } from 'react-icons/fa'
import { BiHappyBeaming } from 'react-icons/bi'

import try0 from '../images/0.jpeg'; 
import try1 from '../images/1.jpeg'; 
import try2 from '../images/2.jpeg'; 
import try3 from '../images/3.jpeg'; 
import try4 from '../images/4.jpeg'; 
import try5 from '../images/5.jpeg'; 
import try6 from '../images/6.jpeg'; 

class Hangman extends Component {
    static defaultProps = {
        maxWrong : 6, 
        images : [try0, try1, try2, try3, try4, try5, try6]
    }

    constructor (props) {
        super(props);
        this.state = {
            mistake: 0, // Number of wrong guesses
            guessed: new Set([]), // New array to store the incorrect and correct guesses
            answer : randomWord(), // A function called from word.js (choose a random word from the array)
        }
    }

    // Functions to be called in return ()  
    guessedWord() {
        return this.state.answer.split("").map(letter => (this.state.guessed.has(letter) ? letter : " _ ")); 
    }

    generateButtons() {
        return "abcdefghijklmnopqrstuvwxyz".split("").map(letter => (
          <button
            class='btn letterButtons m-2'
            key={letter}
            value={letter}
            onClick={this.handleGuess}
            disabled={this.state.guessed.has(letter)}
          >
            {letter}
          </button>
        ));
    }

    handleGuess=e=> {
        let letter = e.target.value;
        this.setState( st => ({
            guessed: st.guessed.add(letter), 
            mistake: st.mistake + (st.answer.includes (letter) ? 0 : 1)
        })); 
    }
    
    nextButton = () => { 
        this.setState({
            mistake: 0, 
            guessed: new Set([]),
            answer: randomWord()
        });
    }

    // Rendering to display on 
    render () {
        
        const gameOver = this.state.mistake >= this.props.maxWrong;
        const isWinner = this.guessedWord().join("") === this.state.answer;
        const win = <p className="win">You won!!! <BiHappyBeaming size="30px"/></p>
        const lose = <p className="lose">Better luck next time! <FaSadTear size="30px"/></p>
        let gameStat = this.generateButtons(); 
        
        if (isWinner) {
            gameStat = win
        }

        if (gameOver) {
            gameStat = lose
        }

        return (
            <body>
                <div className="Hangman container">
                    <h1 className="text-center">Hangman</h1>
     
                    <div className="NumWrongGuesses">
                        Wrong Guesses: {this.state.mistake} of {this.props.maxWrong} 
                    </div>
                    <div>
                        <img class="hangmanFigure" src={this.props.images[this.state.mistake]} alt=""/>
                    </div>
                    <br></br>
                    <div className="text-center">
                        <p className="subtitle">Guess the Programming Language: </p>
                        <p className="randomWord">
                            {!gameOver ? this.guessedWord(): this.state.answer}
                        </p>
                        <p> {gameStat}</p>   
                        <button className="nextButton" onClick={this.nextButton}>Next Round</button>
                    </div>
                </div>
            </body>

        )
    }
}

export default Hangman; 
