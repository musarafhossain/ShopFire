import React from 'react'

const InputRadio = ({ label = "", name = '', ids = [], values = [], onChange, className = "", disabled = false, checked = [] }) => {
    return (
        <div className={`flex flex-col gap-2 ${className}`}>
            <p className="text-sm">{label}</p>
            <div className="flex gap-4 cursor-pointer">
                {values.map((value, index) =>
                    <label className="flex items-center" key={index} htmlFor={ids[index]}>
                        <input
                            type="radio"
                            name={name}
                            id={ids[index]}
                            value={value}
                            checked={checked[index]}
                            onChange={onChange}
                            disabled={disabled[index] || false}
                            className="mr-2"
                        />
                        {value}
                    </label>
                )}
            </div>
        </div>
    )
}

//Example
{/* <InputRadio
    label="Gender"
    ids={['male', 'female']}
    name='gender'
    values={['Male', 'Female']}
    checked={[formData.gender === "Male", formData.gender === "Female"]}
    onChange={handleChange}
    className=""
    disabled={[((formData.gender === "Female") && !isEditing), ((formData.gender === "Male") && !isEditing)]}
/> */}

export default InputRadio