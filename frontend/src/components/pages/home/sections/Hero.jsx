import roomIcon from "../../../../assets/icons/room.png"
const Hero = () => {
    return (
        <div className='max-w-7xl mx-auto px-4 md:px-12 py-8 md:py-20 '>
            <div className='grid md:grid-cols-2 gap-8 md:gap-12 items-center'>
                {/* left side */}
                <div className='order-2 md:order-1'>
                    <h1 className='text-3xl md:text-5xl lg:text-6xl font-bold text-[#082558] leading-tight mb-4 md:mb-6 '>
                        Manage your <span className='text-orange-500'>room credit</span> easily
                    </h1>

                    <p className='text-gray-600 text-base md:text-lg mb-6 md:mb-8 max-w-md mx-auto md:mx-0'>Track customer credit, record transactions, and <br /> manage your shop effortlessly</p>

                    <div className='flex flex-col sm:flex-row items-center justify-center md:justify-start space-y-3 sm:space-y-0 sm:space-x-4'>
                        <button className='w-full sm:w-auto bg-orange-500 hover:bg-orange-800 text-white px-8 py-3.5 rounded-full font-medium transition-all hover:shadow-xl cursor-pointer'>Learn More</button>
                        
                        <button className='w-full sm:w-auto border-2 border-[#082558] text-[#082558] hover:bg-[#082558] hover:text-white px-8 py-3.5 rounded-full font-medium transition-all hover:scale-105 duration-300 cursor-pointer'>Login / Signup</button>
                    </div>

                    <div className="absolute top-40 left-10  h-3 sm:h-4 lg:h-7 w-3 sm:w-4 lg:w-7 bg-orange-400 rounded-full animate-bounce z-10"></div>

                    <div className="absolute top-60 left-30 sm:left-100  h-3 sm:h-4 lg:h-5 w-3 sm:w-4 lg:w-5 bg-orange-400 rounded-full animate-bounce z-10"></div>
                </div>

                <div className='relative flex justify-center items-center row-span-2  h-full order-1 md:order-2  '>
                    <div className='absolute -top-10 right-0 sm:right-20 sm:-top-5 lg:-top-10 lg:right-0 bg-linear-to-l from-[#FF6900] to-[#ffb179] h-70 w-70 sm:w-80 sm:h-80 lg:w-100 lg:h-100 rounded-full' >
                        <div className="w-10 h-10 bg-[#0C2F6D] rounded-full"></div>
                        <div className="absolute w-5 h-5 bg-yellow-500 rounded-full right-10 animate-bounce"></div>
                    </div>

                    <div className='z-20 relative '>
                        <img src="https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="house image" className='rounded-xl w-100' />

                        <div className="flex absolute z-20 -bottom-5 -left-5 sm:-left-10 bg-gray-100 w-50 p-2 rounded sm:animate-bounce">
                            <img src={roomIcon} alt="room icon" className="h-14 p-2 bg-gray-300 rounded-xl mr-1" />
                            <div className="flex flex-col ">
                                <h1 className="leading-tight  font-bold text-capitalize">More than 500+</h1>
                                <p className="text-sm"> shop owners</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero