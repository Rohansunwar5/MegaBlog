import React from 'react'
import {Container, Logo, LogoutBtn} from '../index'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

// useSelector function helps use to acces state from the store 
const Header = () => {
  const authStatus = useSelector((state) => state.auth.status) // asking  for status of authentication in our application
  const navigate = useNavigate();
  // navigation is used for programmatic navigation, whenever this kind of naviagation is created, array is made and looped inside 
  const navItems = [
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
    <header className='py-3 shadow bg-gray-500'>
      <Container>
        <nav className='flex'>
          <div className='mr-4'>
            <Link to='/'>
              <Logo width='70px'/>
            </Link>
          </div>
          <ul className='flex ml-auto'> 
            {navItems.map((item) =>
              item.active ?(
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className='inline-block px-6 duration-100 hover:bg-blue-100 rounded-full'
                  >{item.name}</button>
                </li>
              ) : null 
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}  {/*if authStatus is true only then will the parenethis will execute  */}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header