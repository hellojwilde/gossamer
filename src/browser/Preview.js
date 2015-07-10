/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';

const {DOM} = require('react');
const Component = require('omniscient');
const ClassSet = require('common/class-set');
const {Record, Maybe} = require('typed-immutable/index');

const Preview = Record({
  id: String,
  key: String(''),
  order: Number(0),
  isPinned: Boolean(false),
  isSelected: Boolean(false),
  isActive: Boolean(false),
  thumbnail: Maybe(String),
});

Preview.render = Component(function Preview(state, {onSelect, onActivate, onClose}) {
  return DOM.div({
    key: state.key,
    className: ClassSet({
      tab: true,
      selected: state.isSelected,
      'tab-dashboard': state.isPinned
    }),
    style: {order: state.order},
    onMouseOver: event => onSelect(state.id),
    onMouseDown: event => onActivate(state.id),
    onMouseUp: event => {
      if (event.button == 1) {
        event.stopPropagation();
        onClose(state.id);
      }
    }
  }, [
    DOM.div({
      key: 'thumbnail',
      className: 'tab-thumbnail',
    }, [
      DOM.img({
        key: 'image',
        src: state.thumbnail,
        alt: '',
        onLoad: event => URL.revokeObjectURL(event.target.src)
      })
    ]),
    state.isPinned ? null : DOM.div({
      key: 'close-button',
      onClick: event => onClose(state.id),
      className: 'tab-close-button fa fa-times',
    })
  ])
});

module.exports = Preview;