---
title: 'Debian'
summary: 'Hardening write up'
image: '/debian.jpg'
alt: 'Shellkai Huang'
created: 2022-12-16
updated: 2024-09-22
tags:
 - Linux
 - OS
---
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
### 編輯版本號碼 (有版本詢問時，回傳特定文字)
編輯檔案：```vim /etc/bind/named.conf.options```
更改 version 下的內容為回傳的內容
![image](https://hackmd.io/_uploads/SkogZzAca.png)
查詢版本指令：```nslookup -debug -class=chaos -query=txt version.bind [DNS-IP]```
![image](https://hackmd.io/_uploads/r1V_GzA5a.png)
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
## VLAN 子介面
安裝 VLAN 套件：`apt install vlan`
啟用 VLAN 功能：`modprobe 8021q`
編輯網卡介面設定檔：`vim /etc/network/interfaces`
![image](https://hackmd.io/_uploads/B1QgxDfd0.png)
**VLAN 介面名稱可以直接在設定檔編輯，無需在 rule 裡設定**
`vlan-raw-device`：表示這個 VLAN Interface 是從哪張網卡分出來的
存檔後退出執行：`service networking restart`
![image](https://hackmd.io/_uploads/SykueDMd0.png)
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