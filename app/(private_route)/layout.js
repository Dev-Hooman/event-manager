import Sidebar from "@/components/core/Sidebar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);

  console.log("Session: ", session);

  if (!session?.user) {
    redirect("/login");
  }

  if (
    session?.user?.role === "superadmin" ||
    session?.user?.role === "vendor"
  ) {
    return (
      <div className="h-full">
        <Sidebar>{children}</Sidebar>
      </div>
    );
  } else {
    redirect("/");
  }
}
