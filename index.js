'use strict';

const parseTorrent = require('parse-torrent');
const url = document.URL;

if (url.indexOf('page=search') !== -1 ||
  url.indexOf('user=') !== -1 ||
  url.indexOf('page=') === -1) {
  $(() => {
    $('[title="Download"]').each((i, el) => {
      const elem = $(el);
      parseTorrent.remote(location.protocol + elem.attr('href'), (err, parsedTorrent) => {
        const magnetButton = $('<a/>', {
          title: 'Magnet',
          href: parseTorrent.toMagnetURI(parsedTorrent)
        }).append($('<img/>', {
          src: chrome.extension.getURL('icons/magnet-16.png'),
          alt: 'Magnet'
        }));
        elem.before(magnetButton);
      });
    });
  });
} else if (url.indexOf('page=view') !== -1) {
  const button = $('.viewdownloadbutton');
  parseTorrent.remote(location.protocol + button.find('a').attr('href'), (err, parsedTorrent) => {
    const magnetButton = $('<div/>', {
      class: 'viewdownloadbutton'
    }).append($('<a/>', {
      title: 'Magnet',
      href: parseTorrent.toMagnetURI(parsedTorrent)
    }).append($('<img/>', {
      src: chrome.extension.getURL('icons/magnet-26.png'),
      alt: 'Magnet'
    })));
    button.after(magnetButton);
  });
}
