export default {
  en: `# Shawzin Music Editor

## Features

- [x] Keyboard or mouse input notes
- [x] Import existing code (supports automatic adjustment of BPM)
- [x] Switch BPM
- [x] Live recording
- [x] Play preview and switch between different sounds (although there are only two now)

## How to choose BPM [Important]

BPM is the number of beats per minute, calculated as the number of beats per second *60, that is, 1 second and 2 beats corresponds to 120 BPM.

Since there are no eighth notes and sixteenth notes, if you use the spectrum you used, multiply BPM by 2 or 4 (for example, if you use a 16th note at 120BPM, you need to use 480BPM and change all 16th to four. Divided into the original four points into full notes and so on)

BPM cannot be adjusted arbitrarily due to game code accuracy restrictions. If your song has a BPM calibration, please use the closest option (also adjusted according to the above rules)

## Action

Notice the row of buttons in the upper toolbar. The four icons are the tools that switch the current one.

The default is move tool, support for box selection, which you have used similar software should be familiar.

The second is add note tool, also click on the blank to add notes.

The third is delete note tool, click on the note to delete, of course, delete the shortcut key is the DEL on the keyboard, see the keyboard shortcuts below.

## Keyboard shortcuts

\`DEL\`: delete selected notes

\`Shift+DEL\`: Ripple deletes the selected note (the space to be deleted is moved forward with the back note)

\`BACKSPACE\`: delete last note

\`Q~]\`: Input notes

\`1~7\`: Same as above, also input notes, the difference is matching the notation. The default is the bass Shift midrange Alt treble

\`S, 0\`: Rest note

\`JKL\`: Switch note duration

\`↑/↓\`: Select previous/next note

\`←/→\`: Move the cursor forward/backward

\`Shift+←/→\`: Select from the selected note to the beginning/end

\`Shift+↑/↓\`: Scale the current note (adjust the time value of a single note)

\`Ctrl+Shift+↑/↓\`: Zoom the current note and move the back note

\`Ctrl+↑/↓/←/→\`: Move notes up/down/left/right

\`INS\`: Insert blank before the current selection of notes, \`Shift+INS\` 2 grids \`Ctrl+INS\` 4 grids \`Alt+INS\` -1 grids

\`Shift+MouseLeft\`: Select from the selected note to the currently clicked note

\`Ctrl+MouseLeft\`: Multi-selected notes

## Related

Open source repository: [GitHub-Riven.IM](https://github.com/pa001024/riven-mirror)

Tool source [GitHub-Shawzin Music Editor](https://github.com/pa001024/riven-mirror/tree/dev/src/views/music)

Tool link: [https://riven.im/music](https://riven.im/music)
`,
  cn: `# 三线琴图形化编曲工具

## 功能

- [x] 键盘或鼠标输入音符
- [x] 导入现有代码（支持自动调整BPM）
- [x] 切换BPM
- [x] 实时录制
- [x] 播放预览和切换不同的三线琴音色（虽然现在只有两种）

## 如何选择BPM【重要】

BPM即每分钟节拍数，计算方式为每秒内节拍数*60，也就是一秒2拍对应120BPM。

由于没有做八分音符和十六分音符，如果你所用的谱子用到了请将BPM乘以2或者4（比如120BPM下用到了十六分音符 则需要使用480BPM 并将所有十六分换为四分 原先四分变为全音符 以此类推）

由于游戏代码精确度限制无法做到任意调整BPM 如果你的曲子有标定BPM请用最接近的选项（同时按上面规则调整）

## 操作

注意上方工具栏的一排按钮，有那四个图标就是切换当前使用的工具。

默认是移动工具，支持框选，用过类似软件的同学应该比较熟悉。

第二个是添加音符工具，同样是点击空白处可以添加音符。

第三个是删除音符工具，点击音符即可删除，当然删除快捷键是键盘上的DEL，如果需要批量删除可以用移动工具先框选音符之后用DEL全部删除。

## 键盘快捷键

\`Ctrl+Z\`：撤销

\`Ctrl+Shift+Z\`：重做

\`Shift+DEL\`：波纹删除选择的音符（即将删除的空间用后面音符往前移进行填补

\`BACKSPACE\`：删除最后一个音符

\`Q~]\`：输入音符

\`1~7\`：同上，也是输入音符，不同的是匹配简谱 默认是低音 Shift中音 Alt高音

\`S、0\`：休止符

\`JKL\`：切换音符持续时间

\`↑/↓\`：选择上一个/下一个音符

\`←/→\`：向前/后移动光标

\`Shift+←/→\`：从已选择的音符开始选择到开头/末尾

\`Shift+↑/↓\`：缩放当前音符（调整单个音符的时值）

\`Ctrl+Shift+↑/↓\`：缩放当前音符并移动后面音符

\`Ctrl+↑/↓/←/→\`：向上/下/左/右移动音符

\`INS\`：在当前选择音符前插入空白 \`Shift+INS\` 2格 \`Ctrl+INS\` 4格 \`Alt+INS\` -1格

\`Shift+左键\`：从已选择的音符开始选择到当前点击的音符

\`Ctrl+左键\`：多选音符

## 相关

开源仓库地址 [GitHub-极镜](https://github.com/pa001024/riven-mirror)

工具链接：[https://riven.im/music](https://riven.im/music)
`,
  zh: `# 三線琴圖形化編曲工具

## 功能

- [x] 鍵盤或滑鼠輸入音符
- [x] 匯入現有程式碼（支援自動調整BPM）
- [x] 切換BPM
- [x] 實時錄製
- [x] 播放預覽和切換不同的三線琴音色（雖然現在只有兩種）

## 如何選擇BPM【重要】

BPM即每分鐘節拍數，計算方式為每秒內節拍數*60，也就是一秒2拍對應120BPM。

由於沒有做八分音符和十六分音符，如果你所用的譜子用到了請將BPM乘以2或者4（比如120BPM下用到了十六分音符 則需要使用480BPM 並將所有十六分換為四分 原先四分變為全音符 以此類推）

由於遊戲程式碼精確度限制無法做到任意調整BPM 如果你的曲子有標定BPM請用最接近的選項（同時按上面規則調整）

## 操作

注意上方工具欄的一排按鈕，有那四個圖示就是切換當前使用的工具。

預設是移動工具，支援框選，用過類似軟體的同學應該比較熟悉。

第二個是新增音符工具，同樣是點選空白處可以新增音符。

第三個是刪除音符工具，點選音符即可刪除，當然刪除快捷鍵是鍵盤上的DEL，如果需要批量刪除可以用移動工具先框選音符之後用DEL全部刪除。

## 鍵盤快捷鍵

\`Ctrl+Z\`：撤銷

\`Ctrl+Shift+Z\`：重做

\`Shift+DEL\`：波紋刪除選擇的音符（即將刪除的空間用後面音符往前移進行填補

\`BACKSPACE\`：刪除最後一個音符

\`Q~]\`：輸入音符

\`1~7\`：同上，也是輸入音符，不同的是匹配簡譜 預設是低音 Shift中音 Alt高音

\`S、0\`：休止符

\`JKL\`：切換音符持續時間

\`↑/↓\`：選擇上一個/下一個音符

\`←/→\`：向前/後移動游標

\`Shift+←/→\`：從已選擇的音符開始選擇到開頭/末尾

\`Shift+↑/↓\`：縮放當前音符（調整單個音符的時值）

\`Ctrl+Shift+↑/↓\`：縮放當前音符並移動後面音符

\`Ctrl+↑/↓/←/→\`：向上/下/左/右移動音符

\`INS\`：在當前選擇音符前插入空白 \`Shift+INS\` 2格 \`Ctrl+INS\` 4格 \`Alt+INS\` -1格

\`Shift+左鍵\`：從已選擇的音符開始選擇到當前點選的音符

\`Ctrl+左鍵\`：多選音符

## 相關

開源倉庫地址 [GitHub-極鏡](https://github.com/pa001024/riven-mirror)

工具連結：[https://riven.im/music](https://riven.im/music)
`,
};
