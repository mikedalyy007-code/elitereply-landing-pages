import { useState } from 'react'

// EliteReply Landing Page
// TODO: Replace this with your full landing page component
// Once you've fixed the syntax issues in your React code,
// paste the complete component here.

export default function App() {
  const handleClaimHandle = () => {
    window.location.href = 'https://elitereply.com'
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold mb-6">EliteReply</h1>
      <p className="text-xl text-gray-400 mb-8">Get paid for your expertise</p>
      <button
        onClick={handleClaimHandle}
        className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors"
      >
        Claim Your Handle
      </button>
    </div>
  )
}
