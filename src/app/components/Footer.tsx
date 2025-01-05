'use client'

import { useState, FormEvent } from 'react'
import { Github, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react'
import toast from 'react-hot-toast'

// Custom Input Component
function CustomInput({ type = "text", placeholder, className = "", ...props }:any) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 transition-all ${className}`}
      {...props}
    />
  )
}

// Custom Textarea Component
function CustomTextarea({ placeholder, className = "", ...props }:any) {
  return (
    <textarea
      placeholder={placeholder}
      className={`w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 transition-all resize-none ${className}`}
      {...props}
    />
  )
}

// Custom Button Component
function CustomButton({ children, className = "", ...props }:any) {
  return (
    <button
      className={`px-6 py-2 rounded-lg text-white font-medium transition-all hover:opacity-90 active:scale-95 ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default function Footer() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')

  const socialLinks = [
    {
      name: "Twitter",
      icon: Twitter,
      href: "#",
    },
    {
      name: "GitHub",
      icon: Github,
      href: "#",
    },
 
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: "#",
    },
  ]

  const footerLinks = {
    "Our Features": [{"name":"Request Loans","href":"/loan-request"}, {"name":"Stake","href":"/stake-loans"}, {"name":"Repayment Loans","href":"/repayment-loan"},],
    "Developers": [{"name":"Twitter","href":"https://x.com/EduInfinityX/status/1875875913042477271"}, {"name":"Github","href":"https://github.com/Spydiecy/EduInfinityX/blob/main/README.md"} ],
    "Company": [{"name":"About Us","href":"/about"}, {"name":"Contact us","href":"/contact"}],
   
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    
    const formData = {
      name,
      email,
      subject,
      message
    }

    try {
      // Replace 'YOUR_API_ENDPOINT' with the actual API endpoint
      let response:any = await fetch("https://send-chitkara.vercel.app/api/sendEdu", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "name":"",
          "email":"namanbansal102@gmail.com",
          "subject":"",
          "message":""
        }),
      })
      response=await response.json();
      console.log("My response is::::",response);
      
      if (response.success) {
        toast.success("Message Sent Successfully")
        // Clear form fields
        setName('')
        setEmail('')
        setSubject('')
        setMessage('')
      } else {
      toast.error("Failed To Send Message")
      }
    } catch (error) {
      console.error('Error:', error)
      alert('An error occurred. Please try again.'+error)
    }
  }

  return (
    <footer className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo and Social Section */}
          <div className="space-y-6">
            <div
              className="h-12 px-14 text-2xl pt-2 font-bold rounded-lg text-white"
              style={{
                background: "linear-gradient(135deg, rgb(45, 206, 137) 0%, rgb(0, 147, 233) 100%)",
              }}
              
              >
                EduInfinityX

              </div>
            <p className="text-gray-600 max-w-xs">
              Building the future of blockchain technology with Edu Chain ecosystem.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  aria-label={social.name}
                  className="group flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 transition-colors hover:border-emerald-400"
                >
                  <social.icon className="h-5 w-5 text-gray-600 transition-colors group-hover:text-emerald-400" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links Sections */}
      
  <div  className="space-y-6">
    <h3 className="text-sm font-semibold uppercase tracking-wider">Our Features</h3>
    <ul className="space-y-4" > {/* Add a unique key here */}
      {footerLinks["Our Features"].map(({ name, href }) => (
        <li key={href}>
          <a href={href} className="text-gray-600 hover:text-emerald-400 transition-colors">
            {name}
          </a>
        </li>
      ))}
    </ul>
    
  </div>
  <div  className="space-y-6">
    <h3 className="text-sm font-semibold uppercase tracking-wider">Socials</h3>
    <ul className="space-y-4" > {/* Add a unique key here */}
      {footerLinks["Developers"].map(({ name, href }) => (
        <li key={href}>
          <a href={href} className="text-gray-600 hover:text-emerald-400 transition-colors">
            {name}
          </a>
        </li>
      ))}
    </ul>
    
  </div>
  <div  className="space-y-6">
    <h3 className="text-sm font-semibold uppercase tracking-wider">About</h3>
    <ul className="space-y-4" > {/* Add a unique key here */}
      {footerLinks["Company"].map(({ name, href }) => (
        <li key={href}>
          <a href={href} className="text-gray-600 hover:text-emerald-400 transition-colors">
            {name}
          </a>
        </li>
      ))}
    </ul>
    
  </div>



        </div>

        {/* Contact Section */}
        <div className="mt-16 grid grid-cols-1 gap-12 border-t border-gray-200 pt-16 lg:grid-cols-2">
          <div className="space-y-8">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-gray-600">
                <Mail className="h-5 w-5" />
                <span>contact@educhain.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600">
                <Phone className="h-5 w-5" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600">
                <MapPin className="h-5 w-5" />
                <span>India</span>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <h3 className="text-lg font-semibold">Send us a message</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <CustomInput 
                placeholder="Name" 
                required 
                value={name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
              />
              <CustomInput 
                type="email" 
                placeholder="Email" 
                required 
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              />
            </div>
            <CustomInput 
              placeholder="Subject" 
              required 
              value={subject}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSubject(e.target.value)}
            />
            <CustomTextarea 
              placeholder="Your message" 
              className="min-h-[120px]" 
              required 
              value={message}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value)}
            />
            <CustomButton
              type="submit"
              style={{
                background: "linear-gradient(135deg, rgb(45, 206, 137) 0%, rgb(0, 147, 233) 100%)",
              }}
            >
              Send Message
            </CustomButton>
          </form>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 border-t border-gray-200 pt-8">
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} EduInfinityX. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-sm text-gray-600 hover:text-emerald-400">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-gray-600 hover:text-emerald-400">
                Terms of Service
              </a>
              <a href="#" className="text-sm text-gray-600 hover:text-emerald-400">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

