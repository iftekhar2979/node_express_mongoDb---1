import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [user,setUser]=useState([])
  useEffect(()=>{
    fetch('http://localhost:8000/users')
    .then(res=>res.json())
    .then(data=>{
      console.log(data)
      setUser(data)})
  },[])
  const handleSubmit=(e)=>{
    e.preventDefault()
    const form=e.target
    const name=form.name.value
    const email=form.email.value
    const users={name,email}
    ;
    fetch('http://localhost:8000/user', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(users)
    })
      .then(res => res.json())
      .then(data => {
        let newUser=[...users,data]
       setUser(newUser)
       console.log(user);
     
      })

  }
  return (
    <div className="App">
      <form action="" onSubmit={handleSubmit}>
        <input type="text" name='name' />
        <input type="text" name='email' />
        <button type='submit'>Submit</button>
      </form>
      <h2>length: {user.length}</h2>
      {
        user.map(item=><h2 key={item._id}>{item.name}</h2>)
      }
    </div>
  );
}

export default App;
