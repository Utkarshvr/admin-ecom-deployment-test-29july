import { ReactNode } from "react";
import { Label } from "../ui/label";

type Props = { children: ReactNode; label: string };

export default function FormItemWrapper({ children, label }: Props) {
  return (
    <div className="grid w-full items-center gap-1.5">
        <Label>{label}</Label>
      {children}
    </div>
  );
}
