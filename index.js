/*
  Nyaa Magnet Links - a browser extension to add magnet links on NyaaTorrents.
  Copyright (C) 2016 Romain B.

  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with this program.  If not, see <http://www.gnu.org/licenses/>.

  Home: https://github.com/Niamor/nyaa-magnet-links
 */

'use strict';

$(() => {
  /* global $, parseTorrent, chrome */
  const url = document.URL;

  if (url.indexOf('page=search') !== -1 ||
    url.indexOf('user=') !== -1 ||
    url.indexOf('page=') === -1) {
    $('[title="Download"]').each((i, el) => {
      const elem = $(el);
      const magnetButton = $('<a/>', {
        title: 'Magnet',
        href: '#'
      }).append($('<img/>', {
        src: chrome.extension.getURL('icons/magnet-16.png'),
        alt: 'Magnet'
      })).click((e) => {
        e.preventDefault();
        parseTorrent.remote(window.location.protocol + elem.attr('href'),
          (err, parsedTorrent) => {
            if (err) console.log(err);
            const magnetURI = parseTorrent.toMagnetURI(parsedTorrent);
            magnetButton.attr('href', magnetURI);
            window.location.href = magnetURI;
          });
      });
      elem.before(magnetButton);
    });
  } else if (url.indexOf('page=view') !== -1) {
    const button = $('.viewdownloadbutton');
    parseTorrent.remote(window.location.protocol + button.find('a').attr('href'),
      (err, parsedTorrent) => {
        if (err) console.log(err);
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
});
