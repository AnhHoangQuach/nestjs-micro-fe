import { Logout, Menu as MenuIcon } from '@mui/icons-material'
import { AppBar, Avatar, Box, Button, Divider, Drawer, IconButton, Toolbar, Tooltip } from '@mui/material'
import { AppMenu, AppBreadcrumb } from 'containers'
import { useResponsive } from 'hooks'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { profileSelector, signOut } from 'reducers/profileSlice'
import { privateRoute } from 'routes'

const AppHeader = () => {
  const location = useLocation()
  const { isDesktop, isMobile } = useResponsive()

  const [openDrawer, setOpenDrawer] = useState(false)
  const { user, isLoggedIn } = useSelector(profileSelector);
  const dispatch = useDispatch()

  useEffect(() => {
    setOpenDrawer(false)
  }, [location])

  return (
    <>
      <Drawer
        anchor="left"
        onClose={() => setOpenDrawer(false)}
        open={isDesktop ? true : openDrawer}
        PaperProps={{ style: { padding: '8px 16px', width: '320px' } }}
        variant={isDesktop ? 'persistent' : 'temporary'}
      >
        <Box className="flex justify-center items-center mb-2 h-12 gap-3">
          <Link to={privateRoute.home.path}>
            <img className="h-[40px]" src="vite.svg" />
          </Link>
        </Box>
        <Divider />
        <AppMenu />
      </Drawer>

      <AppBar color="inherit" elevation={1} position="sticky">
        <Toolbar>
          {!isDesktop && (
            <IconButton onClick={() => setOpenDrawer(true)}>
              <MenuIcon />
            </IconButton>
          )}
          <Box className="flex-1">{!isMobile && <AppBreadcrumb />}</Box>
          {isLoggedIn ? (
            <div className="flex-1 flex items-center gap-3 justify-end">
              <Avatar className="mr-2">{user?.name.charAt(0).toUpperCase()}</Avatar>
              <Tooltip title="Đăng xuất">
                <IconButton onClick={() => dispatch(signOut())}>
                  <Logout />
                </IconButton>
              </Tooltip>
            </div>
          ) : (
            <Button variant="outlined">Login</Button>
          )}
        </Toolbar>
      </AppBar>
    </>
  )
}

export default AppHeader
