// =========================================================
// MI-LUNETTES
// JAVASCRIPT
// =========================================================


// =========================================================
// PRODUCTS DATABASE
// =========================================================

const products = [

    {
        id: 1,
        name: "Solaire Sunny Joy",
        category: "soleil",
        gender: "femme",
        price: 89,
        rating: 4.9,
        img: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=600&auto=format&fit=crop",
        tag: "Best-Seller",
        colors: ["#FF8C00", "#D32F2F", "#2C3E50"]
    },

    {
        id: 2,
        name: "Optique Clear Vision",
        category: "vue",
        gender: "homme",
        price: 119,
        rating: 4.8,
        img: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?q=80&w=600&auto=format&fit=crop",
        tag: "Nouveau",
        colors: ["#2C3E50", "#E67E22"]
    },

    {
        id: 3,
        name: "Junior Protect",
        category: "vue",
        gender: "enfant",
        price: 65,
        rating: 5.0,
        img: "https://images.unsplash.com/photo-1508296695146-257a814070b4?q=80&w=600&auto=format&fit=crop",
        tag: "Anti-Choc",
        colors: ["#D32F2F", "#FF8C00"]
    },

    {
        id: 4,
        name: "Aviator Smile",
        category: "soleil",
        gender: "homme",
        price: 135,
        rating: 4.7,
        img: "https://images.unsplash.com/photo-1509695507497-903c140c43b0?q=80&w=600&auto=format&fit=crop",
        tag: "Tendance",
        colors: ["#FF8C00", "#2C3E50"]
    }

];


// =========================================================
// STORES DATABASE
// =========================================================

const stores = [

    {
        id: 1,
        name: "Mi-Lunettes Paris Opéra",
        address: "12 Boulevard des Capucines, 75009 Paris",
        phone: "01 42 68 11 22",
        hours: "Lun - Sam : 09:30 - 19:30"
    },

    {
        id: 2,
        name: "Mi-Lunettes Lyon Bellecour",
        address: "45 Rue de la République, 69002 Lyon",
        phone: "04 78 42 33 44",
        hours: "Lun - Sam : 10:00 - 19:00"
    },

    {
        id: 3,
        name: "Mi-Lunettes Marseille Vieux-Port",
        address: "8 La Canebière, 13001 Marseille",
        phone: "04 91 54 55 66",
        hours: "Lun - Sam : 09:30 - 19:00"
    },

    {
        id: 4,
        name: "Mi-Lunettes Bordeaux Centre",
        address: "22 Rue Sainte-Catherine, 33000 Bordeaux",
        phone: "05 56 48 77 88",
        hours: "Lun - Sam : 10:00 - 19:00"
    }

];


// =========================================================
// APPLICATION STATE
// =========================================================

let cart = [];

let wishlist = [];

let currentFilter = "all";

let maxPrice = 150;


// =========================================================
// PAGE LOAD
// =========================================================

document.addEventListener("DOMContentLoaded", () => {

    renderProducts();

    renderStores();

    renderCart();

});


// =========================================================
// RENDER PRODUCTS
// =========================================================

function renderProducts() {

    const grid = document.getElementById("products-grid");

    grid.innerHTML = "";


    const filtered = products.filter(product => {

        const matchesCategory =
            currentFilter === "all" ||
            product.category === currentFilter ||
            product.gender === currentFilter;

        const matchesPrice =
            product.price <= maxPrice;

        return matchesCategory && matchesPrice;

    });


    if (filtered.length === 0) {

        grid.innerHTML = `

            <div class="col-span-full text-center py-12">

                <i class="fa-solid fa-glasses text-4xl text-gray-300 mb-3"></i>

                <p class="text-sm font-bold text-milunettes-dark">

                    Aucune monture ne correspond à vos critères

                </p>

            </div>

        `;

        return;
    }


    filtered.forEach(product => {

        const isWish =
            wishlist.includes(product.id);


        grid.innerHTML += `

            <div class="product-card bg-white rounded-3xl border border-orange-100 p-4 transition-all duration-300 hover:shadow-xl flex flex-col justify-between group">

                <div class="relative">

                    <div class="flex justify-between items-center">

                        <span class="bg-milunettes-lightorange text-milunettes-orange text-[10px] font-bold px-2.5 py-1 rounded-full font-brand uppercase">

                            ${product.tag}

                        </span>


                        <button
                            onclick="toggleWishlist(${product.id})"
                            class="w-8 h-8 rounded-full bg-white/80 shadow-sm flex items-center justify-center text-gray-400 hover:text-milunettes-red transition-colors">

                            <i class="${
                                isWish
                                    ? "fa-solid text-milunettes-red"
                                    : "fa-regular"
                            } fa-heart text-xs"></i>

                        </button>

                    </div>


                    <div class="h-44 my-3 rounded-2xl overflow-hidden bg-orange-50/50 flex items-center justify-center">

                        <img
                            src="${product.img}"
                            alt="${product.name}"
                            class="product-img w-full h-full object-cover transition-transform duration-500">

                    </div>

                </div>


                <div>

                    <div class="flex gap-1.5 mb-2">

                        ${product.colors
                            .map(color => `
                                <span
                                    class="w-3.5 h-3.5 rounded-full border border-white shadow-sm"
                                    style="background-color: ${color}">
                                </span>
                            `)
                            .join("")}

                    </div>


                    <div class="flex justify-between items-baseline mb-1">

                        <h3 class="font-brand font-bold text-base text-milunettes-dark">

                            ${product.name}

                        </h3>


                        <span class="font-brand font-bold text-sm text-milunettes-red">

                            ${product.price} €

                        </span>

                    </div>


                    <div class="flex items-center gap-1 text-xs text-milunettes-orange mb-4">

                        <i class="fa-solid fa-star text-[10px]"></i>

                        <span class="font-bold text-milunettes-dark">

                            ${product.rating}

                        </span>

                    </div>


                    <button
                        onclick="addToCart(${product.id})"
                        class="w-full bg-milunettes-dark text-white py-2.5 rounded-xl font-brand text-xs font-bold hover:bg-milunettes-orange transition-colors flex items-center justify-center gap-1.5 shadow-sm">

                        <i class="fa-solid fa-plus text-[10px]"></i>

                        Ajouter au panier

                    </button>

                </div>

            </div>

        `;

    });

}


