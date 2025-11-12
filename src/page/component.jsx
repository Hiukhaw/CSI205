import React, { useState } from 'react'
import RedixCounter from "../component/RedixCounter"
import Value from "../component/Value"
import Timer from "../component/Timer"
import Adder from "../component/Adder"
import Temperature from "../component/temperature"

const component = () => {
      const[counter,setCounter] = useState(0)
      
    return ( 
    <>
    <h1>Component page</h1>
    <div className='d-flex justify-content-center align-items-center border border-2 border-dark rounded-3 p-3 mb-5' style={{ backgroundImage: 'url("src/img/mamom.png")',backgroundSize: 'cover',
    backgroundPosition: 'center',
    flexDirection: 'column' }}>
    
    <div className='d-flex' style={{  gap: '20px' }}>
      <div>
        <Value name={'COUNTER'} value={counter} setValue={setCounter} />
        <Timer />
      </div>
      <div>
        <RedixCounter />
        <Adder name={'ADDER'} />
      </div>
      
    </div>

    <Temperature name="Temperature" />
    </div>  
    </> 
    );
}
 
export default component;