// show menu
const liatMenu= (toggleId, navId) =>{
    const toggle= document.getElementById(toggleId),
    nav= document.getElementById(navId)

    //validasi
    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            nav.classList.toggle('liat-menu')
        })
    }
}
liatMenu('nav-toggle', 'nav-menu')

//remove menu 
const navlink= document.querySelectorAll('.nav-link')
function linkaction(){
    const navmenu= document.getElementById('nav-menu')

    //jika memilih menu, class liat menu akan hilang
    navmenu.classList.remove('liat-menu')
}
navlink.forEach(n =>n.addEventListener('click', linkaction))

// scroll untuk active link
const sections= document.querySelectorAll('section[id]')
function scrollActive(){
    const scrollY= window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight= current.offsetHeight;
        const sectionTop= current.offsetTop -50;
        sections = current.getAttribute('id');

        if(scrollY > sectionTop && scrollY <= sectionTop +sectionHeight){
            document.querySelector('.nav-menu a[href*=' +sections  +']').classList.add('active')
        }else{
            document.querySelector('.nav-menu a[href*=' +sections  +']').classList.remove('active')
        }
    })
}
window.addEventListener('scroll', scrollActive)

// mengubah backgroud header
function scrollHeader(){
    const nav= document.getElementById('header')

    //ketika telah di scroll sepanjang 170 ,akan memunculkan teader tag
    if(this.scrollY >= 170) nav.classList.add('scroll-header');
    else nav.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

// mode dark theme
const theme_button= document.getElementById('theme-button')
const dark_theme= "dark-theme"
const light_icon= 'bx-toggle-right'
    //jika diklik maka
const selectedTheme= localStorage.getItem("selected-theme")
const selectedIcon= localStorage.getItem('selected-icon')

const get_currentTheme= () => document.body.classList.contains(dark_theme)? 'dark' : "light"
const get_currentIcon= () => theme_button.body.classList.contains(light_icon)?  "bx-toggle-left" : 'bx-toggle-right'

    //berkaitan dengan topik yang dipilih 
if(selectedTheme){
    //memunculkan tema yang dipilih
    document.body.classList[selectedTheme=="dark" ? "add" : "remove"] (dark_theme)
    theme_button.classList[selectedIcon==" bx-toggle-left" ? "add" : "remove"] (light_icon)
}
    //mengaktivkan button secara manual
theme_button.addEventListener("click", ()=>{
    //menambah dan menghapus
    document.body.classList.toggle (dark_theme)
    theme_button.classList.toggle (light_icon)

    localStorage.setItem("selected-theme", get_currentTheme())
    localStorage.setItem("selected-icon", get_currentIcon())
})
// ikon scrool akan muncul ketika mulai di scroll
function scrollAtas(){
    const scrollAtas= document.getElementById('scroll-Atas')

    //ketika telah di scroll sepanjang 450 ,akan memunculkan ikon scroll
    if(this.scrollY >= 450) scrollAtas.classList.add('scroll-top-show');
    else scrollAtas.classList.remove('scroll-top-show')
}
window.addEventListener('scroll', scrollAtas)

// ikon scrool akan muncul ketika mulai di scroll di halaman makanan
function scrollAtas__makanan(){
    const scrollAtas= document.getElementById('scroll-Atas-makanan')

    //ketika telah di scroll sepanjang 100 ,akan memunculkan ikon scroll
    if(this.scrollY >= 100) scrollAtas.classList.add('scroll-top-show');
    else scrollAtas.classList.remove('scroll-top-show')
}
window.addEventListener('scroll', scrollAtas__makanan)

//slide show
var slideIndex = 1;
showSlides(slideIndex);

//next dan prev 
function plusSlides(n){
    showSlides(slideIndex += n);
}

//thumbnail image
function currentSlide(n){
    showSlides(slideIndex= n);
}

function showSlides(n){
    var i;
    var slides= document.getElementsByClassName("slides");
    var dots= document.getElementsByClassName("dot");

    if(n > slides.length) {slideIndex=1}
    if(n < 1 ) {slideIndex = slides.length}
    for(i=0; i< slides.length; i++){
        slides[i].style.display= "none";
    }
    for(i=0; i< dots.length; i++){
        dots[i].className= dots[i].className.replace("active","");
    }
    slides[slideIndex-1].style.display= "block";
    dots[slideIndex-1].className += "active"

}

//pencarian
function search__func(){
    document.getElementById("erase").classList.add("move");
}
function erase__input(){
    document.getElementById("output").value="";
}

//keranjang belanja
function closeCart() {
	const cart = document.querySelector('.producstOnCart');
	cart.classList.toggle('hide');
	document.querySelector('body').classList.toggle('stopScrolling')
}


const openShopCart = document.querySelector('.shoppingCartButton');
openShopCart.addEventListener('click', () => {
	const cart = document.querySelector('.producstOnCart');
	cart.classList.toggle('hide');
	document.querySelector('body').classList.toggle('stopScrolling');
});


const closeShopCart = document.querySelector('#closeButton');
const overlay = document.querySelector('.overlay');
closeShopCart.addEventListener('click', closeCart);
overlay.addEventListener('click', closeCart);


let productsInCart = JSON.parse(localStorage.getItem('shoppingCart'));
if(!productsInCart){
	productsInCart = [];
}
const parentElement = document.querySelector('#buyItems');
const cartSumPrice = document.querySelector('#sum-prices');
const products = document.querySelectorAll('.product-under');


const countTheSumPrice = function () { // 4
	let sum = 0;
	productsInCart.forEach(item => {
		sum += item.price;
	});
	return sum;
}

const updateShoppingCartHTML = function () {  // 3
	localStorage.setItem('shoppingCart', JSON.stringify(productsInCart));
	if (productsInCart.length > 0) {
		let result = productsInCart.map(product => {
			return `
				<li class="buyItem">
					<img src="${product.image}">
					<div>
						<h5>${product.name}</h5>
						<h6>$${product.price}</h6>
						<div>
							<button class="button-minus" data-id=${product.id}>-</button>
							<span class="countOfProduct">${product.count}</span>
							<button class="button-plus" data-id=${product.id}>+</button>
						</div>
					</div>
				</li>`
		});
		parentElement.innerHTML = result.join('');
		document.querySelector('.checkout').classList.remove('hidden');
		cartSumPrice.innerHTML = '$' + countTheSumPrice();

	}
	else {
		document.querySelector('.checkout').classList.add('hidden');
		parentElement.innerHTML = '<h4 class="empty">Your shopping cart is empty</h4>';
		cartSumPrice.innerHTML = '';
	}
}

function updateProductsInCart(product) { // 2
	for (let i = 0; i < productsInCart.length; i++) {
		if (productsInCart[i].id == product.id) {
			productsInCart[i].count += 1;
			productsInCart[i].price = productsInCart[i].basePrice * productsInCart[i].count;
			return;
		}
	}
	productsInCart.push(product);
}

products.forEach(item => {   // 1
	item.addEventListener('click', (e) => {
		if (e.target.classList.contains('addToCart')) {
			const productID = e.target.dataset.productId;
			const productName = item.querySelector('.productName').innerHTML;
			const productPrice = item.querySelector('.priceValue').innerHTML;
			const productImage = item.querySelector('img').src;
			let product = {
				name: productName,
				image: productImage,
				id: productID,
				count: 1,
				price: +productPrice,
				basePrice: +productPrice,
			}
			updateProductsInCart(product);
			updateShoppingCartHTML();
		}
	});
});

parentElement.addEventListener('click', (e) => { // Last
	const isPlusButton = e.target.classList.contains('button-plus');
	const isMinusButton = e.target.classList.contains('button-minus');
	if (isPlusButton || isMinusButton) {
		for (let i = 0; i < productsInCart.length; i++) {
			if (productsInCart[i].id == e.target.dataset.id) {
				if (isPlusButton) {
					productsInCart[i].count += 1
				}
				else if (isMinusButton) {
					productsInCart[i].count -= 1
				}
				productsInCart[i].price = productsInCart[i].basePrice * productsInCart[i].count;

			}
			if (productsInCart[i].count <= 0) {
				productsInCart.splice(i, 1);
			}
		}
		updateShoppingCartHTML();
	}
});

updateShoppingCartHTML();




