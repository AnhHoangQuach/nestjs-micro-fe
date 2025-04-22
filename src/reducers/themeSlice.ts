import { PaletteMode } from "@mui/material"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { RootState } from "./store"

type SwitchThemePayload = {
  mode: PaletteMode
}

type ThemeState = {
  mode: PaletteMode
}

const initialState: ThemeState = {
  mode: "light",
}

export const themeSlice = createSlice({
  initialState,
  name: "theme",
  reducers: {
    switchTheme: (state, { payload }: PayloadAction<SwitchThemePayload>) => {
      return { ...state, ...payload }
    },
  },
})

export const { switchTheme } = themeSlice.actions
export const themeSelector = ({ theme }: RootState) => theme
