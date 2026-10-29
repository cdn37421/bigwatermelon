## 合成大西瓜
被西瓜整崩溃了,改动了一下代码，点击右上角的宝箱会切换水果。破坏游戏体验，谨慎尝试。
分支「default」是未改动代码
> ![image](https://github.com/JennerTien/bigwaterlemon/blob/main/1611557925872957.gif)

## 無廣告版本（開發中）

這個分支移除廣告與外部遊戲推薦，保留水果合成、計分、寶箱隨機更換水果等功能。

這份倉庫是 Cocos Creator 的 Web 發布產物，而不是完整編輯器工程。小幅修改可直接編輯 `src/project.js`，無須修改 `cocos2d-js-min.js`。

在專案根目錄啟動靜態 HTTP 伺服器（例如 `python -m http.server 8000`），再開啟 `http://localhost:8000/`。不建議使用 `file://` 開啟，以免資源載入受瀏覽器限制。

**注意：** 原始倉庫沒有提供明確的素材再授權條款。公開重新發布或商業使用前，請先確認圖片、音效及程式碼的使用權。
