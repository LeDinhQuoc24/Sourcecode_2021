
export const state = () => ({
  products: [],
  checkoutStatus: null,
  checkout:0
})

export const mutations = {
  increment( state, product) {
    const productItem = state.products.find(item => item.product_id=== product.product_id);

    if (!productItem) {
      state.products.push(product);

      product.count = 1;
      product.checkboxBuy=false;
    } else {
      product.count++;
      product.checkboxBuy=false;
      console.log(state.products);
      state.checkout=0;
    }
    product.store--;



  },
  decrement(state, product) {
    const productItem = state.products.find(item => item.product_id=== product.product_id);

    productItem.count--;
    state.products.forEach((element,index)=>{
      if  (element.count === 0) {
        console.log("0");
        console.log(index);
        state.products.splice(element,1);
        console.log(state.products);

      }
    })

    product.store++;
  },

  removeItemCart(state,product)
  {
   console.log(product);
    // let indexTemp = -1
    state.products.forEach((element,index)=>{
      if(element.product_id === product.product_id)
      {
        console.log(index);

        if(state.checkout===0)
        {
          state.products.splice(index,1);
          element.checkboxBuy=false;
          product.store+=element.count;
          return  ;
        }
        else{

          state.products.splice(index,1);
          state.checkout-=(element.price*element.count);
          element.checkboxBuy=false;
          product.store+=element.count;
          return;
        }


      }
    });
  },
  checkout(state,product)
  {
    if(product.checkboxBuy)
    {
      state.checkout+=(product.price*product.count);
    }
    else{
      state.checkout-=(product.price*product.count);
    }
  },
}
