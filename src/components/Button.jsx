import React from 'react'

function Button({
  children,
  type = "button",
  bgColor = "bg-blue-600",
  textColor = "text-white",
  className = "",
  ...props // passing attributes  to the button element
}) {
  return (
    <button className={`px-4 py-2 rounded-lg ${textColor} ${bgColor} ${className}`} {...props}> /
      {children}  
    </button>
  )
}
// when creating a login form, input field are different, so forword reference is what forwards the refrence of the state to the login page
export default Button
