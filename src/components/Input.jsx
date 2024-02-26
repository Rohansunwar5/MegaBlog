import React, {useId} from 'react'

const Input = React.forwardRef(function Input({
  label, 
  type = "text",
  className = "",
  ...props
}, ref){
    const id = useId()
    return (
      <div className='w-full'>
        {label && <label 
          className='inline-block mb-1 pl-1'
          htmlFor={id}>
            {label}
          </label>
        } 
        <input 
          type={type}
          className={`py-2  px-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
          ref={ref} // reference we get from the user as a prop, pass that => this is what give refernce to the parent component, i.e why forward reference is used
          {...props} 
          id={id}
        />
      </div>
    )
})

export default Input