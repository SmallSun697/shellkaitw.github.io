---
title: 'Web'
summary: 'Self-Signed Certificate + OpenSSL + ADCS + Nginx & Apache2'
image: '/badssl.png'
alt: 'Shellkai Huang'
created: 2024-09-16
updated: 2024-09-16
tags:
 - Web
 - SSL
 - OS
 - Nginx
 - Apache2
---
## Windows Server 簽署 (Enterprise CA)
安裝 CA Server 提供簽證服務
(選擇 Certification Authority 及 Certification Authority Web Enrollment)
![](https://hackmd.io/_uploads/rJdQha3cn.png)
使用MMC請求CA簽證
![](https://hackmd.io/_uploads/HJRbIwVpn.png)
選擇Computer account
![](https://hackmd.io/_uploads/H1-B26292.png)
點開 Personal > Certificates
再按右鍵選擇 All Tasks > Advanced Operations > Create Custom Request
![](https://hackmd.io/_uploads/SJ6HnTnq3.png)
選擇 Proceed without enrollment policy
![](https://hackmd.io/_uploads/SJ28n625h.png)
![](https://hackmd.io/_uploads/SyHwna29h.png)
設定簽證資訊：Details > Properties
![](https://hackmd.io/_uploads/SkBL8v4p3.png)
![](https://hackmd.io/_uploads/ByPO3Th9n.png)
到 Subject 欄位加入 Common name 和 DNS (`*`為目的網域之萬用類型)
![](https://hackmd.io/_uploads/By9Fn63q2.png)
到 Private Key 欄位點開 Key options
將 Key Size 設為 2048 並勾選 Make private key exportable
![](https://hackmd.io/_uploads/S1Qchphcn.png)
使用 Internet Explorer 進行簽證 (**使用 Chrome Engine 的瀏覽器會出現安全性錯誤**)
前往``http://[hostname].[domain]/certsrv``並輸入帳號密碼
選擇 Request a certificate
![](https://hackmd.io/_uploads/BJ6jPDVpn.png)
選擇 advanced certificate request
![](https://hackmd.io/_uploads/rkNjhp352.png)
選擇  Submit a certificate request using a base64-encoded CMC or PKCS #10 file, or submit a renewal request by using a base-64-encoded PKCS #7 file.
![](https://hackmd.io/_uploads/SJTo26n53.png)
打開剛剛建立好的請求檔案
![](https://hackmd.io/_uploads/SkLhhanqn.png)
複製並貼至 Internet Explorer 內
並將 Certificate Template 類型選擇 Web Server 後按 Submit
![](https://hackmd.io/_uploads/rkepnTn5n.png)
生成完畢後，選擇 Download certificate 來下載簽證
![](https://hackmd.io/_uploads/BkdTh6nqn.png)
到 IIS 的 Server Certificate 並選擇 Complete Certificate Request
![](https://hackmd.io/_uploads/r1rA262q3.png)
導入剛剛下載的簽證，並設定一個 Friendly name
![](https://hackmd.io/_uploads/HJhA26h52.png)
設定 https 的網站，導入簽證
![](https://hackmd.io/_uploads/HJNJT63q2.png)
即完成了簽證，前往目標網站時不會出現安全性錯誤
![](https://hackmd.io/_uploads/Bknk6p352.png)
## Debian (簽證使用 Windows Server)
安裝 OpenSSL：```apt install openssl```
**生成帶 SAN 值 CA 憑證的兩種方式
方式 1：**
一行指令生成帶 SAN 值 CA 請求 (CR)：
```bash==
openssl req -new -newkey rsa:2048 -nodes -keyout [keyname].key -out [csrname].csr -subj "/CN=[domainname]/" -addext "subjectAltName = DNS:[dnsname].[domainname],DNS:＊.[domain],DNS:[dnsname]"
```
**方式 2：**
建立一個設定 CA 的資料夾並更換目前路徑：
```mkdir /tmp/CA/```
```cd /tmp/CA```
生成包含 SAN 的 CA 設定檔並編輯：
```touch san.conf```
```vim san.conf```
在 san.conf 內寫入以下資料：
```bash==
[ req ]
default_bits       = 2048
distinguished_name = req_distinguished_name
req_extensions     = req_ext
[ req_distinguished_name ]
commonName                 = Common Name (e.g. server FQDN or YOUR name)
[alt_names]
DNS.1   = [ur_dns_server.1]
DNS.2   = [ur_dns_server.2]
```
儲存後用 OpenSSL 建立 CA 憑證請求：
```openssl req -out [urcsrname].csr -newkey rsa:2048 -nodes -keyout [urkeyname].key -config san.cnf```
將 key 放至 apache2 資料夾內：```mv [urkeyname].key /etc/apache2```
將憑證請求放至與 Windows Server 端的共享資料夾內：```mv [urcsrname].csr /share```
在 Windows Server 操作簽署完憑證後，將 Windows 用的 cer 格式轉為 Linux 用的 crt 格式，並將生成結果存於 apache2 資料夾內：
```bash==
openssl x509 -in /share/[urcername].cer -out /etc/apache2/[urcrtname].crt -inform DER
```
## 預設 html 網頁設定
```bash==
vim /var/www/html/index.html
```
## Web Server (apache2)
安裝 apache2：```apt install apache2```
重啟 apache2 服務：```service apache2 restart```
### 啟用 https (SSL)
啟用 SSL & ReWrite Engine
```bash==
a2enmod ssl
a2enmod rewrite
```
編輯 apache2 的設定檔：
```vim /etc/apache2/apache2.conf```
在文件末端加入以下資料：
```bash==
<Directory /var/www/html>
AllowOverride All
</Directory>
```
編輯 apache2 的網站設定檔：```vim /etc/apache2/sites-avaliable/000-default.conf```
寫入以下資料：
```bash==
<VirtualHost *:443>
        ServerAdmin webmaster@localhost
        DocumentRoot /var/www/html
        ErrorLog ${APACHE_LOG_DIR}/error.log
        CustomLog ${APACHE_LOG_DIR}/access.log combined
        SSLEngine on
        SSLCertificateFile /etc/apache2/[urcrtfile].crt
        SSLCertificateKeyFile /etc/apache2/[urkeyfile].key
</VirtualHost>
```
![](https://hackmd.io/_uploads/B1vgTT2cn.png)
### 網址重新導向
```bash==
// 將 http://www.wsdomain.com.tw/outside 重新導向至 http://outside.out
```
編輯 apache2 的網站設定檔：```vim /etc/apache2/sites-avaliable/000-default.conf```加入 ```Redirect /outside http://www.outside.out```
![](https://hackmd.io/_uploads/rJG-6p39h.png)
```bash==
// 將 http://www.wsdomain.com.tw 重新導向至 https://www.wsdomain.com.tw
```
編輯 apache2 的網站設定檔：```vim /etc/apache2/sites-avaliable/000-default.conf```加入 ```Redirect / https://www.wsdomain.com.tw```
### 站台登入驗證
建立給 apache2 驗證登入使用者資訊的文件：```touch /etc/apache2/.htpasswd```
新增使用者到 htpasswd：
```htpasswd /etc/apache2/.htpasswd [username]```
![image](https://hackmd.io/_uploads/SkdzaRyJA.png)
新增後，編輯 apache2 的網站設定檔：```vim /etc/apache2/sites-avaliable/000-default.conf```
加入登入功能，其中 AuthName 是要求登入時會顯示的訊息
```bash==
<Directory /var/www/html>
AuthType Basic
AuthName [loginmessage]
AuthUserFile /etc/apache2/.htpasswd
Require valid-user
</Directory>
```
### 使用者個人網頁模組 (userdir)
啟用模組：```a2enmod userdir```
編輯模組設定檔：```vim /etc/apache2/mods-enabled/userdir.conf```
![image](https://hackmd.io/_uploads/SkPT4vlAT.png)
其中第一行的意思是站台會存取使用者目錄中 html 資料夾內的檔案，若使用者目錄中沒有此資料夾則網頁會顯示「Not Found」，預設值是 public_html
第二行是不為哪些使用者啟用站台，預設值是 root 使用者
若啟用了該模組，也要記得將目錄的權限更改為755：```chmod -R 755 /[homedir]/[webdir]```
### 更換 Port
編輯 Port 設定檔：```vim /etc/apache2/port.conf```
![image.png](https://hackmd.io/_uploads/rySLPmSmT.png)
如果要改 http 的 Port：將 80 改成你要的 Port
如果要改 https 的 Port：將 443 (兩個) 改成你要的 Port
最後編輯網站設定檔：```vim /etc/apache2/sites-avaliable/000-default.conf```
![image.png](https://hackmd.io/_uploads/r1q8dmrXa.png)
將最上方的 80 改成你要的 Port
### 更換站台
先關閉預設站台：```a2dissite 000-default.conf```
再啟用你要的站台：```a2ensite [ursitename]```
### 預設檔案
若網頁檔名不是 index.html 或 index.htm 需要設定預設檔案名稱，開啟設定檔：```vim /etc/apache2/apache2.conf```
```bash==
<Directory $PATH$>
    DirectoryIndex [filename]
</Directory>
```
![image](https://hackmd.io/_uploads/rka5bPgC6.png)

### 403 Forbidden 解決
在更改站台路徑後可能會出現 403 Forbidden 的問題
![image](https://hackmd.io/_uploads/S1RlxPg0a.png)
開啟設定檔：```vim /etc/apache2/apache2.conf```
```bash==
<Directory $PATH$>
    Options Indexes FollowSymLinks
    AllowOverride None
    Require all granted
</Directory>
```
![image](https://hackmd.io/_uploads/HkNrQLRRp.png)
設定後重啟 apache2：```service apache2 restart```
## Web Server (Nginx)
安裝 Nginx：```apt install nginx```
重啟 Nginx 服務：```service nginx restart```
### nginx.conf 檢查
```nginx -t```
### 限制 IP 存取站台
編輯 Nginx 的網站設定檔：```vim /etc/nginx/sites-available/default```
編輯 server 區域下的 location 區域：
```bash==
# 黑名單設定方法
location / {
deny 192.168.10.55;
deny 192.168.1.0/24;
}
# 白名單設定方法
location / {
allow 192.168.10.55;
allow 192.168.1.0/24;
deny all; #需要禁止全部 IP 存取才可設定白名單 (預設為 allow all)
}
```
註：這裡設定有先後的層級之分，若在白名單內把deny all寫在allow的前面會使allow設定不運作
若站台存取遭拒會顯示：
![](https://hackmd.io/_uploads/SkdwHlNeT.png)
![](https://hackmd.io/_uploads/rJwKoyVga.png)
### 站台登入驗證
安裝 apache2-utils (會使用到 htpasswd 指令)：```apt install apache2-utils```
建立給 Nginx 驗證登入使用者資訊的文件：```touch /etc/nginx/.htpasswd```
新增使用者到 htpasswd：
```htpasswd /etc/nginx/.htpasswd [username]```
新增後，編輯 Nginx 的網站設定檔：```vim /etc/nginx/sites-available/default```
加入登入功能到 location 區塊，其中 auth_basic 是要求登入時會顯示的訊息：
```bash==
location / {
        auth_basic "[loginmessage]";
        auth_basic_user_file /etc/nginx/.htpasswd;
        }
```
### 啟用 https (SSL)
編輯 Nginx 的網站設定檔：```vim /etc/nginx/sites-available/default```
在 server 區塊下設定 SSL：
```bash==
server {
    # SSL configuratuion
    listen 443 ssl default_server;
    listen [::]:443 ssl default_server;
    ssl_certificate /etc/nginx/[urcrtfile].crt;
    ssl_certificate_key /etc/nginx/[urkeyfile].key;
}
```
![](https://hackmd.io/_uploads/ry9yNBNlp.png)
![](https://hackmd.io/_uploads/BkQEIB4lT.png)
### 網址重新導向
編輯 Nginx 的網站設定檔：```vim /etc/nginx/sites-available/default```
在 location 區塊下設定：
```bash==
# 當存取 test.com 時會重新導向至 redirect.com
location / {
    return 301 http://redirect.com;
}
```
![](https://hackmd.io/_uploads/r1ycdB4lT.png)
![](https://hackmd.io/_uploads/BynrFHVgT.png)
### http to https 重新導向
與前面重新導向相似，但是需要將 http 和 https 站台分開來寫
![image](https://hackmd.io/_uploads/ryx5ruBd0.png)
在 http 的站台內寫 `return` 到 https
**注意：不是寫在 location 區塊內**
若一個站台對到多個 DNS 紀錄可以寫為
```bash==
return 301 https://$host$request_uri;
```
### 負載平衡/分流 (Load Balance)
編輯 Nginx 的網站設定檔：```vim /etc/nginx/sites-available/default```
新增 upstream 區塊並編輯 server 區塊：
```bash=
upstream [load_balance_URL] {
    server [server1]:[port];
    server [server2]:[port];
    ...
}
location / {
    proxy_pass http://[load_balance_URL];
}
```
![image](https://hackmd.io/_uploads/ByAIZpGpp.png)

若要監察存取紀錄可以在站台檔案的開頭新增 log 格式，並在 server 區塊新增 ```access_log /var/log/nginx/access.log upstreamlog;```：
![image](https://hackmd.io/_uploads/HJyGL6Maa.png)
註：最後的```upstreamlog```指的是給 log 的格式名稱 
再用指令```tail -f /var/log/nginx/access.log``` 實時監察站台存取紀錄：
![image](https://hackmd.io/_uploads/S1IqXCGpa.png)
只要出現設定檔中的多個 IP 就代表負載設定成功
### 更換站台
編輯 Nginx 設定檔：```vim /etc/nginx/nginx.conf```
找到 ```include /etc/nginx/sites-enables/*;```
![image](https://hackmd.io/_uploads/S1rkLCfa6.png)
可以自行新增或編輯，讓 ```include``` 後面接自己站台的路徑，並把預設站台移除
### location (匹配選擇機制)
僅使用```/```表示一般配置 (最長路徑)，會**搜尋全部的 location 後才挑選出最符合請求路徑的配置檔** (有可能被其它規則攔截)
```bash==

    # 最基本的設定，會匹配到所有 http://www.domain.com 的請求，但是優先順序會被排到正規表示法和最長路徑之後
    # 例如 http://www.domain.com/abc 或 http://www.domain.com/bruh 兩者皆可符合該規則 
    location / {
        ....
    }

    # 匹配到以 /news 開頭的所有請求，但還不會馬上採用，會繼續往下搜尋是否有較長符合路徑的項目
    location /news {
        ....
    }

    # 匹配到以 /news/taiwan 開頭的所有請求，也是不會馬上採用，但若是有來自 http://www.domain.com/news/taiwan/... 開頭的請求，則會取代上面 /news 配置成為優先保留項再繼續往下搜尋
    location /news/taiwan {
        ....
    }

    # 匹配到以 /news/taiwan/keelung 開頭的所有請求，也是不會馬上採用，分為以下兩個情境
    # 1. 來自 http://www.domain.com/news/taiwan/hsinchu 開頭的請求，依然會採用上面 /news/taiwan 的配置然後繼續往下搜尋
    # 2. 來自 http://www.domain.com/news/taiwan/keelung 開頭的請求，則會取代上面 /news/taiwan 的配置成為新的優先保留項然後才再繼續往下搜尋
    location /news/taiwan/keelung {
        ....
    }
```
使用```= /```代表精準匹配，需**完全符合且匹配，確認後立即採用**
```bash==
    # 只能 http://www.domain.com 才能符合，後面不能帶任何字元，e.g. http://www.domain.com (O), http://www.domain.com/abc (X)
    location = / {
        ....
    }

    # 來自 http://www.domain.com/news/taiwan/taipei 的要求會立即採用此配置
    location = /news/taiwan/taipei {
        ....
    }
```
使用```~ /```代表使用正規表示法來做匹配，會**區分大小寫**，若要**不區分大小寫需使用**```~* /```，由於第一個匹配到的規則設定會立即採用，所以採用此種方式的配置其順序很重要
```bash==
    # 1. 來自 http://www.domain.com/images 開頭的要求會匹配此規則且立即採用該配置，但 http://www.domain.com/Images 開頭的要求則不符合該規則
    location ~ ^/images {
        ....
    }

    # 來自 http://www.domain.com/images 和 http://www.domain.com/Images 開頭的要求皆能符合此規則且會立即採用該配置
    location ~* ^/images {
        ....
    }

    # 匹配所有以 .gif 和 .jpg 和 .jpeg 結尾的要求，這邊分兩個情境來說明
    # 1. 來自 http://www.domain.com/Images/dog.jpg 的請求雖然符合該配置的規則，但是卻會先被上面的 ~* ^/images 這條規則先攔截，因此該請求其實是到不了這條規則的
    # 2. 來自 http://www.domain.com/news/images/cat.gif 的請求符合該配置的規則且沒在其它地方被攔截，所以會立即採用該配置
    location ~* \.(gif|jpg|jpeg)$ {
        ....
    }

    # 匹配所有 URI 路徑以 admin 和 swagger 和 api 開頭的要求，這邊分兩個情境來說明
    # 例如來自 http://www.domain.com/admin/... 或 http://www.domain.com/Admin/... 開頭的請求皆符合此規則且會立即採用該配置
    location ~* ^/(admin|swagger|api)/? {
        ....
    }  
```
使用```^~```代表排除正規表示法的匹配，類似於一般配置，不同的是一旦符合即馬上採用該配置
```bash==
    # 匹配到所有請求，但還不會馬上採用，會繼續往下搜尋是否有其它較長符合路徑的項目
    location / {
        ....
    }

    # 匹配到以 /news 開頭的所有請求，但還不會馬上採用，會繼續往下搜尋是否有較長符合路徑的項目
    location /news {
        ....
    }

    # 匹配到以 /news/taiwan 開頭的所有請求，因為使用了 ^~ 所以如果有符合 /news/taiwan 開頭的 URI 會立即採用該配置，停止往下搜尋
    # 1. 來自 http://www.domain.com/news/taiwan/keelung/index 的請求符合該配置的規則，所以採用該配置
    # 2. 來自 http://www.domain.com/news/japan/osaka/index 的請求不符合該配置的規則，繼續往下搜尋
    location ^~ /news/taiwan {
        ....
    }

    # 匹配到以 /news/japan 開頭的所有請求，但還不會馬上採用，會繼續往下搜尋是否有較長符合路徑的項目
    location /news/japan {
        ....
    }
```
| 參數 | 說明 | 是否立即採用 |
| -------- | -------- | -------- |
| / | 最長路徑 | 否 |
| = / | 精準匹配 | 是 |
| ^~ / | 類似最長路徑，但會馬上採用 | 是 |
| ~ / | 正規表示法，區分大小寫 | 是 |
| ~* / | 正規表示法，不區分大小寫 | 是 |