import React, { useEffect, useState } from 'react'
import products from '../products';
import Product from '../components/Product';
import axios from 'axios';
//redux
import { useDispatch, useSelector } from 'react-redux';
import { setProductData } from '../redux-toolkit/reducers/productReducer';

const HomeScreen = () => {
    const dispatch = useDispatch();
    const product = useSelector(state => state.products)
    const [loading, setLoading] = useState(true)

    const fetchProducts = async () => {
        const { data } = await axios.get('http://localhost:3000/api/products');
        dispatch(setProductData(data));
        setLoading(false);
    }
    useEffect(() => {
        fetchProducts()
    }, [dispatch])

    return (
        <>
            <h1>Latest Products</h1>
            {loading ? 'chargement...' :
                <div className="row">
                    {products.map(product => {
                        return (
                            <div key={product._id} className="col-md-4">
                                <Product product={product} />
                            </div>
                        )
                    })}
                </div>
            }
        </>
    )
}

export default HomeScreen