/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';

const {DOM} = require('react');
const Component = require('omniscient');
const ClassSet = require('common/class-set');
const Preview = require('./Preview');

const id = x => x.id

// Todo: Conver this to a record.
const Previews = function({items, theme}) {
  return {
    key: 'tabstrip',
    theme,
    items: items.map(webView => Preview({
      id: webView.id,
      isPinned: webView.isPinned,
      isSelected: webView.isSelected,
      isActive: webView.isActive,
      thumbnail: webView.thumbnail,
    }))
  }
}
Previews.render = Component(function PreviewBox(state, handlers) {
  const {theme, items} = Previews(state);
  return DOM.div({
    style: theme.tabstrip,
    className: ClassSet({
      tabstripcontainer: true,
      isdark: theme.isDark
    }),
  }, [
      DOM.div({
        key: 'tabstrip',
        className: 'tabstrip',
      }, items.sortBy(id)
              .map(item => Preview.render(item.merge({
                key: item.id,
                order: items.indexOf(item)
              }).toJSON(), handlers)))]);
});

Previews.activate = state => state.set('isActive', true);
Previews.deactivate = state => state.set('isActive', false);

module.exports = Previews;
