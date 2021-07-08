

/******* 페이지 스크롤에 따른 요소 제어 */

//lodash cdn 라이브러리 사용
// 페이지 스크롤에 영향을 받는 요소들을 검색!
const badgeEl = document.querySelector('header .badges');
const toTopEl = document.querySelector('#to-top');
// 페이지에 스크롤 이벤트를 추가!!
// 스크롤이 지나치게 자주 발생하는 것을 조절(throttle, 일부러 부하를 줌)
window.addEventListener('scroll', _.throttle(function () { 
  // 페이지 스크롤 위치가 500px이 넘으면
  if (window.scrollY > 500) {
    // Badge 요소 숨기기
    // gsap 애니메이션 라이브러리 사용 / 옵션에는 css속성들을 사용
    //gsap.to(요소, 지속시간, 옵션);
    gsap.to(badgeEl, .6, {
      opacity: 0,
      display: 'none'
    });
    // 상단으로 스크롤 버튼 보이기!
    gsap.to(toTopEl, .2, {
      x: 0
    });

  //  페이지 스크롤 위치가 500px이 넘지 않으면
  } else {
    // Badge 요소 보이기
    gsap.to(badgeEl, .6, {
      opacity: 1,
      display: 'block'
    });
    // 상단으로 스크롤 버튼 숨기기!
    gsap.to(toTopEl, .2, {
      x: 100
    });
  }
}, 300));
// _.throttle(함수, 시간)

//상단으로 스크롤 버튼을 클릭하면,
toTopEl.addEventListener('click', function () {
  // 페이지 위치를 최상단으로 부드럽게(0.7초 동안) 이동.
  gsap.to(window, .7, {
    scrollTo: 0
  })
})

/****** 순서대로 나타나는 기능 */

// 나타날 요소들(.fade-in) 찾기.
const fadeEls = document.querySelectorAll(".visual .fade-in");
// 나타날 요소들을 하나씩 반복해서 처리!
fadeEls.forEach(function (fadeEl, index) {
  // 각 요소들을 순서대로(delay) 보여지게 함!
  gsap.to(fadeEl, 1, {
    delay: (index + 1) * .7, //0.7초씩 더해지면서 애니메이션효과가 나타남
    opacity: 1
  });
});


/**** 슬라이드 요소 관리 */

// new Swiper(선택자, 옵션) //new 생성자(클래스) 자바스크립트문법으로 Swiper함수를 생성한다.
new Swiper('.notice-line .swiper-container', {
  direction: 'vertical',
  autoplay: true,
  loop: true
}); 
new Swiper('.promotion .swiper-container', {
  slidesPerView: 3, //한번에 보여줄 슬라이드 개수
  spaceBetween: 10, //슬라이드 사이 여백
  centeredSlides: true, // 1번 슬라이드가 가운데 보이기
  loop: true,
  autoplay: {
    delay: 5000
  },
  pagination: {
    el: '.promotion .swiper-pagination', // 페이지 번호 요소 선택자
    clickcable: true // 사용자의 페이지 번호 요소 제어 가능 여부
  },
  navigation: {
    prevEl: '.promotion .swiper-prev',
    nextEl: '.promotion .swiper-next'
  }
});
new Swiper('.awards .swiper-container', {
  autoplay: true,
  loop: true,
  spaceBetween: 30,
  slidesPerView: 5,
  navigation: {
    prevEl: '.awards .swiper-prev',
    nextEl: '.awards .swiper-next'
  }
})

/****** Promotion 슬라이드 토글 기능 */

// 슬라이드 영역 요소 검색 
const promotionEl = document.querySelector('.promotion');
// 슬라이드 영역을 토글하는 버튼 검색
const promotionToggleBtn = document.querySelector('.toggle-promotion');
// 슬라이드 영역 숨김 여부 기본값
let isHidePromotion = false;
// 토글 버튼을 클릭하면,
promotionToggleBtn.addEventListener('click', function () {
  isHidePromotion = !isHidePromotion // !를 붙이는것은 특정변수의 값을 반대에 해당되는 값을 할당!!
  if (isHidePromotion) {
    // 숨김 처리!
    promotionEl.classList.add('hide');
  } else {
    // 보임 처리!
    promotionEl.classList.remove('hide');
  }
});

// 범위 랜덤 함수(소수점 2자리까지)
function random(min, max) {
  // `.toFixed()`를 통해 반환된 문자 데이터를,
  // `parseFloat()`을 통해 소수점을 가지는 숫자 데이터로 변환
  return parseFloat((Math.random() * (max - min) + min).toFixed(2))
}

// 영상 애니메이션
function floatingObject(selector, delay, size) {
  // gsap.to(요소, 시간, 옵션);
  gsap.to(
    selector, // 선택자
    random(1.5, 2.5), // 애니메이션 동작 시간
    { // 옵션
      y: size,
      repeat: -1,
      yoyo: true,
      ease: Power1.easeInOut,
      delay: random(0, delay)
  });
}
floatingObject('.floating1', 1, 15);
floatingObject('.floating2', .5, 15);
floatingObject('.floating3', 1.5, 20);

const spyEls = document.querySelectorAll('section.scroll-spy');
spyEls.forEach(function (spyEl) {
  new ScrollMagic
    .Scene({
      triggerElement: spyEl, // 보여짐 여부를 감시할 요소를 지정
      triggerHook: .8, // 
    })
    .setClassToggle(spyEl, 'show')
    .addTo(new ScrollMagic.Controller());
});

