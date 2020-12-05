## このレポジトリの概要

Firestore のエミュレーターを使って、ローカル環境でテストを実行できる環境を用意したもの

---

## ローカル環境で Firestore のテストを実行するメリット

- Firestore のルールの修正と動作確認が手軽になる
- エミュレーターの GUI を使うと、オフラインでもどのように Firestore にデータが溜まるか確認できる
- 本番とは切り離して動作確認を行うことができる

---

## テストを実行するために必要な事前準備

1. Firebase プロジェクトを用意する
2. 1 で作成した Firebase プロジェクトで Firestore の準備まで追える
3. firebase コマンドを実行できるようにする(Firebase CLI をインストールする)
4. firebase init コマンドで `Firestore`、`Emulators` を選択する
5. 4 の init コマンドの一連の流れの中で `Emulators Setup` まで進んだら `Firestore Emulator`を選択する
6. Emulator UI を使いたい場合は、5 の選択をしたあとで、「エミュレータを今ダウンロードしますか？」という質問が出ると思うので `y` を押してエンターを押す
7. このレポジトリの `.env.example` をコピーして `.env` ファイルを作成する
8. `.env` ファイルの `FIREBASE_PROJECT_ID` の値として、1 で作成した Firebase プロジェクトのプロジェクト ID をセットする

**補足**

> 1, 2, 3 の内容に関しては、以前撮った「[Firebase 入門](https://www.youtube.com/playlist?list=PLgNEd6Q0CH8E6zHmqsO7EIcqsDEeVD089)」の動画リストでも解説しているため、Firebase に慣れていない場合は、そちらも参考にしていただけたらと思います。

---

## このレポジトリのテストの実行の流れ

```sh
# 1. Firestoreのエミュレーターを起動する(以下2つの内いずれかでOK)
$ npm run emu # 他のエミュレーターも選択している場合は、複数のエミュレータを起動できる
$ npm run emu:firestore  #複数のエミュレーターを入れていても、firestoreエミュレータのみ起動する


# 2. テストを実行する
$ npm test
```

---

## 参考資料

- 公式ドキュメント
  - [Firebase エミュレータの設定](https://firebase.google.com/docs/rules/emulator-setup?hl=ja)
  - [単体テストの作成](https://firebase.google.com/docs/rules/unit-tests?hl=ja)
  - [Unit testing security rules with the Firebase Emulator Suite](https://youtu.be/VDulvfBpzZE)
- Firestore について解説した動画リスト
  - [Firebase 入門](https://www.youtube.com/playlist?list=PLgNEd6Q0CH8E6zHmqsO7EIcqsDEeVD089)
