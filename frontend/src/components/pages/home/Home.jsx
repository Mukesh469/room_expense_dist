import React from 'react'
import Navbar from '../../common/header/Navbar'
import Footer from '../../common/footer/Footer'

import Hero from './sections/Hero'
import TopBar from '../../common/header/TopBar'

const Home = () => {
  return (
    <div className=''>
      <TopBar />
      <Navbar />
      <main className='min-h-[90vh] flex justify-center items-center'>
        <Hero />
      </main>
      <Footer />
    </div>
  )
}

export default Home