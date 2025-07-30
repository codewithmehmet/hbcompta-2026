import { Controller, Get, Param, Query } from "@nestjs/common";
import { ProductService } from "./product.service";
import { Product } from "./interfaces/product.interface";

@Controller("products")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  findAll(@Query("category") category?: string): Product[] {
    if (category) {
      return this.productService.findByCategory(category);
    }
    return this.productService.findAll();
  }

  @Get("in-stock")
  findInStock(): Product[] {
    return this.productService.findInStock();
  }

  @Get(":id")
  findOne(@Param("id") id: string): Product | undefined {
    const productId = parseInt(id, 10);
    return this.productService.findById(productId);
  }
}
