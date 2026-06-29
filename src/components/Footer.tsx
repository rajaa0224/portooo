import { useNavigate } from 'react-router-dom'

export default function Footer() {
  const navigate = useNavigate()

  return (
    <footer id="contact" className="border-t border-line bg-paper">
      <div className="mx-auto flex max-w-content items-center justify-between px-6 py-8">
        <p className="text-sm text-slate-muted">
          © 2026 Raja Malik Chaniago.{' '}
          {/* Secret admin access — clicking "Built with passion" opens the login. */}
          <button
            type="button"
            onClick={() => navigate('/admin')}
            className="cursor-pointer text-slate-muted transition-colors hover:text-ink"
            aria-label="Built with passion"
            title="Built with passion"
          >
            Built with passion.
          </button>
        </p>
      </div>
    </footer>
  )
}
