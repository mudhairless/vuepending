!function(t){var e={};function n(o){if(e[o])return e[o].exports;var r=e[o]={i:o,l:!1,exports:{}};return t[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)n.d(o,r,function(e){return t[e]}.bind(null,r));return o},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e,n){"use strict";t.exports={install:function(t){t.prototype.$__pending_actions=[],t.prototype.$processPending=function(t){for(var e=0,n=this.$__pending_actions.length;e<n;e+=1)if(this.$__pending_actions[e].event===t)for(var o=0,r=this.$__pending_actions[e].actions.length;o<r;o+=1)this.$__process_action(this.$__pending_actions[e].actions[o])},t.prototype.$__process_action=function(t){var e=Object.keys(t);if("value"!==e[0])e[0];else e[1];var n=t[perform],o=t.value,r=null;switch(perform){default:"$log"in this?this.$log("Invalid action type: "+perform):window.console.error("Invalid action type: "+perform);break;case"set":r=function(t,e){this[t]=e};break;case"commit":r=function(t,e){this.$commit(t,e)};break;case"custom":r=n}null!==r&&r(n,o).bind(this)},t.prototype.$pending=function(t,e){this.$__pending_actions.push({event:t,actions:e})},t.prototype.$actions={assign:function(t,e){return{set:t,value:e}},commit:function(t,e){return{commit:t,value:e}},custom:function(t,e){return{custom:t,value:e}}}}}}]);