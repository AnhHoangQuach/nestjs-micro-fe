import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RootState } from './store'

export const profileSlice = createSlice({
  initialState: {
    isLoggedIn: false,
  } as ProfileType,
  name: 'profile',
  reducers: {
    signIn: (state, { payload }: PayloadAction<ProfileType>) => {
      return { ...state, ...payload, isLoggedIn: true }
    },
    signOut: () => {
      const profile = { isLoggedIn: false } as ProfileType
      return profile
    },
  },
})

export const { signIn, signOut } = profileSlice.actions

export const profileSelector = ({ profile }: RootState) => profile
