# 交作業流程

1. 取得 repo 的 clone 網址，將 github 上的 repo clone 到 local
![repo clone url](https://i.imgur.com/51WfygL.png)

    ```bash=
    git clone 網址
    ```

2. 新開一個 branch 叫作 week1 並切換過去

    ```bash=
    git branch week1
    git checkout week1

    # or
    git checkout -b week1 # 建立 week1 branch 並切換
    ```

3. 開啟專案資料夾，找到相對應的作業檔案開始寫作業

4. 用 git add 和 git commit -m (或直接 git commit -am) 將更改儲存

    ```bash=
    git add . # 將所有變更加入暫存
    git commit -m "week1 finished"

    # or
    git commit -am "week1 finished"
    ```

5. 把 week1 push 到遠端，也就是 github 上面的 origin repo

    ```bash=
    git push origin week1
    ```

6. 進入 github > Pull request 頁面
    ![pull request tab](https://i.imgur.com/YoxPqsq.png)

7. 按 Compare & pull request
    ![compare and pull request](https://i.imgur.com/lhUR3ZJ.png)

8. 確認要 merge 的 branch，然後去下面檢查作業內容
    ![check hw content](https://i.imgur.com/d4S5kGS.png)

9. 輸入主題、描述，再按 Create pull request
    ![enter topic, description and click create pull request](https://i.imgur.com/Ivqk9GL.png)

10. 進入學習系統的 [作業列表](https://learning.lidemy.com/homeworks)

11. 新增作業 > 選擇第幾週作業、貼 PR 連結、勾選已確認檢查作業與自我檢討後，按送出
    ![check again](https://i.imgur.com/AZ5p97C.png)

12. 助教批改完成後會在 pull request 中幫你 merge
    ![merge](https://i.imgur.com/yu0lN8U.png)

13. 再回到 local，把已經 merge 的 repo pull 到 local 上

    ```bash=
    git pull origin master # 把遠端的 master 同步到電腦
    ```

14. 刪除 week1 分支

    ```bash=
    git branch -d week1
    ```

15. 大功告成！
