(() => {
  console.log("IIFE Called");

  gsap.registerPlugin(ScrollTrigger);
  gsap.registerPlugin(ScrollToPlugin);


  // Variable Declarations
 
  const canvas = document.querySelector("#earbuds-animation-view");
  const context = canvas.getContext("2d");

  canvas.width = 1920;
  canvas.height = 1080;

  const startFrame = 278;
  const endFrame = 779;
  const frameCount = endFrame - startFrame + 1;

  const images = [];
  const buds = { frame: 0 };

  const divisor = document.querySelector("#divisor");
  const slider = document.querySelector("#slider");

  const navLinks = document.querySelectorAll("#main-header nav ul li a");

  // Create loading bar
  const loadingBar = document.createElement("div");
  loadingBar.style.position = "fixed";
  loadingBar.style.top = "0";
  loadingBar.style.left = "0";
  loadingBar.style.height = "5px";
  loadingBar.style.width = "0%";
  loadingBar.style.backgroundColor = "#7f4eff";
  loadingBar.style.zIndex = "9999";
  document.body.appendChild(loadingBar);

  let loadedCount = 0;

  // Function Definitions
 
  function render() {
    if (images[buds.frame]) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(images[buds.frame], 0, 0);
    }
  }

  function moveDivisor() {
    divisor.style.width = `${slider.value}%`;
  }

  function initScrollAnimation() {
    // Scroll-triggered earbuds animation
    gsap.to(buds, {
      frame: frameCount - 1,
      snap: "frame",
      scrollTrigger: {
        trigger: "#earbuds-animation-view",
        pin: true,
        scrub: 1,
        start: "top top",
        end: "+=2000",
      },
      onUpdate: render,
    });

    // Logo fade-in
    gsap.fromTo(
      "#logo",
      { opacity: 0 },
      { opacity: 1, duration: 4, ease: "power1.out" }
    );
  }

  function handleNavClick(e) {
    e.preventDefault();
    const target = e.currentTarget.hash;
    gsap.to(window, {
      duration: 1,
      scrollTo: { y: target, offsetY: 100 },
    });
  }

  // Load images with progress
  for (let i = 0; i < frameCount; i++) {
    const frameNumber = startFrame + i;
    const img = new Image();
    img.src = `images/earbus-scroll_${frameNumber.toString().padStart(5, "0")}.webp`;
    img.onload = () => {
      loadedCount++;
      const progress = (loadedCount / frameCount) * 100;
      loadingBar.style.width = `${progress}%`;

      if (loadedCount === 1) render(); // render first frame immediately
      if (loadedCount === frameCount) {
        loadingBar.remove();
        initScrollAnimation();
      }
    };
    images.push(img);
  }

  
  // Event Listeners
  
  slider.addEventListener("input", moveDivisor);

  navLinks.forEach(link => {
    link.addEventListener("click", handleNavClick);
  });

})();
