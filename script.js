const images = [
    './photo-1531247531481-5fa118aec9c2.avif',
    './photo-1562819945-cbc762ef76ad.avif',
    './photo-1564527570687-f21b90a09746.avif'
    
  ];
  
  const swiperWrapper = document.getElementById('swiperWrapper');
  const textInput = document.getElementById('textInput');
  const fontSelector = document.getElementById('fontSelector');
  const textAlignSelector = document.getElementById('textAlignSelector');
  const fontSizeInput = document.getElementById('fontSizeInput');
  const lineHeightInput = document.getElementById('lineHeightInput');
  const textColorInput = document.getElementById('textColorInput');
  const horizontalSlider = document.getElementById('horizontalSlider');
  const verticalSlider = document.getElementById('verticalSlider');
  const horizontalValue = document.getElementById('horizontalValue');
  const verticalValue = document.getElementById('verticalValue');
  
  const boldBtn = document.getElementById('boldBtn');
  const italicBtn = document.getElementById('italicBtn');
  const underlineBtn = document.getElementById('underlineBtn');
  
  let isBold = false;
  let isItalic = false;
  let isUnderline = false;
  
  [boldBtn, italicBtn, underlineBtn].forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('active');
      
      if (btn === boldBtn) isBold = !isBold;
      if (btn === italicBtn) isItalic = !isItalic;
      if (btn === underlineBtn) isUnderline = !isUnderline;
  
      updateTextLayer(document.querySelector('.text-layer'));
    });
  });
  
  const updateTextLayer = (textLayer) => {
    textLayer.textContent = textInput.value;
    textLayer.style.fontFamily = fontSelector.value;
    textLayer.style.fontSize = `${fontSizeInput.value}px`;
    textLayer.style.color = textColorInput.value;
    textLayer.style.textAlign = textAlignSelector.value;
    textLayer.style.lineHeight = lineHeightInput.value;
  
    textLayer.style.fontWeight = isBold ? 'bold' : 'normal';
    textLayer.style.fontStyle = isItalic ? 'italic' : 'normal';
    textLayer.style.textDecoration = isUnderline ? 'underline' : 'none';
  };
  
  const updateTextPosition = (textLayer) => {
    textLayer.style.left = `${horizontalSlider.value}%`;
    textLayer.style.top = `${verticalSlider.value}%`;
    horizontalValue.textContent = `${horizontalSlider.value}%`;
    verticalValue.textContent = `${verticalSlider.value}%`;
  };
  
  images.forEach((imageSrc) => {
    const slide = document.createElement('div');
    slide.classList.add('swiper-slide');
  
    const img = document.createElement('img');
    img.src = imageSrc;
  
    const textContainer = document.createElement('div');
    textContainer.classList.add('text-container');
  
    const textLayer = document.createElement('div');
    textLayer.classList.add('text-layer');
    updateTextLayer(textLayer);
    updateTextPosition(textLayer);
  
    textContainer.appendChild(textLayer);
    slide.appendChild(img);
    slide.appendChild(textContainer);
    swiperWrapper.appendChild(slide);
  
    let isDragging = false;
  
    const controls = [
      fontSelector, 
      textAlignSelector, 
      fontSizeInput, 
      lineHeightInput, 
      textColorInput, 
      textInput
    ];
  
    controls.forEach(control => {
      control.addEventListener('input', () => updateTextLayer(textLayer));
    });
  
    horizontalSlider.addEventListener('input', () => updateTextPosition(textLayer));
    verticalSlider.addEventListener('input', () => updateTextPosition(textLayer));
  
    textLayer.addEventListener('mousedown', (e) => {
      isDragging = true;
      textLayer.classList.add('dragging');
      e.preventDefault();
    });
  
    document.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
  
      const rect = textContainer.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width * 100;
      const y = (e.clientY - rect.top) / rect.height * 100;
  
      horizontalSlider.value = Math.max(0, Math.min(100, x));
      verticalSlider.value = Math.max(0, Math.min(100, y));
      updateTextPosition(textLayer);
    });
  
    document.addEventListener('mouseup', () => {
      isDragging = false;
      textLayer.classList.remove('dragging');
    });
  });
  
  const swiper = new Swiper('.swiper', {
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });