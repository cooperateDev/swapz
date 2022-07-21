import { NavLink } from "react-router-dom"

export default function SidebarNavLink({ labelText, to }) {
  const navLinkClassname = ` text-default hover:nav-header-item hover:bg-opacity-75
    group flex items-center px-2 py-2 text-sm font-medium rounded-md
    `

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive
          ? "bg-gradient-to-r nav-active to-indigo-100" + navLinkClassname
          : navLinkClassname
      }
    >
      {labelText}
    </NavLink>
  )
}
