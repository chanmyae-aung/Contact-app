import React from 'react'
import { useLogoutMutation } from '../redux/authApi'
import Cookies from 'js-cookie'
import { useDispatch, useSelector } from 'react-redux'
import { removeUser } from '../redux/authSlice'
import { setSearchTerm } from '../redux/contactSlice'

const Navbar = () => {
  const user = JSON.parse(Cookies.get('user'))
  const token = Cookies.get('token')
  const dispatch = useDispatch()
    const [logout] = useLogoutMutation()

    const logoutHandler = async() => {
      const data = await logout(token)
      dispatch(removeUser())
      console.log(data)
    }
    
  const searchTerm = useSelector((state) => state.contactSlice.searchTerm)
  console.log(searchTerm)
  return (
    <div className='py-2 shadow-md flex items-center'>
        <div className='px-20 flex gap-3 items-center'>
            <img className='w-10' src="https://www.gstatic.com/images/branding/product/1x/contacts_2022_48dp.png" alt="" />
            <p className=' text-2xl'>Contacts</p>
        </div>
        <div className="flex flex-grow">
            <input
              onChange={(e) => dispatch(setSearchTerm(e.target.value))}
              type="text"
              className="shadow-sm focus-within:outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="Search..."
            />
        </div>
        <button className='mx-20 bg-purple-500 text-white rounded-full w-10 h-10'>{user.name.charAt(0).toUpperCase()}</button>
        <button onClick={logoutHandler}>logout</button>
    </div>
  )
}

export default Navbar