import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { ACCESS_TOKEN_KEY } from '@client/constants'
import useUserStore from '@client/store/user'

const Header = () => {
	const { user } = useUserStore()
	const [isDropdownOpen, setIsDropdownOpen] = useState(false)
	const navigate = useNavigate()


	const handleLogout = () => {
		// Clear authentication data
		localStorage.removeItem(ACCESS_TOKEN_KEY)
		// Close dropdown
		setIsDropdownOpen(false)

		// Navigate to login page
		navigate('/login')
	}

	const handleProfileClick = () => {
		// Close dropdown
		setIsDropdownOpen(false)

		// TODO: Navigate to profile page when implemented
		console.log('Navigate to profile page')
	}

	return (
		<header className="bg-white shadow-sm border-b border-gray-200">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-16">
					{/* Logo and App Name */}
					<div className="flex items-center space-x-3">
						<img
							src="/public/logo.jpeg"
							alt="CodingCat Logo"
							className="h-10 w-10 rounded-full shadow-sm border-2 border-gray-100"
						/>
						<div>
							<h1 className="text-xl font-bold text-gray-900">
								CodingCat
							</h1>
							<p className="text-xs text-gray-500 -mt-1">
								Elysia Fullstack
							</p>
						</div>
					</div>

					{/* User Avatar and Dropdown */}
					<div className="relative">
						<button
							onClick={() => setIsDropdownOpen(!isDropdownOpen)}
							className="flex items-center space-x-3 text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 hover:bg-gray-50 px-3 py-2 transition duration-200"
						>
							<img
								src="/public/logo.jpeg"
								alt="User Avatar"
								className="h-8 w-8 rounded-full border-2 border-gray-200"
							/>
							<div className="hidden sm:block text-left">
								<p className="font-medium text-gray-900">
									{user?.username || ''}
								</p>
								<p className="text-xs text-gray-500">Online</p>
							</div>
							<svg
								className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${
									isDropdownOpen ? 'rotate-180' : ''
								}`}
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M19 9l-7 7-7-7"
								/>
							</svg>
						</button>

						{/* Dropdown Menu */}
						{isDropdownOpen && (
							<>
								{/* Backdrop */}
								<div
									className="fixed inset-0 z-10"
									onClick={() => setIsDropdownOpen(false)}
								></div>

								{/* Dropdown Content */}
								<div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20 border border-gray-200">
									{/* User Info */}
									<div className="px-4 py-3 border-b border-gray-100">
										<p className="text-sm font-medium text-gray-900">
											{user?.username || ''}
										</p>
										<p className="text-xs text-gray-500 truncate">
											{user?.role || ''}
										</p>
									</div>

									{/* Menu Items */}
									<button
										onClick={handleProfileClick}
										className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition duration-200"
									>
										<svg
											className="mr-3 h-4 w-4 text-gray-400"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
											/>
										</svg>
										Profile
									</button>

									<button
										onClick={handleLogout}
										className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition duration-200"
									>
										<svg
											className="mr-3 h-4 w-4 text-gray-400"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
											/>
										</svg>
										Logout
									</button>
								</div>
							</>
						)}
					</div>
				</div>
			</div>
		</header>
	)
}

export default Header