// =========================================================
// RENDER STORES
// =========================================================

function renderStores() {

    const container =
        document.getElementById("store-list-container");


    container.innerHTML = stores.map((store, index) => `

        <div
            onclick="selectStore(${store.id})"
            class="p-4 rounded-2xl bg-white border ${
                index === 0
                    ? "border-milunettes-orange shadow-md"
                    : "border-orange-100"
            } hover:border-milunettes-orange cursor-pointer transition-all">

            <h4 class="font-brand font-bold text-sm text-milunettes-dark flex items-center justify-between">

                ${store.name}

                <i class="fa-solid fa-chevron-right text-xs text-milunettes-orange"></i>

            </h4>


            <p class="text-xs text-gray-500 mt-1">

                <i class="fa-solid fa-location-dot text-milunettes-red mr-1"></i>

                ${store.address}

            </p>


            <p class="text-xs text-gray-500 mt-1">

                <i class="fa-solid fa-phone text-milunettes-orange mr-1"></i>

                ${store.phone}

            </p>

        </div>

    `).join("");

}


// =========================================================
// SELECT STORE
// =========================================================

function selectStore(storeId) {

    const store =
        stores.find(store => store.id === storeId);


    if (!store) {
        return;
    }


    document.getElementById("map-store-name").innerText =
        store.name;


    document.getElementById("map-store-addr").innerText =
        store.address;


    document.getElementById("map-store-hours").innerHTML = `

        <i class="fa-regular fa-clock mr-1"></i>

        ${store.hours}

    `;


    showToast(
        `Point de vente sélectionné : ${store.name}`
    );

}


// =========================================================
// ADD TO CART
// =========================================================

function addToCart(id) {

    const product =
        products.find(product => product.id === id);


    if (!product) {
        return;
    }


    const existing =
        cart.find(item => item.id === id);


    if (existing) {

        existing.qty++;

    } else {

        cart.push({
            ...product,
            qty: 1
        });

    }


    renderCart();


    showToast(
        `"${product.name}" ajouté à votre panier 👍`
    );

}


// =========================================================
// RENDER CART
// =========================================================

function renderCart() {

    const container =
        document.getElementById("cart-items-container");


    const badge =
        document.getElementById("cart-badge");


    const totalElement =
        document.getElementById("cart-total-price");


    const totalQuantity =
        cart.reduce(
            (sum, item) => sum + item.qty,
            0
        );


    const totalPrice =
        cart.reduce(
            (sum, item) =>
                sum + item.price * item.qty,
            0
        );


    badge.innerText = totalQuantity;


    totalElement.innerText =
        `${totalPrice.toFixed(2)} €`;


    if (cart.length === 0) {

        container.innerHTML = `

            <div class="text-center py-12">

                <i class="fa-solid fa-cart-flatbed text-4xl text-gray-300 mb-3"></i>

                <p class="text-xs font-bold text-milunettes-dark">

                    Votre panier est vide

                </p>

            </div>

        `;

        return;
    }


    container.innerHTML = cart.map(item => `

        <div class="flex items-center gap-3 py-3 border-b border-orange-100">

            <img
                src="${item.img}"
                class="w-14 h-14 rounded-xl object-cover bg-orange-50">


            <div class="flex-1">

                <h4 class="font-brand font-bold text-xs text-milunettes-dark">

                    ${item.name}

                </h4>


                <p class="text-xs font-bold text-milunettes-red">

                    ${item.price} €

                </p>

            </div>


            <div class="flex items-center gap-2">

                <button
                    onclick="updateQty(${item.id}, -1)"
                    class="w-6 h-6 rounded bg-orange-100 font-bold text-xs">

                    -

                </button>


                <span class="text-xs font-bold">

                    ${item.qty}

                </span>


                <button
                    onclick="updateQty(${item.id}, 1)"
                    class="w-6 h-6 rounded bg-orange-100 font-bold text-xs">

                    +

                </button>

            </div>

        </div>

    `).join("");

}


