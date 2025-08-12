import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import ProfileSetup from './pages/ProfileSetup'
import Chat from './pages/Chat'
// import Festivals from './pages/Festivals'
// import Subscriptions from './pages/Subscriptions'
// import EmotionDashboard from './pages/EmotionDashboard'
// import Settings from './pages/Settings'
// import NotFound from './pages/NotFound'

export default function AppRouter(){
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/profile-setup' element={<ProfileSetup />} />
        <Route path='/chat' element={<Chat />} />
        {/* <Route path='/festivals' element={<Festivals />} /> */}
        {/* <Route path='/subscriptions' element={<Subscriptions />} /> */}
        {/* <Route path='/analytics' element={<EmotionDashboard />} /> */}
        {/* <Route path='/settings' element={<Settings />} /> */}
        {/* <Route path='*' element={<NotFound />} /> */}
      </Routes>
    </Router>
  )
}