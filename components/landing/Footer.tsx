export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t-[3px] border-white/20">
      <div className="px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo mark */}
        <div className="flex items-center gap-3">
          <div
            className="w-6 h-6 flex items-center justify-center border border-white/30"
            style={{ background: '#C84B31' }}
          >
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

        {/* Center tagline */}
        <p className="text-xs text-gray-700 text-center">
          Open beta — manga · manhua · manhwa · comics · webtoons
        </p>

        {/* Right links */}
        <div className="flex items-center gap-6 text-xs text-gray-600">
          <a href="#how-it-works" className="hover:text-gray-400 transition-colors">
            How it works
          </a>
          <a href="#demo" className="hover:text-gray-400 transition-colors">
            Demo
          </a>
        </div>
      </div>
    </footer>
  )
}