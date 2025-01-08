import React from 'react';
import { useSelector } from 'react-redux';
import ProductCard from '../component/ProducteCurd';

const Shop = () => {
  const products = useSelector((state) => state.product);

  return (
    <div className="container mx-auto py-12 px-4 md:px-8 lg:px-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {products.products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Shop;
