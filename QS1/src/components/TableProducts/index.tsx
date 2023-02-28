import axios from "axios";
import React, { useEffect, useState } from "react";
import "./index.css";

interface TableProductsProps {
  searchValue: string;
}

function TableProducts({ searchValue }: TableProductsProps) {
  const [limit, setLimit] = useState(10);
  const [products, setProducts] = useState<any>([]);
  const [productsTemp, setProductsTemp] = useState<any>([]);

  const [total, setTotal] = useState(0);

  const [loading, setLoading] = useState(false);

  const getProducts = (limit: number) => {
    setLoading(true);
    axios
      .get(`https://dummyjson.com/products?limit=${limit}`)
      .then(function (response) {
        setProducts(response.data.products);
        setProductsTemp(response.data.products);
        setTotal(response.data.total);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSearch = (value: string) => {
    if (value === "") {
      setProducts(productsTemp);
    }

    const newArr = productsTemp.filter((p: any) => {
      return p.title.toLowerCase().includes(value.toLowerCase());
    });

    setProducts(newArr);
    setTotal(newArr.length);
  };

  const handleLimit = (event: any) => {
    setLimit(Number(event.target.value));
  };

  useEffect(() => {
    getProducts(limit);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit]);

  useEffect(() => {
    handleSearch(searchValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

  return (
    <div className="tableProductsContainer">
      <h2>Products</h2>

      <p>Total: {total}</p>

      <div>
        <span>Limit: </span>

        <select name="limit" id="limit" onChange={handleLimit}>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
      </div>

      {loading ? (
        <>Loading...</>
      ) : (
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Brand</th>
              <th>Description</th>
              <th>Price</th>
              <th>Rating</th>
              <th>Stock</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p: any, index: number) => (
              <tr key={p.id}>
                <td>{index + 1}</td>
                <td>{p.title}</td>
                <td>{p.brand}</td>
                <td className="description">{p.description}</td>
                <td>{p.price}</td>
                <td>{p.rating}</td>
                <td>{p.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TableProducts;
