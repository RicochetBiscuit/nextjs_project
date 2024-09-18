'use client';
import ThemeToggle from '@/components/Buttons/ThemeToggle';
import React, { useEffect, useRef, useState } from 'react';
import ShareButtons from './ShareButtons';
import Progressbar from './Progressbar';
import FontSizeChanger from './FontSizeChanger';
import clsx from 'clsx';
import BurgerButton from '@/components/Buttons/BurgerButton';
import ExpandButton from './ExpandButton';
const Menu = () => {
  const [open, setOpen] = useState(true);
  const [stickyTop, setStickyTop] = useState<boolean>(true);
  const [isWide, setWide] = useState(false);
  const stickyRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (stickyRef.current) {
        const stickyTop = stickyRef.current.getBoundingClientRect().top;
        if (stickyTop > 0) {
          setStickyTop(true);
          setOpen(true);
        } else setStickyTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <div
        ref={stickyRef}
        className={clsx(
          'sticky flex items-center justify-end border border-base-300 backdrop-blur-sm backdrop-filter bg-base-100 top-0 rigth-0 p-2 !select-none z-50 self-end transition-all ease-in-out duration-500',
          open
            ? 'w-full md:pl-6 h-[58px] pr-2 bg-opacity-25'
            : '-mr-8 w-16 h-22 bg-opacity-100',
        )}
      >
        <div
          className={clsx(
            'justify-between w-full transition-all ease-in-out duration-500 delay-200 flex',
            open ? 'opacity-100 ' : 'opacity-0 hidden',
          )}
        >
          <div className="flex items-center">
            <ThemeToggle />
            <ExpandButton isWide={isWide} setWide={setWide} />
            <FontSizeChanger />
          </div>
          <ShareButtons />
        </div>

        <div
          className={clsx(
            'flex flex-col max-w-full cursor-pointer transition-all ease-in-out duration-300',
          )}
        >
          <div
            className={clsx(
              'py-0 px-auto transition-all w-full max-w-11 ease-in-out duration-200 btn btn-ghost btn-sm h-10',
              stickyTop ? 'opacity-0 hidden delay-75' : 'opacity-100',
            )}
            onClick={() => !stickyTop && setOpen(!open)}
          >
            <div className="ml-2 mt-1.5">
              <BurgerButton
                color={'#eeb30d'}
                width={32}
                height={32}
                isToggled={open}
                cursor="pointer"
              />
            </div>
          </div>
          {!open && <ExpandButton isWide={isWide} setWide={setWide} />}
        </div>
      </div>
      <Progressbar />
    </>
  );
};

export default Menu;
