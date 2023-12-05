## 概要

本レポジトリは自らの力試しとしてゆめみのフロントエンドコーディング試験（一般に公開されている試験）の課題を実装した際の成果物です。
以前にも挑戦させていただいたことがあるのですが難易度変更があったためもう一度挑戦させていただきました。

- [フロントエンドコーディング試験](https://notion.yumemi.co.jp/%E6%8E%A1%E7%94%A8%E9%96%A2%E9%80%A3%E8%B3%87%E6%96%99%E5%85%AC%E9%96%8B/%E3%83%95%E3%83%AD%E3%83%B3%E3%83%88%E3%82%A8%E3%83%B3%E3%83%89%E3%82%B3%E3%83%BC%E3%83%87%E3%82%A3%E3%83%B3%E3%82%B0%E8%A9%A6%E9%A8%93)
- [デプロイ先](https://population-graph-eight.vercel.app/)

課題に取り組んだ合計時間は 56 時間程度でした。2週間で一区切りし「完成」としています。

このような課題に挑戦する機会をいただき感謝しております。

## 設計のコンセプト

主に「近くにおくべきものを近くにおく」「小さいアプリは小さく作る」の2点を念頭に設計を行いました。

「近くにおくべきものを近くにおく」とはコンポーネント本体とスタイルのコード、テストのコードは同じディレクトリに配置するということです。
こうすることによって目的のファイルがどこにあるか予測しやすく、新たにファイルを作るときどこに作れば良いのか迷いにくいという利点が生まれます。

「小さいアプリは小さく作る」は規模が小さいアプリに対しては過度な最適化を行わないということです。
例えば本プロジェクトでは`Button`コンポーネントを作成しまた。このコンポーネントはUIライブラリで提供されるような高機能なものとして作成しておくという選択肢もあります。
しかし今回作成しているのは小さなアプリでほとんど使い回すことがないため限られたpropsを持つ（つまり限られた責任を持つ）小さく簡単なコンポーネントとして作成しました。

## 技術選定・主に使用した技術

技術選定では2週間という限られた時間で学習する時間はあまり取れないと判断し、できる限り現状のスキルセットで時間内に実装することを軸として選定しました。
ただし、触ったことのない技術も使ってみたい、学習しながらでもどこまでできるか挑戦したい思いもあり今まで触ったことがなかった技術もいくつか使用しています。

- Vite：Next.js 14 App Routerを使おうと考えていましたがMSWが対応しておらず断念しました。Pages Routerを使った開発環境でも良かったのですが以前から使用経験があったため挑戦にならないと考え自分の技術スタックの引き出しを増やす意味で開発環境の構築にはViteを使用しました。
- React：試験の要件ではReactもしくはVueを使用することが求められていました。使い慣れているためReactを使うことにしました。
- TypeScript：試験の要件として使用を求められていました。
- Recharts：グラフ描画に使えそうなライブラリをいくつか見たところRechartsはeasyよりのライブラリだと感じました。今回、期限が2週間と限られているため簡単に使えそうなRechartsを選びました。
- Tanstack Query v5(@tanstack/react-query)：外部データ取得・キャッシュのためのライブラリにはTanstackのreact-queryを使用しました。SWRとの比較すると高機能であり使いたい機能がそのまま備わっていたため採用しました。`useSuspenseQueries`が都道府県ごとの人口構成データを並行して取得するのにぴったりな機能でした。
- CSS modules：ほぼ生のCSSのコードを書けばよく、CSSの知識がほぼそのまま使えるため選びました。ViteがCSS modulesをサポートしており、追加の設定が必要ないとう部分も大きいです。
- Zod：外部リソース（今回は環境変数やRESAS APIのレスポンスデータ）をパースし型安全を保つために使用しました。利用者や関連記事が多くサポートを受けやすいと判断し採用しました。
- Mock Service Worker（MSW）：テスト用・開発用のモックサーバーを建てるために使いました。サーバーをモックするライブラリはMSWが広く使われているようだったのでMSWを使用しました。
- Vitest：テスト用のライブラリにはJestを使おうと考えていましたが開発環境としてViteを利用しており導入が簡単そうだったためVitestを利用しました。
- Vercel：ホスティングサービスにはVercelを利用しました。以前にも利用経験がありhobbyでの利用は無料であり追加の課金が発生しないことが明示されているため採用しました。

## 工夫した点や意識した点

- ディレクトリ構成は`src/components/TabBar/components/TabItem.tsx`のようにコンポーネントを構成するコンポーネントを`components`以下に配置するという構成にしました。このディレクトリ構造はUIの見た目に則した構造になり予測しやすいことがメリットです。
- Zodを使用しました。[『Parse, don’t validate』](https://lexi-lambda.github.io/blog/2019/11/05/parse-don-t-validate/)を参考にしました。外部と内部の境界を意識し、境界にparseを集中させ型を最大限に活用するように努めました。
- アクセシビリティを念頭にタブには適切な`role`を付与するなどをしました。
- 『CUD color set guidebook 2018』を参考に多くの人に識別しやすい色の組み合わせを使用しました。
- Reactの`Suspense`を利用しました。また、`useDeferredValue`を利用することで人口構成のデータを新たに取得するとき、ローディングのフォールバックを表示せず前回のグラフが表示されたままになるようにしました。
- Render hooksパターンを用いて実装することによりstateやstate更新関数を不必要に露出しないようにしました。
- RESAS APIのAPIキーがクライアントに漏洩しないようProxy serverを実装しました。
- Flexコンテナとflexアイテムなど常にセットで使われるようなスタイルについては親コンポーネントと子コンポーネントのスタイル上の関係性を明示的に表現したスタイリングのためのコンポーネントを作成しました。
- コミットはレビュアーが変更を追いやすいようなストーリーになるように`rebase`を使って整理しました。（今回はプルリクエストはありませんが、意識してコミット履歴の整理などを行いました。）

## 悩んだ点

- テストの設計について、何をテストすべきなのかについて迷いました。最終的にはUIのテストは今回作成するアプリが小さなアプリであるということもあり「実際のブラウザで確認するのが最も正確で速い」と判断し、hooksなどロジック部分のテストを中心に書く判断に至りました。
- 都道府県のチェックボックスリストはドメインの知識に依存している`PrefecturesCheckBoxList`を作るかUIライブラリとして切り出せる`CheckBoxList`を作成してからドメインの知識を注入するか迷いました。今回は`CheckBoxList`の使い回しどころがないため最適化を後回しにし`PrefecturesCheckBoxList`を作成しました。

## 反省・次に活かしたいこと

- コミットの粒度が荒くなりました。試行錯誤しながら書いた部分については特に一気にstagingしcommitしてしまった部分があります。リベース時に編集したり`git add -p`や`git reset -p`を駆使するべきだったかもしれません。
- mainブランチのコミットにatomicではないコミットが混じってしまいました。つまりエラーを含むコミットがmainに紛れている状態になっています。
- テストはロジック部分を中心に実装する予定でしたが、後回しになりがちで網羅性が低い状態に終わりました。
- テストにおいてRESAS APIが各種エラーレスポンスを返すテストケースを書く時間を確保できませんでした。
- Next.js 14のApp Routerを使おうとしましたがMSW導入時にMSWが利用できないことが判明し一度プロジェクトを初めからやり直しました。技術選定は慎重にやるべきだと感じました。
- アクセシビリティのテストや確認、対応が後回しになりました。WCAGなどを確認しながらアクセシビリティの高いアプリを実装できるように精進したいと考えております。
- Zodのschemaから型を取り出すコード（`type A = z.infer<typeof a>`）が各ファイルに散逸してしまっておりZodに対して直接依存する構造になっています。必要な型は`schema.ts`で生成しZodへの依存を閉じ込めるべきと感じました。

## 参考にした資料

事前の知識が少なかったテスト、Vite、Zod、Rechartsに関する資料を多く参照しました。

- [[RFC] Next.js as a test runner #53409](https://github.com/vercel/next.js/discussions/53409)
- [Support Next.js 13 (App Router)](https://github.com/mswjs/msw/issues/1644)
- [Viteのガイド](https://ja.vitejs.dev/guide/)
- [Vitestのガイド](https://vitest.dev/guide/)
- [実装例から見る React のテストの書き方](https://blog.cybozu.io/entry/2022/08/29/110000#Fetch-API-%E3%81%8C%E5%90%AB%E3%81%BE%E3%82%8C%E3%82%8B%E5%AE%9F%E8%A3%85%E3%81%AE%E3%83%86%E3%82%B9%E3%83%88)
- [Vitest+ React Testing Library+user-eventでテストを書く](https://zenn.dev/mr_ozin/articles/134d5254ca93bb)
- [React テスト応用、テストに悩む人へ](https://zenn.dev/tkdn/books/react-testing-patterns)
- [フロントエンドの書くべきだったテスト、書かなくてよかったテスト](https://speakerdeck.com/takefumiyoshii/hurontoentonoshu-kuhekitatutatesuto-shu-kanakuteyokatutatesuto)
- [Mapped Typesには追加のプロパティが書けない](https://typescriptbook.jp/reference/type-reuse/mapped-types#mapped-types%E3%81%AB%E3%81%AF%E8%BF%BD%E5%8A%A0%E3%81%AE%E3%83%97%E3%83%AD%E3%83%91%E3%83%86%E3%82%A3%E3%81%8C%E6%9B%B8%E3%81%91%E3%81%AA%E3%81%84)
- [recharts-jest/tests/LineChart.test.js](https://github.com/dillonreedy/recharts-jest/blob/main/tests/LineChart.test.js)
- [ResponsiveContainer cannot be rendered and hence cannot be tested using react testing library ](https://github.com/recharts/recharts/issues/2268?source=post_page-----9b7f2c9eeefc--------------------------------)
- [smarthr-ui](https://github.com/kufu/smarthr-ui)
