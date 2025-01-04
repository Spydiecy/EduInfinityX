"use client"

import AboutSection from "./AboutSection"
import CommunitySection from "./CommunitySection"
import HomeCardsDesign from "./HomeCardsDesign"
import NewsSlider from "./NewsSlider"

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
            <p className="font-bold text-5xl lg:text-[90px] flex flex-col">
              <span className="whitespace-nowrap">New Life</span>
              <span>It's Neo X.</span>
            </p>
  
            {/* Description */}
            <p className="font-medium lg:text-lg text-[#404056] max-w-md">
              NeoxLifeChain is a Secure Based Electronic Health Management System To Manange Health Records Securely and Access Quickly.</p>
  
            {/* CTA Button */}
            <div className="flex items-center gap-8">
              <a 
                href="/viewHospital" 
                target="_blank"
                className="bg-black font-semibold py-3 px-5 text-white rounded-full hover:bg-gray-900 transition-colors"
              >
                View Hospitals
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
            alt="Neo X Hero"
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