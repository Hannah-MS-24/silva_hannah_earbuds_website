(()=> {
 console.log("IIFE Called");

  const canvas = document.querySelector("#earbuds-animation-view");
  const context = canvas.getContext("2d");

  canvas.width = 1920;
  canvas.height = 1080;

  const startFrame = 278;
  const endFrame = 779;
  const frameCount = endFrame - startFrame + 1;

  const images = [];
  const buds = { frame: 0 };

  // To load all images
  for (let i = 0; i < frameCount; i++) {
    const frameNumber = startFrame + i;
    const img = new Image();
    img.src = `images/earbus-scroll_${frameNumber.toString().padStart(5, "0")}.webp`;
    images.push(img);
  }

  console.log(images);

  // GSAP with ScrollTrigger
  gsap.to(buds, {
    frame: frameCount - 1,
    snap: "frame",
    scrollTrigger: {
      trigger: "#earbuds-animation-view",
      pin: true,
      scrub: 1,
      start: "top top",
      end: "+=2000", // Added to provide enough height for the animation to scroll.
    },
    onUpdate: render,
  });

  images[0].addEventListener("load", render);

  function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(images[buds.frame], 0, 0);
  }

  //Logo gsap Animation 
    gsap.fromTo("#logo",
        { opacity: 0 },   
        {opacity: 1,    
         duration: 4,     
         ease: "power1.out"
  }
);

})();