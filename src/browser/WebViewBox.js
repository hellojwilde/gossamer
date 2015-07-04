/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';

const {DOM} = require('react');
const Component = require('omniscient');
const {compose} = require('lang/functional');
const {Record} = require('typed-immutable/index');
const WebView = require('./WebView');
const WebViews = require('./WebViews');

const id = x => x.id
const In = (...path) => edit => state =>
  state.updateIn(path, edit);


const WebViewBox = Record({
  isActive: Boolean(true),
  items: WebViews
});

// WebView deck will always inject frames by order of their id. That way
// no iframes will need to be removed / injected when order of tabs change.
WebViewBox.render = Component(function WebViewsBox(state, handlers) {
  const {onOpen, onOpenBg, onClose, edit,
         beginVisit, endVisit, changeIcon, changeTitle, changeImage} = handlers;
  const {items, isActive} = state;

  return DOM.div({
    style: {
      scrollSnapCoordinate: '0 0',
      display: isActive ? 'block' : 'none'
    },
  }, items.sortBy(id).map(webView => WebView.render(webView.id, webView, {
    onOpen, onOpenBg, onClose,
    beginVisit, endVisit, changeIcon, changeTitle, changeImage,
    edit: compose(edit, In(items.indexOf(webView)))
  })))
});

module.exports = WebViewBox;