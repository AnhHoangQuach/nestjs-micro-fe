import { Box } from '@mui/material'
import { AppHeader } from 'containers'
import { useResponsive } from 'hooks'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import { profileSelector } from 'reducers/profileSlice'
import { authRoute, privateRoute } from 'routes'

const PrivateLayout = () => {
  const navigator = useNavigate()
  const { isDesktop } = useResponsive()
  const { isLoggedIn } = useSelector(profileSelector)

  useEffect(() => {
    if (!isLoggedIn) {
      navigator(authRoute.login.url, { replace: true })
    }
  }, [isLoggedIn, navigator])

  return (
    <main className="flex flex-col" style={isDesktop ? { marginLeft: '320px' } : {}}>
      <AppHeader />
      <Box
        className="px-4 py-6 sm:px-6"
        flex={1}
        id="page"
        overflow="auto"
        sx={{
          minHeight: {
            sm: `calc(100vh - 64px)`,
            xs: `calc(100vh - 56px)`,
          },
        }}
      >
        <Routes>
          {Object.values(privateRoute).map(({ component: Element, path }) => (
            <Route element={<Element />} key={path} path={path} />
          ))}
          <Route element={<Navigate to={privateRoute.home.path} />} path="*" />
        </Routes>
      </Box>
    </main>
  )
}

export default PrivateLayout
