import {
  BugBeetleIcon,
  GearIcon,
  GiftIcon,
  ImagesSquareIcon,
  ScrollIcon,
  SignOutIcon,
  SquaresFourIcon,
  type Icon,
} from "@phosphor-icons/react";

export const NAVBAR_LINKS: {
  name: string;
  href: string;
  icon: string;
}[] = [
  {
    name: "Home",
    icon: "./images/home.svg",
    href: "/home",
  },
  {
    name: "Analytics",
    icon: "./images/insert_chart.svg",
    href: "/analytics",
  },
  {
    name: "Revenue",
    icon: "./images/payments.svg",
    href: "/revenue",
  },
  {
    name: "CRM",
    icon: "./images/group.svg",
    href: "/CRM",
  },
//   {
//     name: "Apps",
//     icon: "./images/widgets.svg",
//     href: "/apps",
//   },
];

export const SECONDARY_LINKS: {
  name: string;
  Icon: Icon;
}[] = [
  {
    name: "Settings",
    Icon: GearIcon,
  },
  {
    name: "Purchase History",
    Icon: ScrollIcon,
  },
  {
    name: "Refer & Earn",
    Icon: GiftIcon,
  },
  {
    name: "Integrations",
    Icon: SquaresFourIcon,
  },
  {
    name: "Report a Bug",
    Icon: BugBeetleIcon,
  },
  {
    name: "Switch Account",
    Icon: ImagesSquareIcon,
  },
  {
    name: "Sign Out",
    Icon: SignOutIcon,
  },
];

export const APPBAR_LINKS: {
  name: string;
  icon: string;
}[] = [
  {
    name: "Link In Bio",
    icon: "./images/link_in_bio.svg",
  },
  {
    name: "Store",
    icon: "./images/store.svg",
  },
  {
    name: "Media Kit",
    icon: "./images/media_kit.svg",
  },
  {
    name: "Invoicing",
    icon: "./images/invoicing.svg",
  },
];
