document.addEventListener("DOMContentLoaded", () => {

    window.scrollTo(0, 0);

    loadCartFromStorage();
    updateCartBadge();
    createFloatingCart();

    const selected = JSON.parse(localStorage.getItem("product"));

    function findProductByIdOrTitle(sel) {
        if (!sel) return null;

        return products.find(
            p => p.id === sel.id || p.title === sel.title
        ) || sel;
    }

    const currentProduct = findProductByIdOrTitle(selected);

    if (currentProduct) {

        const title = document.getElementById("p-title");
        const price = document.getElementById("p-price");
        const desc = document.getElementById("p-desc");
        const img = document.getElementById("p-img");

        if (title) title.innerText = currentProduct.title;
        if (price) price.innerText = "$" + currentProduct.price;
        if (desc) desc.innerText = currentProduct.desc;
        if (img) img.src = currentProduct.img;

        const scentBox = document.getElementById("scentBox");

        if (scentBox) {

            if (currentProduct.scent) {

                scentBox.innerHTML = `
                    <h4>Scent Profile</h4>
                    <p>Top: ${currentProduct.scent.top}</p>
                    <p>Heart: ${currentProduct.scent.heart}</p>
                    <p>Base: ${currentProduct.scent.base}</p>
                `;

            } else {

                scentBox.innerHTML = `
                    <h4>Scent Profile</h4>
                    <p>Not available</p>
                `;
            }
        }

        loadRelated(currentProduct.id);
    }

  
    document.addEventListener("click", (e) => {

        if (window.location.hash === "#open-cart") {
            setTimeout(() => {
                renderCart();
            }, 300);
        }

        if (e.target.classList.contains("add")) {

            const product = JSON.parse(localStorage.getItem("product"));

            if (!product) return;

            const existing = cart.find(item => item.name === product.title);

            if (existing) {

                existing.quantity++;

            } else {

                cart.push({
                    name: product.title,
                    price: parseFloat(product.price),
                    quantity: 1
                });
            }

            saveCart();
            updateCartBadge();

            // button effect
            e.target.innerText = "Added ✓";
            e.target.style.background = "#a88b7a";
            e.target.style.color = "white";

            setTimeout(() => {
                e.target.innerText = "Add to Cart";
                e.target.style.background = "";
                e.target.style.color = "";
            }, 1500);

            showToast(`${product.title} added to cart`);

            renderCart();
        }

        if (e.target.classList.contains("shop-item-btn")) {
            addToCart(e);
        }

        if (e.target.classList.contains("view-item-btn")) {
            openProductFromShop(e);
        }

if (e.target.closest("#floating-cart")) {
    e.stopPropagation();
    renderCart();
}


        const closeBtn = e.target.closest("#close-cart-btn");

        if (closeBtn) {
            closeCart();
        }
    });

    createThumbGallery();
    injectAnimations();
});



