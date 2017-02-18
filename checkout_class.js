/*
Default values for products and pricing rules just in case no value are assigned in the constructor function.
*/

const standard_products=[
  {
    code:"VOUCHER",
    name:"Cabify Voucher",
    price:5
  },
  {
    code:"TSHIRT",
    name:"Cabify T-Shirt",
    price:20
  },
  {
    code:"MUG",
    name:"Cabify Voucher",
    price:7.50
  }
];

const standard_pricing_rules=[
  {
    action:{
      type:"discount",
      discount:0.5
    },
    min_num_items:2,
    condition:"odd_quantity",
    item_code:"VOUCHER"
  },
  {
    action:{
      type:"change_price",
      new_price:19
    },
    min_num_items:3,
    item_code:"TSHIRT"
  }
];


class Checkout{

  /*
  We assign default values for the products list and the pricing rules just in case
  no value is passed to them.
  */
  constructor(pricing_rules=standard_pricing_rules,products=standard_products){
    this._products=products;
    this._total_price=0;
    this.products_on_cart=[];

    /*
    Maybe a better and more maintainable solution could be create a hierarchy for every
    kind of rule, using and object for every one of them. But for this example I decided to implement
    a simple way to manage them.
    */
    this.pricing_rules=pricing_rules;
  }


  /*
  Return the information related with the product if it is available in the store cart
  */
  _return_article_from_product_list(product){
    const _self=this;
    for (let i = 0; i < _self._products.length; i++) {
      if(_self._products[i].code===product){
        return _self._products[i];
      }
    }
    return null;
  }



  /*
  We return the number of specific products on the cart
  */
  _return_num_articles_of_type(article_code){
    const _self=this;
    return _self.products_on_cart.filter((product)=>{
      return product.code===article_code;
    }).length;
  }


  /*
  Function to delete every element in the product cart.
  */
  _clean_cart(){
    this.products_on_cart=[];
  }

  /*
  Function that use the builtin filter function to delete every product
  based on the product code.
  */
  _remove_articles_from_cart(product_code){
    const _self=this;
    _self.products_on_cart=_self.products_on_cart.filter((product)=>{
      return product.code!==product_code;
    });
  }

  /*
  Here is where we do the magic :O!
  We check every price rule and we applied their own specifications.
  */
  _calculate_total_price(){
    const _self=this;
    for (let i = 0; i < _self.pricing_rules.length; i++) {
      let price_rule=_self.pricing_rules[i];

      //Get the number of items affected by the price rule
      const num_articles_affected=_self._return_num_articles_of_type(price_rule.item_code);

      /*
      First of all we check if there is a necessary number of items available to apply the rule.
      If it's a general rule we can simply set the min_num_items to 0.
      */
      if(num_articles_affected>=price_rule.min_num_items){

        // We check every type of price rule available
        switch (price_rule.action.type) {

          case "discount":

          /*
          If the price rule has a special condition.
          For example: 2x1 is translated to "appliable only to even quantity of products"
          */
          if(price_rule.condition==="even_quantity"){
            /*
            What we do here is detect the number of articles that has
            the condition of being discounted.
            */
            const num_items_without_discount=num_articles_affected%2;
            const num_items_discount=num_articles_affected-num_items_without_discount;

            /*
            We apply the condition in the total price
            */
            _self._total_price+=num_items_discount*_self._return_article_from_product_list(price_rule.item_code).price*price_rule.action.discount;
            _self._total_price+=num_items_without_discount*_self._return_article_from_product_list(price_rule.item_code).price;

          }else{
            /*
            In case that the price rule doesn't have a condition
            we simply apply the discount to the original price
            */
            _self._total_price+=num_articles_affected*_self._return_article_from_product_list(price_rule.item_code).price*price_rule.action.discount;

          }
          /*
          Once the price rule is applied we simply remove the items from the cart.
          */
          _self._remove_articles_from_cart(price_rule.item_code);

          break;

          case "change_price":

            /*
            For this kind of rule, we simply apply the new price to the items affected.
            */
            _self._total_price+=num_articles_affected*price_rule.action.new_price;

            _self._remove_articles_from_cart(price_rule.item_code);
            /*
            Once the price rule is applied we simply remove the items from the cart.
            */

          break;


          default:
          console.info(`${price_rule.action.type}...that kind of rule it's not specified... `);

        }


      }


    }

    /*
    Once all the pricing rules are being applied we simply calculate the
    normal price for every product that already remains in our cart.
    */
    for (let i = 0; i < _self.products_on_cart.length; i++) {
      _self._total_price+=_self.products_on_cart[i].price;
    }

    /*
    We clean the product cart once all the calculation had finished.
    */
    _self._clean_cart();

  }


  scan(product){
    const _self=this;

    const new_article_to_add=_self._return_article_from_product_list(product);
    if(!new_article_to_add){
      console.error(`${product} doesn't exist in the cart :( `);
    }else{
      _self.products_on_cart.push(new_article_to_add);
    }

    return _self;
  }


  total(){

    const _self=this;

    _self._calculate_total_price();

    // For formatting purposals we display the total price in euros.
    console.log(_self._total_price.toLocaleString([],{ style: 'currency', currency: 'EUR' }));

  }
}
