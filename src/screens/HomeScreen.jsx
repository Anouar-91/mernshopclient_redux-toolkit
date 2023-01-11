import React, { useEffect, useState } from 'react'
import Product from '../components/Product';
import axios from 'axios';
import {ThreeDots} from  'react-loader-spinner';
import Message from '../components/Message';

//redux
import { useDispatch, useSelector } from 'react-redux';
import { setProductData } from '../redux-toolkit/reducers/productReducer';

const HomeScreen = () => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.productsList.products)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetchProducts = async () => {
        try {
            const { data } = await axios.get(process.env.REACT_APP_API_URL +'products');
            dispatch(setProductData(data));
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(error.response.data.message)
        }
    }
    useEffect(() => {
        fetchProducts()
    }, [dispatch])

    return (
        <div className="container">
            <h1>Latest Products</h1>
            {loading 
            ? <ThreeDots wrapperStyle={{justifyContent: 'center'}} />  
            : error !== null
            ? <Message variant="danger">{error}</Message>
            :
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
        </div>
    )
}

export default HomeScreen