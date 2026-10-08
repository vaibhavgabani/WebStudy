// import React from 'react'
import Employee from './components/Empoloyee'
import Address from './components/Address'
import './App.css'

const App = () =>{
  const obj23 = {
    id: 1,
    name: "John Doe"
  };

  const obj1 = [10,20,30,40,50,60,70,80,90,100];

  return (
    <>
      <>
      <Employee id={obj23.id} name={obj23.name} />
      <Address address="123 Main St" city="Anytown" state="CA" zip="12345" />
      <>
        <div>{Date().toString()}</div>
        </>
    </>
    <>
      <ul>
        {obj1.map((value) => (
          <li>{value * 2}</li>
        ))}
      </ul>
    </>
    </>
  )
}

export default App;