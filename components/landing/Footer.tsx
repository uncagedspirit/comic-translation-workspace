export default function Footer() {
  return (
    <footer style={{ background: '#EDE8E3', borderTop: '1px solid rgba(42,36,32,0.12)' }}>
      <div className="px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 flex items-center justify-center rounded-md" style={{ background: '#7AB648' }}>
            <svg width="10" height="10" viewBox="0 0 16 16" fill="white">
              <rect x="1" y="1" width="6" height="6" />
              <rect x="9" y="1" width="6" height="6" />
              <rect x="1" y="9" width="14" height="6" />
            </svg>
          </div>
          <span className="text-lg" style={{ fontFamily: 'var(--font-bangers)', letterSpacing: '0.08em', color: 'rgba(42,36,32,0.4)' }}>
            MANGAFLOW
          </span>
        </div>
        <p className="text-xs text-center" style={{ color: 'rgba(42,36,32,0.35)' }}>
          Open beta — manga · manhua · manhwa · comics · webtoons
        </p>
        <div className="flex items-center gap-6 text-xs" style={{ color: 'rgba(42,36,32,0.4)' }}>
          <a href="#how-it-works" className="hover:opacity-100 transition-opacity" style={{ opacity: 0.6 }}>How it works</a>
          <a href="#demo" className="hover:opacity-100 transition-opacity" style={{ opacity: 0.6 }}>Demo</a>
        </div>
      </div>
    </footer>
  )
}