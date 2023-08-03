import { LayoutTypes } from "../../enums/LayoutTypes";

export interface LayoutData {
  layoutName: string;
  Icon: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
    }
  >;
  type: LayoutTypes;
}
