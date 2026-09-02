import { cn } from "@/lib/utils";
import { Text } from "../helper/text";

type BadgeProps = {
  textColor: string;
  background: string;
  border: string;
};

function Badge({textColor, background, border, title }: BadgeProps & { title: string}) {
  return (
      <div
        className={cn(
          'flex h-fit w-fit rounded-xl border-2 px-1.5',
          border,
          background
        )}
      >
        <Text
          type="c"
          lineHeight={4}
          weight="medium"
          className={cn('text-center', textColor)}
        >
          { title }
        </Text>
      </div>
    );
}

export { Badge, type BadgeProps }