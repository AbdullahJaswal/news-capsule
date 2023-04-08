import AuthNavbar from "@/components/navbar/AuthNavbar";
import Footer from "@/components/footer/Footer";
import { ReactNode } from "react";

type LayoutProps = {
  children?: ReactNode;
};

export default function DefaultLayout({ children }: LayoutProps) {
  return (
    <section className="flex flex-col mx-auto justify-between h-screen scrollbar-thin scrollbar-thumb-primary scrollbar-thumb-rounded-md">
      <AuthNavbar />
      <main className="mb-auto w-full px-6">{children}</main>
      <Footer />
    </section>
  );
}
