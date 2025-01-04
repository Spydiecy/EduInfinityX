"use client"

export default function HomeCardsDesign() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16 bg-white">
      <div className="space-y-4 mb-12">
        <h1 className="text-5xl font-bold">Resources.</h1>
        <p className="text-xl text-gray-600">
          Find resources that will help you navigate, use, and build on the Neo X network.
        </p>
        <div className="flex gap-4 pt-4">
          <button className="px-6 py-2 rounded-full border-2 border-emerald-400 text-emerald-400 hover:bg-emerald-400 hover:text-white transition-colors">
            Add Neo X Mainnet
          </button>
          <button className="px-6 py-2 rounded-full bg-emerald-400 text-white hover:bg-emerald-500 transition-colors">
            Go to Docs
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {[
          {
            title: "Governance",
            description: "Earn rewards by using your GAS to vote for Neo X validators.",
            icon: (
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            ),
          },
          {
            title: "Bridge",
            description: "Electronic Health Management Easily by Spenign Less Amount Of Gas.",
            icon: (
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            ),
          },
          {
            title: "Explorer",
            description: "Find transactions and review activity on the Neo X blockchain.",
            icon: (
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            ),
          },
          {
            title: "Faucet",
            description: "Claim Neo X TestNet GAS to help you develop your own dApps.",
            icon: (
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ),
          },
        ].map((item, index) => (
          <div
            key={index}
            className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white transition-transform duration-300 hover:scale-105"
          >
            {/* Icon container with gradient */}
            <div 
              className="absolute left-0 top-0 h-full w-[120px]"
              style={{
                background: "linear-gradient(135deg, rgb(45, 206, 137) 0%, rgb(0, 147, 233) 100%)",
              }}
            >
              <div className="flex h-full items-center justify-center text-white">
                {item.icon}
              </div>
            </div>
            
            {/* Content */}
            <div className="ml-[120px] p-6">
              <h3 className="mb-2 text-xl font-semibold text-gray-900">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}