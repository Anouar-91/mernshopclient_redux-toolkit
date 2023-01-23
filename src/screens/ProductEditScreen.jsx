import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { detailProduct, resetProductDetail, resetProductUpdate, updateProduct } from '../redux-toolkit/reducers/productReducer';
const ProductEditScreen = ({ }) => {
    let { id } = useParams();

    const [name, setName] = useState("")
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState("")
    const [brand, setBrand] = useState("")
    const [category, setCategory] = useState("")
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState("")


    const dispatch = useDispatch();

    const productDetail = useSelector(state => state.productDetail);
    const { loading, error, product } = productDetail;

    const productUpdate = useSelector(state => state.productUpdate);
    const { loading:loadingUpdate, error:errorUpdate, success:successUpdate } = productUpdate;

    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateProduct({
            _id: id,
            name,
            price,
            image,
            brand,
            category,
            description,
            countInStock
        }))
    }

    useEffect(() => {
        if(successUpdate){
            dispatch(resetProductUpdate())
            dispatch(resetProductDetail())
            navigate('/admin/productlist')
        }else{
            if (!product.name || product._id !== id || successUpdate ) {
                dispatch(detailProduct(id))
            } else {
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setBrand(product.brand)
                setCategory(product.category)
                setCountInStock(product.countInStock)
                setDescription(product.description)
            }
        }
    }, [product, id, successUpdate])

    return (
        <>
            <Link to="/admin/productlist" className="btn btn-light my-3">
                Go back
            </Link>
            <div>
                <FormContainer>
                    <h1>Edit product</h1>
                    {loadingUpdate && <Loader/>}
                    {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
                    {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (
                        <form onSubmit={submitHandler} action="" className="mt-4">
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input id='name' name="name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="price">Price</label>
                                <input id='price' name="price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Enter price" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="image">Image</label>
                                <input id='image' name="image" type="text" value={image} onChange={(e) => setImage(e.target.value)} placeholder="Enter image" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="brand">brand</label>
                                <input id='brand' name="brand" type="text" value={brand} onChange={(e) => setBrand(e.target.value)} placeholder="Enter brand" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="category">category</label>
                                <input id='category' name="category" type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Enter category" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="countInStock">countInStock</label>
                                <input id='countInStock' name="countInStock" type="number" value={countInStock} onChange={(e) => setCountInStock(e.target.value)} placeholder="Enter countInStock" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">description</label>
                                <input id='description' name="description" type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter description" className="form-control" />
                            </div>

                            <button className="btn btn-primary mt-3">Update</button>
                        </form>
                    )}
                </FormContainer>
            </div>
        </>
    )
}

export default ProductEditScreen