// =========================================================
// UPDATE QUANTITY
// =========================================================

function updateQty(id, delta) {

    const item =
        cart.find(item => item.id === id);


    if (!item) {
        return;
    }


    item.qty += delta;


    if (item.qty <= 0) {

        cart =
            cart.filter(item => item.id !== id);

    }


    renderCart();

}


// =========================================================
// FILTER CATEGORY
// =========================================================

function filterCategory(category) {

    currentFilter = category;

    renderProducts();

}


// =========================================================
// FILTER PRICE
// =========================================================

function filterByPrice(value) {

    maxPrice = Number(value);


    document.getElementById("price-value").innerText =
        `${value} €`;


    renderProducts();

}


// =========================================================
// WISHLIST
// =========================================================

function toggleWishlist(id) {

    if (wishlist.includes(id)) {

        wishlist =
            wishlist.filter(item => item !== id);

    } else {

        wishlist.push(id);

    }


    const badge =
        document.getElementById("wishlist-badge");


    badge.innerText =
        wishlist.length;


    badge.classList.toggle(
        "scale-0",
        wishlist.length === 0
    );


    renderProducts();

}


// =========================================================
// VIRTUAL TRY-ON
// =========================================================

function changeVirtualStyle(colorHex, name) {

    const elements =
        document.querySelectorAll(
            "#tryon-svg rect, #tryon-svg path"
        );


    elements.forEach(element => {

        if (element.getAttribute("stroke")) {

            element.setAttribute(
                "stroke",
                colorHex
            );

        }


        if (
            element.getAttribute("fill") &&
            element.getAttribute("fill") !== "none"
        ) {

            element.setAttribute(
                "fill",
                colorHex + "33"
            );

        }

    });


    showToast(`Style : ${name}`);

}


// =========================================================
// CHANGE MODEL
// =========================================================

function switchTryOnModel() {

    const models = [

        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",

        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop"

    ];


    const image =
        document.getElementById("tryon-model-img");


    image.src =
        image.src === models[0]
            ? models[1]
            : models[0];

}


// =========================================================
// WEBCAM SIMULATION
// =========================================================

function triggerWebcamSim() {

    showToast(
        "Simulation Webcam activée"
    );

}


// =========================================================
// CART DRAWER
// =========================================================

function toggleCartDrawer() {

    document
        .getElementById("cart-drawer")
        .classList.toggle("hidden");

}


// =========================================================
// MOBILE MENU
// =========================================================

function toggleMobileMenu() {

    document
        .getElementById("mobile-menu")
        .classList.toggle("hidden");

}


// =========================================================
// SEARCH
// =========================================================

function handleSearch(event) {

    const results =
        document.getElementById("search-results");


    results.classList.toggle(
        "hidden",
        event.target.value.length < 2
    );

}


// =========================================================
// NEWSLETTER
// =========================================================

function handleNewsletter(event) {

    event.preventDefault();


    showToast(
        "Bravo ! Votre code -15% : MILUNETTES15"
    );


    event.target.reset();

}


// =========================================================
// STORE APPOINTMENT
// =========================================================

function bookStoreAppointment() {

    showToast(
        "Ouverture du module de réservation de RDV..."
    );

}


// =========================================================
// CHECKOUT
// =========================================================

function checkout() {

    if (cart.length === 0) {
        return;
    }


    showToast(
        "Redirection vers le paiement sécurisé..."
    );

}


// =========================================================
// WISHLIST TOAST
// =========================================================

function openWishlistToast() {

    showToast(
        `${wishlist.length} monture(s) dans vos favoris`
    );

}


// =========================================================
// TOAST
// =========================================================

function showToast(message) {

    const toast =
        document.getElementById("toast");


    const messageElement =
        document.getElementById("toast-message");


    messageElement.innerText =
        message;


    toast.classList.remove(
        "translate-y-20",
        "opacity-0"
    );


    setTimeout(() => {

        toast.classList.add(
            "translate-y-20",
            "opacity-0"
        );

    }, 3000);

}