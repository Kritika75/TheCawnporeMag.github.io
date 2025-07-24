window.onscroll = function() {
  scrollProgressBar();
};

function scrollProgressBar() {
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 100;
  document.getElementById("progressBar").style.width = scrolled + "%";
}

document.addEventListener("DOMContentLoaded", function() {
    var navLinks = document.getElementById("navLinks");

    window.showMenu = function() {
        console.log("showMenu called");
        navLinks.style.right = "0";
        document.body.style.overflow = "hidden"; 
    }

    window.hideMenu = function() {
        console.log("hideMenu called");
        navLinks.style.right = "-200px";
        document.body.style.overflow = "auto";
    }
});

const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');
const backToTop = document.querySelector('.back-to-top');

/*registerBtn.addEventListener('click', () =>  {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});*/

// to show and hide the back-to-top button
window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) { console.log(window.pageYOffset);
        backToTop.classList.add("active");
    } else {
        backToTop.classList.remove("active");
    }
})
