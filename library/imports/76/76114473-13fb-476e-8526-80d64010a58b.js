"use strict";
cc._RF.push(module, '76114RzE/tHboUmgNZAEKWL', 'Game');
// scripts/Game.js

'use strict';

// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        starPrefab: {
            default: null,
            type: cc.Prefab
        },

        maxStarDuration: 0,
        minStarDuration: 0,

        ground: {
            default: null,
            type: cc.Node
        },

        player: {
            default: null,
            type: cc.Node
        },

        scoreDisplay: {
            default: null,
            type: cc.Label
        },

        scoreAudio: {
            default: null,
            type: cc.AudioClip
        }
    },

    onLoad: function onLoad() {

        this.groundY = this.ground.y + this.ground.height / 2;

        this.timer = 0;
        this.starDuration = 0;

        this.spawnNewStar();

        this.score = 0;
    },

    spawnNewStar: function spawnNewStar() {

        var newStar = cc.instantiate(this.starPrefab);

        this.node.addChild(newStar);

        newStar.setPosition(this.getNewStarPosition());

        newStar.getComponent('Star').game = this;

        this.starDuration = this.minStarDuration + Math.random() * (this.maxStarDuration - this.minStarDuration);
        this.timer = 0;
    },

    getNewStarPosition: function getNewStarPosition() {
        var randX = 0;

        var randY = this.groundY + Math.random() * this.player.getComponent('Player').jumpHeight + 50;

        var maxX = this.node.width / 2;
        randX = (Math.random() - 0.5) * 2 * maxX;

        return cc.v2(randX, randY);
    },
    getPlayPosition: function getPlayPosition() {},
    update: function update(dt) {

        if (this.timer > this.starDuration) {
            this.gameOver();
            this.enabled = false; // disable gameOver logic to avoid load scene repeatedly
            return;
        }
        this.timer += dt;
    },

    gainScore: function gainScore() {
        this.score += 1;

        this.scoreDisplay.string = 'Score: ' + this.score;
        cc.audioEngine.playEffect(this.scoreAudio, false);
    },

    gameOver: function gameOver() {
        this.player.stopAllActions();
        cc.director.loadScene('game');
    }
    // foo: {
    //     // ATTRIBUTES:
    //     default: null,        // The default value will be used only when the component attaching
    //                           // to a node for the first time
    //     type: cc.SpriteFrame, // optional, default is typeof default
    //     serializable: true,   // optional, default is true
    // },
    // bar: {
    //     get () {
    //         return this._bar;
    //     },
    //     set (value) {
    //         this._bar = value;
    //     }
    // },


    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},


    // update (dt) {},
});

cc._RF.pop();