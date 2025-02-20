"use client"

import { TypeAnimation } from "react-type-animation"
import AboutSection from "./AboutSection"
import CommunitySection from "./CommunitySection"
import HomeCardsDesign from "./HomeCardsDesign"
import NewsSlider from "./NewsSlider"
import { motion } from 'framer-motion'
export default function HomeMain() {
    return (
<>
      <div className="w-full relative flex flex-col overflow-hidden lg:overflow-visible">
        {/* Main Content Section */}
        <div className="max-w-6xl mx-auto w-full py-20 lg:py-32 px-8 z-40">
          <div className="w-full lg:w-2/3 flex flex-col gap-8">
            {/* Funding Badge */}
            <div> 
              <div 
              
                className="inline-flex items-center gap-2 rounded-full border shadow-sm px-3 pr-5 py-2 bg-white"
              >
                <span className="text-xs font-bold bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-2 py-0.5 rounded-full">
                  OPEN
                </span>
                <a href="/about">

                <span className="font-semibold whitespace-nowrap text-sm lg:text-base">
                  $20m in funding available now
                </span>
                </a>
                <svg 
                  width="6" 
                  height="11" 
                  viewBox="0 0 6 11" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    d="M0.957031 1.29688L5.09867 5.43852L0.957031 9.58016" 
                    stroke="black" 
                    strokeWidth="1.60248" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
  
            {/* Hero Text */}
            <div className="font-bold text-5xl lg:text-[90px] flex flex-col">
              
              <span className="whitespace-nowrap">  <TypeAnimation
      sequence={[
        // Same substring at the start will only be typed out once, initially
        
        `Learn.Own.Earn.`,
        1000, // wait 1s before replacing "Mice" with "Hamsters"
        'Learn.Own.Grow',
        1000,
        'Learn.Own.Succeed',
        1000,
        'Learn.Own.Discover',
        1000,
        
      ]}
      wrapper="span"
      speed={50}
      style={{ fontSize: '1em', display: 'inline-block',marginTop:'8px' }}
      repeat={Infinity}
    /></span>
    
              <motion.h1 
          className="text-6xl font-bold  mt-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
            Its's EduInfinity-X
          </span>
        </motion.h1>
            </div>
  
            {/* Description */}
            <p className="font-medium lg:text-lg text-[#404056] max-w-md">
            EduInfinity-X is a transformative platform designed to redefine education financing and management by leveraging blockchain and artificial intelligence (AI). </p>
  
            {/* CTA Button */}
            <div className="flex items-center gap-8">
              <a 
                href="/dashboard" 
                target="_blank"
                className="bg-black font-semibold py-3 px-5 text-white rounded-full hover:bg-gray-900 transition-colors"
              >
                Student Dashboard
              </a>
            </div>
          </div>
        </div>
  
        {/* Shadow Divider */}
        <div className="mt-auto w-full hero-top-shadow h-1 z-50">&nbsp;</div>
  
        {/* Hero Image */}
        <div className="absolute top-0 lg:right-0 -right-40 translate-x-1/2 lg:translate-x-0 lg:flex z-10">
          <img 
            src="https://x.neo.org/assets/hero-x.png" 
            alt="Edu Chain"
            className="h-[740px] lg:h-[1065px]"
          />
        </div>
  
        {/* Background Decorative Elements */}
        <HomeCardsDesign></HomeCardsDesign>
        <AboutSection></AboutSection>
      <CommunitySection></CommunitySection>
      <NewsSlider></NewsSlider>
      </div>
     
      </>
    )
  }