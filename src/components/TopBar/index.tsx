import MenuIcon from "../../assets/menu.svg";
import LanguageIcon from "../../assets/language.svg";
import { setSettingLanguage } from "../../store/slices/settings";
import { useDispatch, useSelector } from "react-redux";
import { Languages } from "../../enums";
import { RootState } from "../../store";

export const TopBar = () => {
  const dispatch = useDispatch();
  const { language } = useSelector((state: RootState) => state.settings);

  const onLanguageClick = () => {
    const newLanguage: Languages =
      language === Languages.ENGLISH ? Languages.SPANISH : Languages.ENGLISH;
    localStorage["language"] = JSON.stringify(newLanguage);

    dispatch(
      setSettingLanguage({
        language: newLanguage,
      })
    );
  };

  return (
    <header className="relative | min-h-[3.75rem] | flex items-center justify-center | flex-none | border-b border-b-gray-dark | bg-white/10 backdrop-blur-sm">
      <button type="button" className="absolute left-0 p-4">
        <img src={MenuIcon} alt="Icon Menu" />
      </button>

      <h1 className="text-center text-2xl font-bold text-gray-light">Graphy</h1>

      <button
        type="button"
        className="absolute right-0 p-4"
        onClick={onLanguageClick}
      >
        <img src={LanguageIcon} alt="Language" />
      </button>
    </header>
  );
};
