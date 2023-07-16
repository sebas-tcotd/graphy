import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Languages } from "../../../enums";

interface SettingsState {
  language: Languages;  
}

export const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    language: Languages.ENGLISH,
  } as SettingsState,
  reducers: {
    setSettingsLanguage: (state, { payload }: PayloadAction<SettingsState>) => {
      state.language = payload.language;
    },
  },
});

export const { setSettingsLanguage: setSettingLanguage } =
  settingsSlice.actions;
