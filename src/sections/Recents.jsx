/*global chrome*/
import React, { useEffect, useState } from 'react';
import './recents.css';
import { LoaderCircle } from 'lucide-react';

export default function Recents() {
  const [topSites, setTopSites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const topGlobalSites = [
    {
      name: "YouTube",
      url: "https://www.youtube.com/",
      icon: "icons/yt.png"
    },
    {
      name: "Facebook",
      url: "https://www.facebook.com/",
      icon: "icons/fb.jpg"
    },
    {
      name: "X(Twitter)",
      url: "https://twitter.com/",
      icon: "twitter"
    },
    {
      name: "Canva",
      url: "https://www.canva.com/",
      icon: "icons/canva-1.webp"
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/",
      icon: "icons/linkedin-1.png"
    }
  ];

  useEffect(() => {
    console.log("Getting top sites...")
    setIsLoading(true);

    if (chrome.topSites && chrome.topSites.get) {
      chrome.topSites.get((sites) => {
        const topFiveSites = sites.slice(0, 5).map((site) => ({
          title: site.title,
          url: site.url,
          favIconUrl: `chrome-extension://${chrome.runtime.id}/_favicon/?pageUrl=${encodeURIComponent(site.url)}&size=32` || '/favicon.ico',
        }));

        console.log(topFiveSites);
        setTopSites(topFiveSites);
        setIsLoading(false);
      });
    } else {
      console.error("chrome.topSites API not available");
      setIsLoading(false);
    }
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center">
          <LoaderCircle className="animate-spin" />
        </div>
      ) : (
        <section data-purpose="most-visited" className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {topSites.length === 0 ? (
            topGlobalSites.map((site, index) => (
              <a
                href={site.url}
                target="_self"
                rel="noopener noreferrer"
                className="items-center hover:no-underline hover:no-outline"
                key={index}
              >
                <div className="bg-black hover:bg-accent text-center rounded-md items-center">
                  <img
                    src={site.icon || './nkrabea-medium.png'}
                    alt={site.name}
                    className="w-8 h-10"
                  />
                </div>

                <span className="text-sm truncate text-center text-white">{site.name}</span>
              </a>
            ))
          ) : (
            topSites.map((site, index) => (
              <a
                key={index}
                href={site.url}
                target="_self"
                rel="noopener noreferrer"
                className="items-center hover:no-underline hover:no-outline"
              >
                <div className="bg-black hover:bg-accent text-center rounded-md items-center">
                  <img
                    src={site.favIconUrl || './nkrabea-medium.png'}
                    alt={site.title}
                    className="w-8 h-10"
                  />
                </div>

                <span className="text-sm truncate text-center text-white">{site.title}</span>
              </a>
            ))
          )}
        </section>
      )}
    </>
  );
}