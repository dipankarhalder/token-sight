import { IChildren } from "@/interface";
import { Header } from "@/components/shared/header";

export default function Publiclayout({ children }: Readonly<IChildren>) {
  return (
    <div className="flex flex-col">
      <Header />
      <div className="flex py-4 px-8">{children}</div>
    </div>
  );
}
