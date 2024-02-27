import React,{useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


// mechanism how pages and routes are proctected 
const Protected = ({
  children, 
  authentication = true// optional  parameter if you want to protect or not the page
}) => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true)
  const authStatus = useSelector(state => state.auth.status)
  // useSelector itself monitors the changes 
  useEffect(()=> {
    // Todo: amke it easy 
    // if(authStatus === true ){
    //   navigate('/')
    // }else if(authStatus !== false) {
    //   navigate('/login')
    // }

    // 1. true && false != true  (if authstatus is false)(if we don't have status in store then it will go to login by default)
    // 2. true && true  => (login)
    if(authentication && authStatus !== authentication){
      navigate('/login')
    } 
    // false && true !== true  
    // false && false   
    else if(!authentication && authStatus !== authentication) {
      navigate("/")
    }
    setLoader(false)
  },[authStatus, navigate, authentication])
  
  return (
    loader ? <h1>Loading...</h1> 
    : 
    <>{children} </>
  )
}

export default Protected