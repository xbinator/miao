---
group:
  title: 通用
  order: 0
subtitle: 对话气泡
simulator: true
---

用于聊天的气泡容器。

## 何时使用

常用于封装于其他气泡组件。

## 引入

通过以下方式来全局注册组件

```ts
import { createApp } from 'vue';
import { Bubble } from '@miao/engine';

const app = createApp();
app.use(Bubble);
```

## 代码演示

### 基础

基础用法

```html
<MBubble> hello world </MBubble>
```

### 支持位置和头像

通过 avatar 设置自定义头像，通过 placement 设置位置，提供了 left、end 两个选项

```html
<MBubble placement="left" avatar> 哦！你好啊！我是蒙奇·D·路飞！我要成为海贼王的男人！ </MBubble>

<MBubble placement="left" :avatar="{ src: image, title: '路飞' }"> 嘿嘿！你是谁啊？要不要一起吃肉？ </MBubble>

<MBubble placement="right" :avatar="{ src: image, title: '路飞' }"> 喂——！！ </MBubble>

<MBubble placement="right" :avatar="{ src: image }"> 吃吃吃！你就知道吃！钱才是最重要的好吗？ </MBubble>

<MBubble placement="right">
  <template #avatar>路飞</template>
  海贼王，我当定了！
</MBubble>
```

### 气泡尺寸

通过设置 size 属性，可以设置气泡尺寸，提供了'auto'、'fill'

```html
<MBubble size="auto"> auto </MBubble>

<MBubble size="fill"> fill </MBubble>
```

### 工具栏

通过设置 toolbar 属性，可以添加工具栏

```html
<MBubble toolbar> hello world </MBubble>

<MBubble :toolbar="['copy']"> hello world </MBubble>

<MBubble :toolbar="['copy', 'dislike']"> hello world </MBubble>

<MBubble :toolbar="['like', 'dislike', 'reset']"> hello world </MBubble>

<MBubble :toolbar="['copy', 'reset', 'like', 'dislike']"> hello world </MBubble>
```

### 加载中

通过 loading 属性控制加载状态

```html
<MBubble loading> hello world </MBubble>

<MBubble loading placement="right"> hello world </MBubble>
```

### 支持展开与收起

通过设置 collapse 属性，可以展开与收起气泡

```html
<MBubble :is-collapse="true">
  先帝创业未半而中道崩殂，今天下三分，益州疲弊，此诚危急存亡之秋也。然侍卫之臣不懈于内，忠志之士忘身于外者，盖追先帝之殊遇，欲报之于陛下也。诚宜开张圣听，以光先帝遗德，恢弘志士之气，不宜妄自菲薄，引喻失义，以塞忠谏之路也。
  宫中府中，俱为一体，陟罚臧否，不宜异同。若有作奸犯科及为忠善者，宜付有司论其刑赏，以昭陛下平明之理，不宜偏私，使内外异法也。
  侍中、侍郎郭攸之、费祎、董允等，此皆良实，志虑忠纯，是以先帝简拔以遗陛下。愚以为宫中之事，事无大小，悉以咨之，然后施行，必能裨补阙漏，有所广益。
  将军向宠，性行淑均，晓畅军事，试用于昔日，先帝称之曰能，是以众议举宠为督。愚以为营中之事，悉以咨之，必能使行阵和睦，优劣得所。
  亲贤臣，远小人，此先汉所以兴隆也；亲小人，远贤臣，此后汉所以倾颓也。先帝在时，每与臣论此事，未尝不叹息痛恨于桓、灵也。侍中、尚书、长史、参军，此悉贞良死节之臣，愿陛下亲之信之，则汉室之隆，可计日而待也。
  臣本布衣，躬耕于南阳，苟全性命于乱世，不求闻达于诸侯。先帝不以臣卑鄙，猥自枉屈，三顾臣于草庐之中，咨臣以当世之事，由是感激，遂许先帝以驱驰。后值倾覆，受任于败军之际，奉命于危难之间，尔来二十有一年矣。
  先帝知臣谨慎，故临崩寄臣以大事也。受命以来，夙夜忧叹，恐托付不效，以伤先帝之明，故五月渡泸，深入不毛。今南方已定，兵甲已足，当奖率三军，北定中原，庶竭驽钝，攘除奸凶，兴复汉室，还于旧都。此臣所以报先帝而忠陛下之职分也。至于斟酌损益，进尽忠言，则攸之、祎、允之任也。
  愿陛下托臣以讨贼兴复之效，不效，则治臣之罪，以告先帝之灵。若无兴德之言，则责攸之、祎、允等之慢，以彰其咎；陛下亦宜自谋，以咨诹善道，察纳雅言，深追先帝遗诏，臣不胜受恩感激。
  今当远离，临表涕零，不知所言。
</MBubble>
```

## API

### Props

| 参数            | 说明                                             | 类型                                                    | 默认值   |
| --------------- | ------------------------------------------------ | ------------------------------------------------------- | -------- |
| toolbar         | 底部工具栏配置项，可选择是否显示或自定义展示功能 | boolean \| ('copy' \| 'reset' \| 'like' \| 'dislike')[] | false    |
| feedback        | 赞 / 踩的值                                      | number                                                  | 无       |
| placement       | 信息位置                                         | 'left' \| 'right'                                        | 'left'  |
| avatar          | 头像信息                                         | BubbleAvatarProps \| boolean \| slot                    | false    |
| loading         | 加载状态                                         | boolean                                                 | false    |
| isCollapse      | 展示收起按钮                                     | boolean                                                 | false    |
| collapseOptions | 展示收起按钮配置                                 | CollapseOptions                                         |          |
| size            | 气泡尺寸设定                                     | 'auto' \| 'fill'                                        | 'auto'   |
| state          | 当前流式数据状态，用于可以折叠判断               | 'wait' \| 'output' \| 'complete'                        | complete |

### 事件

| 事件    | 说明         | 回调参数                               |
| ------- | ------------ | -------------------------------------- |
| actions | 操作回调事件 | (options: BubbleActionOptions) => void |

### BubbleAvatarProps 类型定义

| 参数  | 说明             | 类型   | 默认值 |
| ----- | ---------------- | ------ | ------ |
| src   | 头像的图片源地址 | string | 无     |
| title | 头像的标题       | string | 无     |

### CollapseOptions 类型定义

| 参数         | 说明             | 类型    | 默认值 |
| ------------ | ---------------- | ------- | ------ |
| defaultValue | 默认展示收起状态 | boolean | false  |
| maxHeight    | 最大高度         | number  | 200    |

### BubbleActionOptions 类型定义

| 参数 | 说明                                     | 类型   | 默认值 |
| ---- | ---------------------------------------- | ------ | ------ |
| name | 'copy' \| 'reset' \| 'like' \| 'dislike' | string | -      |
