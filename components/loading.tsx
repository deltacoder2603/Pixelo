import React from 'react'

const Loading = () => {
  return (
    <div className="flex flex-center justify-center align-middle gap-3 min-h-screen">
      <div className="w-4 h-4 rounded-full bg-primary animate-bounce"></div>
      <div className="w-4 h-4 rounded-full bg-primary animate-bounce [animation-delay:-.3s]"></div>
      <div className="w-4 h-4 rounded-full bg-primary animate-bounce [animation-delay:-.5s]"></div>
    </div>
  )
}

export default Loading
