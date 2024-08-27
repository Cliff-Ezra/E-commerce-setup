import { ReactNode } from "react";

/**
 * Represents a collection of dashboard navigation links.
 * Each link is an object with label, path, and icon properties.
 */
export type DashboardLinkType = readonly {
  /** The text to display for the navigation item */
  readonly label: string;
  /** The URL path that the navigation item links to */
  readonly path: string;
  /** The icon component to display alongside the label */
  readonly icon: ReactNode;
}[];
