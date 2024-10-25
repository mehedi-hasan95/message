import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { DomainForm } from "./domain-form";
import { cn } from "@/lib/utils";
import { useState } from "react";

type Props = {
  onOpen: JSX.Element;
  title: string;
  className?: string;
};

export const AppDrawer = ({ onOpen, title, className }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger className={cn(className)} onClick={() => setIsOpen(true)}>
        {onOpen}
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>{title}</DrawerTitle>
          </DrawerHeader>
          <DomainForm onSuccess={handleClose} />
        </div>
      </DrawerContent>
    </Drawer>
  );
};
