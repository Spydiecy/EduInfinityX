
import { useEffect, useState } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"

export default function NewsSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const news = [
    {
      date: "27/07/2024",
      title: "Neo X: A New Brand for a Brand New Era",
      link: "#",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      date: "25/07/2024",
      title: "Neo launches $20 million Elevate funding program for Neo X",
      link: "#",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      date: "25/07/2024",
      title: "Neo X MainNet Launches",
      link: "#",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      date: "18/07/2024",
      title: "Neo Launches the Neo X Gamma TestNet",
      link: "#",
      image: "/placeholder.svg?height=400&width=600",
    },
  ]

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % (news.length - 2))
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + (news.length - 2)) % (news.length - 2))
  }

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-4 ">
      <div className="space-y-4 mb-12">
        <h1 className="text-5xl font-bold">Latest news.</h1>
        <p className="text-xl text-gray-600">
          Let's catch you up on what is happening in the Neo X ecosystem.
        </p>
      </div>

      <div className="relative">
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 33.333}%)` }}
          >
            {news.map((item, index) => (
              <div
                key={index}
                className="w-1/3 flex-shrink-0 px-3"
                style={{ flex: "0 0 33.333%" }}
              >
                <div className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg transition-transform duration-300 hover:scale-105 h-[300px] flex flex-col justify-between">
                  <div className="absolute right-0 top-0 h-32 w-32 opacity-10">
                    <div
                      className="h-full w-full"
                      style={{
                        background:
                          "linear-gradient(135deg, rgb(45, 206, 137) 0%, rgb(0, 147, 233) 100%)",
                        clipPath: "polygon(0 0, 100% 0, 100% 100%)",
                      }}
                    />
                  </div>

                  <div className="relative z-10 flex flex-col h-full">
                    <div className="mb-4 flex items-center">
                      <div
                        className="mr-2 h-8 w-8 rounded"
                        style={{
                          background:
                            "linear-gradient(135deg, rgb(45, 206, 137) 0%, rgb(0, 147, 233) 100%)",
                        }}
                      />
                      <span className="text-sm text-gray-500">{item.date}</span>
                    </div>
                    <h3 className="mb-4 text-xl font-semibold line-clamp-3">{item.title}</h3>
                    <div className="mt-auto">
                      <a
                        href={item.link}
                        className="inline-flex items-center text-gray-500 hover:text-emerald-400"
                      >
                        Read More
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={prevSlide}
          className="absolute -left-4 top-1/2 -translate-y-1/2 transform rounded-full bg-white p-2 shadow-lg hover:bg-gray-100 z-10"
          aria-label="Previous slide"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute -right-4 top-1/2 -translate-y-1/2 transform rounded-full bg-white p-2 shadow-lg hover:bg-gray-100 z-10"
          aria-label="Next slide"
        >
          <ArrowRight className="h-6 w-6" />
        </button>
      </div>
    </div>
  )
}