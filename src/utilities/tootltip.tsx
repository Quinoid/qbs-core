// import React from 'react';
// const Tooltip: React.FC<any> = ({ useRef, useState }) => {
//   return (
//     <div className="tooltip-wrapper">
//       {children}
//       <div className="tooltip-content">{title}</div>
//     </div>
//   );
// };

// export default Tooltip;
import React, { useRef, useState } from 'react';

const ToolTip: React.FC<any> = ({ title, children }) => {
  const [dropdownPosition, setDropdownPosition] = useState('bottom-position');
  const dropRef = useRef(null);
  const menuButtonRef = useRef<HTMLElement>(null);
  const adjustDropdownPosition = () => {
    if (menuButtonRef.current && dropRef.current) {
      const inputBoxRect = menuButtonRef.current?.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      const spaceAbove = inputBoxRect.top;
      const spaceBelow = viewportHeight - inputBoxRect.bottom;
      if (spaceAbove > spaceBelow) {
        if (spaceAbove > 90 && spaceBelow < 120) {
          setDropdownPosition('top-position');
        } else {
          setDropdownPosition('bottom-position');
        }
      } else {
        const diff: number = spaceBelow - spaceAbove;
        if (spaceAbove > 90 && spaceBelow > 90 && diff < 90) {
          setDropdownPosition('top-position');
        } else {
          setDropdownPosition('bottom-position');
        }
      }
    }
  };

  return (
    <div
      className={`qbs-table-tooltip ${
        dropdownPosition == 'bottom-position' ? 'down' : 'up'
      } `}
    >
      <span
        ref={menuButtonRef}
        style={{ display: 'flex' }}
        onMouseEnter={() => adjustDropdownPosition()}
      >
        {children}
      </span>
      <span ref={dropRef} className={`tooltiptext custom-tooltip-class `}>
        <span> {title}</span>
      </span>
    </div>
  );
};

export default ToolTip;
