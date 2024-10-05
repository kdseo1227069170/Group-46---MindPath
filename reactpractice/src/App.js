import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import MainContent from './components/MainContent';
import TodoItem from './components/TodoItem'
import ContactCard from './components/ContactCard';
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
      <ContactCard 
      contact={{name: "Software Developer",
      imgURL: "https://st3.depositphotos.com/5392356/13703/i/1600/depositphotos_137037020-stock-photo-professional-software-developer-working-in.jpg",
      phone: "555-555-555",
      email:"example@gmail.com"}}
      />
      <ContactCard 
      contact={{name: "Software Developer2",
      imgURL: "https://st3.depositphotos.com/5392356/13703/i/1600/depositphotos_137037020-stock-photo-professional-software-developer-working-in.jpg",
      phone: "777-777-7777",
      email:"example2@gmail.com"}}
      />
     
    
    </div>
  )
}
export default App 