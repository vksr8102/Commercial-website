import Block1 from '@/src/contents/product/Block1';
import Block3 from '@/src/contents/product/Block3';
import Block2 from '@/src/contents/product/block2/Block2';
import { useDispatch, useSelector } from 'react-redux';
// import { getProducts } from 'redux/apiCalls';


const Product = () => {
  return (
    <>
    <Block1 />
    {/* <Block2 productDetail={res}/>
    <Block3 /> */}
    </>
  )
}

export default Product