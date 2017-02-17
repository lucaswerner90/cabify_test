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
    code:"VOUCHER",
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


  constructor(pricing_rules=standard_pricing_rules,products=standard_products){
    this._products=products;
    this.products_on_cart=[];
    this._total_price=0;
    this.pricing_rules=pricing_rules;
  }


  // Return the information related with the product if it is available in the store cart
  _returnArticleFromCart(product){
    const _self=this;
    for (let i = 0; i < _self._products.length; i++) {
      if(_self._products[i].code===product){
        return _self._products[i];
      }
    }
    return null;
  }




  _return_articles_of_type(article_code){
    const _self=this;
    let articles=[];
    for (let i = 0; i < _self._products.length; i++) {
      if(_self._products[i].code===product){
        articles.push(_self._products[i]);
      }
    }
    return articles;
  }



  _check_rules(){
    const _self=this;
    for (let i = 0; i < pricing_rules.length; i++) {
      let price_rule=pricing_rules[i];

      //Get the number of items affected by the price rule
      let articles_affected=_self._return_articles_of_type(price_rule.item_code);

      //First of all we check if there is a necessary number of items available to apply the rule
      if(articles_affected.length>=price_rule.min_num_items){

        // We check every type of price rule available
        switch (price_rule.action.type) {
          case "discount":

          break;

          case "change_price":
          _self._returnArticleFromCart(price_rule.item_code).price=price_rule.action.new_price;
          break;


          default:
          console.info("This kind of rule it's not specified...");
        }


      }


    }
  }


  scan(product){
    const _self=this;

    const new_article_to_add=_self._returnArticleFromCart(product);
    if(!new_article_to_add){
      console.error(`${product} doesn't exist in the cart :( `);
    }else{
      _self.products_on_cart.push(new_article_to_add);
    }

    return _self;
  }


  total(){
    const _self=this;
    _self._check_rules();
    console.log(_self.total_price);
  }
}
