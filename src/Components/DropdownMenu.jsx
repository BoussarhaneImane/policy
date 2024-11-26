import React from 'react';
import { Link } from 'react-router-dom';

const DropdownMenu = ({ isOpen, links, onMouseEnter, onMouseLeave }) => (
  <ul
    className={`absolute left-0 mt-4 w-52 bg-white border border-gray-200 shadow-lg transition-opacity duration-300 ease-in-out ${
      isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
    }`}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  >
    {links.map(({ to, label, submenu }) => (
      <li key={label} className="relative px-4 py-2">
        {/* Display the main link */}
        {to ? (
          <Link to={to} className="hover:text-blue-950 text-slate-500">
            {label}
          </Link>
        ) : (
          <span className="hover:text-blue-950 text-slate-500">{label}</span>
        )}

        {/* Display submenu if it exists */}
        {submenu && (
          <ul className="absolute left-full top-0 mt-0 ml-2 w-48 bg-white border border-gray-200 shadow-lg">
            {submenu.map(({ to, label }) => (
              <li key={label} className="px-4 py-2">
                <Link to={to} className="hover:text-blue-950 text-slate-500">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </li>
    ))}
  </ul>
);

export default DropdownMenu;
