import Analyzer from './components/Analyzer'
import Dashboard from './components/Dashboard'

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      {/* Top Navigation */}
      <nav className="bg-gray-800 border-b border-gray-700 p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-400">JobMarket<span className="text-white">AI</span></h1>
        <div className="flex gap-4">
          <span className="text-sm text-gray-400 mt-1">Powered by Scikit-Learn & LangChain</span>
        </div>
      </nav>

      {/* Main Layout Grid */}
      <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Analyzer Component */}
        <div className="lg:col-span-1">
          <Analyzer />
        </div>

        {/* Right Column: Dashboard Component */}
        <div className="lg:col-span-2">
          <Dashboard />
        </div>

      </div>
    </div>
  )
}

export default App