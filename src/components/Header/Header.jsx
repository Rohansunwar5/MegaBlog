import React from 'react'
import {Container, Logo, LogoutBtn} from '../index'
import { Link, useNavigate, useNavigation } from 'react-router-dom'
import { useSelector } from 'react-redux'

// useSelector function helps use to acces state from the store 
const Header = () => {
  const authStatus = useSelector((state) => state.auth.status) // asking  for status of authentication in our application
  const navigate = useNavigate();
  // navigation is used for programmatic navigation, whenever this kind of naviagation is created, array is made and looped inside 
  const naItems = [
    {
      name: 'Home',
      slug: '/',
      active: true,
    },
    {
      name: 'Login',
      slug: '/login',
      active: !authStatus,
    },
    {
      name: 'Signup',
      slug: '/signup',
      active: !authStatus,
    },
    {
      name: 'All Posts',
      slug: '/all-posts',
      active: authStatus,
    },
    {
      name: 'Add Post',
      slug: '/add-post',
      active: authStatus,
    },
  ]


  return (
    <div>Header</div>
  )
}

export default Header