/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';

const {DOM} = require('react')
const Component = require('omniscient');
const ClassSet = require('common/class-set');
const {mix} = require('common/style');
const ProgressBar = require('./ProgressBar');
const WindowControls = require('./WindowControls');
const LocationBar = require('./LocationBar');

const navbarStyle = {
  backgroundColor: 'inherit',
  MozWindowDragging: 'drag',
  padding: 10,
  position: 'relative',
  scrollSnapCoordinate: '0 0',
  transition: 'background-color 200ms ease',
  textAlign: 'center'
};

const gossamerButtonStyle = {
  fontFamily: 'FontAwesome',
  textAlign: 'center',
  fontSize: '190px',
  verticalAlign: 'middle',
  cursor: 'default',
  position: 'absolute',
  lineHeight: '30px',
  top: '10px',
  right: '10px',
  marginRight: '7px'
};

const WindowBar = Component(function WindowBar(state, handlers) {
  const {key, input, tabStrip, webView, suggestions,
         title, rfa, theme, isDocumentFocused} = state;
  const {onOpen} = handlers;

  const themedGossamerButtonStyle = mix(theme.gossamerButton, gossamerButtonStyle);

  return DOM.div({
    key,
    style: mix(navbarStyle, theme.navigationPanel),
    className: ClassSet({
      navbar: true,
      cangoback: webView.canGoBack,
      canreload: webView.uri,
      loading: webView.isLoading,
      ssl: webView.securityState == 'secure',
      sslv: webView.securityExtendedValidation,
    })
  }, [
    WindowControls({
      key: 'WindowControls',
      isDocumentFocused,
      theme
    }),
    LocationBar.render(LocationBar({
      key: 'navigation',
      input, tabStrip, webView,
      suggestions, title, theme
    }), handlers),
    DOM.div({
      style: themedGossamerButtonStyle,
      onClick: event => onOpen('about:gossamer')
    }, '\uf0c3'),
    ProgressBar({key: 'progressbar', rfa, webView, theme},
                {editRfa: handlers.editRfa})
  ])
});

module.exports = WindowBar;
