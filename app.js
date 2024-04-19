import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';

// Rutas
import productsRoutes from './src/routes/producto.routes.js';

import typeProductsRoutes from './src/routes/tipo.producto.routes.js';

import productsServiceRoutes from './src/routes/producto.servicio.routes.js';

import productsActivRoutes from './src/routes/producto.activo.routes.js';

import productSubscriptionRoutes from './src/routes/producto.suscripcion.routes.js';

import productComboRoutes from './src/routes/producto.combo.routes.js';

import refComboBoxRoutes from './src/routes/ref.combo.box.routes.js';

import politicasMembresiaRoutes from './src/routes/politicas.membresia.routes.js';

import storeRoutes from './src/routes/almacen.routes.js';

import storeProducRoutes from './src/routes/almacen.producto.routes.js';

import preciosRoutes from './src/routes/precios.routes.js';

// Base de datos
import { Connection } from './src/database/mariadb.database.js';

// Swagger

import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import { options } from './swagger.options.js';

dotenv.config();

const App = {
	main: async () => {
		const app = express();
		const PORT = process.env.PORT || 5000;

		// Middlewares
		app.use(cors());
		app.use(express.json());
		app.use(morgan('dev'));

		// Swagger
		const specs = swaggerJsDoc(options);
		app.use('/docs', swaggerUI.serve, swaggerUI.setup(specs));

		// Initialize Routes

		app.use('/api/v1/productos', productsRoutes);

		app.use('/api/v1/productos/tipo', typeProductsRoutes);

		app.use('/api/v1/productos/servicio', productsServiceRoutes);

		app.use('/api/v1/productos/activo', productsActivRoutes);

		app.use('/api/v1/productos/suscripcion', productSubscriptionRoutes);

		app.use('/api/v1/productos/combo', productComboRoutes);

		app.use('/api/v1/comboBox', refComboBoxRoutes);

		app.use('/api/v1/politicasMembresia', politicasMembresiaRoutes);

		app.use('/api/v1/almacen', storeRoutes);

		app.use('/api/v1/almacen/producto', storeProducRoutes);

		app.use('/api/v1/precios', preciosRoutes);

		app.use('/', (req, res) => {
			res.status(404).json({ error: 'error en la solicitud' });
		});

		async function connectDatabase() {
			try {
				await Connection.authenticate();
				console.log('[OK] Conexión establecida con la base de datos');
			} catch (error) {
				console.error(
					'[ERROR] No se pudo conectar con la base de datos ',
					error,
				);
			}
		}

		function handleError(err, req, res, next) {
			console.error(err);
			res.status(500).json({ error: 'Error interno del servidor' });
		}

		// Middleware
		app.use((err, req, res, next) => {
			console.error(err);
			res.status(500).send('[ERROR] Ocurrió un error en el servidor');
		});

		async function startServer() {
			await connectDatabase();
			app.use(handleError);
			app.listen(PORT, () => {
				console.log(`[ERP-API-P-A] se ejecuta en http://localhost:${PORT}`);
			});
		}

		startServer();
	},
};

export default App;
