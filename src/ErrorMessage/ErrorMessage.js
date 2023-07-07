import React from 'react'

export const ErrorMessage = ({children}) => {
  return (
    <div
    style={{
        width:"100%",
        padding: 10,
        textAlign:"center",
        backgroundColor: "orangered",
        color: "white"
    }}
    >
      {children}
    </div>
  )
}
