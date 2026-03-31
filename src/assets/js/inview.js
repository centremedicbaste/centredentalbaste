document.addEventListener("DOMContentLoaded", function () {
  // ─── Modo captura: mostrar todo sin animaciones ────────────────────────────
  const _isCaptureMode = document.body.classList.contains('capture-mode');

  if (_isCaptureMode) {
    // Forzar todos los elementos visibles de golpe, sin observers ni animaciones
    document.querySelectorAll('.inview').forEach(el => el.classList.add('is-inview'));
    document.querySelectorAll('.animate-appear').forEach(el => {
      const wrapper = document.createElement('span');
      wrapper.classList.add('inner-content');
      while (el.firstChild) wrapper.appendChild(el.firstChild);
      el.appendChild(wrapper);
      wrapper.style.opacity = 1;
      wrapper.style.transform = 'translateY(0)';
    });
    document.querySelectorAll('.animate-word').forEach(el => {
      const text = el.textContent;
      el.textContent = '';
      text.split(/(\s+)/).forEach(word => {
        if (word.trim().length > 0) {
          word.split('^').forEach((fragment, index, arr) => {
            if (fragment.trim().length > 0) {
              const span = document.createElement('span');
              span.classList.add('term');
              span.textContent = fragment;
              span.style.opacity = 1;
              span.style.transform = 'translateY(0)';
              el.appendChild(span);
            }
            if (index < arr.length - 1) el.appendChild(document.createElement('br'));
          });
        } else {
          el.appendChild(document.createTextNode(word));
        }
      });
    });
    document.querySelectorAll('.animate-box').forEach(el => {
      el.style.opacity = 1;
      el.style.transform = 'translateY(0)';
    });
    document.querySelectorAll('.animate-box2').forEach(el => {
      let wrapper = el.querySelector('.inner-wrapper');
      if (!wrapper) {
        wrapper = document.createElement('div');
        wrapper.classList.add('inner-wrapper');
        while (el.firstChild) wrapper.appendChild(el.firstChild);
        el.appendChild(wrapper);
      }
      wrapper.style.transform = 'translateY(0)';
      wrapper.style.opacity = 1;
      el.style.overflow = 'hidden';
    });
    document.querySelectorAll('.animate-list').forEach(el => {
      el.querySelectorAll('li').forEach(item => {
        item.style.opacity = 1;
        item.style.transform = 'translateY(0)';
      });
    });
    document.querySelectorAll('.animate-letters').forEach(el => {
      const text = el.textContent;
      el.textContent = '';
      text.split('').forEach(letter => {
        const span = document.createElement('span');
        span.classList.add('letter');
        span.innerHTML = letter === ' ' ? '&nbsp;' : letter;
        span.style.opacity = 1;
        span.style.transform = 'translateY(0)';
        el.appendChild(span);
      });
    });
    return; // No inicializar observers
  }

  const createObserver = (callback, options) => new IntersectionObserver(callback, options);

  const handleIntersect = (entries, observer, animationFn) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animationFn(entry.target);
        observer.unobserve(entry.target);
      }
    });
  };

  const gsapAnimate = (target, y, opacity, duration, delay, stagger = 0) => {
    gsap.timeline({ delay })
      .to(target, {
        y, opacity, duration, ease: 'power2.out', stagger
      });
  };

  const prepareElement = (selector, callback) => {
    document.querySelectorAll(selector).forEach(callback);
  };

  const inViewCallback = entries => handleIntersect(entries, inViewObserver, element => element.classList.add('is-inview'));

  const animateOnScrollCallback = entries => handleIntersect(entries, animateOnScrollObserver, target => {
    const delay = parseFloat(target.dataset.delay || 0);
    gsapAnimate(target.querySelector('.inner-content'), 0, 1, 1, delay);
  });

  const animateWordsCallback = entries => handleIntersect(entries, animateWordsObserver, target => {
    const delay = parseFloat(target.dataset.delay || 0);
    const words = target.querySelectorAll('.term');
    gsapAnimate(words, 0, 1, 1, delay, 0.1);
  });

  const animateBoxCallback = entries => handleIntersect(entries, animateBoxObserver, target => {
    const delay = parseFloat(target.dataset.delay || 0);
    gsapAnimate(target, 0, 1, 1, delay);
  });

  const animateBox2Callback = entries => handleIntersect(entries, animateBox2Observer, target => {
    let delay = parseFloat(target.dataset.delay || 0);

    let wrapper = target.querySelector('.inner-wrapper');
    if (!wrapper) {
      wrapper = document.createElement('div');
      wrapper.classList.add('inner-wrapper');
      while (target.firstChild) {
        wrapper.appendChild(target.firstChild);
      }
      target.appendChild(wrapper);
    }


    wrapper.style.transform = 'translateY(100%)';  // Inicializa la posición
    wrapper.style.overflow = 'hidden';  // Inicializa el overflow

    gsapAnimate(wrapper, 0, 1, 1, delay);
  });

  const animateListCallback = entries => handleIntersect(entries, animateListObserver, target => {
    const delay = parseFloat(target.dataset.delay || 0);
    const items = target.querySelectorAll('li');
    gsapAnimate(items, 0, 1, 1, delay, 0.1);
  });

  const animateLettersCallback = entries => handleIntersect(entries, animateLettersObserver, target => {
    const delay = parseFloat(target.dataset.delay || 0);
    const letters = target.querySelectorAll('.letter');
    gsapAnimate(letters, 0, 1, 1, delay, 0.05);
  });

  const options = { threshold: 0.3 };
  const animateOptions = { threshold: 0.1 };

  const inViewObserver = createObserver(inViewCallback, options);
  const animateOnScrollObserver = createObserver(animateOnScrollCallback, animateOptions);
  const animateWordsObserver = createObserver(animateWordsCallback, animateOptions);
  const animateBoxObserver = createObserver(animateBoxCallback, animateOptions);
  const animateBox2Observer = createObserver(animateBox2Callback, animateOptions);
  const animateListObserver = createObserver(animateListCallback, animateOptions);
  const animateLettersObserver = createObserver(animateLettersCallback, animateOptions);

  prepareElement('.inview', element => {
    inViewObserver.observe(element);
    if (element.getBoundingClientRect().top < window.innerHeight && element.getBoundingClientRect().bottom >= 0) {
      element.classList.add('is-inview');
      inViewObserver.unobserve(element);
    }
  });

  prepareElement('.animate-appear', element => {
    const wrapper = document.createElement('span');
    wrapper.classList.add('inner-content');
    while (element.firstChild) {
      wrapper.appendChild(element.firstChild);
    }
    element.appendChild(wrapper);
    wrapper.style.opacity = 0;  // Inicializa la opacidad
    wrapper.style.transform = 'translateY(20px)';  // Inicializa la posición
    animateOnScrollObserver.observe(element);
  });

  prepareElement('.animate-word', element => {
    const text = element.textContent;
    element.textContent = '';
    const words = text.split(/(\s+)/);
    
    words.forEach(word => {
      if (word.trim().length > 0) {
        const fragments = word.split('^');
        
        fragments.forEach((fragment, index) => {
          if (fragment.trim().length > 0) {
            const wordSpan = document.createElement('span');
            wordSpan.classList.add('term'); // Mantiene la clase 'term'
            wordSpan.textContent = fragment;
            wordSpan.style.opacity = 0;  // Inicializa la opacidad
            wordSpan.style.transform = 'translateY(20px)';  // Inicializa la posición
            element.appendChild(wordSpan);
          }
          if (index < fragments.length - 1) {
            element.appendChild(document.createElement('br'));
          }
        });
      } else {
        element.appendChild(document.createTextNode(word));
      }
    });
  
    animateWordsObserver.observe(element);
  });

  prepareElement('.animate-box', element => {
    element.style.opacity = 0;  // Inicializa la opacidad
    element.style.transform = 'translateY(20px)';  // Inicializa la posición
    animateBoxObserver.observe(element);
  });

  prepareElement('.animate-box2', element => {
    let wrapper = element.querySelector('.inner-wrapper');
    if (!wrapper) {
      wrapper = document.createElement('div');
      wrapper.classList.add('inner-wrapper');
      while (element.firstChild) {
        wrapper.appendChild(element.firstChild);
      }
      element.appendChild(wrapper);
    }

    element.style.overflow = 'hidden';  // Inicializa la opacidad

    const delay = parseFloat(element.dataset.delay || 0);
    animateBox2Observer.observe(element);
  });

  prepareElement('.animate-list', element => {
    const items = element.querySelectorAll('li');
    items.forEach(item => {
      item.style.opacity = 0;  // Inicializa la opacidad
      item.style.transform = 'translateY(20px)';  // Inicializa la posición
    });
    animateListObserver.observe(element);
  });

  prepareElement('.animate-letters', element => {
    const text = element.textContent;
    element.textContent = '';
    const letters = text.split('');
    letters.forEach(letter => {
      const letterSpan = document.createElement('span');
      letterSpan.classList.add('letter');
      letterSpan.innerHTML = letter === ' ' ? '&nbsp;' : letter;
      letterSpan.style.opacity = 0;  // Inicializa la opacidad
      letterSpan.style.transform = 'translateY(20px)';  // Inicializa la posición
      element.appendChild(letterSpan);
    });
    animateLettersObserver.observe(element);
  });
});



let getRatio = el => window.innerHeight / (window.innerHeight + el.offsetHeight);
