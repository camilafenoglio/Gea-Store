import React from 'react';
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link as LinkRouter } from 'react-router-dom';

//COMPONENTS AND ACTIONS
import productsActions from '../../redux/actions/productsActions';
import Error from '../Error'
//MUI
import IconButton from '@mui/material/IconButton';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import LocalGroceryStoreOutlinedIcon from '@mui/icons-material/LocalGroceryStoreOutlined';

//STYLES
import '../../styles/cardProducts.css'


export default function CardProducts() {

  const dispatch = useDispatch() //este metodo sirve para despachar acciones al store
  useEffect(() => {
    dispatch(productsActions.getProducts())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const productos = useSelector(store => store.productReducers.products)
  //console.log(productos)

  const filter = (evento) => {
    dispatch(productsActions.filterProducts(evento.target.value))
  }
  const productsFilter = useSelector(store => store.productReducers.filterPerName)
  return (
    <div className='productsPageContainer_F'>

      <div className="group searchMargin_F">
        <SearchRoundedIcon className="icon" />
        <input placeholder="Search" type="search" className="input" onKeyUp={filter} />
      </div>

      <div className='products_F'>
        {productsFilter.length > 0 ? productsFilter?.map((product, index) => (
          <div className="card" key={index}>
            <img className="card-img" src={product.image} alt='product' />
            <div className="card-info">
              <p className="text-title">{product.name}</p>
              <p className="text-body">Product description and details</p>
            </div>
            <div className="card-footer">
              <span className="text-title">${product.price}.00</span>
              <LinkRouter
              to={`/products/${product._id}`}
              >
                <IconButton className="card-button">
                  <LocalGroceryStoreOutlinedIcon fontSize='small' className="svg-icon" viewBox="0 0 20 20" />
                </IconButton>
              </LinkRouter>
            </div>
          </div>
        )) : <Error />}
      </div>
    </div>
  );
}
