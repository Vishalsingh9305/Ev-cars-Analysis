import React, { useState, useEffect } from 'react'

const ITEMS = ['Overview', 'Analytics', 'Data', 'Settings']

export default function Sidebar({ onNavigate }) {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [active, setActive] = useState(ITEMS[0])

  // Close mobile sidebar on wider screens
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 768) setMobileOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  function handleItemClick(item) {
    setActive(item)
    if (typeof onNavigate === 'function') onNavigate(item)
    if (mobileOpen) setMobileOpen(false)
  }

  // simple inline SVG icons
  const ChevronLeft = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M15 6L9 12l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
  const ChevronRight = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
  const Hamburger = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )

  return (
    <>
      {/* Mobile hamburger button (visible on small screens) */}
      <button
        className="mobile-hamburger"
        onClick={() => setMobileOpen(true)}
        aria-label="Open menu"
        aria-hidden={mobileOpen ? 'false' : 'true'}
      >
        <Hamburger />
      </button>

      {/* Overlay shown on mobile when open */}
      {mobileOpen && <div className="sidebar-overlay" onClick={() => setMobileOpen(false)} />}

      <aside
        className={
          'sidebar' +
          (collapsed ? ' collapsed' : '') +
          (mobileOpen ? ' open' : '')
        }
        aria-expanded={!collapsed}
      >
        <div className="sidebar-header">
          <div className="brand">
            <div className="brand-logo" aria-hidden>
              {/* simple circle logo */}
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" fill="#0f1724" stroke="#fff" strokeWidth="1.5"/>
              </svg>
            </div>
            {!collapsed && <h2 className="brand-title">MapUp — EV Dashboard</h2>}
          </div>

          <button
            className="collapse-btn"
            onClick={() => setCollapsed(!collapsed)}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            aria-pressed={collapsed}
          >
            {collapsed ? <ChevronRight /> : <ChevronLeft />}
          </button>
        </div>

        <nav className="sidebar-nav" aria-label="Main navigation">
          <ul className="menu">
            {ITEMS.map((it) => (
              <li key={it} className={'menu-item' + (active === it ? ' active' : '')}>
                <button
                  className="menu-btn"
                  onClick={() => handleItemClick(it)}
                  title={it}
                  aria-current={active === it ? 'page' : undefined}
                >
                  <span className="menu-dot" aria-hidden />
                  {!collapsed && <span className="menu-label">{it}</span>}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* optional footer / small actions */}
        <div className="sidebar-footer">
          {!collapsed && <small style={{opacity:0.85}}>v1.0</small>}
        </div>
      </aside>
    </>
  )
}
