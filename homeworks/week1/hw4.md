# 跟你朋友介紹 Git

## 什麼是 Git，為什麼要使用 Git

Git 是一種版本控制系統，可以幫助你讓專案回到之前的某個時間點，甚至開啟新的支線，就像時光機或遊戲存檔，避免你告白失敗或死掉噴裝。

## 開始使用 Git

要操作 Git 通常是用 CLI 工具以輸入指令來達成，首先進入要追蹤的資料夾，接著用 `git init` 開始追蹤。

```bash=
git init
```

## 用 Git 記錄你的變更

開始追蹤以後，Git 就會記錄這個資料夾的所有變化，當你有新增、刪除或編輯檔案時，Git 都會幫你記錄起來，要查看你的修改，可以用 `git status` 來檢查。

```bash=
git status
```

Git 把你的修改歸類在以下幾種狀態：

1. untracked: 新加入的檔案，尚未被 git 追蹤
2. deleted: 已 commit 的檔案被刪除了
3. modified: 已 commit 的檔案經過修改
4. staged: 已加入暫存的修改，commit 之後便會儲存

然而即使 Git 知道你做了什麼變更，你還是必須告訴 Git 你要把哪些變更 **加入** 追蹤，因此要用 `git add` 來指定，也就是把處於 untracked、deleted 還有 modified 等狀態的檔案加入暫存，變成 staged。

```bash=
git add <要加入的檔案>
```

把檔案加入暫存以後還沒有結束，還需要執行 git 最重要的指令之一：`git commit`，來儲存你做的修改，commit 時一定要加上訊息，這是為了將來你自己或他人翻閱記錄時能夠快速了解你做了什麼。

```bash=
git commit -m <訊息>
```

## 使用分支

分支 (branch) 就像是創造一個平行時空，可以在這裡開發新的功能，而不影響到主分支 (master)，等到功能開發完成，再合併 (merge) 到主分支裡。

首先開一個新的 branch。

```bash=
git branch <branch name>
```

查看你目前有的 branch。

```bash=
git branch -v
```

切換到新的 branch。

```bash=
git checkout <branch name>
```

這時就可以盡情地修改，等到完成並 commit 之後，先切回 master，用 `git merge` 進行合併。

```bash=
git merge <branch name>
```

原本用來開發的 branch 就可以刪除了。

```bash=
git branch -d <branch name>
```

## 認識 GitHub

GitHub 是一個開源的軟體平台，用來存放以 git 管理的用戶資料，要存放資料你先要有一個 repository，在本機的角度就等於當初用 `git init` 追蹤的那一個資料夾。

當你第一次要把本機的資料到遠端時，先在 GitHub 上新建一個 repo，再用 `git remote add` 把資料複製上去。

```bash=
git remote add <repo name> <repo URL> # repo name 一般會取 origin
```

![remote add](https://i.imgur.com/9Q2DrYo.png)

或是你在 GitHub 上有一個現成的 repo，可能是 fork 自別人的專案，而你想把他複製到本機時，用 `git clone`。

```bash=
git clone <repo url>
```

![clone](https://i.imgur.com/n5HDLvD.png)

## 在本機與 GitHub 之間同步

`git pull` 將遠端 repo 同步到本機。

```bash=
git pull origin master # 將遠端的 repo 同步到本機的 master
```

`git push` 將本機 repo 同步到遠端。

```bash=
git push origin master # 將本機的 master 同步到遠端的 repo
```

## 與其他作者互動

當你在 GitHub 上看到別人的專案而你很感興趣，想要貢獻一己之力時，這時你可以：

1. fork 對方的 repo
2. 加上你要的新功能
3. 發送 pull request

pull request 的意思是希望原作者可以把你做的功能加入專案，當對方同意後，你的 branch 就會被 merge，同時你也成為這個專案的作者之一。
