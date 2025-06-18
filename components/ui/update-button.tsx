import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "./button";
import { Edit } from "lucide-react";

export default function UpdateButton({ onClick }: { onClick?: () => void }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            className="text-muted-foreground hover:text-primary"
            variant="ghost"
            size="icon"
            onClick={onClick}
          >
            <Edit size={16} strokeWidth={1.2} />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Update</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
