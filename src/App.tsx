import { QueryClientProvider } from '@tanstack/react-query'
import { SnackbarCloseButton } from 'components'
import AppTheme from 'containers/AppTheme'
import { AuthLayout } from 'layouts'
import PrivateLayout from 'layouts/PrivateLayout'
import { SnackbarProvider } from 'notistack'
import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { store } from 'reducers/store'
import { queryClient } from 'services'

function App() {
  return (
    <Provider store={store}>
      <SnackbarProvider
        action={(snackbarKey) => <SnackbarCloseButton snackbarKey={snackbarKey} />}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        autoHideDuration={5000}
        preventDuplicate
        variant="success"
      >
        <QueryClientProvider client={queryClient}>
          <AppTheme>
            <BrowserRouter>
              <Routes>
                <Route element={<AuthLayout />} path="/auth/*" />
                <Route element={<PrivateLayout />} path="/*" />
              </Routes>
            </BrowserRouter>
          </AppTheme>
        </QueryClientProvider>
      </SnackbarProvider>
    </Provider>
  )
}

export default App
