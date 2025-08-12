import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export default function CustomShortcuts({ maxLinks = 5 }) {
  const [shortcuts, setShortcuts] = useState([]);
  const [topSites, setTopSites] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newShortcut, setNewShortcut] = useState({ name: '', url: '' });

  useEffect(() => {
    // Load custom shortcuts
    const saved = localStorage.getItem('zhuzh-shortcuts');
    if (saved) {
      setShortcuts(JSON.parse(saved));
    }

    // Get top visited sites
    if (chrome?.topSites) {
      chrome.topSites.get((sites) => {
        setTopSites(sites.slice(0, 10).map((site) => ({
          title: site.title,
          url: site.url,
          faviconUrl: `chrome-extension://${chrome.runtime.id}/_favicon/?pageUrl=${encodeURIComponent(site.url)}&size=38` || `https://www.google.com/s2/favicons?domain=${new URL(site.url).hostname.replace('www.', '')}&sz=64`
        })));
      });
    } else {
      // Fallback for development
      setTopSites([
        { title: 'Gmail', url: 'https://gmail.com', faviconUrl: 'https://www.google.com/s2/favicons?domain=gmail.com&sz=64' },
        { title: 'GitHub', url: 'https://github.com', faviconUrl: 'https://www.google.com/s2/favicons?domain=github.com&sz=64' },
        { title: 'YouTube', url: 'https://youtube.com', faviconUrl: 'https://www.google.com/s2/favicons?domain=youtube.com&sz=64' },
        { title: 'Google', url: 'https://google.com', faviconUrl: 'https://www.google.com/s2/favicons?domain=google.com&sz=64' },
        { title: 'Stack Overflow', url: 'https://stackoverflow.com', faviconUrl: 'https://www.google.com/s2/favicons?domain=stackoverflow.com&sz=64' }
      ]);
    }
  }, []);

  const saveShortcuts = (newShortcuts) => {
    setShortcuts(newShortcuts);
    localStorage.setItem('zhuzh-shortcuts', JSON.stringify(newShortcuts));
  };

  const addShortcut = () => {
    if (newShortcut.name && newShortcut.url) {
      const url = newShortcut.url.startsWith('http') ? newShortcut.url : `https://${newShortcut.url}`;
      const domain = new URL(url).hostname.replace('www.', '');
      const shortcut = {
        id: Date.now(),
        title: newShortcut.name,
        url,
        faviconUrl: `https://www.google.com/s2/favicons?domain=${domain}&sz=64`,
        isCustom: true
      };
      saveShortcuts([...shortcuts, shortcut]);
      setNewShortcut({ name: '', url: '' });
      setShowModal(false);
    }
  };

  const editShortcut = (shortcut) => {
    setNewShortcut({ name: shortcut.title, url: shortcut.url });
    setEditingId(shortcut.id);
    setShowModal(true);
  };

  const updateShortcut = () => {
    if (newShortcut.name && newShortcut.url) {
      const url = newShortcut.url.startsWith('http') ? newShortcut.url : `https://${newShortcut.url}`;
      const domain = new URL(url).hostname.replace('www.', '');
      const updated = shortcuts.map(s =>
        s.id === editingId
          ? { ...s, title: newShortcut.name, url, faviconUrl: `https://www.google.com/s2/favicons?domain=${domain}&sz=64` }
          : s
      );
      saveShortcuts(updated);
      setNewShortcut({ name: '', url: '' });
      setShowModal(false);
      setEditingId(null);
    }
  };

  const deleteShortcut = (id) => {
    saveShortcuts(shortcuts.filter(s => s.id !== id));
  };

  const removeSite = (url) => {
    const deletedSite = { id: Date.now(), url, isDeleted: true };
    saveShortcuts([...shortcuts, deletedSite]);
  };

  const getAllSites = () => {
    const deletedUrls = shortcuts.filter(s => s.isDeleted).map(s => s.url);
    const customSites = shortcuts.filter(s => !s.isDeleted);
    const visibleTopSites = topSites.filter(site => !deletedUrls.includes(site.url));

    return [...visibleTopSites, ...customSites].slice(0, maxLinks);
  };

  const allSites = getAllSites();

  return (
    <>
      <section className="w-full max-w-2xl mx-auto">
        <div className="flex flex-wrap gap-3 justify-center">
          {allSites.map((site) => {
            return (
              <div key={site.url || site.id} className="group relative w-20">
                <a
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center"
                >
                  <div className="backdrop-blur-sm bg-white/10 flex flex-col hover:bg-white/20 items-center p-2 rounded-lg transition-colors">
                    <div className="w-10 h-10 flex items-center justify-center">
                      <img
                        src={site.faviconUrl}
                        alt={site.title}
                        className="w-10 h-10 rounded"
                        onError={(e) => {
                          e.target.src = `https://www.google.com/s2/favicons?domain=${new URL(site.url).hostname.replace('www.', '')}&sz=64`;
                        }}
                      />
                    </div>
                  </div>
                  <span className="text-white text-xs font-medium truncate w-full leading-tight block mt-1">
                    {site.title}
                  </span>
                </a>

                <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
                  {site.isCustom && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => editShortcut(site)}
                          className="h-5 w-5 p-0 hover:bg-white/20"
                        >
                          <Edit className="h-2 w-2 text-white" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Edit</p>
                      </TooltipContent>
                    </Tooltip>
                  )}

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => site.isCustom ? deleteShortcut(site.id) : removeSite(site.url)}
                        className="h-5 w-5 p-0 hover:bg-white/20"
                      >
                        <Trash2 className="h-2 w-2 text-white" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{site.isCustom ? 'Delete' : 'Remove'}</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
            );
          })}

          {/* Add Button */}
          {allSites.length < maxLinks && (
            <div className="group relative w-20">
              <Button
                onClick={() => setShowModal(true)}
                className="w-full h-16 bg-white/10 backdrop-blur-sm rounded-lg p-2 hover:bg-white/20 transition-colors border-2 border-dashed border-white/30 hover:border-white/50"
                variant="ghost"
              >
                <Plus className="h-6 w-6 text-white/70" />
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowModal(false)} />
          <div className="relative bg-white rounded-lg p-6 w-96 mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">{editingId ? 'Edit Link' : 'Add Link'}</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setShowModal(false);
                  setEditingId(null);
                  setNewShortcut({ name: '', url: '' });
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-4">
              <Input
                placeholder="Name"
                value={newShortcut.name}
                onChange={(e) => setNewShortcut({ ...newShortcut, name: e.target.value })}
              />
              <Input
                placeholder="URL"
                value={newShortcut.url}
                onChange={(e) => setNewShortcut({ ...newShortcut, url: e.target.value })}
              />
              <div className="flex space-x-2">
                <Button onClick={editingId ? updateShortcut : addShortcut} className="flex-1">
                  {editingId ? 'Update' : 'Add'}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowModal(false);
                    setEditingId(null);
                    setNewShortcut({ name: '', url: '' });
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}