document.querySelector("#show-register").addEventListener("click",function(){
	document.querySelector(".popUp").classList.add("active");

});

document.querySelector(".popUp .close-btn").addEventListener("click",function(){
	document.querySelector(".popUp").classList.remove("active");
});