/*~~~~~~~~~~~~~~~ TOGGLE BUTTON ~~~~~~~~~~~~~~~*/
const navMenu = document.getElementById("nav-menu")
const navLink = document.getElementById(".nav-link")
const hamburger = document.getElementById("hamburger")

hamburger.addEventListener("click",() => {
    navMenu.classList.toggle("left-[0]")
    hamburger.classList.toggle('ri-close-large-line')
})

navLink.forEach(link => {
    link.addEventListener("click",() => {
        navMenu.clasList.toggle("left-[0]")
        hamburger.classList.toggle('ri-close-large-line')
    })
})


/*~~~~~~~~~~~~~~~ SHOW SCROLL UP ~~~~~~~~~~~~~~~*/
const scrollUp = () => {
    const scrollUpBtn=document.getElementById("scroll-up")

    if(this.scrollY >=250) {
        scrollUpBtn.classList.remove("-bottom-1/2")
        scrollUpBtn.classList.add("bottom-4")
    } else{
        scrollUpBtn.classList.add("-bottom-1/2")
        scrollUpBtn.classList.remove("bottom-4")
    }
}

window.addEventListener("scroll",scrollUp)
/*~~~~~~~~~~~~~~~ CHANGE BACKGROUND HEADER ~~~~~~~~~~~~~~~*/


/*~~~~~~~~~~~~~~~ SWIPER ~~~~~~~~~~~~~~~*/
const swiper = new Swiper('.swiper', {
    // Optional parameters
   speed:400,
   spaceBetween:30,
   autoplay:{
    delay:3000,
    disableOnInteraction:false
   },
  
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
      clickable:true
    },
    grabCursor:true,
    breakpoints:{
        640:{
            slidesPerview:1
        },
        768:{
            slidesPerview:2
        },
        1024:{
            slidesPerview:3
        },
    }
  });


/*~~~~~~~~~~~~~~~ SCROLL SECTIONS ACTIVE LINK ~~~~~~~~~~~~~~~*/

const activeLink = () => {
    const sections = document.querySelectorAll('section')
    const navLinks = document.querySelectorAll('.nav-link')

    let current ="home"

    sections.forEach(section => {
        const sectionTop = section.offsetTop;

        if(this.scrollY >= sectionTop - 60){
            current = section.getAttribute("id")
        }
    })

    navLinks.forEach(item => {
        item.classList.remove("active")

        if(item.herf.includes(current)) {
            item.classList.add("active")
        }
    })
}
window.addEventListener("scroll",activeLink)

/*~~~~~~~~~~~~~~~ SCROLL REVEAL ANIMATION ~~~~~~~~~~~~~~~*/
const sr = ScrollReveal({
    origin:"top",
    distance:"60px",
    duration:2500,
    delay: 300,
    reset: true
})

sr.reveal(`.home_data`)
sr.reveal(`.home_image`)


// Store cart items
        let cart = [];

        // Function to add items to the cart
        function addToCart(itemName, itemPrice) {
            const item = { name: itemName, price: itemPrice, quantity: 1 };
            const existingItem = cart.find(product => product.name === itemName);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push(item);
            }
            renderCart();
        }

// Render cart items on the cart page
      function renderCart() {
            const cartList = document.getElementById('cart-list');
            cartList.innerHTML = ''; // Clear the cart list

            cart.forEach((item, index) => {
                const itemRow = `
                    <div class="flex justify-between items-center mb-2">
                        <p class="text-gray-700">${item.name} (x${item.quantity})</p>
                        <p class="text-gray-700">$${(item.price * item.quantity).toFixed(2)}</p>
                        <button onclick="removeFromCart(${index})" class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">Remove</button>
                    </div>
                `;
                cartList.insertAdjacentHTML('beforeend', itemRow);
            });
// Update the cart total
            const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
            document.getElementById('addcart-total').innerText = `Total: $${total.toFixed(2)}`;
// Save cart to local storage (simulate saving)
            localStorage.setItem('addcart', JSON.stringify(cart));
        }

// Remove an item from the cart
        function removeFromCart(index) {
            cart.splice(index, 1); // Remove the item from the array
            renderCart(); // Update the cart view
        }

// On page load, load the cart from local storage if available
        window.onload = function() {
            const savedCart = localStorage.getItem('addcart');
            if (savedCart) {
                cart = JSON.parse(savedCart);
                renderCart();
            }
        }