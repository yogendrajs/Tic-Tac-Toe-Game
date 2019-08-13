import React, { Component } from 'react'
import './App.css';

function Square(props) {
    return (
        <div>
            <button className="square" onClick= {() => props.onClick()}>
                {props.value}
            </button>
        </div>
    )
}


class Game extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             array: Array(9).fill(null),
             isXNext: true,
             count: 0,
        }
    }
    
    change(i){
        const array = this.state.array.slice();
        if (algo(array) || array[i]){
            return;
        }
        array[i] = this.state.isXNext ? 'X' : 'O';
        let count = this.state.count;

        // console.log(count);
        this.setState({
            array: array,
            isXNext: !this.state.isXNext,
            count: count+=1,
        })
    }

    rendersquare(i) {
        return (
            <Square value={this.state.array[i]} onClick={() => this.change(i)} />
        )
    }

    restart(){
        window.location.reload();
    }

    render() {
        const data = algo(this.state.array);
        var status;

        if (data !== null){
            status = `Winner: ${data}`;
            document.getElementById("restart").style.display = 'block';
        }else {
            if (this.state.count === 9){
                status = `Match Draw!`;
                document.getElementById("restart").style.display = 'block';
            }else {
                status = `Next Player: ${this.state.isXNext ? 'X' : 'O'}`;            
            }
        }

        return (
            <div>
                <div className= "status"> { status } </div>
                <div className= "personal">
                    {this.rendersquare(0)}
                    {this.rendersquare(1)}
                    {this.rendersquare(2)}
                </div>
                <div className= "personal">
                    {this.rendersquare(3)}
                    {this.rendersquare(4)}
                    {this.rendersquare(5)}
                </div>
                <div className= "personal">
                    {this.rendersquare(6)}
                    {this.rendersquare(7)}
                    {this.rendersquare(8)}
                </div>
                {/* <div> */}
                    <button id= "restart" onClick= {() => this.restart()}>
                        Restart
                    </button>
                {/* </div> */}
            </div>
        )
    }
}

function algo(array) {
    const winList = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]

    for (var i = 0; i < winList.length; i++){
        const [x, y, z] = winList[i];
        if (array[x] && array[x] === array[y] && array[x] === array[z]){
            return array[x];
        }
    }
    return null;
}

export default Game;