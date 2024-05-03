import {
	GenProductModel,
	LinetModel,
	ProductModel,
	ServiceModel,
	ShopModel,
	StoreModel,
	StoreProductModel,
	TypeProductModel,
	UserModel,
} from '../../models/index.js';
import { TypeServiceModel } from '../../models/tipo.servicio.model.js';

const handleDatabaseError = error => {
	console.error(error);
	return { message: 'Error interno del servidor' };
};

const findItem = async (model, whereClause) => {
	try {
		const item = await model.findOne({ where: whereClause });
		return item ? { exist: true, data: item.dataValues } : { exist: false };
	} catch (error) {
		return handleDatabaseError(error);
	}
};

/* SE VA A BORRAR */
export const findAllItemByCode = async code =>
	findItem(ProductModel, { CodigoProducto: code });
export const findItemByCode = async code =>
	findItem(ProductModel, { Borrado: 0, CodigoProducto: code });

/* Porducts */

export const findProductByCode = async code =>
	findItem(GenProductModel, { Borrado: 0, CodigoProducto: code });

export const findProductById = async id =>
	findItem(GenProductModel, { Borrado: 0, ProductoId: id });

export const findAllProductById = async id =>
	findItem(GenProductModel, { ProductoId: id });

export const findTypeProductById = async id_type =>
	findItem(TypeProductModel, { TipoProductoId: id_type, Borrado: false });

export const findAllTypeProductById = async id_type =>
	findItem(TypeProductModel, { TipoProductoId: id_type });

export const findTypeProductByName = async name =>
	findItem(TypeProductModel, { NombreTipoProducto: name, Borrado: false });

/* Services */

export const findServiceById = async id =>
	findItem(ServiceModel, { Borrado: 0, ServicioId: id });

export const findServiceByName = async name =>
	findItem(ServiceModel, { Borrado: 0, NombreServicio: name });

export const findtypeServiceById = async id =>
	findItem(TypeServiceModel, { Borrado: 0, TipoServicioId: id });

/* Lines */

export const findLineById = async id_line =>
	findItem(LinetModel, { LineaId: id_line, Borrado: false });

/* Users */

export const findUserById = async id_user =>
	findItem(UserModel, { UsuarioId: id_user, Borrado: false });

/* Store */

export const findStoreByName = async (name, s_id) =>
	findItem(StoreModel, {
		NombreAlmacen: name,
		SucursalId: s_id,
		Borrado: false,
	});

export const findStoreById = async id =>
	findItem(StoreModel, { AlmacenId: id, Borrado: false });

export const findStoreByIdInShop = async (store_id, shop_id) =>
	findItem(StoreModel, {
		AlmacenId: store_id,
		SucursalId: shop_id,
		Borrado: false,
	});

export const findStoreProductById = async id =>
	findItem(StoreProductModel, { ProductoAlmacenId: id, Borrado: false });

/* Shop */

export const findShopById = async id =>
	findItem(ShopModel, { SucursalId: id, Borrado: false });
