export const calculateTotals=(cartItems, quantities)=>{
    

//Calculating
  const Subtotal =cartItems.reduce(
    (acc,food) => acc + food.price *quantities[food.id], 0
  );
 
  const shipping =Subtotal ===0 ? 0.0 :10;
  const tax=Subtotal*0.1;
  const total =Subtotal +shipping + tax;
 


return {Subtotal,shipping,tax,total};

}