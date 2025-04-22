import { Home } from "@mui/icons-material"
import { Breadcrumbs, IconButton, Typography } from "@mui/material"
import { useLocation, useNavigate } from "react-router-dom"
import { privateRoute } from "routes"
const AppBreadcrumb = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const routes = (location.pathname.match(/\/[\w-]*/g) ?? [])
    .map((_, index, array) => array.slice(0, index + 1).join(""))
    .map((item) => Object.values(privateRoute).find((route) => item === route.path))
    .filter((item) => item?.name)

  return (
    <Breadcrumbs>
      <IconButton disabled>
        <Home color="primary" />
      </IconButton>
      {routes.map((item, index) => {
        const isActive = location.pathname === item?.path

        return (
          <Typography
            className={` ${isActive ? "" : "cursor-pointer hover:opacity-80"} transition duration-200`}
            color="primary"
            key={index}
            onClick={() => {
              if (!isActive && item?.path) navigate(item.path)
            }}
            variant="h5"
          >
            {item?.name}
          </Typography>
        )
      })}
    </Breadcrumbs>
  )
}

export default AppBreadcrumb
