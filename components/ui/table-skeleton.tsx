import { cn } from "@/lib/utils";
import { Skeleton } from "./skeleton";

export default function TableSkeleton({
  count = 10,
  className,
}: {
  count?: number;
  className?: string;
}) {
  return (
    <div className="flex flex-col w-full gap-1 ">
      {Array(count)
        .fill("")
        .map((_, index) => (
          <Skeleton
            key={index}
            className={cn("h-10 rounded-none", className)}
          />
        ))}
    </div>
  );
}
