import React ,{useState} from 'react'
import { Link } from 'react-router-dom'

const UserSignup = () => {
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [firstName, setfirstName] = useState('')
  const [lastName, setlastName] = useState('')
  const [userData, setuserData] = useState({})

  const submitHandler = (e) => {
    e.preventDefault();
      setuserData({
        fullName:{
          firstName:firstName,
          lastName:lastName
        },
        email:email,
        password:password
      })

      
      setemail('')
      setpassword('')
      setlastName('')
      setfirstName('')

   }
  return (
    <div className="p-7 h-screen flex flex-col justify-between">
    <div>
      <img className="w-16 mb-2" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png" alt="" />
      <form onSubmit={(e)=>
        submitHandler(e)
      }>

        <h3 className='text-lg font-medium mb-2'>What's your name</h3>
        <div className='flex gap-2 mb-5'>
        <input 
          className='bg-[#eeeeee] w-1/2  rounded px-4 py-2   text-lg placeholder:text-base '
         
          required type="text" 
          placeholder="First Name" 
          value={firstName}
          onChange={(e)=>setfirstName(e.target.value)}
        />
        <input 
          className='bg-[#eeeeee] w-1/2  rounded px-4 py-2   text-lg placeholder:text-base '
         
          required type="text" 
          placeholder="Last Name" 
          value={lastName}
          onChange={(e)=>setlastName(e.target.value)}
        />
        </div>


        <h3 className='text-lg font-medium mb-2'>What's your email</h3>
        <input 
          className='bg-[#eeeeee] mb-5 rounded px-4 py-2  w-full text-lg placeholder:text-base '
         
          required type="email" 
          placeholder="Email" 
          value={email}
          onChange={(e)=>setemail(e.target.value)}
        />
        <h3 className='text-lg font-medium mb-2'>Enter password</h3>
        <input 
          className='bg-[#eeeeee] mb-5 rounded px-4 py-2  w-full text-lg placeholder:text-base' 
         
          required type="password" 
          placeholder="Password" 
          value={password}
          onChange={(e)=>setpassword(e.target.value)}
        />
        <button className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2  w-full text-lg placeholder:text-base '>Login</button>
      </form>
      <p className='text-center'>Already have a account? <Link to={"/login"} className=' text-blue-600'>Login here</Link></p>
    </div>
    <div>
      <p className='text-[10px] leading-tight'>By proceeding, you consent to get calls, Whatsapp or SMS messages, including by automated means, from Uber and its affiliates to the number provided.</p>
    </div>
  </div>
  )
}

export default UserSignup