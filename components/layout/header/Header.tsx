// components/Header.tsx
import Logo from "./Logo";
import Nav from "./Nav";
import UserMenu from "./UserMenu";

export default function Header() {
  return (
    <header className="w-full bg-white shadow-md py-4 px-6 flex items-center justify-between">
      <div className="flex items-center gap-6">
        <Logo />
      </div>

      <div className="flex-1 flex justify-center">
        <Nav />
      </div>

      <div className="flex items-center gap-4">
        <UserMenu />
      </div>
    </header>
  );
}
