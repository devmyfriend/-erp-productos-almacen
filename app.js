import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';

// Rutas
import productsRoutes from './src/routes/producto.routes.js';

import typeProductsRoutes from './src/routes/tipo.producto.routes.js';

import productsActivRoutes from './src/routes/producto.activo.routes.js';

import productComboRoutes from './src/routes/producto.combo.routes.js';

import storeRoutes from './src/routes/almacen.routes.js';

import storeProducRoutes from './src/routes/almacen.producto.routes.js';

import priceRoutes from './src/routes/precios.routes.js';

import serviceRoutes from './src/routes/servicio.routes.js';

import unitRoutes from './src/routes/unidad.routes.js';

import unitconversionRoutes from './src/routes/conversion.unidad.routes.js'

import cfgTaxModel from './src/routes/cfdi.impuestos.routes.js'

import compositeTax from './src/routes/cfg.impuestos.compuesto.routes.js'

import taxByRate from './src/routes/cfg.impuestos.tasas.routes.js'

import compositeTaxByTaxRate from './src/routes/cfg.impuestos.compuestos.tasa.routes.js'

import membershipRoutes from './src/routes/membresia.routes.js';

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

		app.use('/api/v1/productos/activo', productsActivRoutes);

		app.use('/api/v1/productos/combo', productComboRoutes);

		app.use('/api/v1/almacen', storeRoutes);

		app.use('/api/v1/almacen/producto', storeProducRoutes);

		app.use('/api/v1/precios', priceRoutes);

		app.use('/api/v1/servicios', serviceRoutes);

		app.use( '/api/v1/unidades', unitRoutes  );

		app.use( '/api/v1/unidades/conversion', unitconversionRoutes  );

		app.use( '/api/v1/impuestos', cfgTaxModel );

		app.use( '/api/v1/impuestos/compuestos', compositeTax );
		
		app.use( '/api/v1/impuestos/compuestos/tasas', compositeTaxByTaxRate )
		
		app.use( '/api/v1/impuestos/tasa', taxByRate )

		
		
		app.use('/api/v1/membresias', membershipRoutes);

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
