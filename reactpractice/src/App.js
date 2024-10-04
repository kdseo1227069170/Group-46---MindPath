import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import MainContent from './components/MainContent';
import TodoItem from './components/TodoItem'

function App() {
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

  return (
    <div className="todo-list">
      <Header />
      <TodoItem />
   
     
    
    </div>
  )
}
export default App 