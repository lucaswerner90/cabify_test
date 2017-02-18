# Cabify Coding Exercise :car:

## I decided to create 2 files:

### 1. checkout_class.js
Contains the JS of the exercise.

```javascript
class Checkout{
 
  constructor(pricing_rules=standard_pricing_rules,products=standard_products){
  ....
  
 ```

### 2. index.html
Simple HTML that shows ( throught the console output ) the total cart price.

```javascript
  let co = new Checkout(pricing_rules);
  // co.scan("VOUCHER").scan("TSHIRT").scan("MUG");
  // co.scan("TSHIRT").scan("TSHIRT").scan("TSHIRT").scan("VOUCHER").scan("TSHIRT");
  // co.scan("VOUCHER").scan("TSHIRT").scan("VOUCHER");
  co.scan("VOUCHER").scan("TSHIRT").scan("VOUCHER").scan("VOUCHER").scan("MUG").scan("TSHIRT").scan("TSHIRT");
  let price = co.total();
```


### Hope you like it! :relaxed:
