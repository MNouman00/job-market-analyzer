import { useState } from 'react'

export default function Analyzer() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [prediction, setPrediction] = useState(null)
  const [summary, setSummary] = useState(null)
  const [loading, setLoading] = useState(false)

  const handlePredict = async (e) => {
    e.preventDefault()
    setLoading(true)
    setPrediction(null)
    try {
      const response = await fetch('https://job-market-analyzer-api.onrender.com/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description })
      })
      const data = await response.json()
      setPrediction(data.predicted_category)
    } catch (error) {
      console.error(error)
      setPrediction("Error connecting to API")
    } finally {
      setLoading(false)
    }
  }

  const handleAnalyze = async (e) => {
    e.preventDefault()
    setLoading(true)
    setSummary(null)
    try {
      const response = await fetch('https://job-market-analyzer-api.onrender.com/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description })
      })
      const data = await response.json()
      setSummary(data.summary)
    } catch (error) {
      console.error(error)
      setSummary("Error generating AI summary")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
        <h2 className="text-xl font-semibold mb-4 text-white">Job Description Analyzer</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Job Title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 text-white" placeholder="e.g. Senior React Developer" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
            <textarea rows="4" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 text-white resize-none" placeholder="Paste job description here..."></textarea>
          </div>
          <div className="flex flex-col gap-3">
            <button 
  type="button" 
  onClick={handlePredict} 
  disabled={loading} 
  className="w-full bg-blue-600 hover:bg-blue-700 font-bold py-2 rounded-lg transition disabled:bg-gray-600"
>
  {loading ? "Processing..." : "Predict Category (ML)"}
</button>

<button 
  type="button" 
  onClick={handleAnalyze} 
  disabled={loading} 
  className="w-full bg-purple-600 hover:bg-purple-700 font-bold py-2 rounded-lg transition disabled:bg-gray-600"
>
  {loading ? "Generating..." : "AI Summary (LLM)"}
</button>
          </div>
        </form>
      </div>

      {(prediction || summary) && (
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 space-y-4">
          <h2 className="text-xl font-semibold text-white">Analysis Results</h2>
          
          {prediction && (
            <div className="bg-gray-900 p-4 rounded-lg border border-blue-500">
              <p className="text-sm text-gray-400">Predicted Category</p>
              <p className="text-xl font-bold text-green-400">{prediction}</p>
            </div>
          )}

          {summary && (
            <div className="bg-gray-900 p-4 rounded-lg border border-purple-500">
              <p className="text-sm text-gray-400 mb-2">AI Extracted Skills</p>
              <div className="text-sm text-gray-200 space-y-2">
                {summary.split('\n').filter(line => line.trim() !== '').map((line, index) => (
                  <p key={index}>
                    {line.replace(/\*\*/g, '').replace(/^-\s*/, '• ')}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}