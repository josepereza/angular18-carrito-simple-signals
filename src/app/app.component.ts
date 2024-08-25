import { NgFor } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
interface Product {
  id: number;
  name: string;
  price: number;
}

interface CartItem extends Product {
  quantity: number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgFor],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  products = signal<Product[]>([
    { id: 1, name: 'Producto 1', price: 10 },
    { id: 2, name: 'Producto 2', price: 15 },
    { id: 3, name: 'Producto 3', price: 20 },
    { id: 4, name: 'Producto 1', price: 10 },
    { id: 5, name: 'Producto 2', price: 15 },
    { id: 6, name: 'Producto 3', price: 20 },
  ]);

  cart = signal<CartItem[]>([]);


  Total= computed(()=>this.cart().reduce((sum, item) => sum + item.price * item.quantity, 0))

  addToCart(product: Product) {
    this.cart.update(currentCart => {
      const existingItem = currentCart.find(item => item.id === product.id);
      if (existingItem) {
        return currentCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...currentCart, { ...product, quantity: 1 }];
      }
    });
  }

  removeFromCart(item: CartItem) {
    this.cart.update(currentCart => currentCart.filter(cartItem => cartItem.id !== item.id));
  }

 
}
