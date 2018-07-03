/*eslint-disable*/
const sliderImages = document.querySelectorAll('.destinations .grid li img');
const buttonToTop = document.getElementById('toTop');

function debounce(func, wait = 20, immediate = true) {
  var timeout;
  return function() {
    var context = this,
      args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

function checkSlide(e) {
  sliderImages.forEach(sliderImage => {
    const slideInAt =
      window.scrollY + window.innerHeight - sliderImage.height / 2;
    const imageBottom = sliderImage.offsetTop + sliderImage.height;
    const isHalfShown = slideInAt > sliderImage.offsetTop;
    const isNotScrolledPast = window.scrollY < imageBottom;

    if (isHalfShown && isNotScrolledPast) {
      sliderImage.classList.add('active');
    } else {
      sliderImage.classList.remove('active');
    }
  });
}

function showButton() {
  window.scrollY > window.innerHeight
    ? (buttonToTop.style.display = 'block')
    : (buttonToTop.style.display = 'none');
}

window.addEventListener('scroll', checkSlide);
window.addEventListener('scroll', showButton);

$(document).on('click', 'a[href^="#"]', function(event) {
  event.preventDefault();

  $('html, body').animate(
    {
      scrollTop: $($.attr(this, 'href')).offset().top
    },
    500
  );
});
