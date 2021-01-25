import { Injectable } from '@angular/core';
import * as Realm from 'realm-web';
import { Observable } from 'rxjs';
import { Product } from './model/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  app: Realm.App = new Realm.App({ id: 'application-product-vwjzp' });
  constructor() {
    this.loginApiKey(
      'gOqUqoCRpm1ZAsklRMKzatYLfJVqlMldMHyrhGBC4X7nAwd2aOehMvlUI4p6iecY'
    ).then((user) => {
      console.log('Successfully logged in!');
    });
  }

  async connectionRealm(): Promise<Realm.User> {
    // Create an anonymous credential
    const credentials = Realm.Credentials.anonymous();
    try {
      // Authenticate the user
      const user: Realm.User = await this.app.logIn(credentials);
      // `App.currentUser` updates to match the logged in user
      return user;
    } catch (err) {
      console.error('Failed to log in', err);
    }
  }

  async loginApiKey(apiKey: string): Promise<Realm.User> {
    // Create an API Key credential
    const credentials = Realm.Credentials.apiKey(apiKey);
    try {
      // Authenticate the user
      const user: Realm.User = await this.app.logIn(credentials);
      return user;
    } catch (err) {
      console.error('Failed to log in', err);
    }
  }

  insert(product: Product): Promise<any> {
    const productCollection = this.getCollection();

    return productCollection.insertOne({
      nombre: product.nombre,
      caracteristica: product.caracteristica,
      fechaLanzamiento: product.fechaLanzamiento,
      email: product.email,
      paisFabricacion: product.paisFabricacion,
      precio: product.precio,
      unidadesVendidas: product.unidadesVendidas,
      unidadesDisponibles: product.unidadesDisponibles,
      imagenURL: product.imagenURL,
    });
  }

  getProducts(): Promise<Product[]> {
    const productCollection = this.getCollection();
    return productCollection.find();
  }

  getProduct(id: string): Promise<Product> {
    const productCollection = this.getCollection();
    return productCollection.findOne({ _id: new Realm.BSON.ObjectId(id) });
  }

  private getCollection(): globalThis.Realm.Services.MongoDB.MongoDBCollection<any> {
    const mongodb = this.app.currentUser.mongoClient('Service-Product');
    const productCollection = mongodb
      .db('Product')
      .collection('collectionProduct');
    return productCollection;
  }
}
