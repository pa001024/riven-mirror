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

Notice the row of buttons in the upper toolbar. The 3 icons are the tools that switch the current one.

The default is move tool, support for box selection, which you have used similar software should be familiar.

The second is add note tool, also click on the blank to add notes.

The third is delete note tool, click on the note to delete, of course, delete the shortcut key is the DEL on the keyboard, see the keyboard shortcuts below.

## transposition

When the spectral subrange may not be sufficient, a certain degree of transposition is required to make the range just fall within the interval.

For example, the first song of the world is in the lower 5 to the high 1 and the major is lower in the 1st to the high 5, so use the G key to make the major 1 of the major 1 low and you can put down all the notes.

Here are some of the more common transpositions:
- Minor to D (bass 2 to mid 6 missing 7)
- Minor to F (bass 4 to treble 1 missing 7)
- Major to G (bass 5 to treble 2 missing 4)
- Minor to A (bass 6 to treble 3)
- Pentatonic minor to D (bass 2 to treble 4)
- Pentatonic major to G (bass 5 to treble 6)
- Pentatonic minor to A (bass 6 to high 1)

## Notation code

The notation code is a kind of readable code for easy import and transfer. You can quickly import existing spectra into this tool. Most situations need to be combined with the transfer tool.

**Note that only the note information is imported, please adjust BPM by yourself. **

