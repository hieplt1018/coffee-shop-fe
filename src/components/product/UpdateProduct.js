import React, { Fragment, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MetaData from '../layout/MetaData';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { UPDATE_PRODUCT_RESET } from '../../constants/productConstants';
import { updateProduct, clearErrors, getProductDetails } from '../../actions/productActions';
import { PreLoader } from '../layout/PreLoader';
import Form from 'react-bootstrap/Form';

const UpdateProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Cake');
  const [stock, setStock] = useState(1);
  const [supplier, setSupplier] = useState('Cantata Coffee');
  const [hotTrend, setHotTrend] = useState(true);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const categories = ['Cake', 'Coffee', 'Coffee Bean', 'Pastries', 'Bread'];
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const navigator = useNavigate();
  const [oldImages, setOldImages] = useState([]);
  const { product, error } = useSelector(state => state.productDetails);
  const { loading, error: updateError, isUpdated } = useSelector(state => state.product);
  const { id } = useParams();

  useEffect(() => {
    if(user.role !== 'admin') {
      navigator('/');
      toast.error('Bạn không có quyền truy cập', {
        theme: "colored"
      });
    }

    if(product && product._id !== id) {
      dispatch(getProductDetails(id));
    } else {
      getData(product);
    }

    if(error) {
      toast.error(error, {
        theme: "colored"
      });
      dispatch(clearErrors());
    }

    if(updateError) {
      toast.error(updateError, {
        theme: "colored"
      });
      dispatch(clearErrors());
    }

    if(isUpdated) {
      dispatch(getProductDetails(id));
      getData(product);
      toast.success('Sản phẩm được cập nhật thành công!', {
        theme: "colored"
      });
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [dispatch, loading, error, isUpdated, navigator, updateError, product, id]);

  const getData = (product) => {
    setName(product.name);
    setPrice(product.price);
    setCategory(product.category);
    setDescription(product.description);
    setStock(product.stock);
    setSupplier(product.supplier);
    setHotTrend(product.hotTrend);
    setOldImages(product.images);
    setImagesPreview([]);
  }

  const submitHandler = (e) => {
    e.preventDefault();

    const productData = {
      name: name,
      price: price,
      description: description,
      category: category,
      stock: stock,
      supplier: supplier,
      hotTrend: hotTrend,
      images: images
    }

    dispatch(updateProduct(product._id, productData));
  }

  const onChangeImages = (e) => {
    const files = Array.from(e.target.files); 

    setImages([]);
    setImagesPreview([]);
    setOldImages([]);

    files.forEach(file => {
      const reader = new FileReader();
      
      reader.onload = () => {
        if(reader.readyState === 2) {
          setImagesPreview(oldArray => [...oldArray, reader.result]);
          setImages(oldArray => [...oldArray, reader.result]);
        }
      }

      reader.readAsDataURL(file);
    });
  }

  const handleChangeCheckbox = (e) => {
    setHotTrend(e.target.checked);
  }

  return (
    <Fragment>
      <MetaData title={'Cập nhật sản phẩm'} />
      <form onSubmit={submitHandler} >
        <div className='breadcrumb-option'>
          <div className='container'>
            <div className='row'>
              <div className='col-lg-6 col-md-6 col-sm-6 offset-md-4'>
                <div className='breadcrumb__text'>
                  <h2>Cập nhật sản phẩm</h2>
                </div>
              </div>
            </div>
            {
              loading ? <PreLoader /> : (
                <div id='create_edit_product'>
                  <div className='row justify-content-center'>
                    <div className='col-md-12 border-right offset-md-5'>
                      <div className='p-3'>
                        <div className="col-md-7 border-right">
                          <div className="p-3 pb-4">
                            <div className="row mt-3">
                              <div className='col-md-12'><h4><label className='labels edit-product'>Tên sản phẩm</label></h4>
                                <input 
                                  type='text' 
                                  name='name'
                                  required
                                  maxLength='100'
                                  minLength='0'
                                  value={name}
                                  onChange={(e) => setName(e.target.value)} 
                                  id='edit-product-name' 
                                  className='form-control mt-3 mb-3'
                                />
                              </div>
                              <div className='col-md-12'><h4><label className='labels edit-product'>Giá sản phẩm</label></h4>
                                <input 
                                  type="number" 
                                  name="price"
                                  max="1000000"
                                  min="0"
                                  step="1000"
                                  required
                                  value={price} 
                                  onChange={(e) => setPrice(e.target.value)} 
                                  id="edit-product-adress" 
                                  className='form-control mt-3 mb-3'
                                />
                              </div>
                              <div className='col-md-12'><h4><label className='labels edit-product'>Mô tả sản phẩm</label></h4>
                                <input 
                                  type='text' 
                                  name='description'
                                  required
                                  maxLength='3000'
                                  minLength='0'
                                  value={description}
                                  onChange={(e) => setDescription(e.target.value)} 
                                  id='edit-product-description' 
                                  className='form-control mt-3 mb-3'
                                />
                              </div>
                              <div className='col-md-12'><h4><label className='labels edit-product'>Thể loại sản phẩm</label></h4>
                                <select className="form-control mt-3 mb-3" id="category_field" value={category} onChange={(e) => setCategory(e.target.value)}>
                                  {categories.map(category => (
                                    <option key={category} value={category} >{category}</option>
                                  ))}
                                </select>
                              </div>
                              <div className='col-md-12'><h4><label className='labels edit-product'>Số lượng sản phẩm</label></h4>
                                <input 
                                  type='number' 
                                  name='stock'
                                  max='1000'
                                  min='1'
                                  step='1'
                                  required
                                  value={stock} 
                                  onChange={(e) => setStock(e.target.value)} 
                                  id='edit-product-stock' 
                                  className='form-control mt-3 mb-3' 
                                />
                              </div>
                              <div className='col-md-12'><h4><label className='labels edit-product'>Nhà cung cấp</label></h4>
                                <input 
                                  type='text' 
                                  name='name'
                                  required
                                  maxLength='100'
                                  minLength='0'
                                  value={supplier}
                                  onChange={(e) => setSupplier(e.target.value)} 
                                  id='edit-product-supplier' 
                                  className='form-control mt-3 mb-3'
                                />
                              </div>
                              <div className='col-md-12 mb-3'>
                                <h4>
                                  <Form.Check 
                                    type='checkbox'
                                    id='hotTrend-checkbox'
                                    value={hotTrend}
                                    name='hotTrend'
                                    label='Sản phẩm nổi bật'
                                    onChange={(e) => handleChangeCheckbox(e)}
                                    checked={hotTrend}
                                  />
                                </h4>
                              </div>
                              <div className='form-group col-md-12'>
                                <h4><label className='labels edit-product'>Hình ảnh sản phẩm</label></h4>
                                <div className='custom-file'>
                                  <input type='file' name='product_images' className='custom-file-input mt-3 mb-3' id='customFile' onChange={onChangeImages} multiple />
                                </div>
                                { oldImages && oldImages.map(img => (
                                  <img src={img.url} key={img._id} alt="Images Product" className="mt-3 product-images-preview"/>
                                ))}
                                {imagesPreview.map(img => (
                                  <img src={img} key={img} alt="Images Preview" className="mt-3 product-images-preview"/>
                                ))}
                              </div>
                              <div className="col-md-12 offset-md-4 mt-3">
                                <button type='submit' className='btn btn-cantata'>
                                Cập nhật sản phẩm
                                </button>
                              </div>
                            </div>   
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            }
          </div>
        </div>
      </form>
    </Fragment>
  )
}

export default UpdateProduct
