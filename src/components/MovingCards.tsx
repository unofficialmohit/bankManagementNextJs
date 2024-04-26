"use client";

import { cn } from "@/utils/cn";
import React, { useEffect, useState } from "react";

export default function InfiniteMovingCardsDisplay() {
    return (
      <div style={{backgroundColor:"#020617",marginTop:"-300px"}} className="h-[20rem] rounded-md flex flex-col antialiased dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
        <InfiniteMovingCards
          items={web3Testimonials}
          direction="right"
          speed="slow"
        />
      </div>
    );
  }
   
  const web3Testimonials = [
    {
      quote:
        'Decentralized systems are more robust and censorship-resistant because they rely on a network of distributed nodes rather than a central authority.',
      name: 'Nick Szabo',
      title: 'Blockchain, cryptocurrency, and smart contracts pioneer',
    },
    {
      quote:
        'Ethereum is a decentralized platform that enables developers to build and deploy smart contracts and decentralized applications (dApps).',
      name: 'Vitalik Buterin',
      title: 'Ethereum co-founder',
    },
    {
      quote:
        'Web3 is the next generation of the internet, where users own their data and interact directly with decentralized applications without intermediaries.',
      name: 'Gavin Wood',
      title: 'Ethereum co-founder and Polkadot founder',
    },
    {
      quote:
        'Blockchain technology allows for trustless and transparent transactions, which can reduce the need for intermediaries and increase efficiency.',
      name: 'Don Tapscott',
      title: 'Blockchain expert and author',
    },
    {
      quote:
        'Decentralized finance (DeFi) is a new financial system built on blockchain technology that aims to provide open, transparent, and decentralized financial services to everyone.',
      name: 'Andre Cronje',
      title: 'DeFi developer',
    },
    {
      quote:
        'Non-fungible tokens (NFTs) are unique digital assets that can represent ownership of items such as art, collectibles, and in-game items, and can be bought, sold, and traded on blockchain platforms.',
      name: 'Anil Dash',
      title: 'NFT advocate and entrepreneur',
    },
    {
      quote:
        'Decentralized autonomous organizations (DAOs) are community-led organizations that operate on blockchain technology, where decisions are made collectively through smart contracts and community voting.',
      name: 'David Zimbeck',
      title: 'DAO developer',
    },
    {
      quote:
        'InterPlanetary File System (IPFS) is a decentralized protocol for storing and sharing files, which can improve the speed, security, and reliability of the web.',
      name: 'Juan Benet',
      title: 'IPFS founder',
    },
    {
      quote:
        'Blockchain-based voting systems can provide secure, transparent, and tamper-proof voting, which can increase trust and participation in elections.',
      name: 'Vlad Zamfir',
      title: 'Ethereum researcher',
    },
    {
      quote:
        'Decentralized identity systems can provide users with self-sovereign control over their personal data, which can improve privacy and security.',
      name: 'Drummond Reed',
      title: 'Decentralized identity expert',
    },
    {
      quote:
        'Decentralized storage platforms can provide secure, censorship-resistant, and cost-effective storage solutions for individuals and businesses.',
      name: 'Joseph Poon',
      title: 'Decentralized storage expert',
    },
    {
      quote:
        'Decentralized computing platforms can provide scalable, secure, and cost-effective computing solutions for decentralized applications and services.',
      name: 'Vinay Gupta',
      title: 'Decentralized computing expert',
    },
    {
      quote:
        'Decentralized oracle systems can provide trusted and reliable data feeds for decentralized applications, which can improve their functionality and usability.',
      name: 'Sergey Nazarov',
      title: 'Chainlink co-founder',
    },
    {
      quote:
        'Decentralized prediction markets can provide accurate and efficient forecasting of events, which can be used for decision-making and risk management.',
      name: 'Rob Hanson',
      title: 'Prediction market expert',
    },
  ];

const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    quote: string;
    name: string;
    title: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  useEffect(() => {
    addAnimation();
  }, []);
  const [start, setStart] = useState(false);
  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }
  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };
  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };
  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20  max-w-7xl overflow-hidden  [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          " flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap",
          start && "animate-scroll ",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item, idx) => (
          <li
            className="w-[350px] max-w-full relative rounded-2xl border border-b-0 flex-shrink-0 border-slate-700 px-8 py-6 md:w-[450px]"
            style={{
              background:
                "linear-gradient(180deg, var(--slate-800), var(--slate-900)",
            }}
            key={item.name}
          >
            <blockquote>
              <div
                aria-hidden="true"
                className="user-select-none -z-1 pointer-events-none absolute -left-0.5 -top-0.5 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
              ></div>
              <span className=" relative z-20 text-sm leading-[1.6] text-gray-100 font-normal">
                {item.quote}
              </span>
              <div className="relative z-20 mt-6 flex flex-row items-center">
                <span className="flex flex-col gap-1">
                  <span className=" text-sm leading-[1.6] text-gray-400 font-normal">
                    {item.name}
                  </span>
                  <span className=" text-sm leading-[1.6] text-gray-400 font-normal">
                    {item.title}
                  </span>
                </span>
              </div>
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  );
};
