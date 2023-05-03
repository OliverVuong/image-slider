const optionsFactory = (slides) => {
    const visibleSlides = slides;
    return { visibleSlides };
  };
  
  const stateFactory = () => {
    let currentCenterSlideId = 0;
    return { currentCenterSlideId };
  };
  
  const validateInput = (slides) => {
    if(slides === 1 || slides === 3 || slides === 5) {
      return optionsFactory(slides);
    }
    return optionsFactory(3);
  }
  
  const slidesFactory = (slides) => {
    
    const slideContainer = document.createElement('div');
    slideContainer.classList.add('slideContainer');
    
    for(let i = 0; i < slides; i++){
      let myImg = document.createElement('img');
      myImg.classList.add(`slide${i}`);
      slideContainer.appendChild(myImg);
    }
    
    return slideContainer;
  };
  
  const navigationFactory = (n) => {
    const navContainer = document.createElement('div');
    navContainer.classList.add('navContainer');
    
    for(let i = 0; i < n; i++){
      let nav = document.createElement('div');
      nav.classList.add(`nav${i}`);
      navContainer.appendChild(nav);
    }
  
    return navContainer;
  };
  
  const controlsFactory = () => {
    const controlsContainer = document.createElement('div');
    controlsContainer.classList.add('controlsContainer');
  
    const prevBtn = document.createElement('button');
    const playBtn = document.createElement('button');
    const pauseBtn = document.createElement('button');
    const nextBtn = document.createElement('button');
  
    prevBtn.classList.add('prev');
    playBtn.classList.add('play');
    pauseBtn.classList.add('pause');
    nextBtn.classList.add('next');
  
    prevBtn.textContent = 'Back';
    playBtn.textContent = 'Play';
    pauseBtn.textContent = 'Pause';
    nextBtn.textContent = 'Next';
  
    controlsContainer.appendChild(prevBtn);
    controlsContainer.appendChild(playBtn);
    controlsContainer.appendChild(pauseBtn);
    controlsContainer.appendChild(nextBtn);
  
    return controlsContainer;
  };
  
  const elementsFactory = (imgNames, path, visibleSlides) => {
    const slides = slidesFactory(visibleSlides);
    const navigation = navigationFactory(imgNames.length);
    const controls = controlsFactory();
    return { slides, navigation, controls };
  };
  
  const appendElements = (parentHtml, htmlElements) => {
    for(let eleContainer in htmlElements){
      parentHtml.appendChild(htmlElements[eleContainer]);
    }
  };
  
  const styleSlides = (slideContainer) => {
  
    slideContainer.style.padding = '30px';
    
    if(slideContainer.children.length === 5){
      slideContainer.children[0].style.zIndex = '-2';
      slideContainer.children[1].style.zIndex = '-1';
      slideContainer.children[2].style.zIndex = '3';
      slideContainer.children[3].style.zIndex = '-1';
      slideContainer.children[4].style.zIndex = '-2';
      
      slideContainer.children[0].style.border = '2px ridge grey';
      slideContainer.children[1].style.border = '2px ridge grey';
      slideContainer.children[2].style.border = '2px ridge grey';
      slideContainer.children[3].style.border = '2px ridge grey';
      slideContainer.children[4].style.border = '2px ridge grey';
      
      slideContainer.children[0].style.position = 'relative';
      slideContainer.children[1].style.position = 'relative';
      slideContainer.children[3].style.position = 'relative';
      slideContainer.children[4].style.position = 'relative';
      
      slideContainer.children[1].style.top = '20px';
      slideContainer.children[3].style.top = '20px';
      
      slideContainer.children[1].style.left = '20px';
      slideContainer.children[3].style.right = '20px';
  
      
      slideContainer.children[0].style.top = '40px';
      slideContainer.children[4].style.top = '40px';
      
      slideContainer.children[0].style.left = '40px';
      slideContainer.children[4].style.right = '40px';
  
    } else if(slideContainer.children.length === 3) {
      slideContainer.children[0].style.zIndex = '-2';
      slideContainer.children[1].style.zIndex = '1';
      slideContainer.children[2].style.zIndex = '-2';
      slideContainer.children[0].style.border = '2px ridge grey';
      slideContainer.children[1].style.border = '2px ridge grey';
      slideContainer.children[2].style.border = '2px ridge grey';
      
      slideContainer.children[0].style.position = 'relative';
      slideContainer.children[2].style.position = 'relative';
      
      slideContainer.children[0].style.top = '20px';
      slideContainer.children[2].style.top = '20px';
      
      slideContainer.children[0].style.left = '20px';
      slideContainer.children[2].style.right = '20px';
    }
  };
  
  
  const clearAllNavStyling = (navContainer) => {
    for(let navBtn of navContainer.children){
      navBtn.style.backgroundColor = 'grey';
    }
  };
  
  const activateNavStyling = (navContainer, id) => {
    navContainer.children[id].style.backgroundColor = 'green';
  };
  
  const updateActiveNavStyling = (navContainer, state) => {
    clearAllNavStyling(navContainer);
    activateNavStyling(navContainer, state.currentCenterSlideId);
  };
  
  const styleNav= (navContainer, state) => {
    navContainer.style.margin = '40px';
    navContainer.style.display = 'grid';
    navContainer.style.gridAutoFlow = 'column';
    navContainer.style.width = '200px';
    navContainer.style.border = '1px solid black';
    navContainer.style.padding = '5px';
    
    for(let nav of navContainer.children){
      nav.style.border = '1px solid black';
      nav.style.height = '1rem';
      nav.style.width = '1rem';
      nav.style.borderRadius = '1rem';
    }
    updateActiveNavStyling(navContainer, state);
  };
  
  const styleControls = (controlsContainer) => {
    
  };
  
  const styleSlider = (htmlParent) => {
    htmlParent.style.display = 'grid';
    htmlParent.style.gridAutoFlow = 'row';
    htmlParent.style.justifyItems = 'center';
  };
  
  const styleElements = (htmlElements, state) => {
    styleSlides(htmlElements.slides);
    styleNav(htmlElements.navigation, state);
    styleControls(htmlElements.controls);
  };
  
  const loadImgInSlide = (slideNumber, imageNumber, slideContainer, imgNames, path) => {
    slideContainer.children[slideNumber].src = path + imgNames[imageNumber];
  };
  
  const displayDefault = (slideContainer, imgNames, path) => {
    if (slideContainer.children.length === 1){
      loadImgInSlide(0, 0, slideContainer, imgNames, path)
    } else if (slideContainer.children.length === 3) {
      loadImgInSlide(1, 0, slideContainer, imgNames, path)
      loadImgInSlide(2, 1, slideContainer, imgNames, path)
    } else if (slideContainer.children.length === 5) {
      loadImgInSlide(2, 0, slideContainer, imgNames, path)
      loadImgInSlide(3, 1, slideContainer, imgNames, path)
      loadImgInSlide(4, 2, slideContainer, imgNames, path)
    }
  };
  
  const nextID = (id, imgCt) => {
    id++;
    return id < imgCt ? id : 0;
  }
  
  const prevID = (id, imgCt) => {
    id--;
    return id >= 0 ? id : imgCt - 1;
  }
  
  const displayAllSlides_1 = (centerSlide, slideContainer, imgNames, path) => {
    loadImgInSlide(0, centerSlide, slideContainer, imgNames, path)
  };
  
  const displayAllSlides_3 = (centerSlide, slideContainer, imgNames, path) => {
    loadImgInSlide(0, prevID(centerSlide, imgNames.length), slideContainer, imgNames, path)
    loadImgInSlide(1, centerSlide, slideContainer, imgNames, path)
    loadImgInSlide(2, nextID(centerSlide, imgNames.length), slideContainer, imgNames, path)
  };
  
  const displayAllSlides_5 = (centerSlide, slideContainer, imgNames, path) => {
    loadImgInSlide(0, prevID(prevID(centerSlide, imgNames.length), imgNames.length), slideContainer, imgNames, path)
    loadImgInSlide(1, prevID(centerSlide, imgNames.length), slideContainer, imgNames, path)
    loadImgInSlide(2, centerSlide, slideContainer, imgNames, path)
    loadImgInSlide(3, nextID(centerSlide, imgNames.length), slideContainer, imgNames, path)
    loadImgInSlide(4, nextID(nextID(centerSlide, imgNames.length), imgNames.length), slideContainer, imgNames, path)
  };
  
  const displayAllSlides = (centerSlide, slideContainer, imgNames, path) => {
    if(slideContainer.children.length === 1){
      displayAllSlides_1(centerSlide, slideContainer, imgNames, path);
    } else if (slideContainer.children.length === 3) {
      displayAllSlides_3(centerSlide, slideContainer, imgNames, path);
    } else if (slideContainer.children.length === 5) {
      displayAllSlides_5(centerSlide, slideContainer, imgNames, path);
    }
  };
  
  const addNavOnClick = (navContainer, slideContainer, imgNames, path, state) => {
    for(let navBtn of navContainer.children){
      navBtn.onclick = () => {
        const className = navBtn.className;
        const idStr = className.slice(-1);
        const id = parseInt(idStr);
        displayAllSlides(id, slideContainer, imgNames, path);
        state.currentCenterSlideId = id
        updateActiveNavStyling(navContainer, state);
      }
    }
  };
  
  const addControlsOnClick = (controlsContainer, slideContainer, navContainer, imgNames, path, state) => {
    const backBtn = controlsContainer.children[0];
    const playBtn = controlsContainer.children[1];
    const pauseBtn = controlsContainer.children[2];
    const nextBtn = controlsContainer.children[3];
  
    backBtn.onclick = () => {
      state.currentCenterSlideId = prevID(state.currentCenterSlideId, imgNames.length);
      displayAllSlides(state.currentCenterSlideId, slideContainer, imgNames, path);
      updateActiveNavStyling(navContainer, state)
    };
  
    nextBtn.onclick = () => {
      state.currentCenterSlideId = nextID(state.currentCenterSlideId, imgNames.length);
      displayAllSlides(state.currentCenterSlideId, slideContainer, imgNames, path);
      updateActiveNavStyling(navContainer, state)
    }
  
    let loop;
    
    playBtn.onclick = () => {
      loop = window.setInterval( () => {
        nextBtn.click();
      }, 5000)
    }
  
    pauseBtn.onclick = () => {
      clearInterval(loop);
    }
  };
  
  const appendImgSlider = (parentHtml, imgNames, path, unvalidatedVisibleSlides) => {
    
    const options = validateInput(unvalidatedVisibleSlides);
    const state = stateFactory();
    const htmlElements = elementsFactory(imgNames, path, options.visibleSlides);
    
    appendElements(parentHtml, htmlElements);
    styleElements(htmlElements, state);
    addNavOnClick(htmlElements.navigation, htmlElements.slides, imgNames, path, state);
    addControlsOnClick(htmlElements.controls, htmlElements.slides, htmlElements.navigation, imgNames, path, state);
    displayDefault(htmlElements.slides, imgNames, path);
    styleSlider(parentHtml);
  };
  
  const parentHtml = document.querySelector('.content');
  
  const imgSrc = 
    ['ffxiv_02222023_222041_353.png',
     'ffxiv_03112023_112326_259.png',
     'ffxiv_03112023_113605_429.png',
     'ffxiv_03142023_211143_710.png',
     'ffxiv_03232023_005451_481.png',
     'ffxiv_04062023_001122_830.png',
     'ffxiv_04072023_223046_659.png',
     'ffxiv_04072023_224419_795.png',
     'ffxiv_04142023_205911_622.png'
    ];
  
  const path = './images/';
  
  appendImgSlider(parentHtml, imgSrc, path, 3);
  
  /*
  const sliders = [];
  for(let i = 0; i < 5; i++){
    sliders[i] = document.querySelector(`.slider${i}`);
  }
  
  const prevBtn = document.querySelector('.prev');
  const pauseBtn = document.querySelector('.pause');
  const playBtn = document.querySelector('.play');
  const nextBtn = document.querySelector('.next');
  
  const init = (() => {
    const path = './images/';
    sliders[2].src = path + imgSrc[0];
    sliders[3].src = path + imgSrc[1];
    sliders[4].src = path + imgSrc[2];
  })();
  
  console.log(sliders);*/
  
  