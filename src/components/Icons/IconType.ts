import { SVGProps } from "react";

export interface Icon extends SVGProps<SVGSVGElement> {
  title?: string;
  width?: number;
  height?: number;
}
