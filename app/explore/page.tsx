import ProductList from '../components/ProductList';

async function getPcParts() {
  const res = await fetch('https://fakestoreapi.com/products/category/electronics', { 
    cache: 'no-store' 
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  
  return res.json();
}

export default async function ExplorePage() {
  const parts = await getPcParts();

  return (
    <div>
      <div className="mb-4">
        <h2 className="fw-bold">Explore PC Parts</h2>
        <p className="text-muted">
          Daftar harga komponen PC (SSD, HDD, Monitor) dari Global Market.
          <br />
          <small className="text-danger">*Data diambil secara realtime dari External Public API.</small>
        </p>
      </div>
      
      <ProductList products={parts} />
    </div>
  );
}