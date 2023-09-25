import React from 'react'

export default function Feature( { img, title,text }) {
  return (
    <div className='feature-item'>
        <img src={img} className='feature-icon' alt="Chat icon" />
        <h3 className='feature-item-title'>{title}</h3>
        <p>{text}</p>
    </div>
  )
}
