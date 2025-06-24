import React,{useState} from 'react'
import { collection,addDoc } from 'firebase/firestore'
import { db } from '../utils/firebase'




const Todolist = () => {
const [form ,setForm] = useState({})

const handleChange =(e)=>{
  const {name,value } = e.target
  setForm({
    ...form,
    [name]:value
  })
}

const handleAdd = async()=>{
  await addDoc(collection(db,'user'),form)
  .then((res)=>{
    console.log(res)
  })
  .catch(err=>console.log(err))
}

console.log(form)
  return (
    <div className='mx-4'>
      <div className='mx-auto my-2 flex gap-2'>
      <input
      name='name'
      type='text'
      placeholder='name'
      onChange={handleChange}
      className="border-1"
      />
      <input
      name='lasname'
      type='text'
      placeholder='lasname'
      onChange={handleChange}
      className="border-1"
      />
      <input
      name='age'
      type='number'
      placeholder='age'
      onChange={handleChange}
      className="border-1"
      />
      <button 
      className='bg-blue-400 rounded px-2 py-1'
      onClick={handleAdd}>Button</button>
    </div>
    </div>
  )
}

export default Todolist
