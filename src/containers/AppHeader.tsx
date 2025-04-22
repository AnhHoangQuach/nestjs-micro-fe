import { Menu as MenuIcon } from '@mui/icons-material'
import { AppBar, Box, Divider, Drawer, IconButton, Toolbar } from '@mui/material'
import { AppMenu, AppBreadcrumb } from 'containers'
import { useResponsive } from 'hooks'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { privateRoute } from 'routes'

const AppHeader = () => {
  const location = useLocation()
  const { isDesktop, isMobile } = useResponsive()

  const [openDrawer, setOpenDrawer] = useState(false)

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
        </Toolbar>
      </AppBar>
    </>
  )
}

export default AppHeader
