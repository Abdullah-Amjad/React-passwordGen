import { useState,useCallback,useEffect ,useRef} from 'react'
  
import './App.css'

function App() {
  const [lenght, setLength] = useState(8)
  const [numberallowed, setnumberallowed] = useState(false)
  const [characterallowed, setcharacterallowed] = useState(false)
  const [Password ,setPassword] = useState("")

  const passref=useRef(null)

  const  passwordgenerator= useCallback(()=>{
    let pass =""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numberallowed)  str +="0123456789"
    
    if (characterallowed)  str +="[]+*/-@#%%^&*()_!~"

for (let i = 1; i <= lenght; i++) {
  
  let char = Math.floor(Math.random() * str.length + 1) 
  pass +=str.charAt(char)
  
}

  setPassword(pass)

  },[lenght,numberallowed,characterallowed,setPassword])
 

  useEffect(()=>{
    passwordgenerator()
  },[lenght,numberallowed,characterallowed,passwordgenerator])


  const copytoclip = useCallback(()=>{
    passref.current?.select()
    window.navigator.clipboard.writeText(Password)
  },[Password])

  return (
    <>
    <div className='d-flex p-3 text-light tex-center align-items-center justify-content-center'>
      <div className='d-block text-center'>
        
    <h1>Password Generator</h1>
    <div className='bg-white rounded text-dark p-3 d-grid gap-3 '>

       <div className='d-flex justify-content-center '>
       <input type="text" value={Password} readOnly className='w-75 form-control' ref={passref}/>
       <button className='btn btn-primary' onClick={copytoclip}>Copy</button>
       </div>

       <div className='d-flex align-items-center gap-3'>
        <input type="range" min={8} max={30} value={lenght} onChange={(e)=>{setLength(e.target.value)}}/>
        <label htmlFor="">Length {lenght}</label>
        <input type="checkbox" defaultChecked={numberallowed} onChange={()=>{
          setnumberallowed((prev) => !prev);
          }} />
        <label htmlFor="">Numbers allowed</label>
        <input type="checkbox" defaultChecked={characterallowed} onChange={()=>{
          setcharacterallowed((prev) => !prev);
          }} />
        <label htmlFor="">character allowed</label>
       </div>

    </div>


      </div>

  
    </div>
    </>
  )
}

export default App
