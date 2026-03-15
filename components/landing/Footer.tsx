export default function Footer() {
  return (
    <footer className="border-t-0 bg-[#0a0a0a]">
      <div className="border-t-[3px] border-white/20 px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo mark */}
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 bg-[#e11d1d] flex items-center justify-center border border-white/30">
            <svg width="10" height="10" viewBox="0 0 16 16" fill="white">
              <rect x="1" y="1" width="6" height="6" />
              <rect x="9" y="1" width="6" height="6" />
              <rect x="1" y="9" width="14" height="6" />
            </svg>
          </div>
          <span
            className="text-lg text-white/40"
            style={{ fontFamily: 'var(--font-bangers)', letterSpacing: '0.08em' }}
          >
            MANGAFLOW
          </span>
        </div>

        {/* Center — beta note */}
        <p className="text-xs text-gray-700 text-center">
          Open beta — built for indie translators & scanlation teams.
        </p>

        {/* Right — links */}
        <div className="flex items-center gap-6 text-xs text-gray-600">
          <a href="#how-it-works" className="hover:text-gray-400 transition-colors">
            How it works
          </a>
          <a href="#demo" className="hover:text-gray-400 transition-colors">
            Demo
          </a>
          <a href="#feedback" className="hover:text-gray-400 transition-colors">
            Feedback
          </a>
        </div>
      </div>

      {/* Bottom strip */}
      <div
        className="h-3 w-full"
        style={{
          background: 'repeating-linear-gradient(90deg, #e11d1d 0px, #e11d1d 20px, #0a0a0a 20px, #0a0a0a 40px)',
        }}
      />
    </footer>
  )
}