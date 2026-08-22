import { Link } from "react-router";
import { Text } from "../helper/text";
import { Button } from "./button";
import { FaGithub } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="flex flex-col w-full h-fit px-2.5 pt-2.5 gap-3 items-center justify-baseline bg-primary border-t border-t-primary-foreground">
      <div className="flex flex-col w-full h-fit items-center justify-baseline gap-1.5">
        <Text type='btn' lineHeight={5} weight='semibold' className="text-center text-primary-foreground">
          © 2026 Bandori-Tales
        </Text>
        <Text type='c' lineHeight={4} weight='medium' className="text-center text-primary-foreground">
          Bandori-Tales is not affiliated with BanG Dream! Project, Bushiroad, nor From Tokyo. All images and data belongs to their respective owners.
        </Text>
      </div>
      <div className="flex flex-row items-center justify-center gap-6">
        <Button
          asChild
          variant='ghost'
          className="p-0 m-0 text-primary-foreground hover:bg-transparent hover:text-amber-400"
          leftIcon={<FaGithub />}
        >
          <Link
            to='https://github.com/afif1731/bandori-tales-frontend'
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </Link>
        </Button>
      </div>
    </footer>
  )
}