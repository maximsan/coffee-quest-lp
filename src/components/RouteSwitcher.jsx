import { NavLink } from 'react-router-dom'

const routes = [
  { path: '/1', label: '1' },
  { path: '/2', label: '2' },
  { path: '/3', label: '3' },
  { path: '/4', label: '4' },
  { path: '/5', label: '5' },
  { path: '/6', label: '6' },
  { path: '/7', label: '7' },
  { path: '/8', label: '8' },
]

export function RouteSwitcher() {
  return (
    <nav
      className="fixed bottom-4 left-1/2 z-50 flex max-w-[calc(100vw-1.5rem)] -translate-x-1/2 items-center gap-2 overflow-x-auto rounded-full border border-white/60 bg-[#18120d]/85 px-3 py-2 text-sm text-[#f6efe6] shadow-[0_16px_40px_rgba(0,0,0,0.22)] backdrop-blur-xl"
      aria-label="Homepage design switcher"
    >
      <span className="hidden pr-2 text-[11px] uppercase tracking-[0.28em] text-[#f0d9bf]/70 sm:inline">
        Routes
      </span>
      {routes.map((route) => (
        <NavLink
          key={route.path}
          to={route.path}
          className={({ isActive }) =>
            [
              'grid h-9 w-9 place-items-center rounded-full border text-sm font-semibold transition duration-300',
              isActive
                ? 'border-[#f2c48d] bg-[#f2c48d] text-[#2d1f16]'
                : 'border-white/15 bg-white/5 text-[#f6efe6]/88 hover:border-white/35 hover:bg-white/10',
            ].join(' ')
          }
        >
          {route.label}
        </NavLink>
      ))}
    </nav>
  )
}
