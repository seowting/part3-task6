import { getProducts, createProduct, updateProduct, deleteProduct } from '../../services/backend';

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      const products = await getProducts();
      res.status(200).json(products);
      break;
    case 'POST':
      const newProduct = await createProduct(req.body);
      res.status(201).json(newProduct);
      break;
    case 'PUT':
      const { id } = req.query;
      const updatedProduct = await updateProduct(id, req.body);
      res.status(200).json(updatedProduct);
      break;
    case 'DELETE':
      const productId = req.query.id;
      await deleteProduct(productId);
      res.status(204).end();
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
