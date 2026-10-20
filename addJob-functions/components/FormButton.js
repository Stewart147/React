import React from 'react'
import "./FormButton.css"


export const FormButton = (props) => {
  return (
    <div className='tag-horz'>
        <button className='tag'>{props.value}</button>
    </div>
  )
}