const products = [
    {
        id: "femme-feet",
        title: "Femme Feet",
        price: 20,
        img: "candle1.png",
        desc: "Elegant feminine energy with soft floral warmth.",
        scent: {
            top: "Soft Florals",
            heart: "Vanilla Blossom",
            base: "Amber Musk"
        }
    },

    {
        id: "color-glow",
        title: "Color Glow",
        price: 22,
        img: "candle2.png",
        desc: "Bright ambiance that softens every room.",
        scent: {
            top: "Citrus Light",
            heart: "White Petals",
            base: "Soft Woods"
        }
    },

    {
        id: "ever-gleam",
        title: "Ever Gleam",
        price: 30,
        img: "candle3.png",
        desc: "Minimal luxury with timeless aesthetic energy.",
        scent: {
            top: "Fresh Citrus",
            heart: "Jasmine Air",
            base: "Warm Amber"
        }
    },

    {
        id: "rockstar",
        title: "Rockstar",
        price: 25,
        img: "candle4.png",
        desc: "Bold scent for confident, modern spaces.",
        scent: {
            top: "Spiced Citrus",
            heart: "Leather Bloom",
            base: "Dark Amber"
        }
    },

    {
        id: "seashell-serenity",
        title: "Seashell Serenity",
        price: 18,
        img: "candle5.png",
        desc: "Ocean-inspired calm with soft coastal notes.",
        scent: {
            top: "Sea Breeze",
            heart: "Water Lily",
            base: "Soft Sandalwood"
        }
    },

    {
        id: "angel-wings",
        title: "Angel Wings",
        price: 28,
        img: "candle6.png",
        desc: "Pure, soft fragrance with heavenly touch.",
        scent: {
            top: "Powder Musk",
            heart: "Clean Cotton",
            base: "White Amber"
        }
    },

    {
        id: "grace-simplicity",
        title: "Grace & Simplicity",
        price: 26,
        img: "candle7.png",
        desc: "Minimal design with calm, balanced energy.",
        scent: {
            top: "Soft Herbal",
            heart: "Chamomile",
            base: "Light Wood"
        }
    },

    {
        id: "eternal-duo",
        title: "Eternal Duo",
        price: 32,
        img: "candle8.png",
        desc: "A symbol of unity, warmth and connection.",
        scent: {
            top: "Warm Spice",
            heart: "Rose Petal",
            base: "Vanilla Musk"
        }
    },

    {
        id: "the-goddess",
        title: "The Goddess",
        price: 35,
        img: "candle9.png",
        desc: "Celebrating feminine power and beauty.",
        scent: {
            top: "Floral Mist",
            heart: "Peony",
            base: "Golden Amber"
        }
    },

    {
        id: "blooming-body",
        title: "Blooming Body",
        price: 21,
        img: "candle10.png",
        desc: "Soft maternal energy with gentle floral tones.",
        scent: {
            top: "Fresh Bloom",
            heart: "Rose Milk",
            base: "Soft Powder"
        }
    },

    {
        id: "lovers-marks",
        title: "Lover’s Marks",
        price: 19,
        img: "candle11.png",
        desc: "Warm romantic scent with deep cozy notes.",
        scent: {
            top: "Red Berries",
            heart: "Rose Velvet",
            base: "Warm Vanilla"
        }
    },

    {
        id: "butterfly-embrace",
        title: "Butterfly Embrace",
        price: 24,
        img: "candle12.png",
        desc: "Light, soft transformation energy.",
        scent: {
            top: "Fresh Air",
            heart: "Jasmine Dew",
            base: "Soft Musk"
        }
    }
];

localStorage.setItem("products", JSON.stringify(products));



function openProductFromShop(e) {

    const btn = e.target;

    const product = {
        id: btn.dataset.id,
        title: btn.dataset.title,
        price: btn.dataset.price,
        img: btn.dataset.img,
        desc: btn.dataset.desc
    };

    localStorage.setItem("product", JSON.stringify(product));

    window.location.href = "product.html";
}



function loadRelated(currentId) {

    const container = document.getElementById("relatedGrid");

    if (!container) return;

    const current = products.find(p => p.id === currentId);

    if (!current) return;

    const related = products
        .filter(p => p.id !== currentId)
        .map(p => ({
            ...p,
            diff: Math.abs(p.price - current.price)
        }))
        .sort((a, b) => a.diff - b.diff)
        .slice(0, 3);

    container.innerHTML = related.map(p => `
        <div class="card" onclick="openProduct('${p.id}')">
            <img src="${p.img}">
            <h3>${p.title}</h3>
            <p>$${p.price}</p>
        </div>
    `).join("");
}



function createThumbGallery() {

    const thumbs = document.querySelectorAll(".thumbs img");
    const mainImg = document.getElementById("p-img");

    if (!thumbs.length || !mainImg) return;

    thumbs.forEach(img => {

        img.addEventListener("click", () => {
            mainImg.src = img.src;
        });

    });
}


let cart = JSON.parse(localStorage.getItem("cart")) || [];


function addToCart(e) {

    const btn = e.target;

    const name = btn.dataset.title;
    const price = parseFloat(btn.dataset.price);

    const existing = cart.find(item => item.name === name);

    btn.innerHTML = "Added ✓";
    btn.style.background = "#a88b7a";
    btn.style.color = "white";

    setTimeout(() => {
        btn.innerHTML = "Add to Cart";
        btn.style.background = "";
        btn.style.color = "";
    }, 1500);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({
            name,
            price,
            quantity: 1
        });
    }

    saveCart();
    updateCartBadge();
    showToast(`${name} added to cart`);
}



function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}



function loadCartFromStorage() {
    const saved = localStorage.getItem("cart");
    if (saved) {
        cart = JSON.parse(saved);
    }
}


