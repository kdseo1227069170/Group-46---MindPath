import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import MainContent from './components/MainContent';
import TodoItem from './components/TodoItem'
import ContactCard from './components/ContactCard';
import todosData from './todosData';
import React, {Component} from 'react';


function handleMouseOver() {
  console.log("I was clicked");
}

class App extends Component {
  // const date = new Date()
  // const hours =date.getHours()
  // let timeOfDay

  // const styles = {
  //   color: "#FF8C00",
  //   backgroundColor:"ff5733",
  //   fontSize : "200px"

  // }

  // if (hours<12){
  //   timeOfDay = "morning"
  //   styles.color = "#000000"
  // } else if (hours >12 && hours <17) {
  //   timeOfDay = "afternoon"
  //    styles.color = "#000000"
  //     styles.fontSize = "100px"
  // } else {
  //   timeOfDay = "night"
  // }

// const todoItems = todosData.map(item=> <TodoItem key={item.id} item={item}/>)

constructor () {
  super()
  this.state = {
    count:0
  }
  this.handleClick = this.handleClick.bind(this)
  this.handleMultiply = this.handleMultiply.bind(this)
  this.handleDivisionByTwo = this.handleDivisionByTwo.bind(this)
}
handleClick() {
  this.setState(prevState => {
    return {
      count : prevState.count + 1
    }
  })
}
handleMultiply() {
  this.setState(prevState => {
    return {
      count :prevState.count * 2
    }
  })
}
handleDivisionByTwo() {
  this.setState(prevState => {
    return {
      count : prevState.count /2
    }
  })
}

  render() {
    // let wordDisplay;
    // if (this.state.isLoggedIn ===true) {
    //   wordDisplay = "in"

    // } else {
    //   wordDisplay = "out"
    // }
    // const todoItems = this.state.todos.map(item=> <TodoItem key={item.id} item={item}/>)
    return (
      <div>
        {/* <img onMouseOver={() => console.log("Hovered")} src="https://www.wwe.com/f/styles/talent_champion_lg/public/all/2024/03/The_Rock_PROFILE--927b15797eefad54a3bca4d2a15e4921.png" alt="The Rock" />
        <br />
        <br />
        <button onMouseOver ={handleMouseOver}>Click Me</button> */}
        <h1>{this.state.count}</h1>
        <button onClick={this.handleClick}>Change!</button>
        <button onClick={this.handleMultiply}>Multiply By 2!</button>
        <button onClick={this.handleDivisionByTwo}>Divide By 2!</button>
      </div>
   
    
 
    )
    }
  }

export default App 