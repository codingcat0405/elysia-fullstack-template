import useUserStore from '@client/store/user'

const HomePage = () => {
	const { user } = useUserStore()

	return (
		<div className="min-h-screen bg-gray-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				{/* Welcome Section */}
				<div className="mb-8">
					<h1 className="text-3xl font-bold text-gray-900 mb-2">
						Welcome back, {user?.username}!
					</h1>
					<p className="text-gray-600">
						You're successfully logged into the CodingCat Elysia
						Fullstack Template
					</p>
				</div>

				{/* User Information Card */}
				<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
					<h2 className="text-xl font-semibold text-gray-900 mb-4">
						User Information
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						<div className="bg-gray-50 rounded-lg p-4">
							<dt className="text-sm font-medium text-gray-500">
								User ID
							</dt>
							<dd className="mt-1 text-lg font-semibold text-gray-900">
								{user?.id || 'N/A'}
							</dd>
						</div>
						<div className="bg-gray-50 rounded-lg p-4">
							<dt className="text-sm font-medium text-gray-500">
								Username
							</dt>
							<dd className="mt-1 text-lg font-semibold text-gray-900">
								{user?.username || 'N/A'}
							</dd>
						</div>
						<div className="bg-gray-50 rounded-lg p-4">
							<dt className="text-sm font-medium text-gray-500">
								Role
							</dt>
							<dd className="mt-1">
								<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
									{user?.role || 'N/A'}
								</span>
							</dd>
						</div>
					</div>
				</div>

				{/* Template Features Section */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
					{/* Hot Reload Feature */}
					<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
						<div className="flex items-center mb-4">
							<div className="flex-shrink-0">
								<div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
									<svg
										className="w-5 h-5 text-green-600"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
										/>
									</svg>
								</div>
							</div>
							<h3 className="ml-3 text-lg font-medium text-gray-900">
								Hot Reload with Bun
							</h3>
						</div>
						<p className="text-gray-600 mb-4">
							Lightning-fast development with Bun's built-in hot
							module reloading. No Vite, Webpack, or other
							bundlers needed!
						</p>
						<div className="bg-gray-50 rounded-lg p-3">
							<code className="text-sm text-gray-800">
								bun run --watch src/index.ts
							</code>
						</div>
					</div>

					{/* Eden Treaty Feature */}
					<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
						<div className="flex items-center mb-4">
							<div className="flex-shrink-0">
								<div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
									<svg
										className="w-5 h-5 text-blue-600"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
										/>
									</svg>
								</div>
							</div>
							<h3 className="ml-3 text-lg font-medium text-gray-900">
								Eden Treaty Type Safety
							</h3>
						</div>
						<p className="text-gray-600 mb-4">
							End-to-end type safety between frontend and backend.
							Automatic TypeScript types generated from your
							Elysia API.
						</p>
						<div className="bg-gray-50 rounded-lg p-3">
							<code className="text-sm text-gray-800">
								api.api.users.login.post({'{'}) // Fully typed!
							</code>
						</div>
					</div>

					{/* Tailwind CSS Feature */}
					<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
						<div className="flex items-center mb-4">
							<div className="flex-shrink-0">
								<div className="w-8 h-8 bg-cyan-100 rounded-lg flex items-center justify-center">
									<svg
										className="w-5 h-5 text-cyan-600"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"
										/>
									</svg>
								</div>
							</div>
							<h3 className="ml-3 text-lg font-medium text-gray-900">
								Tailwind CSS
							</h3>
						</div>
						<p className="text-gray-600 mb-4">
							Utility-first CSS framework for rapid UI
							development. Beautiful, responsive designs with
							minimal custom CSS.
						</p>
						<div className="bg-gray-50 rounded-lg p-3">
							<code className="text-sm text-gray-800">
								className="bg-indigo-600 hover:bg-indigo-700"
							</code>
						</div>
					</div>

					{/* Elysia Backend Feature */}
					<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
						<div className="flex items-center mb-4">
							<div className="flex-shrink-0">
								<div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
									<svg
										className="w-5 h-5 text-purple-600"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2"
										/>
									</svg>
								</div>
							</div>
							<h3 className="ml-3 text-lg font-medium text-gray-900">
								Elysia Backend
							</h3>
						</div>
						<p className="text-gray-600 mb-4">
							High-performance TypeScript backend framework. Built
							on Bun runtime for maximum speed and efficiency.
						</p>
						<div className="bg-gray-50 rounded-lg p-3">
							<code className="text-sm text-gray-800">
								app.get('/api/users', handler)
							</code>
						</div>
					</div>
				</div>

				{/* Quick Actions */}
				<div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
					<h3 className="text-lg font-medium text-gray-900 mb-4">
						Quick Actions
					</h3>
					<div className="flex flex-wrap gap-4">
						<button
							onClick={() =>
								window.open(
									'https://elysiajs.com/patterns/fullstack-dev-server.html',
									'_blank'
								)
							}
							className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						>
							Documentation
						</button>
						<a
							href="https://github.com/codingcat0405/elysia-fullstack-template"
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						>
							<svg
								className="w-4 h-4 mr-2"
								fill="currentColor"
								viewBox="0 0 24 24"
							>
								<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
							</svg>
							Give a Star
						</a>
					</div>
				</div>
			</div>
		</div>
	)
}

export default HomePage
