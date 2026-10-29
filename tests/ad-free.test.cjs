'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const project = fs.readFileSync(path.join(root, 'src/project.js'), 'utf8');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');

test('advertising SDK and page elements are removed', () => {
    assert.equal(fs.existsSync(path.join(root, 'ads.js')), false);
    assert.doesNotMatch(html, /id=["']adContainer["']/);
    assert.doesNotMatch(html, /adCompleteFlag|adEndComplete|resEndComplete/);
});

test('bundled code has no ad callbacks or outgoing redirects', () => {
    assert.doesNotMatch(project, /\badBreak\s*\(|\bshowMyAds\s*\(|\bnoAdGoToScene\s*\(/);
    assert.doesNotMatch(project, /window\.location\.href\s*=/);
    assert.doesNotMatch(project, /doumobfour\.club|clotfun\.online/);
});

test('game startup does not depend on recommendations API', () => {
    assert.doesNotMatch(project, /o\.send\("103"/);
    assert.match(project, /i\.goToCover\(!1, !1, e, t, n\)/);
    assert.match(project, /cc\.director\.loadScene\(e, null, function\(\)/);
});

test('gameplay scripts and treasure-box fruit switching are preserved', () => {
    assert.match(project, /t\.prototype\.adsButtonFunc = function\(\)/);
    assert.match(project, /t\.prototype\.createOneFruit = function\(e\)/);
    assert.match(project, /t\.prototype\.onTouchEnd = function\(e\)/);
    assert.match(project, /t\.prototype\.onBeginContact = function\(e, t, n\)/);
});

test('promotional buttons are hidden without removing gameplay treasure button', () => {
    assert.match(project, /this\.adsButton2\.active = !1/);
    assert.match(project, /this\.bannerButton\.active = !1/);
    assert.match(project, /this\.moreGameBtn\.active = !1/);
});
