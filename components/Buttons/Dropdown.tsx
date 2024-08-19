import useClickableHandlers from '@/hooks/useClickableHandlers';
import { RootState } from '@/store';
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import { Option } from '@/types/common.types';
import { useOutsideClick } from '@/hooks/useOutsideClick';

type dropdownProps = {
  classes?: string;
  defaultValue: string | React.ReactNode;
  options: Option[];
  setSelectedOption: Dispatch<SetStateAction<string>>;
  hoverMode?: boolean;
  ulClasses?: string;
  flagMode?: boolean;
  selectedOption?: string;
  liClass?: string;
  style?: React.CSSProperties;
  openClass: string;
  closeClass: string;
};

/**
 * Dropdown Component
 *
 * This component renders a customizable dropdown menu with various options.
 * It supports both hover and click modes, and provides a flexible interface
 * for managing dropdown state and behavior.
 *
 * @param {string} [classes] - Optional custom classes to style the dropdown container.
 * @param {string|React.ReactNode} defaultValue - The default value displayed when no option is selected.
 * @param {Option[]} options - An array of options that the user can select from.
 * @param {React.Dispatch<React.SetStateAction<string>>} setSelectedOption - A state setter function to update the selected option.
 * @param {string} openClass - CSS class applied when the dropdown is open.
 * @param {string} closeClass - CSS class applied when the dropdown is closed.
 * @param {boolean} [hoverMode=false] - If true, the dropdown opens on hover instead of click.
 * @param {string} [ulClasses] - Optional custom classes for the unordered list (`<ul>`) that contains the dropdown options.
 * @param {boolean} [flagMode=false] - If true, displays an additional flag (or any extra indicator) next to each option.
 * @param {string} [selectedOption] - The currently selected option, used to apply conditional styling to the selected item.
 * @param {string} [liClass] - Optional custom classes for each list item (`<li>`).
 * @param {React.CSSProperties} [style] - Optional inline styles to apply to the dropdown's main button.
 *
 * @returns {JSX.Element} The rendered dropdown component.
 *
 * The component internally manages two key states:
 * - `isDropdownOpen`: Controls whether the dropdown menu is visible.
 * - `isRotated`: Tracks the rotation state of an icon (like an arrow) to indicate dropdown open/close status.
 *
 * The component uses `useClickableHandlers` to handle mouse events, particularly useful for hover states.
 * It also uses `useOutsideClick` to close the dropdown when a click occurs outside of the component.
 *
 */

const Dropdown = ({
  classes,
  defaultValue,
  options,
  setSelectedOption,
  openClass,
  closeClass,
  hoverMode = false,
  ulClasses,
  flagMode = false,
  selectedOption,
  liClass,
  style,
}: dropdownProps) => {
  const [isRotated, setIsRotated] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const { handleMouseEnter, handleMouseLeave } = useClickableHandlers();
  const isTouch = useSelector((state: RootState) => state.isTouch.touch);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const handleToggleDropdown = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    setDropdownOpen(!isDropdownOpen);
  };
  useOutsideClick(dropdownRef, () => setDropdownOpen(false));

  const mouseEnterHandler = () => {
    if (!isTouch && hoverMode) {
      setDropdownOpen(true);
    }
    handleMouseEnter();
  };
  const mouseLeaveHandler = () => {
    if (!isTouch && hoverMode) {
      setDropdownOpen(false);
    }
    handleMouseLeave();
  };
  useEffect(() => {
    setIsRotated(isDropdownOpen);
  }, [isDropdownOpen]);
  useEffect(() => {
    if (isDropdownOpen) {
      setDropdownOpen(false);
    }
  }, []);
  const [summary, setSummary] = useState<string | React.ReactNode>(
    () => defaultValue,
  );
  const clickHandler = (option: Option) => {
    setSelectedOption(option.key.toLowerCase());
    setSummary(option.value);
    setDropdownOpen(false);
  };
  useEffect(() => {
    setSummary(defaultValue);
  });
  return (
    <div
      ref={dropdownRef}
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
      className="flex flex-col items-center h-full"
    >
      <button
        onClick={(e) => handleToggleDropdown(e)}
        className="flex flex-row justify-between items-center gap-1 z-20 bg-transparent cursor-none w-full h-full"
      >
        <div className="p text-start pl-3 truncate ..." style={style}>
          {summary}
        </div>
        <div>
          <Image
            src="/arrow.svg"
            alt="Arrow"
            priority
            width={8}
            height={8}
            className={`transition-transform duration-500 ease-in-out ${
              isRotated ? 'rotate' : ''
            }`}
          />
        </div>
      </button>
      <div
        className={`${classes ? classes : 'absolute top-0 left-0 p items-end transition-height ease-in-out duration-500 w-full '} bg-cool-gray-800 rounded-lg shadow-sm shadow-black ${isDropdownOpen ? openClass : closeClass}`}
      >
        {isDropdownOpen && (
          <ul className={`${ulClasses} ul font-medium leading-6 text-[15px]`}>
            {options.map((option, index) => (
              <li
                data-tip={option.disabledTip}
                key={option.key.toLowerCase() + index}
                className={`w-full hover:text-log-col hover:brightness-75 transition-text duration-300 ease-in-out cursor-none ${selectedOption?.toLowerCase() === option.key.toLowerCase() ? 'bg-cool-gray-700' : ''} ${liClass} ${option.disabledTip && 'disabled text-cool-gray-600 hover:!text-cool-gray-400 tooltip tooltip-bottom tooltip-error'}`}
                onClick={() => !option.disabledTip && clickHandler(option)}
              >
                <div className="flex items-center gap-1">
                  {option.value}
                  {flagMode && <span>{option.key}</span>}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
