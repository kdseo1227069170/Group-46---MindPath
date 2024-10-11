import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import MainContent from './components/MainContent';
import TodoItem from './components/TodoItem'
import ContactCard from './components/ContactCard';
import todosData from './todosData';
import React, {Component} from 'react';

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
    name: "Sunny",
    age:26
  }
}

  render() {
    return (
      <div>
      <h1>{this.state.name}</h1>
      <h3>{this.state.age} years old</h3>

      </div>
    )
    }
  }

export default App 