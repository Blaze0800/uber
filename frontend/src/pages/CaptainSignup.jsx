import React ,{useState,useContext} from 'react'
import { Link } from 'react-router-dom'
import {CaptainDataContext} from '../context/captainContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'



const CaptainSignup = () => {

    const navigate = useNavigate()
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [firstName, setfirstName] = useState('')
    const [lastName, setlastName] = useState('')
    const [vehicleColor, setVehicleColor] = useState('')
    const [vehiclePlate, setVehiclePlate] = useState('')
    const [vehicleCapacity, setVehicleCapacity] = useState('')
    const [vehicleType, setVehicleType] = useState('')




    const {captain,setCaptain} = React.useContext(CaptainDataContext)
  
    const submitHandler = async(e) => {
      e.preventDefault()
       const captainData = {
          fullname:{
            firstname:firstName,
            lastname:lastName
          },
          email:email,
          password:password,
          vehicle:{
            color:vehicleColor,
            plate:vehiclePlate,
            capacity:vehicleCapacity,
            vehicleType:vehicleType
          }
        }
  
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData)

      if(response.status === 201){
        const data = response.data
        setCaptain(data.captain)
        localStorage.setItem('token',data.token)
        navigate('/captain-home')
      }
        
      
      setemail('')
        setpassword('')
        setlastName('')
        setfirstName('')
        setVehicleColor('')
        setVehiclePlate('')
        setVehicleCapacity('')
        setVehicleType('')
  
     }
  return (
    <div className="p-7 h-screen flex flex-col justify-between">
        <div>
          <img className="w-16 mb-2" src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="" />
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

            <h3 className='text-lg font-medium mb-2'>Vehicle Details</h3>
            <div className='flex gap-2 mb-5'>
              <input 
                className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 text-lg placeholder:text-base'
                required type="text" 
                placeholder="Vehicle Color" 
                value={vehicleColor}
                onChange={(e)=>setVehicleColor(e.target.value)}
              />
              <input 
                className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 text-lg placeholder:text-base'
                required type="text" 
                placeholder="Vehicle Plate" 
                value={vehiclePlate}
                onChange={(e)=>setVehiclePlate(e.target.value)}
              />
            </div>

            <div className='flex gap-2 mb-5'>
              <input 
                className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 text-lg placeholder:text-base'
                required type="number" 
                placeholder="Vehicle Capacity" 
                value={vehicleCapacity}
                onChange={(e)=>setVehicleCapacity(e.target.value)}
              />
              <select 
                className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 text-lg'
                required
                value={vehicleType}
                onChange={(e)=>setVehicleType(e.target.value)}
              >
                <option value="">Select Vehicle Type</option>
                <option value="car">Car</option>
                <option value="auto">Auto</option>
                <option value="moto">Moto</option>
              </select>
            </div>
            
            <button className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2  w-full text-lg placeholder:text-base '>Create Captain Account</button>
          </form>
          <p className='text-center'>Already have a account? <Link to={"/captain-login"} className=' text-blue-600'>Login here</Link></p>
        </div>
        <div>
          <p className='text-[10px] leading-tight'>This site is protected by reCAPTCHA by the <span className='underline'> Google Privacy Policy </span> and <span className='underline'>Terms of Services apply</span>.</p>
        </div>
      </div>
  )
}

export default CaptainSignup