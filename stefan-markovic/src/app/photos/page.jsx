"use client";
import { useRef } from "react";
import "./photos.css";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(CustomEase);

const Photos = () => {
  const sliderImagesRef = useRef(null);
  const counterRef = useRef(null);
  const titlesRef = useRef(null);
  const indicatorsRef = useRef(null);
  const previewsRef = useRef(null);
  const sliderRef = useRef(null);

  useGSAP(
    () => {
      gsap.registerPlugin(CustomEase);
      CustomEase.create(
        "hop2",
        "M0,0 C0.071,0.505 0.192,0.726 0.318,0.852 0.45,0.984 0.504,1 1,1"
      );

      let currentImg = 1;
      const totalSlides = 4;
      let indicatorRotation = 0;

      function updateCounterAndTitlePosition() {
        const counterY = -20 * (currentImg - 1);
        const titleY = -60 * (currentImg - 1);

        gsap.to(counterRef.current, {
          y: counterY,
          duration: 1,
          ease: "hop2",
        });

        gsap.to(titlesRef.current, {
          y: titleY,
          duration: 1,
          ease: "hop2",
        });
      }

      function updateActiveSlidePreview() {
        previewsRef.current.forEach((prev) => prev.classList.remove("active"));
        previewsRef.current[currentImg - 1].classList.add("active");
      }

      function animateSlide(direction) {
        const currentSlide = sliderImagesRef.current.lastElementChild;

        const slideImg = document.createElement("div");
        slideImg.classList.add("img");

        const slideImgElem = document.createElement("img");
        slideImgElem.src = `/assets/img${currentImg}.jpg`;
        gsap.set(slideImgElem, { x: direction === "left" ? -500 : 500 });

        slideImg.appendChild(slideImgElem);
        sliderImagesRef.current.appendChild(slideImg);

        const tl = gsap.timeline();

        tl.to(currentSlide.querySelector("img"), {
          x: direction === "left" ? 500 : -500,
          duration: 1.5,
          ease: "hop2",
        })
          .fromTo(
            slideImg,
            {
              clipPath:
                direction === "left"
                  ? "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)"
                  : "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
            },
            {
              clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
              duration: 1.5,
              ease: "hop2",
            },
            0
          )
          .to(
            slideImgElem,
            {
              x: 0,
              duration: 1.5,
              ease: "hop2",
            },
            0
          )
          .call(() => cleanupSlides(), null, 1.5);

        indicatorRotation += direction === "left" ? -90 : 90;
        gsap.to(indicatorsRef.current.children, {
          rotate: indicatorRotation,
          duration: 1,
          ease: "hop2",
        });
      }

      function cleanupSlides() {
        const imgElements = sliderImagesRef.current.querySelectorAll(".img");
        if (imgElements.length > totalSlides) {
          gsap.to(imgElements[0], {
            opacity: 0,
            duration: 0.5,
            onComplete: () => {
              imgElements[0].remove();
            },
          });
        }
      }

      function handleClick(event) {
        const sliderWidth = sliderRef.current.clientWidth;
        const clickPosition = event.clientX;

        if (event.target.closest(".slider-preview")) {
          const clickedPrev = event.target.closest(".preview");

          if (clickedPrev) {
            const clickedIndex =
              Array.from(previewsRef.current).indexOf(clickedPrev) + 1;

            if (clickedIndex !== currentImg) {
              if (clickedIndex < currentImg) {
                currentImg = clickedIndex;
                animateSlide("left");
              } else {
                currentImg = clickedIndex;
                animateSlide("right");
              }
              updateActiveSlidePreview();
              updateCounterAndTitlePosition();
            }
          }
          return;
        }

        if (clickPosition < sliderWidth / 2 && currentImg !== 1) {
          currentImg--;
          animateSlide("left");
        } else if (
          clickPosition > sliderWidth / 2 &&
          currentImg !== totalSlides
        ) {
          currentImg++;
          animateSlide("right");
        }

        updateActiveSlidePreview();
        updateCounterAndTitlePosition();
      }

      sliderRef.current.addEventListener("click", handleClick);

      return () => {
        if (sliderRef.current) {
          sliderRef.current.removeEventListener("click", handleClick);
        }
      };
    },
    { scope: sliderRef, dependencies: [] }
  );

  return (
    <>
      <div className="slider" ref={sliderRef}>
        <div className="slider-images" ref={sliderImagesRef}>
          <div className="img">
            <img src="/assets/img1.jpg" />
          </div>
        </div>

        <div className="slider-title">
          <div className="slider-title-wrapper" ref={titlesRef}>
            <p>The Revival Ensemble</p>
            <p>Above The Canvas</p>
            <p>Harmony in Every Note</p>
            <p>Redefining Imagination</p>
          </div>
        </div>

        <div className="slider-counter">
          <div className="counter" ref={counterRef}>
            <p>1</p>
            <p>2</p>
            <p>3</p>
            <p>4</p>
          </div>
          <div>
            <p>&mdash;</p>
          </div>
          <div>
            <p>4</p>
          </div>
        </div>

        <div className="slider-preview">
          {[1, 2, 3, 4].map((num) => (
            <div
              key={num}
              className={`preview ${num === 1 ? "active" : ""}`}
              ref={(el) =>
                (previewsRef.current = [...(previewsRef.current || []), el])
              }
            >
              <img src={`/assets/img${num}.jpg`} />
            </div>
          ))}
        </div>

        <div className="slider-indicators" ref={indicatorsRef}>
          <p>+</p>
          <p>+</p>
        </div>
      </div>
    </>
  );
};

export default Photos;
