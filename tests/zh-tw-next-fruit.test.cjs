'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const game = fs.readFileSync(path.join(root, 'src/project.js'), 'utf8');

test('page defaults to Traditional Chinese without a blocking alert', () => {
    assert.match(html, /<html lang="zh-Hant">/);
    assert.match(html, /<title>合成大西瓜<\/title>/);
    assert.doesNotMatch(html, /\balert\s*\(/);
    assert.match(html, /載入中…/);
});

test('locale helpers and Cocos UI use Traditional Chinese', () => {
    assert.match(game, /returnCurrentLanType: function\(\) \{\s*return 2\s*\}/);
    assert.match(game, /e\.returnCurrentLanType = function\(\) \{\s*return 2\s*\}/);
    assert.match(game, /initLanguage: function\(\) \{\s*this\.curType = 1;\s*return c\.language_1\s*\}/);
    assert.match(game, /game_info: "把相同水果合在一起，挑戰更高分！"/);
    assert.match(game, /txtAgain: "再玩一次"/);
    assert.match(game, /本局得分：/);
});

test('next-fruit preview is a rendered SpriteFrame and is non-interactive', () => {
    assert.match(game, /new cc\.Node\("nextFruitPreview"\)/);
    assert.match(game, /label\.string = "下一顆"/);
    assert.match(game, /this\.nextFruitPreviewSprite\.spriteFrame = d\.default\.Instance\.fruit\[e\]/);
    assert.match(game, /this\.showNextFruitPreview\(0\)/);
});

test('the queued next fruit is used for the actual spawn', () => {
    assert.match(game, /nextFruitId = 0/);
    assert.match(game, /createOneFruit\(t\.nextFruitId\)/);
    assert.match(game, /t\.createFruitCount\+\+;\s*t\.nextFruitId = t\.getNextFruitId\(\);\s*a\.default\.Instance\.showNextFruitPreview\(t\.nextFruitId\)/);
    assert.match(game, /var initial = \[0, 0, 1, 2, 2, 3\]/);
    assert.match(game, /s\.default\.RandomInteger\(0, 5\)/);
});

test('treasure box still rerolls current fruit but guards absent targets', () => {
    assert.match(game, /if \(!game \|\| !game\.targetFruit \|\| !cc\.isValid\(game\.targetFruit\)\) return/);
    assert.match(game, /game\.createOneFruit\(Math\.floor\(Math\.random\(\) \* 6\)\)/);
});
