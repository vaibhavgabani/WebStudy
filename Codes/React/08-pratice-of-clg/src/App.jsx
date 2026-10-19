import { useState } from "react";

let data = [
  {id:1,desc:"chat with kamo",status:true},
  {id:2,desc:"chat with ramo",status:true},
  {id:3,desc:"chat with dhamo",status:false},
]

const App = () =>{
  const [useId ,setUseID] = useState();
  const [useDesc ,setUseDesc] = useState();
  const [useData,SetUseData] = useState(data);


  const addData = () =>{
    console.log("sdfsdf");
    // console.log("add Data called : " + useId +  useDesc +  useState);
  }

  const changeStatusOfData = (id) =>{
    console.log("changeStatusOfData is called " + id);
    
    SetUseData(
      useData.map((item)=>
        item.id === id ? {...item , status:!item.status} : item
      )
    )
  }

  return(
    <>
      <div>
        insert : 
        <form>
            <input type="number" name="" id="" placeholder="Enter ID" value={useId} onChange={(e)=>setUseID(e.target.value)} />
            <input type="text" name="" id="" placeholder="Enter Desc" value={useDesc} onChange={(e)=>setUseDesc(e.target.value)}/>
            <input type="hidden" name="" value="true"/>
            <button onClick={()=>{addData()}}>Add Value</button>
        </form>
      </div>
      
      
      <div>
        <label>Display : </label>
        {useData.map((item)=>(
        <>
          <h3>{item.id},{item.desc}</h3>
          <button onClick={()=>changeStatusOfData(item.id)}>{item.status ? "Active" : "not active"}</button>
        </>
      ))}
      </div>
    </>
  );
}

export default App;