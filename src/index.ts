import { Elysia } from 'elysia'
import { staticPlugin } from '@elysiajs/static'
import { initORM } from './db'
import { RequestContext } from '@mikro-orm/core'
import responseMiddleware from './middlewares/response-middleware'
import errorMiddleware from './middlewares/error-middleware'
import userController from './controllers/user.controller'
import swagger from '@elysiajs/swagger'
//init database connection
const dataSource = await initORM()
//sync entities class to database
await dataSource.orm.getSchemaGenerator().updateSchema();
export const app = new Elysia()
	.use(swagger(
		{
			path: '/api-docs',
			provider: 'swagger-ui',
			documentation: {
				info: {
					title: 'Elysia fullstack template',
					description: 'Elysia fullstack template API Documentation',
					version: '1.0.0',
				},
				components: {
					securitySchemes: {
						JwtAuth: {
							type: 'http',
							scheme: 'bearer',
							bearerFormat: 'JWT',
							description: 'Enter JWT Bearer token **_only_**'
						}
					}
				},
			},
			swaggerOptions: {
				persistAuthorization: true,
			}
		}
	))
	.use(
		await staticPlugin({
			prefix: '/',
			assets: './client',
		})
	)
	.group("/api", group =>
		group
			.onBeforeHandle(() => RequestContext.enter(dataSource.em))
			.onAfterHandle(responseMiddleware)
			.onError(errorMiddleware)
			.use(userController)
		//add more controllers here
	)



	.listen(+process.env.PORT ?? 3000)

console.log(
	`Server started open http://${app.server?.hostname}:${app.server?.port} in the browser`
)
console.log(
	`API can be found at  http://${app.server?.hostname}:${app.server?.port}/api/docs in the browser`
)
