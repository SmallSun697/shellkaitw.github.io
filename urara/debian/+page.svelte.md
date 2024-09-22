---
title: 'Debian'
image: '/debian.jpg'
alt: 'Shellkai Huang'
created: 2022-12-16
updated: 2024-09-22
tags:
 - Linux
 - OS
---
## 安裝功能
安裝 package 指令：
`apt install [package-name]`
## vim
vim 設定檔編輯：
`vim /etc/vim/vimrc`
設定行號指令：`set nu`
![image](https://hackmd.io/_uploads/rkgk7aTnc2.png)

vim 一般模式指令：
Esc + :w       - 保存文件，不退出 vim
Esc + :w file  - 將修改另外保存到 file 中，不退出 vim
Esc + :w!      - 強制保存，不退出 vim
Esc + :wq      - 保存文件，退出 vim
Esc + :wq!     - 強制保存文件，退出 vim
Esc + :q       - 不保存文件，退出 vim
Esc + :q!      - 不保存文件，強制退出 vim
Esc + :e!      - 放棄所有修改，從上次保存文件開始再編輯

vim 編輯模式指令：
插入字元：i
取代字元：r
可視模式：v
刪除內容：d
撤銷最近一次編輯：u
將誤刪的內容回復：p
多行選擇：Shift+V
預設編輯器設定：
`update-alternatives --config editor`
選擇 `/usr/bin/vim.basic`
![](https://hackmd.io/_uploads/Hy27pah5n.png)
輸入 `editor` 即可叫出 vim
### 在 putty 上直接對 vim 貼上資料
編輯 vim 設定檔： `vim /etc/vim/vimrc`
加入鼠標模式：`:set mouse=`
儲存後在 putty 上按 `Shift+Insert` 即可在 vim 上貼上資料
![](https://hackmd.io/_uploads/ryi466hcn.png)
## 開啟新 Console
使用快捷鍵：
```bash==
Ctrl + Shift + F2 // 開啟第二個 Console
```
其中 F2 可以替換成要開的 Console 代號
## 刪除相關指令
### 檔案相關
刪除檔案：
`rm [filelocation]`
刪除目錄：
`rm -d [dirlocation]`
`rmdir [dirlocation]`
若目錄內有資料：
`rm -vrf [dirlocation]`
![](https://hackmd.io/_uploads/B1QST6nq3.png)
### 完整刪除套件 (apt)
先將刪除目標的服務停止：```service [service] stop```
完整刪除：```apt-get purge [package1] [package2]...```
(註：若要將全部相關的套件都刪除，先輸入主要的套件名稱 (如：apache2)，再用 Tab 鍵去找尋相關的副套件)
接下來要找尋系統中已經用不到的套件，有些是與欲刪除的套件有相關的：```apt autoremove```
最後再找尋是否還有殘留未刪除的檔案：```whereis [service]```
## hostname 更改
查看目前 hostname：```hostname```
更改 hostname：```hostnamectl set-hostname [the-hostname-u-want-to-change]```
## Samba (資料夾共享)
Samba 設定檔編輯：```vim /etc/samba/smb.conf```
建立資料夾：
```
mkdir /public
mkdir /private
```
path=/home/jackey：上述的jackey這個分享目錄，位在主機中實體的路徑為/home/jackey
writable = yes：可以讀寫，修改分享目錄中的檔案
public = yes：所有人都可以訪問此共享資料夾
read only = no：非唯讀模式，其他人可以寫入
更改完後執行```service smbd restart```來重置 Samba 服務，使設定值生效。
### Samba 存取驗證 (smbpasswd)
限制在 ```smbuser``` 群組的使用者才可存取資料夾
設定方式：
![image](https://hackmd.io/_uploads/B14jpF30a.png)
設定後還要將使用者加入 ```smbpasswd``` 內

一次新增 9 個使用者 (user01~user09) 到 smbpasswd 且密碼為 Skills39：
```sudo==
for ((i=1;i<=9;i++))
> do
> (echo "Skills39"; echo "Skills39") | smbpasswd -s -a user0$i
> done
```
## chmod (權限修改)
### 數字代表的權限
7 = 讀、寫和執行權限
5 = 讀和執行權限
4 = 唯讀權限
第一位數字：文件所有者
第二位數字：群組使用者 (與文件所有者在同一使用者群組)
第三位數字：其他使用者
### 資料夾權限更改

```bash==
chmod 777 [dirlocation] //將資料夾權限設為所有人都可以修改
```
### 資料夾及內部檔案權限更改
```bash==
chmod -R 777 [dirlocation] //將資料夾及內部檔案權限設為所有人都可以修改
```
## 修改 IP 位置
修改網卡設定檔：
```vim /etc/network/interfaces```
修改為下列資訊：
```root=
auto ens33
iface ens33 inet static
address [ur ip address] (or [ur ip address]/[ur subnet])
netmask [ur netmask]
gateway [ur gateway]
dns-nameservers [ur dns-server]
```
DNS 設定：
修改/建立 DNS 設定檔：
```
vim /etc/resolv.conf
```
輸入：
```
nameserver [ur dns-server]
```
![image](https://hackmd.io/_uploads/H1uEzKXy0.png)
### error: RTNETLINK answers: File exists
![image](https://hackmd.io/_uploads/BJzymBWBR.png)
可透過指令刪除現有配置來重置介面：```ip addr flush dev eth0```
再使用 ```service networking restart``` 來重新套用介面設定並啟用
## 自訂網卡名稱 (ATTR)
編輯及新增檔案：```vim /etc/udev/rules.d/net.rules```
輸入以下內容：
```bash==
ATTR{address}=="[網路介面MAC位置]",NAME="[想更改為什麼網卡名稱]"
```
![image](https://hackmd.io/_uploads/S1fWYnuc6.png)
輸入後退出
再編輯網路介面設定：```vim /etc/network/interface```
![image](https://hackmd.io/_uploads/HyEdF2_c6.png)
最後將電腦重啟：```reboot```
## 關閉最後登入訊息顯示
輸入 ```touch ~/.hushlogin```，登出後即生效
## ufw (Firewall) (useless)
輸入 ```apt install ufw``` 安裝 ufw
檢查 ufw 是否運作正常：
```service ufw status```
ufw：
![](https://hackmd.io/_uploads/HkSYT6hc3.png)
可使用 ```ufw status``` 查看目前允許或拒絕存取的 Port
![](https://hackmd.io/_uploads/By3Ypphqh.png)
輸入 ```ufw allow/deny [port] from/to [link]``` 可增加要允許或拒絕規則
## iptables
查看目前規則：
```sudo==
iptables -L
or
iptables -L --line-numbers (可查看帶有編號的規則，可用於刪除規則)
```
![](https://hackmd.io/_uploads/BkEq6p35h.png)
### 基本設定
清除規則：
```sudo==
iptables -F //清除所有的已訂定的規則
iptables -X //殺掉所有使用者建立的 tables
iptables -Z //將所有的 chain 的計數與流量統計都歸零
```
![](https://hackmd.io/_uploads/H1Acaah5n.png)
設定預設 Chain Policy 為 DROP：
```sudo==
iptables -P INPUT DROP
iptables -P OUTPUT DROP
iptables -P FORWARD DROP
```
![image](https://hackmd.io/_uploads/HJlcEy9h6.png)
### Port 連線管理
```sudo==
//允許 Port 80 連線
iptables -A INPUT -p tcp --dport 80 -j ACCEPT
//拒絕 Port 30 連線
iptables -A INPUT -p tcp --dport 30 -j REJECT
```
### NAT 轉址服務
#### SNAT (原位址轉換) (內傳外)
**若要做 NAT 設定，設定指令最前面要先打 iptables -t nat**
使用 iptables 來完成此項目。

NAT 設定：
```sudo==
// 外網位置為 39.53.6.1/24，網卡為 eth1
iptables -t nat -A POSTROUTING -o eth1 -j SNAT --to 39.53.6.1
```
NAT 設定 (若外網 IP 非固定 IP)：
```sudo==
// 外網網卡為 eth1
iptables -t nat -A POSTROUTING -o eth1 -j MASQUERADE
```
#### DNAT (目的位址轉換) (外傳內)
```sudo==
// 內網位置為 192.168.39.2/24，網卡為 eth0 (設定完後本機的位置都會一律被定向到內網的192.168.39.2，建議搭配 Port 使用)
iptables –t nat –A PREROUTING –i eth0 –j DNAT --to 192.168.39.2
```
### Port Forwarding
```bash==
// 將 localhost 上的 Web Server 的 80 Port 做 Port Fowarding 至 8000 Port
iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-ports 8000
iptables -t nat -A OUTPUT -p tcp -d localhost --dport 80 -j REDIRECT --to-ports 8000
// 將在 eth0 收到的 80 Port 封包全部做 Port Forwarding 至 8080 Port
iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 8080
```
### 啟用 IPv4 封包轉發
若有做 NAT 或 Port Forwarding 都需要啟用封包轉發
輸入 ```sysctl -w net.ipv4.ip_forward=1``` 來允許系統做 Port Forwarding (重啟後會消失)
若想永久保存可編輯 ```/etc/sysctl.conf```
將註解的 ```net.ipv4.ip_forward=1``` 取消註解，重啟或輸入```sysctl -p```來生效
![image](https://hackmd.io/_uploads/ByoUA-P6a.png)
現在既可以直接使用 8000 Port 訪問，也可以使用 80 Port 自動轉至 8000 Port 來訪問
![](https://hackmd.io/_uploads/H1ubS3Iea.png)
![](https://hackmd.io/_uploads/BkFT43Lga.png)
![](https://hackmd.io/_uploads/B1zsE38e6.png)
**# 此方式較麻煩故淘汰，可見下面方法保存** ~~若想在重啟後一樣保留 Port Forwarding 的設定，可以至 ```/etc/network/interface``` 的網卡設定檔，在最下方加入
post-up [iptables command]
在網卡啟動後就會自動執行~~
### ICMP 封包管理 (IP A 連線到 IP B 限制)
```bash==
// 規定 192.168.10.58 不能傳送 ICMP 封包到 192.168.10.56
iptables -A INPUT -s 192.168.10.58 -d 192.168.10.56 -p icmp -j DROP/REJECT
// 取消規則
iptables -D INPUT (規則編號)
```
可以使用 Ping 指令來測試規則是否正常運行：
規則未啟用：(可正常 Ping 通)
![](https://hackmd.io/_uploads/H1L6XjMz6.png)
規則已啟用：(使用 DROP：顯示逾時)
![](https://hackmd.io/_uploads/SkSlNozMT.png)
(使用 REJECT：顯示封包無法抵達目標主機)
![](https://hackmd.io/_uploads/rybisP8Ga.png)
### 保存當前設定 (全部規則皆適用)
```sudo==
apt install iptables-persistent
```
都點選 OK 後，重開機規則不會消失
如果有做變更則重新安裝套件即可：
```sudo==
apt reinstall iptables-persistent
```
### 刪除某一行規則
先查看規則號碼：
```sudo==
iptables -L --line-numbers
```
依照編號選擇要刪除的規則：
```sudo==
iptables -D INPUT 1 # 若只有上述那行，那就是 1
```
## DNS Server (Bind9)
設定完記得使用 ```service named restart``` 重啟 DNS 服務
### 正解建立
```named.conf.local``` 設定檔內容
![](https://hackmd.io/_uploads/SytsT6h5h.png)
```db.wsdomain.com.tw``` 設定檔內容
![](https://hackmd.io/_uploads/rkE2aahc3.png)
使用瀏覽器
輸入 ```wsdomain.com.tw``` 可導向至 ```192.168.100.201``` 的主機
輸入 ```www.wsdomain.com.tw``` 也可導向至 ```192.168.100.201``` 的主機
輸入 ```amogus.wsdomain.com.tw``` 可導向至 ```192.168.100.204``` 的主機
### 反解建立
假設要在 ```192.168.39.0/24``` 的網段上建立 ```wsc2024.fr``` 的反解
```named.conf.default-zones``` 設定檔內容 (第一個區域是正解使用)
![](https://hackmd.io/_uploads/rylStq5t3.png)
```db.39.168.192``` 設定檔內容
![](https://hackmd.io/_uploads/HySH95cYn.png)
nslookup 伺服器位置後會出現其對應的網域
![](https://hackmd.io/_uploads/ryER5c5Y2.png)
### DNS 授權
設定主網域 ```diego.com``` 將子網域 ```branch.diego.com``` 授權
上層伺服器設定：
![image](https://hackmd.io/_uploads/ByAfijtC6.png)
![image](https://hackmd.io/_uploads/HkgCuoFRT.png)
下層伺服器設定：
![image](https://hackmd.io/_uploads/H1wTDiYC6.png)
註 1：第一個的 NS 規則不能隨便設定，盡量是域名，確保全部記錄都能被解析
註 2：在指定 NS 紀錄時，若沒有自行輸入句點 (```.```)，就會自動補齊名稱
例：```dns.branch``` 在 ```diego.com``` 的 DNS 檔案就會變成 ```dns.branch.diego.com.```
### 請求轉送
編輯檔案：```vim /etc/bind/named.conf.options```
![image](https://hackmd.io/_uploads/HkcLPiJZC.png)
### 建立大量有順序紀錄
```bash==
// 建立 test1.domain.com ~ test100.domain.com 的 A 紀錄，並指向 192.168.1.1
$GENERATE    1-100    test$.domain.com    IN    A    192.168.1.1
```
![image](https://hackmd.io/_uploads/S1BI4LRAT.png)
### 編輯版本號碼 (有版本詢問時，回傳特定文字)
編輯檔案：```vim /etc/bind/named.conf.options```
更改 version 下的內容為回傳的內容
![image](https://hackmd.io/_uploads/SkogZzAca.png)
查詢版本指令：```nslookup -debug -class=chaos -query=txt version.bind [DNS-IP]```
![image](https://hackmd.io/_uploads/r1V_GzA5a.png)
### MX 紀錄建立
![image](https://hackmd.io/_uploads/S1aoQbyd0.png)
需要 Mail Server 的 FQDN 的 A Record 來當作 MX Record 的參考
![image](https://hackmd.io/_uploads/Byt8VbJdR.png)
![image](https://hackmd.io/_uploads/H1V5BZJ_A.png)

## Web File Server
```sudo==
// SRV1：192.168.100.201 (www.wsdomain.com.tw) SRV2：192.168.100.202
// 在 SRV1 的 /var/www/wsdomain 之下建立 /file 資料夾，提供 File Server 服務，且此服務的資料夾路徑為 SRV2 的共享資料夾 (/share/file)
mkdir /var/www/wsdomain/file
mount -t cifs -o username=root,password=Skills39,domain=wsdomain.com //192.168.100.202/file/ /var/www/wsdomain/file
// domain 參數不一定需要保留，但如果 Server 是在有建立 AD 的環境下需要保留
```
用瀏覽器輸入```www.wsdomain.com.tw/file/```即可訪問目前目錄下的文件
![](https://hackmd.io/_uploads/BygaTTh93.png)
### Return Code 13 (Read-Only)
若遇到錯誤並且返回代碼 13 的錯誤時可以參考以下步驟
安裝套件：```apt install cifs-utils```
建立並編輯一個檔案 (此處路徑用```cifs.auth```)：```vim cifs.auth```
檔案格式：
```bash==
user=[username]
password=[password]
domain=[domain]
// domain 參數不一定需要保留，但如果 Server 是在有建立 AD 的環境下需要保留
```
存檔後，即可掛載：
```bash==
mount -t cifs -o credentials=cifs.auth //192.168.100.202/file /var/www/wsdomain/file
```
## 查看目前目錄下檔案及目錄之權限
```sudo==
ls -al
```
![](https://hackmd.io/_uploads/H1q66phq2.png)
## 批量加入使用者 (for loop)
```sudo==
//加入九個使用者，名稱為 user001~user009
for ((i=1;i<=9;i++))
> do
> useradd user00$i
> done
```
## 使用者和群組常用設定指令
```sudo==
useradd [username] //建立使用者
useradd -g [groupname] [username] //建立有初始群組的使用者
useradd -G [groupname] [username] //建立一般群組的使用者
useradd -m [username] //建立有家目錄的使用者 (/home)
useradd -p `openssl passwd -1 [password]` -s /bin/bash [username] //建立帶密碼且路徑為/bin/bash的使用者
userdel [username] //刪除使用者
groupadd [groupname] //創立使用者群組
usermod -a -G [groupname] [username] or gpasswd -a [username] [groupname] //將使用者加入群組
usermod -g [groupname] [username] //更改使用者的主要用戶組
usermod -s /bin/bash [username] //更改使用者預設路徑為/bin/bash
gpasswd -d [username] [groupname] //將使用者移出群組
mkhomedir_helper [username] //幫已存在的使用者創立家目錄 (/home)
rm -r /home/[username] //刪除使用者的家目錄 (/home)
```
* 其實在預設狀態下不論使用 useradd 或 adduser 建立的使用者根目錄都會是家目錄，以上關於家目錄的設定指令是以防萬一使用
## 密碼常用指令
強制使用者首次登入時更改密碼：```chage -d 0 [username]```
限制更改密碼的最短/最大長度：
(1) 編輯密碼驗證策略：```vim /etc/pam.d/common-password```
(2-1) 設定密碼最短長度為 8 個字元：在
```password [success=1 default=ignore] pam.unix.so obscure yescrypt``` 後面加入 ```minlen=8```
![](https://hackmd.io/_uploads/Hk4Cpph5h.png)
(註：minlen=最短長度 maxlen=最大長度)
(2-3) 取消密碼複雜性限制：在 ```password requsite pam_deny.so``` 中間加入 ```dictcheck=0```
![image](https://hackmd.io/_uploads/HycQD2pp6.png)

## DHCP Server
安裝套件：```apt install isc-dhcp-server```
編輯設定檔：```vim /etc/dhcp/dhcpd.conf```
```sudo==
option domain-name "thedomain.com"; // 網域名稱

default-lease-time 600; // 預設租賃時間
max-lease-time 3600; // 最大租賃時間
authoritative;

// 網段設定 (可以只輸入這段)
subnet 10.121.210.0 netmask 255.255.255.0 {
    range 10.121.210.1 10.121.210.253; // 分配IP範圍
    option domain-name-servers 8.8.8.8; // DNS 設定
    option routers 10.121.210.254; // 目標路由器IP
}
```
如果需要為特定電腦保留 IP 位置：
```sudo==
host [主機名稱] {
    hardware ethernet [MAC 位置];
    fixed-address [保留的IP位置];
}
```
編輯發位址的網卡：```vim /etc/default/isc-dhcp-server```
```sudo==
INTERFACEv4="eth0" //欲發位址的網卡名稱，若有多張網卡則以空格分隔
```
設定完重啟服務：```service isc-dhcp-server restart```
### 檢查 DHCP Server 已發出去的 IP 位址
用 tail 指令實時檢查 log ，並且濾出關於 DHCP 的紀錄
```sudo==
tail -f /var/log/syslog | grep dhcpd //僅可用於 Debian 11
tail -f journalctl | grep dhcpd | vim - //可用於 Debian 12
```
### 設定跨網段 DHCP Server
可對現有網路介面設定子介面達成跨網段 DHCP Server
編輯網路介面設定檔：```vim /etc/network/interfaces```
設定網路子介面：
![image](https://hackmd.io/_uploads/rJh1HC_qa.png)
```sudo==
auto [主介面]:0
iface [主介面]:0 inet static
address [子介面IP位置，依照 DHCP 網段設定]
// 子介面不可設定 Gateway，會無法啟動介面
// 在編輯 DHCP 發位址的網卡時，一定要設定子介面
```
![image](https://hackmd.io/_uploads/r1riL0Oqa.png)
### DHCP Relay
DHCP Relay Agent 可接收 Client 端所發出的 DHCP Request/Discover 封包，並轉發至指定的 DHCP Server
安裝套件：```apt install isc-dhcp-relay```
編輯檔案：```vim /etc/etc/default/isc-dhcp-relay```
![image](https://hackmd.io/_uploads/Sy6hMA_qa.png)
```sudo==
SERVERS="[你的 DHCP Server IP]"
INTERFACES="[接收 Client 請求及能與 DHCP Server 連線的網路介面]"
```
## 在 root 使用 rm，cp 及 mv 指令前先確認是否要執行
編輯 root 的 bashrc 檔案：```vim ~/.bashrc```
![](https://hackmd.io/_uploads/S1Lu7OZt2.png)
將下面三行註解解除掉後存檔：
![](https://hackmd.io/_uploads/SJnFXOWKn.png)
最後重新載入 bashrc：
```bash==
. ~/.bashrc
```
![](https://hackmd.io/_uploads/ByRsejrka.png)
## sudo 設定
安裝設定 sudo 的套件：```apt install sudo```
修改設定檔預設編輯器從 nano 到 vim：```EDITOR=vim visudo```
編輯設定檔：```visudo```
### 設定某些使用者或群組不需密碼即可使用 sudo
若是使用者，在使用者區域增加：
```bash==
[username]    ALL=(ALL) NOPASSWD:ALL
```
若是群組，在群組區域增加：
```bash==
%[groupname]    ALL=(ALL) NOPASSWD:ALL
```
![](https://hackmd.io/_uploads/r1dBMh5Yn.png)
指令說明：
![](https://hackmd.io/_uploads/S1UXdwi03.png)
### 限制 sudo 使用者可使用的指令
先將欲設定的使用者加入 sudo 群組：```usermod -aG sudo [username]```
假設要限制 sudo 群組僅可使用 cat, mv 及 ls 三個指令，在文件的群組區域內增加：
```sudo==
%sudo   ALL=(ALL:ALL) /bin/cat, /bin/mv, /bin/ls
```
![](https://hackmd.io/_uploads/ByMR2PoR3.png)
(註：大多的指令路徑都是在 /bin (/usr/bin) 或 /sbin 資料夾內)
最終結果：
當在 sudo 群組內的使用者使用 sudo 執行其他指令會顯示不允許執行
![](https://hackmd.io/_uploads/HygOaAwsC2.png)
## log 查看 (以 vim 開啟)
Debian 12：
```bash==
journalctl | vim -
```
## ifconfig
ifconfig 指令已於 Debian 12 上移除，不過安裝 net-tools 套件後即可使用
```bash==
apt install net-tools
```
## 硬碟設定
在 VMware 掛載了多顆 SCSI 硬碟到 Debian 會在目錄 ```/dev``` 下顯示，編號從 ```sda``` 開始排序，若尾碼帶有數字代表此硬碟的分區代號，像是 ```sda1、sda2、sda5``` 等分區都是從 ```sda``` 硬碟分割出來的
![image](https://hackmd.io/_uploads/rkrSr_nCa.png)
![image](https://hackmd.io/_uploads/rk9mHd2C6.png)
也可以使用指令 ```fdisk -l``` 查看硬碟資訊
![image](https://hackmd.io/_uploads/ry6fu_2A6.png)
### 掛載
使用指令掛載硬碟：
```sudo==
mkdir /data1 // 先建立一個資料夾，為掛載的目標資料夾
mount /dev/[disk_code] /data1
```
![image](https://hackmd.io/_uploads/H1SAdu3Ap.png)
若遇到 wrong fs type 問題可能是硬碟還未初始化，可透過指令格式化硬碟：
```sudo==
mkfs -t ext4 /dev/[disk_code]
// 在使用 mkfs 指令時需要指定硬碟格式，通常為 ext4
// 而使用 mount 時若硬碟格式是 ext4 則無需特別指定
```
![image](https://hackmd.io/_uploads/SJoFYOh06.png)
## sed (Stream Editor)
sed 適合用於更改大量檔案且要修改的資料皆相同的時候
```sudo==
// 將檔案的第 12 行的 /var/www/html 更改為 /home/user
sed -i '12s#/var/www/html#/home/user#' [file_name]
```
```
-i：於文件中執行操作
12：更改文件的第 12 行
s：進行替換操作
#：分隔符號
a：加入文字操作
```
可以寫成一個 for loop script：
![image](https://hackmd.io/_uploads/BJS-zUCCa.png)
根據語法變化，如果要放 Tab 在 Debian 視情況使用 ```\t``` 或 ```\\\t```
## echo html
適合用於 for 迴圈製造網頁
```sudo==
echo "<h1>HTML Content</h1>" > [file].html
```
![image](https://hackmd.io/_uploads/ryI2vU0Ra.png)
![image](https://hackmd.io/_uploads/H1savIC06.png)
## chrony (NTP Client)
安裝套件：
```sudo==
apt install chrony
```
編輯設定檔：
```sudo==
vim /etc/chrony/chrony.conf
```
將預設的 pool 註解，新增一行 pool 加入自己的 NTP Server
![image](https://hackmd.io/_uploads/rJs8Lelk0.png)

重新啟動服務：
```sudo==
service chrony restart
```
使用指令 ```chronyc sources``` 可查看當前 NTP 狀態：
![image](https://hackmd.io/_uploads/r1c0IggkC.png)
## FTP Server (vsftpd)
安裝套件：
```sudo==
apt install vsftpd
```
### 使用 IPv4
如果要允許 IPv4，必須先將 IPv6 停用，只能**二擇一**
![image](https://hackmd.io/_uploads/SJD1qlXyR.png)
### 允許 Root 登入
將 ```pam_service_name``` 從 ```vsftpd``` 改成 ```ftp```
![image](https://hackmd.io/_uploads/rkAyUgmyR.png)
這樣 vsftpd 就會到檔案 ```/etc/ftpusers``` 去找允許登入的使用者
![image](https://hackmd.io/_uploads/BJ5I8emyA.png)
預設的 ```vsftpd``` 是到 ```/etc/shells``` 去找與以下 shell 相符的使用者
![image](https://hackmd.io/_uploads/ByrZwgmkA.png)
### 參數解釋
```
# 允許匿名使用者登入
anonymous_enable=YES
# 匿名使用者目錄
anon_root=(none)
# 允許本機使用者登入
local_enable=YES
# 允許上傳檔案 (全局設定)
write_enable=YES
```
### SSL
![image](https://hackmd.io/_uploads/BkdnLMQ10.png)
```
# 導入憑證檔案
rsa_cert_file=/etc/ca/ooo.crt
# 導入憑證鑰匙
rsa_private_key_file=/etc/ca/ooo.key
# 啟用 SSL 功能
ssl_enable=YES
```
## 靜態路由 (ip route)
注意：**用直接輸入指令的方式無法在重開機或重啟服務後保留**
```bash==
ip route add [destination-network_segment] dev [network-interface]
ip route add [destination-network_segment] via [nexthop-router-ip]
```
dev：設定這網段的要走哪個介面卡為路由
via：設定這網段的下一跳躍路徑為哪台路由器
```bash==
// 設靜態路由，讓 192.168.10.0/24 和 10.0.0.0/28 的網段可以互通
// SRV1：192.168.10.1 (eth0)、10.0.0.2 (eth1)
// SRV2：10.0.0.1 (eth0)
SRV1 上的設定：
ip route 10.0.0.0/28 dev eth1 (若 default 路由就是 eth1 也可以略過不設定)
SRV2 上的設定：
ip route 192.168.10.0/24 via 10.0.0.2
```
### 重啟後保留靜態路由設定
將 ip route 寫到網路介面的設定檔：```/etc/network/interfaces```
![image](https://hackmd.io/_uploads/BJ6tCNTw0.png)
並將寫法改成 
```bash==
pre-up ip addr flush eth0
// 在介面啟動之前先清除介面資料
up ip route replace [destination-network_segment] via [nexthop-router-ip] dev [network-interface]
// replace 為避免二次新增路由導致錯誤
```
重啟電腦或 ```service networking restart``` 的時候就會自動加到路由表內
## PlayBook (Ansible)
執行指令：`ansible-playbook -v [your_yaml]`
`-v`：表示列出執行詳細資訊
可用 `ansible-doc [function]` 官方內建 Document 查看功能的變數用途
### Bash commends on PlayBook
#### Method 1 (command)
![image](https://hackmd.io/_uploads/SJbfn1ZDR.png)
可直接用 command 鍵值輸入 bash 指令
#### Method 2
![image](https://hackmd.io/_uploads/BJKRpDDQC.png)
`gather_facts`：蒐集主機相關資料，並存入資料庫中，若日後有需要可使用，簡單的腳本可關閉此功能
`become`：提升執行權限，若啟用則會以 sudo 權限執行指令，若以 root 使用者執行則可以無需此指令

簡單的複製檔案腳本，若有需要以 Echo 顯示訊息，則需要搭配 register 跟 debug 來使用
有 Echo：
![image](https://hackmd.io/_uploads/rykqAvvQ0.png)
無 Echo：
![image](https://hackmd.io/_uploads/ryJ4yOvm0.png)
### file (檔案、資料夾處理)
![image](https://hackmd.io/_uploads/SJc6hzaD0.png)
```state``` 可選變數說明：
```
absent = 刪除檔案或資料夾
directory = 建立資料夾
touch = 建立檔案
hard = 建立檔案硬連結 (需有 src、dest)
link = 建立檔案軟連結 (需有 src、dest)
```
### lineinfile (編輯檔案內文字)
新增內容：
![image](https://hackmd.io/_uploads/rkeXPWpP0.png)
![image](https://hackmd.io/_uploads/r1NIw-awR.png)
```|```：當有多行文字需要輸入到文件時可以使用
刪除內容：
![image](https://hackmd.io/_uploads/BJWZakTDC.png)
匹配 /etc/bind/db.wsc2024 的內容，內容為 "IN  A 192.168.1.1"，若偵測到就會將該行刪除
刪除文件需要將 ```state``` 設為 ```absent``` (預設為 ```present```) 並搭配 ```regexp``` (正規表示匹配) (或 ```regex ```) 使用，`^` 表示行的開頭，`$` 表示行的結尾
若只用 `^` 代表只取開頭，只用 `$` 代表只取結尾
**注意：只要匹配到就會整行刪除！**

示例：
![image](https://hackmd.io/_uploads/ryWRvG6vA.png)
原檔案：
![image](https://hackmd.io/_uploads/Hk-NR-awR.png)
執行後：
![image](https://hackmd.io/_uploads/SyXbdMpvR.png)

換個匹配對象：
![image](https://hackmd.io/_uploads/rkN_OzawC.png)
執行後
![image](https://hackmd.io/_uploads/S1v8_Mpv0.png)

只用 `$` 取結尾：
![image](https://hackmd.io/_uploads/ryPfYfpPR.png)
![image](https://hackmd.io/_uploads/rkQWKfpDR.png)
### blockinfile
與 lineinfile 相似
![image](https://hackmd.io/_uploads/HydBKC3vA.png)
```marker```：會在更動行數的頭尾各新增一行作為標示，預設內容為 ```# BEGIN ANSIBLE MANAGED BLOCK``` 跟 ```# END ANSIBLE MANAGED BLOCK```
```block```：表示要在檔案內新增甚麼內容
![image](https://hackmd.io/_uploads/HJpIC0nv0.png)
預設的 ```marker``` 就算為空還是會有預設的空格，可以透過 lineinfile 匹配刪除空格
### replace (全局替換)
![image](https://hackmd.io/_uploads/BkdFrzpwR.png)
將全部匹配到 Listen 的內容全部替換為 I dont want to listen
```replace```：後面接要替換上去的內容
原檔案：
![image](https://hackmd.io/_uploads/Hk-NR-awR.png)
執行後：
![image](https://hackmd.io/_uploads/BkwKIGawR.png)

換個寫法：
![image](https://hackmd.io/_uploads/rJ-fvf6vC.png)
執行後：
![image](https://hackmd.io/_uploads/HkBPPf6vC.png)

### copy (複製檔案)
![image](https://hackmd.io/_uploads/Bk5HifpvC.png)
```src```：檔案的來源
```dest```：複製後的檔案的目的地

### apt (安裝 apt 套件)
#### 單套件
![image](https://hackmd.io/_uploads/B1enwqfv0.png)
```name```：愈安裝的套件名稱
#### 多套件
![image](https://hackmd.io/_uploads/HyPca9MDC.png)
```pkg```：選擇套件

### stat (檢查檔案或路徑是否存在)
![image](https://hackmd.io/_uploads/rkGM0NhvC.png)
```path```：要檢查的檔案或路徑
```exist```：用來存放結果的暫存器

判斷結果是否執行動作：
![image](https://hackmd.io/_uploads/BJJiJH2DC.png)
若 /etc/bind/db.wsc2024 的檔案不存在，則執行上面的動作
```when```：根據暫存器回傳結果決定是否要執行
```
stat 變數：
exist.stat.exists = 當 exist 暫存器內路徑的檔案存在時執行
not exist.stat.exists = 當 exist 暫存器內路徑的檔案不存在時執行

exist.stat.isdir = 當 exist 暫存器內路徑為資料夾時執行
not exist.stat.isdir = 當 exist 暫存器內路徑為檔案或不存在時執行
```
### read_csv (讀取 CSV 檔案)
![image](https://hackmd.io/_uploads/SyyYoTmuC.png)
`fieldnames`：設定 CSV 的 column (列名稱) 
### user (使用者建立及管理)
![image](https://hackmd.io/_uploads/HkNA6pmOA.png)
`name`：使用者名稱
`password`：使用者密碼，需透過雜湊函數加密
`group`：使用者群組，**若本機沒有則需要事先建立**
`uid`：使用者 UID，需確保變數型態為整數
`shell`：使用者 Shell 路徑，通常為 `/bin/bash`
`create_home`：是否建立使用者家目錄 (home)
#### loop
`loop`：以物件或變數或字串做迴圈，以變數 `item` 作為 loop 當前所跑到的值
### read_csv + user (以 CSV 檔案匯入 Users)
![image](https://hackmd.io/_uploads/BkP1mCQ_R.png)
### debug + msg (print out) (輸出文字)
![image](https://hackmd.io/_uploads/SkEpPH2vC.png)
用 shell 指令 echo hostname 並輸出
```stdout```：標準輸出，一般暫存器無特殊後綴都會需要
![image](https://hackmd.io/_uploads/ByqmkU2PA.png)
若無加 ```stdout```：
![image](https://hackmd.io/_uploads/SJnskI3vC.png)

特殊：```stat``` 的暫存器可依據需要做判斷的資料型態調整後綴
![image](https://hackmd.io/_uploads/rkuq6r3DR.png)
![image](https://hackmd.io/_uploads/S16YArnw0.png)
### vars_prompt (輸入值)
Official Document Example:
![image](https://hackmd.io/_uploads/SyEaA7NOR.png)

## Easy-RSA (CA Tool)
Easy-RSA 是 OpenVPN 的自簽根憑證及簽證工具
安裝指令：```apt install openvpn easy-rsa```
Easy-RSA 的預設路徑在```/usr/share/easy-rsa```，可移動到 ```/etc/openvpn/easy-rsa```
### 自簽 Root CA
將當前工作路徑切換到 Easy-RSA 的路徑，便於作業
```cd /etc/openvpn/easy-rsa```
先初始化 Easy-RSA 給 Root CA 使用的 PKI
```./easyrsa init-pki```
編輯 Root CA 的 Profile，屆時會套用到生成的 Root CA 上
```vim pki/vars```
參數說明：
```
set_var EASYRSA_DN：可選 org 或 cn_only，若選 cn_only 只會有 Common Name 的資料
set_var EASYRSA_REQ_COUNTRY：Country Name (國家)
set_var EASYRSA_REQ_PROVINCE：Province Name(省/州)
set_var EASYRSA_REQ_CITY：City (城市)
set_var EASYRSA_REQ_ORG：Organization (公司/組織)
set_var EASYRSA_REQ_EMAIL：Email (電子郵件)
set_var EASYRSA_REQ_OU：Organization Unit (組織單位/部門)
set_var EASYRSA_KEY_SIZE：金鑰位元數
set_var EASYRSA_REQ_DN：Common Name (一般 CA 為你要保護的網域名稱，Root CA 就當作為此憑證的名字)
set_var EASYRSA_DIGEST：使用的加密模型
```
建立 Root CA ：
`./easyrsa build-ca nopass` (`nopass`：不設定密碼)
### 簽署旗下的 Request
先導入請求到 Easy-RSA 內暫存：`./easyrsa import-req [request-file-path] [register-name]`
簽證暫存的檔案：`./easyrsa sign_req [ca-type] [register-name]`
`ca-type`：若作為服務或伺服器使用，值通常為 `server` 或 `ca`
**若使用 ca 模式就不會將 SAN 值寫入憑證**
## OpenConnect SSL VPN Server (ocserv)
反正就是比 OpenVPN 好用的 VPN Server (吧)，Client 通常會使用 AnyConnect 連結
安裝指令：```apt install ocserv```
編輯設定檔：```vim /etc/ocserv/ocserv.conf```
參數說明：
```
listen-port：TCP 監聽的介面的 IP 位址 (預設為全介面都監聽)
udp-listen-host：UDP 監聽的介面的 IP 位址 (預設為全介面都監聽)
tcp-port：TCP 接入 VPN 的監聽 Port
udp-port：UDP 接入 VPN 的監聽 Port
socket-file：用於進程的作業檔案的路徑 (若 VPN 出問題可將值換為 /run/ocserv.socket)
run-as-user：執行 ocserv 進程的使用者 (無須更改)
run-as-group：執行 ocserv 進程的群組 (無須更改)
server-cert：用於 VPN 憑證的路徑 (用與 Web Server 一樣的請求產生方式)
server-key：用於 VPN 憑證的私鑰的路徑
dh-params：密鑰交換協議檔案路徑 (需透過指令生成)
ca-cert：簽署 VPN 憑證的 CA 根憑證
```
## Debian 加入 Windows Server AD 網域
安裝 realm 及加入網域的必要套件：`apt install realmd ascli sssd sssd-tools samba-common-bin`
可先搜尋網域是否有被偵測到：`realm discover [domain-name]`
![image](https://hackmd.io/_uploads/H1kCKFtwC.png)
加入網域：`realm join -v [domain-name]`
![image](https://hackmd.io/_uploads/rkJMqYFPR.png)
`-v, --verbose` 表示會將指令的進度跟詳細作業列印出來
### 不使用完整網域使用者名稱並允許使用者登入
編輯 `/etc/sssd/sssd.conf`，將 `fallback_homedir` 值設為 `/home/%u`、`use_fully_qualified_names` 值設為 `False`、`access_provider` 值設為 `simple`
![image](https://hackmd.io/_uploads/B1N_E1X_C.png)
存檔退出後，重啟服務：`service sssd restart`
若需要幫使用者建立家目錄 (home) 可輸入指令，將會在使用者登入後建立：`pam-auth-update --enable mkhomedir`
![image](https://hackmd.io/_uploads/ByXlvJ7uC.png)
![image](https://hackmd.io/_uploads/BJmHvkQdA.png)
如果沒有建立家目錄會顯示：
![image](https://hackmd.io/_uploads/ByC1_y7dR.png)

## 解壓縮 tar.gz
```bash==
tar zxf [path_of_source.tar.gz] [export_destination_folder_path]
```
## VLAN 子介面
安裝 VLAN 套件：`apt install vlan`
啟用 VLAN 功能：`modprobe 8021q`
編輯網卡介面設定檔：`vim /etc/network/interfaces`
![image](https://hackmd.io/_uploads/B1QgxDfd0.png)
**VLAN 介面名稱可以直接在設定檔編輯，無需在 rule 裡設定**
`vlan-raw-device`：表示這個 VLAN Interface 是從哪張網卡分出來的
存檔後退出執行：`service networking restart`
![image](https://hackmd.io/_uploads/SykueDMd0.png)
### 跨 VLAN 使用 DHCP Server + DHCP Relay
```
VLAN 10：172.16.10.0/24
VLAN 20：172.16.20.0/24
設定 VLAN 20 的 DHCP Server (172.16.20.20) 要能提供 Dynamic IP 給 VLAN 10 的 Client
中間有台 Gateway 為 Trunk 介面，同時也是 DHCP Relay Agent
```
DHCP Server 端設定：
![image](https://hackmd.io/_uploads/rJg0lOfOR.png)
給兩個網段的 DHCP，一個自己 VLAN 網段，一個要發 IP 的其他 VLAN 網段，**但自己 VLAN 網段的部分不做任何設定**

Gateway 對 DHCP Relay Agent 的設定
![image](https://hackmd.io/_uploads/H16pEOM_A.png)

Client 動態取得 IP Address 後：
![image](https://hackmd.io/_uploads/SJzHSuMdA.png)
## 設定介面啟用或關閉時的行為

| 指令      | 時機表示   |
| --------- | ---------- |
| pre-up    | 介面啟用前 |
| up        | 介面啟用時 |
| post-up   | 介面啟用後 |
| pre-down  | 介面關閉前 |
| down      | 介面關閉時 |
| post-down | 介面關閉後 |
後面可以接要同時執行的指令

![image](https://hackmd.io/_uploads/S10awuGuR.png)
## StrongSwan (IPSec & IKEv1、v2)
安裝套件：`apt install strongswan`
編輯設定檔：`vim /etc/ipsec.conf`
![image](https://hackmd.io/_uploads/B11oChMuA.png)
`strictcrlpolicy`：驗證時是否對遠端的 SSL 憑證嚴格地檢查是否包含 CRL (通常為 `no`)
`uniqueids`：用於控制多次連線 (通常為 `no`)

`keyexchange`：要採用的 IKE 版本，依據你在 Cisco Router 端的設定或另一端 Linux 設定
`left`：遠端裝置
`right`：本地裝置
`ike`：選擇的 IKE 加密演算法套件，分 3 個部分組成，用`-`連接，第一部分加密算法：3des，aes[encryption_bit] 等，第二部分認證算法：md5，sha1，sha256 等，第三部分 DH 算法：modp[hash_bits] 等
`esp`：選擇的 ESP 加密演算法套件，分 3 個部分組成，用`-`連接，第一部分加密算法：3des，aes[encryption_bit] 等，第二部分認證算法：md5，sha1，sha256 等，第三部分 DH 算法：modp[hash_bits] 等
[其他加密套件可參考官方 Document (IKEv2)](https://docs.strongswan.org/docs/5.9/config/IKEv2CipherSuites.html)
### 建立用於 IPSec 的 Tunnel
編輯網卡介面設定檔：`vim /etc/network/interfaces`
![image](https://hackmd.io/_uploads/rkrrYlXuR.png)

新增 Tunnel 指令，需在介面啟用前添加，所以使用 `pre-up`：
```
pre-up ip tunnel add [tunnel_name] mode gre remote [remote_ip] local [local_ip] ttl 255
```
其他兩則刪除指令可自行評估是否需要，可能會出現錯誤
![image](https://hackmd.io/_uploads/r1aN5eQOC.png)
Cisco Router 端：
![image](https://hackmd.io/_uploads/HkePilXdR.png)
![image](https://hackmd.io/_uploads/BJwc9eQd0.png)
從中間 Router (ISP) 抓包，封包類型從 ICMP 變為 ESP，表示已經過加密：
![image](https://hackmd.io/_uploads/HyOboeXuA.png)
## FRRouting (FRR)
FRR 是一款路由工具，支援 BGP / OSPF / EIGRP / RIP 等常見協定
安裝套件：`apt install frr`
編輯：`vim /etc/frr/daemons`
將需要的服務的值改為 `yes`，若有 Process Code 的需求，可使用 instances
假設開啟 OSPF 的 Process Code 1，就是 `ospfd_instances=1`
註：若 OSPF 使用 Process Code 則無法宣告網段，僅可在介面裡宣告
![image](https://hackmd.io/_uploads/HJubEdmOR.png)
存檔退出後重啟服務：`service frr restart`
使用指令進入 FRR：`vtysh`，操作指令與 Cisco IOS 相似
![image](https://hackmd.io/_uploads/HJuMYqmdR.png)