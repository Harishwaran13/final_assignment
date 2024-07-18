// Fetch data from API on page load
document.addEventListener('DOMContentLoaded', () => {
    fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json')
        .then(response => response.json())
        .then(data => {
            renderProducts(data.categories);
            showCategory('Men');
        })
        .catch(error => console.error('Error fetching data:', error));
});

// Function to render products
function renderProducts(categories) {
    categories.forEach(category => {
        const container = document.getElementById(category.category_name);
        category.category_products.forEach(product => {
            const productCard = createProductCard(product);
            container.appendChild(productCard);
        });
    });
}

// Function to create a product card
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';

    const imgContainer = document.createElement('div');
    imgContainer.className = 'image-container';

    const img = document.createElement('img');
    img.src = product.image;

    imgContainer.appendChild(img);

    const info = document.createElement('div');
    info.className = 'product-info';

    if (product.badge_text) {
        const badge = document.createElement('div');
        badge.className = 'badge';
        badge.innerText = product.badge_text;
        info.appendChild(badge);
    }

    const vendernames = document.createElement('div');
    vendernames.className = 'vendernames';

    const vendorname = document.createElement('div');
    vendorname.className = 'vendor-name';

    const title = document.createElement('p');
    title.innerText = product.title;
    vendorname.appendChild(title);

    const vendorContainer = document.createElement('div');
    vendorContainer.className = 'vendor-container';

    const dot = document.createElement('span');
    dot.innerText = ' • ';
    vendorContainer.appendChild(dot);

    const vendor = document.createElement('p');
    vendor.innerText = product.vendor;
    vendorContainer.appendChild(vendor);

    vendernames.appendChild(vendorname);
    vendernames.appendChild(vendorContainer);

    info.appendChild(vendernames);

    const price = document.createElement('div');
    price.className = 'price';
    const finalPrice = document.createElement('span');
    finalPrice.innerText = `Rs ${product.price}`;
    price.appendChild(finalPrice);

    if (product.compare_at_price) {
        const comparePrice = document.createElement('span');
        comparePrice.className = 'compare-price';
        comparePrice.innerText = ` Rs ${product.compare_at_price}`;
        price.appendChild(comparePrice);

        const discount = document.createElement('span');
        discount.className = 'discount';

        discount.innerText = ` ${calculateDiscount(product.price, product.compare_at_price)}% Off`;
        price.appendChild(discount);
    }

    info.appendChild(price);

    const addToCart = document.createElement('button');
    addToCart.className = 'add-to-cart';
    addToCart.innerText = 'Add to Cart';
    info.appendChild(addToCart);

    card.appendChild(imgContainer);
    card.appendChild(info);

    return card;
}



// Function to calculate discount percentage
function calculateDiscount(price, compareAtPrice) {
    return Math.round(((compareAtPrice - price) / compareAtPrice) * 100);
}

// Function to show the selected category
// Function to show the selected category
function showCategory(categoryName) {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        if (tab.innerText.trim() === categoryName) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });

    const categories = document.querySelectorAll('.tab-content');
    categories.forEach(category => {
        if (category.id === categoryName) {
            category.style.display = 'flex';
        } else {
            category.style.display = 'none';
        }
    });
}