import {
  JsonController,
  Put,
  Param,
  Body,
  NotFoundError,
  Post,
  HttpCode,
  Get,
  Delete,
  Authorized
} from "routing-controllers";
import Product from "../entity/products";

@JsonController()
export default class ProductController {
  @Get("/products/:id")
  getProduct(@Param("id") id: number) {
    return Product.findOneById(id);
  }

  //  @Authorized()
  @Get("/products")
  allProduct() {
    return Product.find();
  }

  //  @Authorized()
  @Put("/products/:id")
  async updateProduct(
    @Param("id") id: number,
    @Body() update: Partial<Product>
  ) {
    const product = await Product.findOneById(id);
    if (!product) throw new NotFoundError("Cannot find evaluation");

    return Product.merge(product, update).save();
  }

  // @Authorized()
  @Post("/products")
  @HttpCode(201)
  async create(@Body() product: Product) {
    return product.save();
  }

  //  @Authorized()
  @Delete("/products/:id")
  async removeProduct(@Param("id") id: number) {
    const product = await Product.findOneById(id);
    if (!product) throw new NotFoundError("Cannot find user");
    product.remove();
    return "Evaluation succesfully deleted";
  }
}
