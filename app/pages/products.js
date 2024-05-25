import { useState, useEffect } from 'react';
import { fetchProducts, createProduct, updateProduct, deleteProduct } from '../services/api';
import { useForm } from 'react-hook-form';

export default function Products() {
  const [products, setProducts] = useState([]);
  const { register, handleSubmit, reset } = useForm();
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const products = await fetchProducts();
    setProducts(products);
  };

  const onSubmit = async (data) => {
    if (editingProduct) {
      await updateProduct(editingProduct.id, data);
      setEditingProduct(null);
    } else {
      await createProduct(data);
    }
    reset();
    loadProducts();
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    reset(product);
  };

  const handleDelete = async (id) => {
    await deleteProduct(id);
    loadProducts();
  };

  return (
    <div>
      <h1>Products</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="Name" {...register('name', { required: true })} />
        <input type="number" placeholder="Price" {...register('price', { required: true })} />
        <button type="submit">{editingProduct ? 'Update' : 'Add'} Product</button>
      </form>

      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.name} - ${product.price}
            <button onClick={() => handleEdit(product)}>Edit</button>
            <button onClick={() => handleDelete(product.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
