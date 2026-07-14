"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import ArchiveSlider from "./ArchiveSlider";

type Product = {
  id: string;
  name: string;
  edition: string;
  price: number;
  stock: number;
  front: string;
  back: string;
  tone: "light" | "dark";
};

type CartItem = Product & { size: string; quantity: number };

const products: Product[] = [
  {
    id: "001",
    name: "Correction Tee",
    edition: "Drop 001 / Limited to 50",
    price: 25,
    stock: 49,
    front: "/media/001-front.png",
    back: "/media/001-back.png",
    tone: "light",
  },
  {
    id: "traitor",
    name: "Traitor",
    edition: "Archive / Sold out",
    price: 25,
    stock: 0,
    front: "/media/traitor-front.png",
    back: "/media/traitor-back.png",
    tone: "light",
  },
  {
    id: "buried",
    name: "Buried",
    edition: "Archive / Sold out",
    price: 25,
    stock: 0,
    front: "/media/buried-front.png",
    back: "/media/buried-back.png",
    tone: "dark",
  },
];

const sizes = ["S", "M", "L", "XL", "2XL"];

export default function Home() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState("M");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem("somber-cart");
    if (saved) setCart(JSON.parse(saved));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) window.localStorage.setItem("somber-cart", JSON.stringify(cart));
  }, [cart, hydrated]);

  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  function addToCart(product: Product) {
    if (!product.stock) return;
    setCart((current) => {
      const match = current.find(
        (item) => item.id === product.id && item.size === selectedSize,
      );
      if (match) {
        return current.map((item) =>
          item === match ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }
      return [...current, { ...product, size: selectedSize, quantity: 1 }];
    });
    setCartOpen(true);
  }

  function changeQuantity(index: number, amount: number) {
    setCart((current) =>
      current
        .map((item, itemIndex) =>
          itemIndex === index
            ? { ...item, quantity: item.quantity + amount }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="SOMBER home">
          <Image src="/media/logo.png" alt="SOMBER" width={220} height={45} priority />
        </a>
        <nav className={menuOpen ? "nav-links open" : "nav-links"} aria-label="Primary navigation">
          <a href="#drop" onClick={() => setMenuOpen(false)}>Drop 001</a>
          <a href="#archive" onClick={() => setMenuOpen(false)}>Archive</a>
          <a href="#manifesto" onClick={() => setMenuOpen(false)}>Manifesto</a>
        </nav>
        <div className="header-actions">
          <button
            className="icon-button menu-button"
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? "×" : "≡"}
          </button>
          <button className="cart-button" type="button" onClick={() => setCartOpen(true)}>
            Cart <span aria-label={`${itemCount} items`}>{hydrated ? itemCount : 0}</span>
          </button>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">Independent apparel / Drop 001</p>
          <h1>SOMBER</h1>
          <p className="hero-title">CORRECTION</p>
          <a className="primary-link" href="#drop">Shop the drop <span>↓</span></a>
        </div>
        <p className="edition-mark">50 copies. No restock.</p>
      </section>

      <section className="ticker" aria-label="Drop information">
        <div>DROP 001&nbsp;&nbsp; / &nbsp;&nbsp;CORRECTION&nbsp;&nbsp; / &nbsp;&nbsp;LIMIT 50 TO PRESS&nbsp;&nbsp; / &nbsp;&nbsp;OUT NOW</div>
      </section>

      <section className="drop-section" id="drop">
        <div className="section-heading">
          <p className="eyebrow">Current release</p>
          <h2>001 / Correction</h2>
          <p>High-tolerance cotton. Low-tolerance design. Printed in a single numbered run.</p>
        </div>

        <div className="featured-product">
          <div className="featured-media">
            <Image
              src="/media/001-back.png"
              alt="Correction tee back print"
              fill
              sizes="(max-width: 800px) 100vw, 60vw"
            />
            <span className="image-label">Back print / 001</span>
          </div>
          <div className="product-buy">
            <div>
              <p className="stock"><span /> 49 / 50 remaining</p>
              <h3>Correction Tee</h3>
              <p className="price">$25.00</p>
            </div>
            <p className="product-copy">Cream heavyweight tee with deep-red front mark and full back runtime print.</p>
            <fieldset>
              <legend>Choose size</legend>
              <div className="size-options">
                {sizes.map((size) => (
                  <button
                    className={selectedSize === size ? "selected" : ""}
                    type="button"
                    key={size}
                    aria-pressed={selectedSize === size}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </fieldset>
            <button className="add-button" type="button" onClick={() => addToCart(products[0])}>
              Add to cart <span>+</span>
            </button>
            <p className="fine-print">Checkout will be enabled when the payment account is connected.</p>
          </div>
        </div>
      </section>

      <section className="archive-section" id="archive">
        <div className="archive-gateway">
          <div className="archive-gateway-copy">
            <p className="eyebrow">Past releases / Permanent record</p>
            <h2>The archive</h2>
            <a href="/archive">Enter the complete record <span>↗</span></a>
          </div>
          <ArchiveSlider />
          <span className="archive-counter">02 stored drops</span>
        </div>
      </section>

      <section className="manifesto" id="manifesto">
        <Image src="/media/icon.png" alt="SOMBER mark" width={180} height={72} />
        <p className="eyebrow">What we make</p>
        <h2>Independent apparel for the part of you that stays after the noise leaves.</h2>
        <div className="manifesto-notes">
          <p>Small-run releases.</p><p>Original graphics.</p><p>No artificial scarcity.</p>
        </div>
      </section>

      <footer>
        <Image src="/media/logo.png" alt="SOMBER" width={190} height={38} />
        <p>Independent streetwear / Limited apparel drops</p>
        <p>© {new Date().getFullYear()} SOMBER</p>
      </footer>

      <div className={cartOpen ? "cart-overlay visible" : "cart-overlay"} onClick={() => setCartOpen(false)} />
      <aside className={cartOpen ? "cart-drawer open" : "cart-drawer"} aria-hidden={!cartOpen} aria-label="Shopping cart">
        <div className="cart-header"><h2>Your cart</h2><button className="icon-button" type="button" aria-label="Close cart" onClick={() => setCartOpen(false)}>×</button></div>
        <div className="cart-items">
          {cart.length === 0 ? (
            <div className="empty-cart"><p>Nothing here yet.</p><button type="button" onClick={() => setCartOpen(false)}>Return to drop</button></div>
          ) : cart.map((item, index) => (
            <div className="cart-item" key={`${item.id}-${item.size}`}>
              <div className="cart-thumb"><Image src={item.front} alt="" fill sizes="96px" /></div>
              <div className="cart-item-copy">
                <div><h3>{item.name}</h3><p>Size {item.size}</p></div>
                <div className="quantity">
                  <button type="button" aria-label={`Remove one ${item.name}`} onClick={() => changeQuantity(index, -1)}>−</button>
                  <span>{item.quantity}</span>
                  <button type="button" aria-label={`Add one ${item.name}`} onClick={() => changeQuantity(index, 1)}>+</button>
                </div>
              </div>
              <p>${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
        </div>
        <div className="cart-footer">
          <div><span>Subtotal</span><strong>${total.toFixed(2)}</strong></div>
          <button type="button" disabled>Checkout unavailable</button>
          <p>Connect Stripe or another payment provider to accept orders.</p>
        </div>
      </aside>
    </main>
  );
}
