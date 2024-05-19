import React, { useState, useRef } from 'react';

export default function Dropdown({ name, text, items }) {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const dropdownRef = useRef(null);

  const handleItemClick = (index) => {
    setSelectedIndex(index);
    dropdownRef.current.removeAttribute('open');
  };

  return (
    <div>
      <details className="dropdown" ref={dropdownRef}>
        <summary className="btn btn-primary">{selectedIndex !== null ? items[selectedIndex] : text}</summary>
        <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
          {items.map((item, index) => (
            <li key={index}>
              <a
                onClick={() => handleItemClick(index)}
                onMouseDown={(e) => e.stopPropagation()}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </details>
      <input type="hidden" name={name} value={selectedIndex !== null ? selectedIndex : ""} />
    </div>
  );
}
