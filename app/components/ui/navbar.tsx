import { cn } from "@/lib/utils";
import { useState } from "react";
import WebNameLogo from "../helper/logo";
import { Button } from "./button";
import { ChevronDown, Menu, UserRound, X } from "lucide-react";
import { NavbarItems, type NavbarItem } from "@/constants";
import { Link, useLocation } from "react-router";
import { Text } from "../helper/text";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./dropdown-menu";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./collapsible";
import { Separator } from "./separator";

interface NavbarButtonProps {
  isActive?: boolean;
  isNavExpand?: boolean;
  handleCloseSideMenu?: () => void;
}

function NavigationButton({ title, icon: Icon, href, subNav, isActive: propIsActive, isNavExpand, handleCloseSideMenu }: NavbarItem & NavbarButtonProps) {
  const { pathname } = useLocation();
  const isActive = propIsActive ?? pathname.includes(href);
  const [isCollapsibleOpen, setIsCollapsibleOpen] = useState(false);

  return (
    title === 'Bandori' ? (
      <>
        {
          isNavExpand ? (
            <Collapsible
              open={isCollapsibleOpen}
              onOpenChange={setIsCollapsibleOpen}
              className="flex w-full flex-col"
            >
              <CollapsibleTrigger className={cn(
                    'flex w-full h-fit items-center justify-between cursor-pointer gap-2 bg-transparent transition-colors duration-300 text-primary-foreground hover:text-amber-400'
                  )}>
                  <div className="flex flex-row w-full items-center justify-start gap-2">
                    {Icon && (
                      <Icon className="stroke-3 size-5" />
                    )}
                    <Text type='st1' lineHeight={7} weight='semibold'>
                      {title}
                    </Text>
                  </div>
                  <ChevronDown className={cn("stroke-3 size-7 transition-transform duration-300", isCollapsibleOpen ? 'rotate-180' : 'rotate-0')} />
              </CollapsibleTrigger>
              <CollapsibleContent className={cn(
                "flex flex-col gap-3 pl-4 ml-2 mt-2 border-l-2 border-primary-foreground",
                "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-top-10 data-[state=closed]:fade-out-0 data-[state=open]:slide-in-from-top-10 data-[state=open]:fade-in-0"
              )}>
                {
                  subNav && subNav.items.map((item, id) => {
                    const isSubActive = pathname.includes(item.href);

                    return (
                      <Link to={item.href} key={id} className={cn("focus:bg-amber-400 transition-colors duration-300", isSubActive ? 'bg-amber-400' : 'bg-transparent')}>
                        <button
                          className="flex w-full items-center gap-2 bg-transparent text-primary-foreground"
                          onClick={() => handleCloseSideMenu?.()}
                        >
                          {
                            item.icon && (<item.icon className="text-primary-foreground stroke-3 size-4" />)
                          }
                          <Text type='p' weight={isSubActive ? 'bold' : 'semibold'} lineHeight={6} >
                            {item.title}
                          </Text>
                        </button>
                      </Link>
                    )
                  })
                }
              </CollapsibleContent>
            </Collapsible>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger className={cn(
                    'flex w-36 h-fit items-center justify-center cursor-pointer gap-2 bg-transparent transition-colors duration-300 text-primary-foreground hover:text-amber-400'
                  )}>
                  {Icon && (
                    <Icon className="stroke-3 size-5" />
                  )}
                  <Text type='st2' lineHeight={6} weight='semibold'>
                    {title}
                  </Text>
                  <ChevronDown className="stroke-3 size-6" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-primary outline-1 outline-primary-foreground text-white">
                <DropdownMenuGroup>
                  <DropdownMenuLabel>
                    <Text type='p' weight='semibold'>
                      {subNav?.subTitle}
                    </Text>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-amber-300" />
                  {
                    subNav && subNav.items.map((item, id) => {
                      const isSubActive = pathname.includes(item.href);

                      return (
                        <DropdownMenuItem key={id} className={cn("mb-1 focus:bg-amber-400 transition-colors duration-300", isSubActive ? 'bg-amber-400' : 'bg-transparent')}>
                          <Link to={item.href}>
                            <button
                              className="flex w-full items-center gap-2 bg-transparent text-primary-foreground"
                              onClick={() => handleCloseSideMenu?.()}
                            >
                              {
                                item.icon && (<item.icon className="text-primary-foreground stroke-3" />)
                              }
                              <Text type='p' weight={isSubActive ? 'semibold' : 'medium'} lineHeight={5} >
                                {item.title}
                              </Text>
                            </button>
                          </Link>
                        </DropdownMenuItem>
                      )
                    })
                  }
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        }
      </>
    ) : (
      <Link to={href}>
        <button
          type="button"
          className={cn(
            'flex h-fit cursor-pointer gap-2 bg-transparent transition-colors duration-300 hover:text-amber-400',
            isActive ? 'text-amber-400' : 'text-primary-foreground',
            isNavExpand ? 'w-full items-center justify-start' : 'w-36 items-center justify-center'
          )}
          onClick={() => handleCloseSideMenu?.()}
        >
          {Icon && (
            <Icon className="stroke-3 size-5" />
          )}
          <Text type='st2' lineHeight={6} weight={isActive ? 'bold' : 'semibold'}>
            {title}
          </Text>
        </button>
      </Link>
    )
  )
}

function ProfileButton() {
  return (
    <div className="flex items-center justify-end h-fit w-25">
      <Button
        variant='ghost'
        size='icon'
      >
        <UserRound className="stroke-3 text-white" />
      </Button>
    </div>
  )
}

export default function Navbar() {
  const [isExpand, setIsExpand] = useState(false);

  function handleHideSidebar() {
    setIsExpand(false);
    document.body.style.overflow = 'unset';
  }

  function handleShowSidebar() {
    setIsExpand(true);

    if (window?.document) {
      document.body.style.overflow = 'hidden';
    }
  }

  return (
    <>
      {/* Desktop */}
      <nav className={cn(
        'fixed top-0 z-30 w-full h-fit flex flex-row items-center justify-between transition-all duration-300 px-6 py-1 bg-primary border-b border-b-primary-foreground  max-lg:hidden'
      )}>
        <WebNameLogo size='regular' wrap_text />
        <div className="flex flex-row gap-0">
          {
            NavbarItems.map((item, idx) => (
              <NavigationButton
                key={idx}
                title={item.title}
                icon={item.icon}
                href={item.href}
                subNav={item.subNav}
              />
            ))
          }
        </div>
        <ProfileButton />
      </nav>
      {/* Mobile Trigger */}
      <Button
        type="button"
        variant="default"
        size='icon'
        className="fixed top-16 right-3 z-30 rounded-full bg-primary border-2 border-primary-foreground [&_svg]:size-6 lg:hidden"
        onClick={handleShowSidebar}
      >
        <Menu className="stroke-3 text-primary-foreground" />
      </Button>
      {/* Mobile */}
      <nav className={cn(
        'fixed flex min-h-full w-64 flex-col justify-between items-center bg-primary px-1 transition-all border-l border-l-primary-foreground duration-300',
        isExpand ? 'right-0 z-50 opacity-100' : '-right-80 z-0 opacity-0'
      )}>
        <div className="flex flex-col w-full pt-6 gap-3">
          <div className="flex w-full items-baseline">
            <Button
              type="button"
              variant="default"
              size='icon'
              className="rounded-full bg-transparent shadow-none [&_svg]:size-6"
              onClick={handleHideSidebar}
            >
              <X className="stroke-3 text-primary-foreground" />
            </Button>
          </div>
          <div className="flex flex-col w-full px-4 items-center">
            <WebNameLogo size="regular" wrap_text={false} handleCloseSideMenu={handleHideSidebar} />
          </div>
          <Separator className="bg-amber-400" />
          <div className="flex flex-col items-baseline justify-start gap-4 px-3 pt-2">
            {
              NavbarItems.map((item, idx) => (
                <NavigationButton
                  key={idx}
                  title={item.title}
                  icon={item.icon}
                  href={item.href}
                  subNav={item.subNav}
                  isNavExpand={isExpand}
                  handleCloseSideMenu={handleHideSidebar}
                />
              ))
            }
          </div>
        </div>
      </nav>
    </>
  )
}