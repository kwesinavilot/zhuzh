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
      icon: "icons/faceb.png"
    },
    {
      name: "X(Twitter) DreamHost - Web Hosting, Domain Names, WordPress & More",
      url: "https://twitter.com/",
      icon: "icons/x-1.png"
    },
    {
      name: "Canva",
      url: "https://www.canva.com/",
      icon: "icons/canva-2.png"
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/",
      icon: "icons/linkedin-1.png"
    }
  ];

  useEffect(() => {
    setIsLoading(true);

    if (chrome.topSites && chrome.topSites.get) {
      chrome.topSites.get((sites) => {
        const topFiveSites = sites.slice(0, 5).map((site) => ({
          title: site.title,
          url: site.url,
          favIconUrl: `chrome-extension://${chrome.runtime.id}/_favicon/?pageUrl=${encodeURIComponent(site.url)}&size=38` || './nkrabea-medium.png',
        }));

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
        <div className="flex items-center justify-center mx-auto">
          <LoaderCircle className="animate-spin" />
        </div>
      ) : (
        <section data-purpose="most-visited" className="w-2/6 mx-auto grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {topSites.length === 0 ? (
            topGlobalSites.map((site, index) => (
              <a
                href={site.url}
                target="_self"
                rel="noopener noreferrer"
                className="items-center hover:no-underline hover:no-outline min-w-0"
                key={index}
              >
                <div className="mx-auto p-2.5 w-14 h-14 bg-slate-300 hover:bg-accent text-center rounded-md items-center">
                  <img
                    src={site.icon || './nkrabea-medium.png'}
                    alt={site.name}
                  />
                </div>

                <p className=" text-sm truncate overflow-hidden text-center text-white">{site.name}</p>
              </a>
            ))
          ) : (
            topSites.map((site, index) => (
              <a
                key={index}
                href={site.url}
                target="_self"
                rel="noopener noreferrer"
                className="items-center hover:no-underline hover:no-outline min-w-0"
              >
                <div className="mx-auto p-2.5 w-14 h-14 bg-slate-300 hover:bg-accent text-center rounded-md items-center">
                  <img
                    src={site.favIconUrl || './nkrabea-medium.png'}
                    alt={site.title}
                  />
                </div>

                <p className="text-sm truncate overflow-hidden text-center text-white">{site.title}</p>
              </a>
            ))
          )}
        </section>
      )}
    </>
  );
}