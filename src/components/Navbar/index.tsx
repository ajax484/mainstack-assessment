import { Link, useLocation } from "react-router-dom";
import { NAVBAR_LINKS, SECONDARY_LINKS } from "@/constants";
import { cn } from "@/lib/utils";
import { useFetch } from "@/hooks/use-fetch";
import type { UserData } from "@/typings";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "../ui/skeleton";

function Navbar() {
  const location = useLocation();

  const { data: userData, loading: userDataIsLoading } = useFetch<UserData>(
    "https://fe-task-api.mainstack.io/user"
  );

  console.log(userData, "user data");

  console.log(location);
  return (
    <header className="mx-4 bg-white flex fixed inset-x-0 top-4 border-2 border-white px-8 h-16 items-center justify-between rounded-full navbar z-[49]">
      <img src="./images/mainstack-logo.svg" alt="mainstack logo" />

      <nav>
        <ul className="flex items-center gap-5">
          {NAVBAR_LINKS.map((link) => (
            <li key={link.name}>
              <Link
                to={link.href}
                className={cn(
                  "flex items-center gap-1 px-4 rounded-full h-10",
                  location.pathname === link.href
                    ? "bg-TK-black text-white"
                    : "text-TK-nav__item"
                )}
              >
                <img src={link.icon} alt={link.name} />
                <span className="text-lg font-semibold">{link.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex items-center">
        <button className="w-10 h-10">
          <img src="./images/notifications.svg" alt="notifications" />
        </button>
        <button className="w-10 h-10">
          <img src="./images/icon.svg" alt="comments" />
        </button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="bg-gray-100 flex items-center gap-4 pl-1 pr-2 py-1 rounded-full">
              <div className="avi">
                <span className="text-sm font-semibold">
                  {userData
                    ? userData?.first_name[0] + userData?.last_name[0]
                    : "OJ"}
                </span>
              </div>
              <img src="./images/menu.svg" alt="profile" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[300px] !flex !flex-col !gap-2"
            align="end"
          >
            <DropdownMenuLabel>
              <div className="flex items-center gap-4">
                <div className="avi">
                  <span className="text-xl font-semibold">
                    {userData
                      ? userData?.first_name[0] + userData?.last_name[0]
                      : "OJ"}
                  </span>
                </div>
                <div className="flex flex-col">
                  {userDataIsLoading ? (
                    <Skeleton className="w-full h-4" />
                  ) : (
                    <h2 className="font-semibold text-xl">
                      {userData?.first_name} {userData?.last_name}
                    </h2>
                  )}
                  {userDataIsLoading ? (
                    <Skeleton className="w-full h-3.5" />
                  ) : (
                    <span className="text-TK-gray">{userData?.email}</span>
                  )}
                </div>
              </div>
            </DropdownMenuLabel>

            {SECONDARY_LINKS.map(({ name, Icon }) => (
              <DropdownMenuItem key={name} className="flex gap-4 items-center py-4">
                <Icon size={20} weight="bold" className="text-TK-black" />
                <span className="text-TK-black">{name}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

export default Navbar;