Example: (サリシノハラ, Major C 240BPM)
\`\`\`
}000[35]|66[65]5|[35350321]|15[50]3|[4323]00|
667^1|[7^1750321]|15[53]3|[4321]0[35]|
66[6555]|[35350321]|[11555334]|[4323]00|
[66]67^1|[^2^17^10665]|667^1|[{3121}]00|000[07]|
[7767]5[05]|{[33]3[3432]|1,[2]2}[05]|{[22]2[2432]|
1,[2]35|10_61|2[1]_7[101]|3[450]1[2|0]1,0[0_5]|
[33]3[3432]|1,[2]2[0_5]|2[202432]|1,[2]35|
10[0_601]|4[320]1[1]|_700[0_6]|100[01]}
\`\`\`

### Symbol list

Other characters are meaningless except the following characters.

- \`. - =\` respectively indicates that the note is a full note / half note / quarter note. for all subsequent notes.
- \`[ ]\` respectively indicates that the length of the note is half/double before. For example, -123=45-1 can also be written as -123[45]1
- \`_(or /) ^(or +)\` respectively indicate bass / treble , only modify one note
- \`{ }\` respectively indicate that the note is higher/lower by one octave. For example, _1_2_3123^1^2^3 can also be written as}123{123{123
- \`# b\` means semitone, only modify one note
- \`,\` indicates the attachment point. ==3003 can also be written as -3,=3
- If you do not write \`. or =\` at the beginning, the default starts with a half note.

## Chords

All simultaneous notes (chords) in the game are currently supported (import and export).

Import this code to see all supported combinations: \`6ZAAaAIcAQpAYqAgsAoxAwyA40BA5BI6BQ8BYFBgDBkGBoHBsNBwLB0OB4PB8VCATCEWCIXCMlCQjCUmCYnCc\`

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

\`Home/End\`: Go to first/last note.

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

注意上方工具栏的一排按钮，有那3个图标就是切换当前使用的工具。

默认是移动工具，支持框选，用过类似软件的同学应该比较熟悉。

第二个是添加音符工具，同样是点击空白处可以添加音符。

第三个是删除音符工具，点击音符即可删除，当然删除快捷键是键盘上的DEL，如果需要批量删除可以用移动工具先框选音符之后用DEL全部删除。

## 转调

当谱子音域可能不够用时，则需要使用一定程度的转调来使音域刚好落在区间内。

比如权御天下这首 原曲音域在低5到高1 而大调音域在低1到高5 因此使用G调来使大调的低1变成低5就可以放下所有音符了

这里列出比较常用的转调:
- 小调转D (低音2到中音6 缺7)
- 小调转F (低音4到高音1 缺7)
- 大调转G (低音5到高音2 缺4)
- 小调转A (低音6到高音3)
- 五声小调转D (低音2到高音4)
- 五声大调转G (低音5到高音6)
- 五声小调转A (低音6到高高音1)

## 简谱代码

简谱代码是为了方便导入和转调的一种可读性编码。可以快速将现有谱子导入本工具。多数情况需结合转调工具使用。

**注意导入的只是音符信息，速度请自行调节BPM。**

例: (离去之原 C大调 240BPM)
\`\`\`
}000[35]|66[65]5|[35350321]|15[50]3|[4323]00|
667^1|[7^1750321]|15[53]3|[4321]0[35]|
66[6555]|[35350321]|[11555334]|[4323]00|
[66]67^1|[^2^17^10665]|667^1|[{3121}]00|000[07]|
[7767]5[05]|{[33]3[3432]|1,[2]2}[05]|{[22]2[2432]|
1,[2]35|10_61|2[1]_7[101]|3[450]1[2|0]1,0[0_5]|
[33]3[3432]|1,[2]2[0_5]|2[202432]|1,[2]35|
10[0_601]|4[320]1[1]|_700[0_6]|100[01]}
\`\`\`

### 符号列表

除以下字符外 其他字符均无意义 可做排版使用

- \`. - =\` 分别表示之后音符为全音符 二分音符 四分音符 对之后所有音符均有效
- \`[ ]\` 分别表示之后音符长度为之前的一半/两倍 如-123=45-1也可写为-123[45]1
- \`_(或/) ^(或+)\` 分别表示低音 高音 只能修饰一个音符
- \`{ }\` 分别表示之后音符为之前高/低一个八度 如_1_2_3123^1^2^3也可写为}123{123{123
- \`# b\` 表示升降 只能修饰一个音符
- \`,\` 表示附点 如=3003也可写为-3,=3
- 若开头未写\`.或=\`则默认以二分音符开始

## 和弦

目前已支持游戏内所有同时出现的音符(和弦)的导入和导出

导入这段代码来查看所有支持的组合: \`6ZAAaAIcAQpAYqAgsAoxAwyA40BA5BI6BQ8BYFBgDBkGBoHBsNBwLB0OB4PB8VCATCEWCIXCMlCQjCUmCYnCc\`

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

\`Home/End\`: 跳转到第一个/最后一个音符

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

注意上方工具欄的一排按鈕，有那3個圖示就是切換當前使用的工具。

預設是移動工具，支援框選，用過類似軟體的同學應該比較熟悉。

第二個是新增音符工具，同樣是點選空白處可以新增音符。

第三個是刪除音符工具，點選音符即可刪除，當然刪除快捷鍵是鍵盤上的DEL，如果需要批量刪除可以用移動工具先框選音符之後用DEL全部刪除。

## 轉調

當譜子音域可能不夠用時，則需要使用一定程度的轉調來使音域剛好落在區間內。

比如權御天下這首 原曲音域在低5到高1 而大調音域在低1到高5 因此使用G調來使大調的低1變成低5就可以放下所有音符了

這裡列出比較常用的轉調:
- 小調轉D (低音2到中音6 缺7)
- 小調轉F (低音4到高音1 缺7)
- 大調轉G (低音5到高音2 缺4)
- 小調轉A (低音6到高音3)
- 五聲小調轉D (低音2到高音4)
- 五聲大調轉G (低音5到高音6)
- 五聲小調轉A (低音6到高高音1)

## 簡譜符號

簡譜符號是為了方便匯入和轉調的一種可讀性編碼。可以快速將現有譜子匯入本工具。多數情況需結合轉調工具使用。

**注意匯入的只是音符資訊，速度請自行調節BPM。**

例: (離去之原 C大調 240BPM)
\`\`\`
}000[35]|66[65]5|[35350321]|15[50]3|[4323]00|
667^1|[7^1750321]|15[53]3|[4321]0[35]|
66[6555]|[35350321]|[11555334]|[4323]00|
[66]67^1|[^2^17^10665]|667^1|[{3121}]00|000[07]|
[7767]5[05]|{[33]3[3432]|1,[2]2}[05]|{[22]2[2432]|
1,[2]35|10_61|2[1]_7[101]|3[450]1[2|0]1,0[0_5]|
[33]3[3432]|1,[2]2[0_5]|2[202432]|1,[2]35|
10[0_601]|4[320]1[1]|_700[0_6]|100[01]}
\`\`\`

### 符號列表

除以下字元外 其他字元均無意義 可做排版使用

- \`. - =\` 分別表示之後音符為全音符 二分音符 四分音符 對之後所有音符均有效
- \`[ ]\` 分別表示之後音符長度為之前的一半/兩倍 如-123=45-1也可寫為-123[45]1
- \`_(或/) ^(或+)\` 分別表示低音 高音 只能修飾一個音符
- \`{ }\` 分別表示之後音符為之前高/低一個八度 如_1_2_3123^1^2^3也可寫為}123{123{123
- \`# b\` 表示升降 只能修飾一個音符
- \`,\` 表示附點 如=3003也可寫為-3,=3
- 若開頭未寫\`.或=\`則預設以二分音符開始

## 和絃

目前已支援遊戲內所有同時出現的音符(和絃)的匯入和匯出

匯入這段歌曲樂串來檢視所有支援的組合: \`6ZAAaAIcAQpAYqAgsAoxAwyA40BA5BI6BQ8BYFBgDBkGBoHBsNBwLB0OB4PB8VCATCEWCIXCMlCQjCUmCYnCc\`

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

\`Home/End\`: 跳轉到第一個/最後一個音符

## 相關

開源倉庫地址 [GitHub-極鏡](https://github.com/pa001024/riven-mirror)

工具連結：[https://riven.im/music](https://riven.im/music)
`,
};
