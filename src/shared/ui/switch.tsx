import { Root, Thumb } from "@radix-ui/react-switch";

import { cn } from "@/shared/lib/shadcn";

interface SwitchProps
  extends Omit<React.ComponentProps<typeof Root>, "onChange"> {
  onChange?: (a: { name: string; checked: boolean }) => void;
}

function Switch({ className, name = "", onChange, ...props }: SwitchProps) {
  const onCheckedChange = (checked: boolean) => onChange?.({ name, checked });

  return (
    <Root
      data-slot="switch"
      className={cn(
        "peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-input focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      name={name}
      onCheckedChange={onCheckedChange}
      {...props}
    >
      <Thumb
        data-slot="switch-thumb"
        className={cn(
          "bg-background dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block size-4 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0",
        )}
      />
    </Root>
  );
}

export { Switch };
