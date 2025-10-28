import { createRoot } from 'react-dom/client'
import '@client/global.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from 'react-router'
import router from './router'
import useUserStore from './store/user'
import { ACCESS_TOKEN_KEY } from './constants'
import { useEffect } from 'react'
import { api } from './libs/api'

const client = new QueryClient()

function App() {
	const { setUser } = useUserStore()
	const fetchUserInfo = async () => {
		try {
			const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY)
			if (!accessToken) {
				return
			}
			const userResponse = await api.api.users.me.get()
			if(userResponse.error) {
				throw new Error('Failed to fetch user info')
			}
			
			const user: any = userResponse.data
			setUser({
				id: user.id,
				username: user.username,
				role: user.role
			})
		} catch (error) {
			console.error(error)
		}
	}
	useEffect(() => {
		fetchUserInfo()
	}, [])
	return (
		<QueryClientProvider client={client}>
			<RouterProvider router={router} />
		</QueryClientProvider>
	)
}

const root = createRoot(document.getElementById('root')!)
root.render(<App />)
