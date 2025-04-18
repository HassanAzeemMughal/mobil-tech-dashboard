import React from "react";

const InputComponent = ({ label, name, type, ...props }) => {
  return (
    <div className="relative">
      <input
        type={type}
        id={name} // Assigning the name as the id
        name={name} // Assigning the name to the input field
        className={`block rounded px-2.5 pb-2.5 pt-5 w-full text-sm text-[#FFFFFFE5] bg-text-900 dark:bg-[#000000] border-0 border-b-2 border-b-[#000000] appearance-none focus:outline-none focus:ring-0 focus:border-[#000000] dark:focus:border-[#000000] peer ${type === 'date' ? 'custom-date' : ''}`} // Adding a class for date type
        placeholder=" "
        {...props} // Spreading additional props
      />
      <label
        htmlFor={name} // Matching the label `for` attribute to the input `id`
        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-gray-400 peer-focus:dark:text-gray-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
      >
        {label}
      </label>
    </div>
  );
};

export default InputComponent;