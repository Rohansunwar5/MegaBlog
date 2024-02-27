import React, { useId } from 'react'

const Select = ({
  options,
  label,
  className = " ",
  ...props 
}, ref) => {
  const id = useId();
  return (
    <div className='w-full'>
     {label && 
     <label htmlFor={id} className=''></label>}

     <select 
      {...props}
      id={id}
      ref={ref}
      className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
     >
       {/* options give out arrays, so we take it in arrays in default , incase to avoid  errors,NOTE: we take it in optionally ? loop incase there are no values in the options */}
        {options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}

     </select>
    </div>
  )
}

export default React.forwardRef(Select)
// same thing 
// const Input = React.forwardRef(function Input({
//   label, 
//   type = "text",
//   className = "",
//   ...props
// }, ref)