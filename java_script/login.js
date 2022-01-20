document.querySelector("#show-login").addEventListener("click",function(){
	document.querySelector(".popUp").classList.add("activeL");

});

document.querySelector(".popUp .close-btn").addEventListener("click",function(){
	document.querySelector(".popUp").classList.remove("activeL");
});

