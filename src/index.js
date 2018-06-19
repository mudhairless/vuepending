/*
 * The MIT License (MIT)
 * Copyright (c) 2018 Ebben Feagan
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
 * OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE
 * OR OTHER DEALINGS IN THE SOFTWARE.
 */

module.exports = {
  install(Vue) {
    Vue.prototype.$__pending_actions = [];
    Vue.prototype.$processPending = function (event_name) {
      for (let i = 0, len = this.$__pending_actions.length; i < len; i += 1) {
        if (this.$__pending_actions[i].event === event_name) {
          for (let k = 0, klen = this.$__pending_actions[i].actions.length; k < klen; k += 1) {
            this.$__process_action(this.$__pending_actions[i].actions[k]);
          }
        }
      }
    };
    Vue.prototype.$__process_action = function (action) {
      const keys = Object.keys(action);
      if (keys[0] !== 'value') {
        const perform = keys[0];
      } else {
        const perform = keys[1];
      }
      const performValue = action[perform];
      const value = action.value;
      let func = null;
      switch (perform) {
        default:
          if ('$log' in this) {
            this.$log(`Invalid action type: ${perform}`);
          } else {
            window.console.error(`Invalid action type: ${perform}`);
          }
          break;

        case 'set':
          func = function (n, v) {
            this[n] = v;
          };
          break;

        case 'commit':
          func = function (n, v) {
            this.$commit(n, v);
          };
          break;

        case 'custom':
          func = performValue;
          break;
      }
      if (func !== null) {
        func(performValue, value).bind(this);
      }
    };
    Vue.prototype.$pending = function (event, actions) {
      if (actions instanceof Array) {
        this.$__pending_actions.push({ event, actions });
      } else {
        this.$__pending_actions.push({ event, actions: [actions] });
      }
    };
    Vue.prototype.$actions = {
      assign(variable, value) {
        return { set: variable, value };
      },
      commit(name, value) {
        return { commit: name, value };
      },
      custom(func, data) {
        return { custom: func, value: data };
      },
    };
  },
};

