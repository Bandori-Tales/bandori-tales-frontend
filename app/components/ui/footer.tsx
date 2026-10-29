import { Link, NavLink } from "react-router";
import { Text } from "../helper/text";
import { Button } from "./button";
import { FaGithub } from "react-icons/fa6";
import type { ReactNode } from "react";

function FooterButton({
  text,
  linkUrl,
  blankTarget,
  leftIcon
}: {
  text: string;
  linkUrl: string;
  blankTarget?: boolean;
  leftIcon?: ReactNode;
}) {
  return (
    <Button
      asChild
      variant='ghost'
      className="px-3 m-0 flex text-primary-foreground transition-colors hover:bg-transparent hover:text-secondary"
      leftIcon={leftIcon}
    >
      {
        blankTarget ? (
          <Link
            to={linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-0"
          >
            <Text type='btn'>
              {text}
            </Text>
          </Link>
        ) : (
          <NavLink
            to={linkUrl}
            className='p-0'
          >
            <Text type='btn'>
              {text}
            </Text>
          </NavLink>
        )
      }
    </Button>
  )
}

export default function Footer() {
  return (
    <footer className="flex flex-col w-full h-fit px-2.5 pt-2.5 items-center justify-start bg-primary border-t-2 border-t-primary-foreground">
      <div className="flex flex-col w-full h-fit items-center justify-start gap-1.5">
        <Text type='btn' lineHeight={5} weight='semibold' className="text-center text-primary-foreground">
          © 2026 Bandori-Tales
        </Text>
        <Text type='c' lineHeight={4} weight='medium' className="text-center text-primary-foreground">
          Bandori-Tales is not affiliated with BanG Dream! Project, Bushiroad, and From Tokyo. All images and data belongs to their respective owners.
        </Text>
      </div>
      <div className="flex flex-row items-center justify-center gap-0">
        <FooterButton
          text="Github"
          linkUrl="https://github.com/Bandori-Tales/bandori-tales-frontend"
          blankTarget
          leftIcon={<FaGithub />}
        />

        <div className="border-x border-x-primary-foreground h-4 w-px" />

        <FooterButton
          text="Credits"
          linkUrl="/about/credits"
        />
        
        <div className="border-x border-x-primary-foreground h-4 w-px" />

        <FooterButton
          text="Terms & Policies"
          linkUrl="/about/terms-and-policies"
        />
      </div>
    </footer>
  )
}