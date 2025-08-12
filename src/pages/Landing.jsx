import { Link } from 'react-router-dom'

export default function Landing(){
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-pink-50 p-6">
      <div className="max-w-4xl w-full bg-white rounded-xl shadow-lg p-8 flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-4">Multilingual Emotional Connect</h1>
          <p className="text-gray-700 mb-6">Reconnect with family traditions, festivals, and native languages through culturally intelligent AI companions.</p>
          <div className="flex gap-4">
            <Link to="/register" className="px-6 py-2 bg-indigo-600 text-white rounded">Get Started</Link>
            <Link to="/login" className="px-6 py-2 border rounded">Login</Link>
          </div>
        </div>

        <div className="w-80">
          <img src="/assets/illustration.png" alt="illustration" className="w-full"/>
        </div>
      </div>
    </div>
  )
}