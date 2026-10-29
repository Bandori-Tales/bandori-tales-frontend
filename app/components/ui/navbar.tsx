import { cn, handleCharacterPick } from "@/lib/utils";
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
import type { ProfileSetting } from "@/schemas/models";
import Image from "../helper/image";

interface NavbarButtonProps {
  isActive?: boolean;
  isNavExpand?: boolean;
  handleCloseSideMenu?: () => void;
}

function NavigationButton({ title, icon: Icon, href, subNav, isActive: propIsActive, isNavExpand, handleCloseSideMenu}: NavbarItem & NavbarButtonProps) {
  const { pathname } = useLocation();
  const [isCollapsibleOpen, setIsCollapsibleOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const isActive = propIsActive ?? pathname.includes(href);

  function handleClose() {
    setIsCollapsibleOpen(false);
    setIsDropdownOpen(false);
    handleCloseSideMenu?.();
  }

  return (
    title === 'Bandori' ? (
      <>
        {
          isNavExpand ? (
            <Collapsible
              open={isCollapsibleOpen}
              onOpenChange={(open) => setIsCollapsibleOpen(open)}
              className="flex w-full flex-col"
            >
              <CollapsibleTrigger className={cn(
                    'flex w-full h-fit items-center justify-between cursor-pointer gap-2 bg-transparent transition-colors text-primary-foreground hover:text-secondary'
                  )}>
                  <div className="flex flex-row w-full items-center justify-start gap-2">
                    {Icon && (
                      <Icon className="stroke-3 size-5" />
                    )}
                    <Text type='st2' lineHeight={7} weight='semibold'>
                      {title}
                    </Text>
                  </div>
                  <ChevronDown className={cn("stroke-3 size-7 transition-transform", isCollapsibleOpen ? 'rotate-180' : 'rotate-0')} />
              </CollapsibleTrigger>
              <CollapsibleContent className={cn(
                "flex flex-col gap-1 pl-3 ml-2 mt-2 border-l-2 border-primary-foreground",
                "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-top-10 data-[state=closed]:fade-out-0 data-[state=open]:slide-in-from-top-10 data-[state=open]:fade-in-0"
              )}>
                {
                  subNav && subNav.items.map((item, id) => {
                    const isSubActive = pathname.includes(item.href);

                    return (
                      item.isDisabled ? (
                        <button
                          key={id}
                          className="flex w-full py-1 px-2 items-center gap-2 bg-transparent text-primary-foreground opacity-50"
                          onClick={handleClose}
                          disabled={item.isDisabled}
                        >
                          {
                            item.icon && (<item.icon className="text-primary-foreground stroke-3 size-4" />)
                          }
                          <Text type='p' weight={isSubActive ? 'bold' : 'semibold'} lineHeight={6} >
                            {item.title}
                          </Text>
                        </button>
                      ) : (
                        <Link to={item.href} key={id} className={cn("focus:bg-amber-400 transition-colors py-1 px-2 rounded-md", isSubActive ? 'bg-amber-400' : 'bg-transparent')}>
                          <button
                            className="flex w-full items-center gap-2 bg-transparent text-primary-foreground"
                            onClick={handleClose}
                            disabled={item.isDisabled}
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
                    )
                  })
                }
              </CollapsibleContent>
            </Collapsible>
          ) : (
            <DropdownMenu open={isDropdownOpen} onOpenChange={(open) => setIsDropdownOpen(open)}>
              <DropdownMenuTrigger className={cn(
                    'flex w-36 h-fit items-center justify-center cursor-pointer gap-2 bg-transparent transition-colors text-primary-foreground hover:text-secondary'
                  )}>
                  {Icon && (
                    <Icon className="stroke-3 size-5" />
                  )}
                  <Text type='st2' lineHeight={6} weight='semibold'>
                    {title}
                  </Text>
                  <ChevronDown className="stroke-3 size-6" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-primary border border-primary-foreground text-primary-foreground">
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
                        <DropdownMenuItem key={id} disabled={item.isDisabled} className={cn("mb-1 focus:bg-secondary transition-colors", isSubActive ? 'bg-secondary' : 'bg-transparent')}>
                          <Link to={item.href}>
                            <button
                              className="flex w-full items-center gap-2 bg-transparent text-primary-foreground"
                              onClick={handleClose}
                              disabled={item.isDisabled}
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
            'flex h-fit cursor-pointer gap-2 bg-transparent transition-colors hover:text-secondary',
            isActive ? 'text-secondary' : 'text-primary-foreground',
            isNavExpand ? 'w-full items-center justify-start' : 'w-36 items-center justify-center'
          )}
          onClick={handleClose}
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

function ProfileButton({
  profile_picture_url,
  handleCloseSidebar
}: {
  profile_picture_url?: string;
  handleCloseSidebar?: () => void;
}) {
  return (
    <div className="flex items-center justify-end h-fit w-25 max-lg:w-full max-lg:px-3">
      <Button
        variant='ghost'
        size='icon'
        asChild
        className="ring-2 ring-transparent hover:ring-amber-400 max-lg:p-2 max-lg:w-full overflow-clip rounded-full bg-none max-lg:bg-white max-lg:rounded-md transition-all"
        onClick={() => handleCloseSidebar?.()}
      >
        <Link to='/profile' className="flex items-center justify-center">
          {
            profile_picture_url ? (
              <Image alt="User Profile" src={profile_picture_url} className="rounded-full object-cover max-lg:size-8" />
            ) : (
              <UserRound className="stroke-3 text-primary-foreground max-lg:text-primary" />
            )
          }
          <div className="hidden max-lg:block">
            <Text type='p' weight='semibold' className="text-primary">Profile</Text>
          </div>
        </Link>
      </Button>
    </div>
  )
}

export default function Navbar({
  userProfile
}: {
  userProfile: ProfileSetting
}) {
  const [isExpand, setIsExpand] = useState(false);
  const profilePictureUrl = userProfile.profile_picture_character_id ? handleCharacterPick('profile_picture_url', userProfile.profile_picture_character_id, userProfile.profile_picture_array_index) : undefined;

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
        'fixed top-0 z-30 w-full h-fit flex flex-row items-center justify-between transition-all px-6 py-1 bg-primary border-b-2 border-b-primary-foreground max-lg:hidden'
      )}>
        <WebNameLogo size='regular' wrapText />
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
        <ProfileButton profile_picture_url={profilePictureUrl} />
      </nav>
      {/* Mobile Trigger */}
      <Button
        type="button"
        variant="default"
        size='icon'
        className="fixed top-24 right-3 z-30 rounded-full bg-primary border-2 border-primary-foreground [&_svg]:size-6 lg:hidden"
        onClick={handleShowSidebar}
      >
        <Menu className="stroke-3 text-primary-foreground" />
      </Button>
      {/* Mobile */}
      <nav className={cn(
        'fixed flex min-h-full w-64 flex-col justify-between items-center bg-primary px-1 transition-all border-l border-l-primary-foreground',
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
            <WebNameLogo size="regular" wrapText={false} handleCloseSideMenu={handleHideSidebar} />
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

        <div className="w-full h-fit flex flex-col gap-y-2 py-3">
          <Separator className="bg-amber-400" />
          <ProfileButton profile_picture_url={profilePictureUrl} handleCloseSidebar={handleHideSidebar} />
        </div>
      </nav>
    </>
  )
}