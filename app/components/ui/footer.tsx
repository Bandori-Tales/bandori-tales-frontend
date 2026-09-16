import { Link } from "react-router";
import { Text } from "../helper/text";
import { Button } from "./button";
import { FaGithub } from "react-icons/fa6";
import type { ReactNode } from "react";
import useDialogStore from "@/hooks/store/use-dialog";
import { DIALOG_KEY, FooterCredits, FooterPrivacyPolicies, type Credit } from "@/constants";
import { Dialog, DialogClose, DialogTitle } from "@radix-ui/react-dialog";
import { DialogContent, DialogHeader } from "./dialog";
import { ExternalLink, FileText, Lightbulb, TvMinimalPlay, X, type LucideIcon } from "lucide-react";

function FooterButton({
  text,
  type,
  linkUrl,
  leftIcon,
  handleClick
}: {
  text: string;
  type: 'link' | 'dialog';
  linkUrl?: string;
  leftIcon?: ReactNode;
  handleClick?: () => void;
}) {
  return (
    <Button
      asChild
      variant='ghost'
      className="px-3 m-0 flex text-primary-foreground hover:bg-transparent hover:text-amber-400"
      leftIcon={leftIcon}
      onClick={handleClick}
    >
      {
        type === 'link' ? <Link
        to={linkUrl ?? '/'}
        target="_blank"
        rel="noopener noreferrer"
        className="p-0"
      >
        <Text type='btn'>
        {text}
      </Text>
      </Link> : <Text type='btn'>
        {text}
      </Text>
      }
    </Button>
  )
}

function CreditsSection({ title, icon, items }: { title: string; icon: LucideIcon; items: Credit[]}) {
  const Icon = icon;

  return (
    <div
      className="flex flex-col w-full gap-4"
    >
      <div className="flex flex-row gap-1 items-center">
        <Icon className="size-4 stroke-3 text-accent" />
        <Text type='st2' weight='semibold' className="text-accent text-nowrap">{title}</Text>
      </div>

      <div className="flex flex-col gap-4 pl-5 mr-2">
        {
          items.map((item) => (
            <div
              key={item.name}
              className="flex flex-col gap-1"
            >
              <Link
                to={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-fit flex flex-row items-center gap-1 text-primary pb-0.5 bg-transparent border-b border-b-transparent transition-colors duration-300 hover:bg-transparent hover:border-b-primary"
              >
                <Text type='p' weight='semibold' lineHeight={5} className="underline lg:no-underline">
                  {item.name}
                </Text>
                <ExternalLink className="size-3 stroke-3 hidden lg:block" />
              </Link>
              {
                item.note && <Text type='btn' weight='medium' lineHeight={4} className="text-slate-500">
                {item.note}
              </Text>
              }
            </div>
          ))
        }
      </div>
    </div>
  )
}

function CreditsDialog() {
  const { isOpen, close: closeDialog} = useDialogStore();

  function handleCloseDialog(open: boolean) {
    if(!open) closeDialog(DIALOG_KEY.FOOTER.CREDITS);
  }

  return (
    <Dialog
      open={isOpen[DIALOG_KEY.FOOTER.CREDITS]}
      onOpenChange={(open) => handleCloseDialog(open)}
    >
      <DialogContent
        className='h-160 max-w-sm bg-white sm:h-200 sm:max-w-xl lg:h-150 lg:max-w-4xl'
        showCloseButton={false}
      >
        <DialogClose className="absolute top-4 right-4 rounded-full border-none p-1 shadow-none">
          <X size={18} />
        </DialogClose>

        <DialogHeader className="flex h-fit w-full items-center justify-start">
          <DialogTitle className="font-semibold text-lg">Credits</DialogTitle>
        </DialogHeader>

        <div className="w-full flex flex-col gap-5 h-full overflow-scroll">
          <CreditsSection title="Youtube Uploader" icon={TvMinimalPlay} items={FooterCredits.youtube_uploader} />
          <CreditsSection title="Inspiration" icon={Lightbulb} items={FooterCredits.inspiration} />
          <CreditsSection title="Assets" icon={FileText} items={FooterCredits.assets} />
        </div>
      </DialogContent>
    </Dialog>
  )
}

function PrivacyPoliciesDialog() {
  const { isOpen, close: closeDialog} = useDialogStore();

  function handleCloseDialog(open: boolean) {
    if(!open) closeDialog(DIALOG_KEY.FOOTER.POLICIES);
  }

  return (
    <Dialog
      open={isOpen[DIALOG_KEY.FOOTER.POLICIES]}
      onOpenChange={(open) => handleCloseDialog(open)}
    >
      <DialogContent
        className='h-100 max-w-sm bg-white sm:max-w-xl'
        showCloseButton={false}
      >
        <DialogClose className="absolute top-4 right-4 rounded-full border-none p-1 shadow-none">
          <X size={18} />
        </DialogClose>

        <DialogHeader className="flex h-fit w-full items-center justify-start">
          <DialogTitle className="font-semibold text-lg">Privacy & Policies</DialogTitle>
        </DialogHeader>

        <div className="w-full h-full overflow-scroll">
          <ul className="list-inside list-disc py-3">
            {
              FooterPrivacyPolicies.map((item, index) => (
                <Text key={`privacy_policies_${index}`} type='p' weight='medium' className="text-slate-600 pb-3" lineHeight={5}>
                  <li>
                    {item}
                  </li>
                </Text>
              ))
            }
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default function Footer() {
  const { open: openDialog } = useDialogStore();

  return (
    <footer className="flex flex-col w-full h-fit px-2.5 pt-2.5 items-center justify-start bg-primary border-t border-t-primary-foreground">
      <CreditsDialog />
      <PrivacyPoliciesDialog />

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
          type="link"
          linkUrl="https://github.com/Bandori-Tales/bandori-tales-frontend"
          leftIcon={<FaGithub />}
        />

        <div className="border-x border-x-primary-foreground h-4 w-px" />

        <FooterButton
          text="Privacy & Policies"
          type="dialog"
          handleClick={() => openDialog(DIALOG_KEY.FOOTER.POLICIES)}
        />
        
        <div className="border-x border-x-primary-foreground h-4 w-px" />

        <FooterButton
          text="Credits"
          type="dialog"
          handleClick={() => openDialog(DIALOG_KEY.FOOTER.CREDITS)}
        />
      </div>
    </footer>
  )
}