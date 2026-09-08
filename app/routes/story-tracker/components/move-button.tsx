import { ChevronDown, ChevronsDown } from 'lucide-react';
import { type RefObject, useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';

interface MoveButtonProps {
  direction: 'up' | 'down';
  targetSection: 'top' | 'unread' | 'finished' | 'bottom';
  handleClick: () => void;
}

interface ScrollNavigationProps {
  edgeRef: RefObject<HTMLDivElement | null>;
  unreadRef?: RefObject<HTMLDivElement | null>;
  finishedRef?: RefObject<HTMLDivElement | null>;
}

function MoveButton({ direction, targetSection, handleClick }: MoveButtonProps) {
  const Icon = targetSection === 'top' || targetSection === 'bottom' ? ChevronsDown : ChevronDown;

  return (
    <Button
      type="button"
      variant="secondary"
      size="icon"
      className="rounded-full drop-shadow-black/20 drop-shadow-sm"
      onClick={handleClick}
    >
      <Icon
        className={cn(
          'stroke-3 transition-all duration-300 [&_svg]:size-6 lg:[&_svg]:size-5',
          direction === 'up' ? 'rotate-180' : 'rotate-0',
          targetSection === 'finished' ? 'text-green-600' : 'text-primary'
        )}
      />
    </Button>
  );
}

export function ScrollNavigation({ edgeRef, unreadRef, finishedRef }: ScrollNavigationProps) {
  const [currentSection, setCurrentSection] = useState<'top' | 'unread' | 'finished' | 'bottom'>(
    'top'
  );

  const scrollTo = (
    ref: RefObject<HTMLDivElement | null>,
    position: ScrollLogicalPosition = 'start'
  ) => {
    ref.current?.scrollIntoView({
      behavior: 'smooth',
      block: position,
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      const unreadTop = unreadRef?.current?.offsetTop || 0;
      const finishedTop = finishedRef?.current?.offsetTop || 0;

      if (scrollY + windowHeight >= documentHeight - 50) setCurrentSection('bottom');
      else if (scrollY >= finishedTop - windowHeight / 4) setCurrentSection('finished');
      else if (scrollY >= unreadTop + 100) setCurrentSection('unread');
      else setCurrentSection('top');
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [unreadRef, finishedRef]);

  return (
    <div className="fixed right-3 bottom-8 z-20 flex flex-col gap-3">
      {currentSection === 'top' && (
        <MoveButton
          direction="down"
          targetSection={finishedRef?.current ? 'finished' : 'bottom'}
          handleClick={() =>
            finishedRef?.current ? scrollTo(finishedRef) : scrollTo(edgeRef, 'end')
          }
        />
      )}
      {currentSection === 'unread' && (
        <>
          <MoveButton direction="up" targetSection="top" handleClick={() => scrollTo(edgeRef)} />

          <MoveButton
            direction="down"
            targetSection={finishedRef?.current ? 'finished' : 'bottom'}
            handleClick={() =>
              finishedRef?.current ? scrollTo(finishedRef) : scrollTo(edgeRef, 'end')
            }
          />
        </>
      )}
      {currentSection === 'finished' && (
        <>
          <MoveButton
            direction="up"
            targetSection={finishedRef?.current ? 'finished' : 'top'}
            handleClick={() => (finishedRef?.current ? scrollTo(finishedRef) : scrollTo(edgeRef))}
          />

          <MoveButton
            direction="down"
            targetSection="bottom"
            handleClick={() => scrollTo(edgeRef, 'end')}
          />
        </>
      )}
      {currentSection === 'bottom' && (
        <MoveButton
          direction="up"
          targetSection={finishedRef?.current ? 'finished' : 'top'}
          handleClick={() => (finishedRef?.current ? scrollTo(finishedRef) : scrollTo(edgeRef))}
        />
      )}
    </div>
  );
}
