# 解題心得

## hw1：好多星星

沒什麼難度，建立空字串搭配迴圈，每 loop 一次就加一個 '*'，並印出即可。

## hw2：水仙花數

把數字換成字串，取長度就是次方數，再用迴圈計算每個位數的次方值並加總，最後比較是否與原本的數字相同。

## hw3：判斷質數

判斷小於 N 的所有數字能否整除 N，有任何數字可整除 N 則 N 不是質數，用 for 迴圈就可以搞定。

## hw4：判斷迴文

反轉字串後比較是否與原來的相同，簡單。

## hw5：聯誼順序比大小

這題一開始把測資轉 Number 寫怎麼寫都不過，後來查到因為很大的數字在 JS 裡計算不精確，也學到用 BigInt 來表示超大整數，將測資用 BigInt 轉換後就 AC 了，但又看到 Slack 有人發問這題解不出來，才又學到這題可以用字串的角度處理，就試著寫寫看，雖然寫得亂亂的，但最終還是有 AC，可喜可賀。
