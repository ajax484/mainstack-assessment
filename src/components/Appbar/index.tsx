import { APPBAR_LINKS } from "@/constants";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Appbar() {
  return (
    <aside className="fixed flex justify-center items-center gap-2 left-12 inset-y-0">
      <ul className="app-bar bg-white flex flex-col items-center gap-8 rounded-full w-12 py-4">
        {APPBAR_LINKS.map((link) => (
          <li key={link.name}>
            <Tooltip>
              <TooltipTrigger asChild>
                <img
                  src={link.icon}
                  alt={link.name}
                  className="grayscale-100 hover:grayscale-0 transition duration-150 hover:cursor-pointer"
                />
              </TooltipTrigger>
              <TooltipContent side="right">
                <p className="text-base py-2">{link.name}</p>
              </TooltipContent>
            </Tooltip>
          </li>
        ))}
      </ul>
    </aside>
  );
}
