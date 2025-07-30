import { Injectable } from "@nestjs/common";
import { Product } from "./interfaces/product.interface";

@Injectable()
export class ProductService {
  private readonly products: Product[] = [
    {
      id: 1,
      name: 'MacBook Pro 16"',
      description: "Ordinateur portable haute performance avec puce M3 Pro",
      price: 2499.99,
      category: "Informatique",
      inStock: true,
      createdAt: new Date("2024-01-15"),
    },
    {
      id: 2,
      name: "iPhone 15 Pro",
      description: "Smartphone premium avec appareil photo professionnel",
      price: 1199.99,
      category: "Téléphone",
      inStock: true,
      createdAt: new Date("2024-02-20"),
    },
    {
      id: 3,
      name: "AirPods Pro (2ème génération)",
      description: "Écouteurs sans fil avec réduction de bruit active",
      price: 279.99,
      category: "Audio",
      inStock: false,
      createdAt: new Date("2024-03-10"),
    },
    {
      id: 4,
      name: "iPad Air",
      description: "Tablette polyvalente pour le travail et les loisirs",
      price: 699.99,
      category: "Tablette",
      inStock: true,
      createdAt: new Date("2024-01-05"),
    },
    {
      id: 5,
      name: "Apple Watch Series 9",
      description: "Montre connectée avec capteurs de santé avancés",
      price: 449.99,
      category: "Accessoire",
      inStock: true,
      createdAt: new Date("2024-02-28"),
    },
  ];

  findAll(): Product[] {
    return this.products;
  }

  findById(id: number): Product | undefined {
    return this.products.find(product => product.id === id);
  }

  findByCategory(category: string): Product[] {
    return this.products.filter(
      product => product.category.toLowerCase() === category.toLowerCase()
    );
  }

  findInStock(): Product[] {
    return this.products.filter(product => product.inStock);
  }
}
