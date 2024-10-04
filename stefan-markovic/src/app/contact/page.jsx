"use client";
import React, { useEffect, useRef } from "react";
import "./contact.css";

import { gsap } from "gsap";
import { ReactLenis } from "@studio-freight/react-lenis";

const Page = () => {
  const container = useRef();
  const headerRef = useRef();
  const sectionsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(headerRef.current, {
        y: 0,
        duration: 1,
        delay: 1,
        ease: "power3.out",
      });

      gsap.delayedCall(1.1, () => {
        sectionsRef.current.forEach((section) => {
          gsap.to(section.querySelectorAll("p"), {
            y: 0,
            duration: 1,
            stagger: 0.1,
            ease: "power3.out",
          });
        });
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <ReactLenis root>
      <div className="contact-page" ref={container}>
        <div className="container">
          <div className="col">
            <div className="where" ref={(el) => (sectionsRef.current[0] = el)}>
              <div className="title">
                <p>Where</p>
              </div>
              <div className="item">
                <p>Spazio Alva</p>
              </div>
              <div className="item">
                <p>Vicolo Terrà, 5 VR/B</p>
              </div>
              <div className="item">
                <p>37129 . Verona . Italy</p>
              </div>
            </div>
            <div className="vat" ref={(el) => (sectionsRef.current[1] = el)}>
              <div className="title">
                <p>VAT</p>
              </div>
              <div className="item">
                <p>9724865620</p>
              </div>
            </div>
          </div>

          <div className="col">
            <div className="contact-header">
              <h1 ref={headerRef}>Contact</h1>
            </div>
            <div
              className="socials"
              ref={(el) => (sectionsRef.current[2] = el)}
            >
              <div className="title">
                <p>Socials</p>
              </div>
              <div className="item">
                <p>
                  <a href="#">Instagram</a>
                </p>
              </div>
              <div className="item">
                <p>
                  <a href="#">LinkedIn</a>
                </p>
              </div>
              <div className="item">
                <p>
                  <a href="#">Vimeo</a>
                </p>
              </div>
            </div>
            <div className="mail" ref={(el) => (sectionsRef.current[3] = el)}>
              <div className="title">
                <p>Mail</p>
              </div>
              <div className="item">
                <p>
                  <a href="#">contact@codegrid.com</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ReactLenis>
  );
};

export default Page;
