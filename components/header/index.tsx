"use client";

import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
  return (
    <header className="flex item-center justify-center gap-5 p-4 bg-red-500">
      <h3 onClick={() => router.push("/")}>Home</h3>
      <h3 onClick={() => router.push("/about")}>About</h3>
      <h3 onClick={() => router.push("/contact")}>Contact</h3>
      <div onClick={() => router.back()}>Back</div>
    </header>
  );
};

export default Header;