function createFloatingCart() {

    if (document.getElementById("floating-cart")) return;

    const cartBtn = document.createElement("div");

    cartBtn.id = "floating-cart";

    cartBtn.innerHTML = `
        🛒
        <span id="cart-count">0</span>
    `;

    cartBtn.style = `
        position:fixed;
        right:30px;
        bottom:30px;
        width:75px;
        height:75px;
        background:linear-gradient(135deg,#c49e85,#b17f61);
        color:white;
        border-radius:50%;
        display:flex;
        justify-content:center;
        align-items:center;
        font-size:28px;
        cursor:pointer;
        z-index:9999;
        box-shadow:0 15px 35px rgba(196,158,133,0.35);
        transition:0.3s ease;
        user-select:none;
    `;

    cartBtn.onmouseenter = () => {
        cartBtn.style.transform = "scale(1.08)";
    };

    cartBtn.onmouseleave = () => {
        cartBtn.style.transform = "scale(1)";
    };

    document.body.appendChild(cartBtn);

    const badge = document.getElementById("cart-count");

    badge.style = `
        position:absolute;
        top:-5px;
        right:-5px;
        width:28px;
        height:28px;
        background:#964040;
        color:white;
        border-radius:50%;
        display:flex;
        justify-content:center;
        align-items:center;
        font-size:13px;
        font-weight:600;
    `;

    updateCartBadge();
}


function updateCartBadge() {

    const badge = document.getElementById("cart-count");

    if (!badge) return;

    let total = 0;

    cart.forEach(item => {
        total += item.quantity;
    });

    badge.innerText = total;
}



