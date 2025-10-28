import { ACCESS_TOKEN_KEY } from '@client/constants'
import { api } from '@client/libs/api'
import useUserStore from '@client/store/user'
import { useState } from 'react'
import { Link, Links, useNavigate } from 'react-router'

const LoginPage = () => {
	const [formData, setFormData] = useState({
		username: '',
		password: ''
	})
	const [isLoading, setIsLoading] = useState(false)
	const navigate = useNavigate()
	const { setUser } = useUserStore()
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setFormData((prev) => ({
			...prev,
			[name]: value
		}))
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		try {
			setIsLoading(true)
			const response = await api.api.users.login.post({
				username: formData.username,
				password: formData.password
			})
			if (response.error) {
				const errorMessage =
					(response.error.value as any)?.message ??
					'An unknown error occurred'
				throw new Error(errorMessage)
			}
			const data = (await response.data) as {
				user: {
					id: number
					username: string
					role: string
				}
				jwt: string
			}
			localStorage.setItem(ACCESS_TOKEN_KEY, data.jwt)
			setUser({
				id: data.user.id,
				username: data.user.username,
				role: data.user.role
			})
			navigate('/')
		} catch (error) {
			console.error('Error logging in', error)
			alert(error.message)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8">
				{/* Logo and Title Section */}
				<div className="text-center">
					<div className="flex justify-center mb-6">
						<img
							src="/public/logo.jpeg"
							alt="CodingCat Logo"
							className="h-20 w-20 rounded-full shadow-lg border-4 border-white"
						/>
					</div>
					<h1 className="text-4xl font-bold text-gray-900 mb-2">
						CodingCat
					</h1>
					<h2 className="text-2xl font-semibold text-indigo-600 mb-8">
						Elysia Fullstack Template
					</h2>
				</div>

				{/* Login Form */}
				<div className="bg-white py-8 px-6 shadow-xl rounded-2xl border border-gray-100">
					<form className="space-y-6" onSubmit={handleSubmit}>
						<div>
							<label
								htmlFor="username"
								className="block text-sm font-medium text-gray-700 mb-2"
							>
								Username
							</label>
							<input
								id="username"
								name="username"
								type="text"
								required
								value={formData.username}
								onChange={handleInputChange}
								className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 outline-none"
								placeholder="Enter your email"
							/>
						</div>

						<div>
							<label
								htmlFor="password"
								className="block text-sm font-medium text-gray-700 mb-2"
							>
								Password
							</label>
							<input
								id="password"
								name="password"
								type="password"
								required
								value={formData.password}
								onChange={handleInputChange}
								className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 outline-none"
								placeholder="Enter your password"
							/>
						</div>

						<button
							type="submit"
							disabled={isLoading}
							className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
						>
							{isLoading ? (
								<>
									<svg
										className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
									>
										<circle
											className="opacity-25"
											cx="12"
											cy="12"
											r="10"
											stroke="currentColor"
											strokeWidth="4"
										></circle>
										<path
											className="opacity-75"
											fill="currentColor"
											d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
										></path>
									</svg>
									Signing in...
								</>
							) : (
								'Sign in'
							)}
						</button>
					</form>

					{/* Sign up link */}
					<div className="mt-6 text-center">
						<p className="text-sm text-gray-600">
							Don't have an account?{' '}
							<Link
								to="/register"
								className="font-medium text-indigo-600 hover:text-indigo-500 transition duration-200"
							>
								Sign up here
							</Link>
						</p>
					</div>
				</div>

				{/* Footer */}
				<div className="text-center text-sm text-gray-500">
					<p>
						&copy; 2024 CodingCat Elysia Fullstack. All rights
						reserved.
					</p>
				</div>
			</div>
		</div>
	)
}

export default LoginPage
