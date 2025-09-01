import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Chat from '../pages/Chat'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Faq from '../pages/Faq'
import Layout from '../components/Layout'

function AppRoutes() {
  return (
     <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/faq" element={<Faq />} />
        </Routes>
      </Layout>
  )
}

export default AppRoutes