function showToast(message) {

    const existing = document.querySelector(".toast-notification");
    if (existing) existing.remove();

    const toast = document.createElement("div");

    toast.className = "toast-notification";

    toast.innerHTML = `
        <div style="display:flex;align-items:center;gap:14px;">

            <div style="
                width:42px;
                height:42px;
                background:#c49e85;
                border-radius:50%;
                display:flex;
                justify-content:center;
                align-items:center;
                color:white;
                font-size:18px;
            ">✓</div>

            <div>
                <div style="font-weight:600;font-size:15px;color:#fff;">
                    Added to Cart
                </div>
                <div style="font-size:13px;color:#f0e6df;">
                    ${message}
                </div>
            </div>

        </div>
    `;

    toast.style = `
        position:fixed;
        bottom:120px;
        right:30px;
        background:#964040;
        padding:18px 22px;
        border-radius:20px;
        z-index:99999;
        box-shadow:0 20px 45px rgba(0,0,0,0.2);
        transform:translateY(30px);
        opacity:0;
        transition:0.4s ease;
        min-width:290px;
        backdrop-filter:blur(10px);
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = "1";
        toast.style.transform = "translateY(0)";
    }, 50);

    setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translateY(20px)";
        setTimeout(() => toast.remove(), 400);
    }, 2600);
}



function closeCart() {
    const overlay = document.getElementById("cart-section");
    if (overlay) overlay.remove();
}



function renderCart() {

    let overlay = document.getElementById("cart-section");

    if (!overlay) {

        overlay = document.createElement("div");
        overlay.id = "cart-section";

        overlay.style = `
            position:fixed;
            inset:0;
            background:rgba(0,0,0,0.35);
            backdrop-filter:blur(6px);
            z-index:2147483647;
            display:flex;
            justify-content:center;
            align-items:center;
            padding:20px;
        `;

        overlay.onclick = (e) => {
            if (e.target === overlay) closeCart();
        };

        document.body.appendChild(overlay);

        const modal = document.createElement("div");
        modal.id = "cart-modal";

        modal.style = `
            width:320px;
            max-width:95%;
            max-height:80vh;
            overflow-y:auto;
            background:white;
            border-radius:24px;
            padding:22px;
            box-shadow:0 15px 40px rgba(0,0,0,0.15);
            position:relative;
        `;

        modal.onclick = (e) => e.stopPropagation();

        overlay.appendChild(modal);
    }

    updateCartUI();
}



function updateCartUI() {

    const modal = document.getElementById("cart-modal");
    if (!modal) return;

    let total = 0;
    let items = "";

    cart.forEach(item => {

        total += item.price * item.quantity;

        items += `
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:18px;gap:10px;">

                <div style="flex:1;">
                    <div style="font-size:16px;font-weight:600;color:#8d5c45;margin-bottom:4px;">
                        ${item.name}
                    </div>
                    <div style="color:#999;font-size:13px;">
                        $${item.price}
                    </div>
                </div>

                <div style="display:flex;align-items:center;gap:8px;background:#f5eee8;padding:5px 10px;border-radius:30px;">
                    <button onclick="changeQty('${item.name}',-1)"
                        style="width:24px;height:24px;border:none;border-radius:50%;cursor:pointer;">
                        −
                    </button>

                    <span>${item.quantity}</span>

                    <button onclick="changeQty('${item.name}',1)"
                        style="width:24px;height:24px;border:none;border-radius:50%;background:#c49e85;color:white;cursor:pointer;">
                        +
                    </button>
                </div>

                <div style="min-width:60px;text-align:right;font-weight:700;color:#8d5c45;">
                    $${(item.price * item.quantity).toFixed(2)}
                </div>

            </div>
        `;
    });

    modal.innerHTML = `
        <button onclick="closeCart()"
            style="position:absolute;top:12px;right:12px;width:30px;height:30px;border:none;border-radius:50%;cursor:pointer;">
            ✕
        </button>

        <h2 style="font-size:28px;color:#8d5c45;margin-bottom:20px;">
            Your Cart
        </h2>

        ${cart.length ? items : `<div style="text-align:center;padding:40px;color:#999;">Cart is empty</div>`}

        ${cart.length ? `
        <div style="margin-top:20px;padding-top:18px;border-top:1px solid #eee;">

            <div style="display:flex;justify-content:space-between;margin-bottom:18px;font-size:18px;font-weight:700;color:#8d5c45;">
                <span>Total</span>
                <span>$${total.toFixed(2)}</span>
            </div>

            <button onclick="openCheckout()"
                style="width:100%;border:none;padding:14px;border-radius:14px;background:linear-gradient(135deg,#c49e85,#a97458);color:white;font-weight:600;cursor:pointer;">
                Secure Checkout
            </button>

        </div>` : ""}
    `;
}

function openCheckout() {

  const cartOverlay = document.getElementById("cart-section");
    if (cartOverlay) {
        cartOverlay.remove();
    }

    const old = document.getElementById("checkout-overlay");
    if (old) old.remove();


    const overlay = document.createElement("div");
    overlay.id = "checkout-overlay";

    overlay.style = `
        position:fixed;
        inset:0;
        background:rgba(0,0,0,0.5);
        backdrop-filter:blur(8px);
        display:flex;
        justify-content:center;
        align-items:center;
        z-index:999999;
        padding:20px;
    `;

    overlay.onclick = (e) => {
        if (e.target === overlay) overlay.remove();
    };

    const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

    const modal = document.createElement("div");

    modal.style = `
        width:420px;
        max-width:95%;
        background:white;
        border-radius:24px;
        padding:25px;
        box-shadow:0 20px 60px rgba(0,0,0,0.2);
        animation:pop .25s ease;
    `;

    modal.innerHTML = `
        <h2 style="margin-bottom:15px;color:#8d5c45;">
            Checkout
        </h2>

        <div style="
            background:#f7f2ee;
            padding:12px;
            border-radius:12px;
            margin-bottom:18px;
            font-size:14px;
            color:#555;
        ">
            Total: <b style="color:#8d5c45;">$${total.toFixed(2)}</b>
        </div>

        <div style="display:flex;flex-direction:column;gap:12px;">

            <input id="co-name" placeholder="Full Name" style="
                padding:12px;
                border:1px solid #ddd;
                border-radius:10px;
                outline:none;
            ">

            <input id="co-email" placeholder="Email" style="
                padding:12px;
                border:1px solid #ddd;
                border-radius:10px;
                outline:none;
            ">

            <input id="co-address" placeholder="Address" style="
                padding:12px;
                border:1px solid #ddd;
                border-radius:10px;
                outline:none;
            ">

        </div>

        <button onclick="confirmCheckout()" style="
            width:100%;
            margin-top:18px;
            padding:14px;
            border:none;
            border-radius:14px;
            background:linear-gradient(135deg,#c49e85,#a97458);
            color:white;
            font-weight:600;
            cursor:pointer;
        ">
            Pay Now
        </button>

        <button onclick="this.closest('#checkout-overlay').remove()" style="
            width:100%;
            margin-top:10px;
            padding:12px;
            border:none;
            background:transparent;
            color:#999;
            cursor:pointer;
        ">
            Cancel
        </button>
    `;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);
}

function confirmCheckout() {

    const name = document.getElementById("co-name").value;
    const email = document.getElementById("co-email").value;
    const address = document.getElementById("co-address").value;

    if (!name || !email || !address) {
        alert("Please fill all fields");
        return;
    }

    const overlay = document.getElementById("checkout-overlay");

    overlay.innerHTML = `
        <div style="
            background:white;
            padding:30px;
            border-radius:20px;
            text-align:center;
            animation:pop .25s ease;
            width:320px;
        ">

            <div style="
                width:70px;
                height:70px;
                margin:0 auto 15px;
                background:#c49e85;
                border-radius:50%;
                display:flex;
                align-items:center;
                justify-content:center;
                color:white;
                font-size:30px;
            ">
                ✓
            </div>

            <h2 style="color:#8d5c45;">Order Confirmed</h2>

            <p style="color:#777;font-size:14px;margin-top:8px;">
                Thank you ${name}, your order is being processed.
            </p>

        </div>
    `;

    cart = [];
    saveCart();
    updateCartBadge();

    setTimeout(() => {
        overlay.remove();
    }, 2500);
}


function confirmCheckout() {

    const name = document.getElementById("co-name").value;
    const email = document.getElementById("co-email").value;
    const address = document.getElementById("co-address").value;

    if (!name || !email || !address) {
        alert("Please fill all fields");
        return;
    }

    const overlay = document.getElementById("checkout-overlay");

    overlay.innerHTML = `
        <div style="
            width:420px;
            max-width:95%;
            background:white;
            border-radius:24px;
            padding:25px;
            animation:pop .25s ease;
        ">

            <h2 style="color:#8d5c45;margin-bottom:15px;">
                Payment Method
            </h2>

            <p style="color:#777;font-size:14px;margin-bottom:15px;">
                Choose how you want to pay
            </p>

            <div style="display:flex;flex-direction:column;gap:12px;">

                <button onclick="selectPayment('card')" style="
                    padding:14px;
                    border:1px solid #ddd;
                    border-radius:12px;
                    background:#fff;
                    cursor:pointer;
                    text-align:left;
                ">
                    💳 Credit / Debit Card
                </button>

                <button onclick="selectPayment('paypal')" style="
                    padding:14px;
                    border:1px solid #ddd;
                    border-radius:12px;
                    background:#fff;
                    cursor:pointer;
                    text-align:left;
                ">
                    🅿️ PayPal
                </button>

                <button onclick="selectPayment('cash')" style="
                    padding:14px;
                    border:1px solid #ddd;
                    border-radius:12px;
                    background:#fff;
                    cursor:pointer;
                    text-align:left;
                ">
                    💵 Cash on Delivery
                </button>

            </div>

            <button onclick="this.closest('#checkout-overlay').remove()" style="
                width:100%;
                margin-top:15px;
                padding:12px;
                border:none;
                background:transparent;
                color:#999;
                cursor:pointer;
            ">
                Back
            </button>

        </div>
    `;
}

function selectPayment(type) {

    const overlay = document.getElementById("checkout-overlay");
    const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

    if (type === "card") {

        overlay.innerHTML = `
            <div style="
                width:420px;
                max-width:95%;
                background:white;
                border-radius:24px;
                padding:25px;
                animation:pop .25s ease;
            ">

                <h2 style="color:#8d5c45;margin-bottom:10px;">
                    Card Payment
                </h2>

                <div style="
                    background:#f7f2ee;
                    padding:12px;
                    border-radius:10px;
                    margin-bottom:15px;
                    font-size:14px;
                ">
                    Total: <b>$${total.toFixed(2)}</b>
                </div>

                <div style="display:flex;flex-direction:column;gap:10px;">

                    <input placeholder="Card Number" style="
                        padding:12px;
                        border:1px solid #ddd;
                        border-radius:10px;
                    ">

                    <div style="display:flex;gap:10px;">

                        <input placeholder="MM/YY" style="
                            flex:1;
                            padding:12px;
                            border:1px solid #ddd;
                            border-radius:10px;
                        ">

                        <input placeholder="CVC" style="
                            flex:1;
                            padding:12px;
                            border:1px solid #ddd;
                            border-radius:10px;
                        ">

                    </div>

                    <input placeholder="Card Holder Name" style="
                        padding:12px;
                        border:1px solid #ddd;
                        border-radius:10px;
                    ">

                </div>

                <button onclick="processPayment()" style="
                    width:100%;
                    margin-top:15px;
                    padding:14px;
                    border:none;
                    border-radius:14px;
                    background:linear-gradient(135deg,#c49e85,#a97458);
                    color:white;
                    font-weight:600;
                    cursor:pointer;
                ">
                    Pay Securely
                </button>

            </div>
        `;
    }

    if (type === "paypal") {
        overlay.innerHTML = `
            <div style="background:white;padding:30px;border-radius:20px;text-align:center;">
                <h2>PayPal Checkout</h2>
                <p style="color:#777;">Redirecting to PayPal...</p>
            </div>
        `;

        setTimeout(processPayment, 1500);
    }

    if (type === "cash") {
        processPayment();
    }
}


function processPayment() {

    const overlay = document.getElementById("checkout-overlay");

    if (selectedPayment === "card") {

        const cardNumber = document.querySelector('input[placeholder="Card Number"]').value;
        const expiry = document.querySelector('input[placeholder="MM/YY"]').value;
        const cvc = document.querySelector('input[placeholder="CVC"]').value;
        const name = document.querySelector('input[placeholder="Card Holder Name"]').value;

        if (!cardNumber || !expiry || !cvc || !name) {
            alert("Please fill all card details");
            return;
        }

        if (cardNumber.length < 12) {
            alert("Invalid card number");
            return;
        }
    }

    if (!selectedPayment) {
        alert("Please select a payment method");
        return;
    }

    overlay.innerHTML = `
        <div style="
            background:white;
            padding:30px;
            border-radius:20px;
            text-align:center;
            animation:pop .25s ease;
            width:320px;
        ">

            <div style="
                width:70px;
                height:70px;
                margin:0 auto 15px;
                background:#c49e85;
                border-radius:50%;
                display:flex;
                align-items:center;
                justify-content:center;
                color:white;
                font-size:30px;
            ">
                ✓
            </div>

            <h2 style="color:#8d5c45;">Payment Successful</h2>

            <p style="color:#777;font-size:14px;margin-top:8px;">
                Your order has been placed successfully.
            </p>

        </div>
    `;

    cart = [];
    saveCart();
    updateCartBadge();

    setTimeout(() => {
        overlay.remove();
    }, 2500);
}



function changeQty(name, value) {

    const item = cart.find(i => i.name === name);
    if (!item) return;

    item.quantity += value;

    if (item.quantity <= 0) {
        cart = cart.filter(i => i.name !== name);
    }

    saveCart();
    updateCartBadge();
    updateCartUI(); // 👈 NO REFRESH, NO FLICKER
}



function injectAnimations() {

    const style = document.createElement("style");

    style.innerHTML = `

        @keyframes fadeIn {
            from {
                opacity:0;
            }
            to {
                opacity:1;
            }
        }

        @keyframes slideUp {
            from {
                transform:translateY(40px);
                opacity:0;
            }
            to {
                transform:translateY(0);
                opacity:1;
            }
        }

    `;

    document.head.appendChild(style);
}


function openProduct(id) {

    const product = products.find(p => p.id === id);

    if (!product) return;

    localStorage.setItem("product", JSON.stringify(product));

    window.location.href = "product.html";
}



const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector(".animated-nav");

if (hamburger && nav) {

    hamburger.addEventListener("click", (e) => {
        nav.classList.toggle("active");
        e.stopPropagation();
    });

    document.addEventListener("click", (e) => {

        const isClickInsideNav = nav.contains(e.target);
        const isClickHamburger = hamburger.contains(e.target);

        if (!isClickInsideNav && !isClickHamburger) {
            nav.classList.remove("active");
        }
    });
}

const contactForm = document.getElementById("contactForm");

const successPopup = document.getElementById("successPopup");

const closePopup = document.getElementById("closePopup");

contactForm.addEventListener("submit", function(e){

    e.preventDefault();

    successPopup.classList.add("active");

    contactForm.reset();

});


closePopup.addEventListener("click", function(){
    successPopup.classList.remove("active");

});
