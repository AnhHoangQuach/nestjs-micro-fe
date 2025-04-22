import { Box } from '@mui/material'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import { profileSelector } from 'reducers/profileSlice'
import { authRoute } from 'routes'
import privateRoute from 'routes/privateRoute'

const AuthLayout = () => {
  const navigate = useNavigate()
  const { isLoggedIn } = useSelector(profileSelector)

  useEffect(() => {
    if (isLoggedIn) {
      navigate(privateRoute.home.path, { replace: true })
    }
  }, [isLoggedIn, navigate])

  return (
    <main>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
        }}
        className="h-screen bg-black/5"
      >
        <Routes>
          {Object.values(authRoute).map(({ component: Element, path }) => (
            <Route element={<Element />} key={path} path={path} />
          ))}
          <Route element={<Navigate to={authRoute.login.url} />} path="*" />
        </Routes>
      </Box>
    </main>
  )
}

export default AuthLayout
