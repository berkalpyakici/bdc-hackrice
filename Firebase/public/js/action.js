/**
 * Copyright 2019 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

/**
 * This class is used as a wrapper for Google Assistant Canvas Action class along
 * with its callbacks.
 */
class Action {
  /**
   * @param {scene} which serves as a container of all visual elements
   */
  constructor(scene) {
    this.canvas = window.interactiveCanvas;
    this.sprite = scene.sprite;
    const that = this;
    this.commands = {
      TINT: function (data) {
        that.sprite.tint = data.tint;
      },
      SPIN: function (data) {
        that.sprite.spin = data.spin;
      },
      TIMER: function () {
        setTimeout(() => {
          // trigger the dialogflow agent as if the user said "instructions"
          that.canvas.sendTextQuery('instructions');
        }, data.timer * 1000);
      },
    };
  }

  /**
   * Register all callbacks used by Interactive Canvas
   * executed during scene creation time.
   *
   */
  setCallbacks() {
    const that = this;
    // declare interactive canvas callbacks
    const callbacks = {
      onUpdate(data) {
        try {
          that.commands[data.command.toUpperCase()](data);
        } catch (e) {
          // do nothing, when no command is sent or found
        }
      },
    };
    // called by the Interactive Canvas web app once web app has loaded to
    // register callbacks
    this.canvas.ready(callbacks);
  }
}