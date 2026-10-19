import './App.css'
import Card from './components/Card';

const App = () =>{
  return(
    <>
      <Card User = "John Doe" Age ={30} Image="https://images.unsplash.com/photo-1783615693285-83b2017529b5?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/>
      <Card User = "Vinod Gogo" Age ={21} Image="https://images.unsplash.com/photo-1726654368654-52c5033b1239?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/>
    </>
  )
}

export default App;