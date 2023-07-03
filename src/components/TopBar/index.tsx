import MenuIcon from "../../assets/menu.svg";

export const TopBar = () => {
  return (
    <header className="relative | min-h-[3.75rem] | flex items-center justify-center | border-b border-b-gray-dark | bg-white/10 backdrop-blur-sm">
      <button type="button" className="absolute left-0 p-4">
        <img src={MenuIcon} alt="Icon Menu" />
      </button>

      <h1 className="text-center text-2xl font-bold text-gray-light">Graphy</h1>
    </header>
  );
};
