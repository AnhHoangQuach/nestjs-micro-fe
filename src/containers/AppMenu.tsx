import { ArrowDropDown, ArrowRight, Home, NewReleases, Shop } from '@mui/icons-material'
import {
  alpha,
  Box,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
} from '@mui/material'
import { JSX, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { profileSelector } from 'reducers/profileSlice'
import { privateRoute } from 'routes'

const StyledListItem = styled(ListItemButton)(({ theme }) => ({
  '.MuiListItemIcon-root': {
    marginRight: 8,
    minWidth: 0,
  },
  '.MuiListItemText-primary': {
    fontWeight: 700,
  },
  '&.MuiListItemButton-root.Mui-selected': {
    backgroundColor: alpha(theme.palette.primary.main, 0.2),
  },
  '&.MuiListItemButton-root.MuiButtonBase-root:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.3),
  },
  borderRadius: 8,
}))

type SubMenuType = {
  name?: JSX.Element | string
  path: string
}

type MenuItemProps = {
  icon?: JSX.Element
  items?: SubMenuType[]
  name?: JSX.Element | string
  path: string
}

const MenuItem = ({ icon, items, name, path }: MenuItemProps) => {
  const location = useLocation()
  const [open, setOpen] = useState(location.pathname.startsWith(path))

  const isHome = path === '/'
  const isContain = location.pathname.startsWith(path)
  const isSelected = isHome ? location.pathname === path : isContain

  return (
    <Box>
      {items ? (
        <StyledListItem onClick={() => setOpen(!open)} selected={isContain}>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText>{name}</ListItemText>
          {!open ? <ArrowRight /> : <ArrowDropDown />}
        </StyledListItem>
      ) : (
        <Link to={path}>
          <StyledListItem selected={isSelected}>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText>{name}</ListItemText>
          </StyledListItem>
        </Link>
      )}

      {items && (
        <Collapse in={open}>
          <List
            className="ml-4 mt-2 flex flex-col gap-2"
            disablePadding
            sx={{
              '.Mui-selected > .MuiListItemIcon-root:before': {
                opacity: 1,
              },
              '.MuiListItemButton-root': {
                padding: '6px 16px',
              },
              '.MuiListItemIcon-root:before': {
                backgroundColor: 'var(--color-primary-main)',
                borderRadius: 4,
                content: "''",
                height: 8,
                opacity: 0.2,
                width: 8,
              },
            }}
          >
            {items?.map((sub, index) => (
              <MenuItem key={index} {...sub} />
            ))}
          </List>
        </Collapse>
      )}
    </Box>
  )
}

const AppMenu = () => {
  const { user } = useSelector(profileSelector)
  return (
    <List className="flex flex-col gap-2">
      <MenuItem {...privateRoute.home} icon={<Home />} />
      <MenuItem {...privateRoute.order} icon={<Shop />} />
      {user?.role === 'admin' && <MenuItem {...privateRoute.product} icon={<NewReleases />} />}
    </List>
  )
}

export default AppMenu
