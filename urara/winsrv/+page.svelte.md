---
title: 'Windows Server'
image: '/winsrv.jpg'
alt: 'Shellkai Huang'
created: 2024-09-16
updated: 2024-09-16
tags:
 - Windows
 - OS
---
## GPO 相關設定
### 初次登錄動畫關閉
打開 GPO，找到「**Administrative Templates\System\Logon**」中的「**Show first sign-in animation**」，設定為 **Disable**，再執行 ```gpupdate /force```來立即套用更新
### 禁止存取控制台設定
GPO -> User Configuration -> Policies -> Administrative Templetes -> Control Panel -> 設定 Prohibit access to Control Panel and PC settings 為 **Enabled**
![image](https://hackmd.io/_uploads/HJi2R6hqh.png)
### 限制或禁止使用者使用特定應用程式
GPO -> User Configuration -> Administrative Templetes -> System -> 設定 Don't run specified Windows applications
![](https://hackmd.io/_uploads/Sy5jSED03.png)
設定為 **Enabled**，並點選 List of disallowed applications，在 Value 欄位設定要禁用的應用程式
![](https://hackmd.io/_uploads/HkgS8Vw02.png)
### 設定在 Logon UI 看不到上個登入的使用者
GPO -> Computer Configuration -> Policies -> Administrative Templetes -> System -> Logon -> 設定 Block user from showing account details on sign-in 為 **Enabled**
![](https://hackmd.io/_uploads/rkMTCT2q2.png)
### 登入時自動掛載共享資料夾
Step 1. 製作 Bash Script
```bash==
// 掛載 \\windc.nsc49.skills.tw\web 網路位置到電腦，且磁碟代號為 W:
net use W: /delete
net use W: \\windc.nsc49.skills.tw\web
```
Step 2. 用 GPO 設定讓此指令在登入時自動執行
新增 GPO -> User Configuration -> Policies -> Windows Settings -> Script (Logon/Logoff) -> Logon -> Add -> Browse -> 將 Script 丟至彈出的資料夾 -> 選擇後點選 OK
![](https://hackmd.io/_uploads/rkd1JRhq2.png)
![image](https://hackmd.io/_uploads/ryScekxjp.png)
註：最好放在下面「Show Files...」的資料夾內，否則有機率腳本會無法生效
### 若共享資料夾有跨網域
只需讓 Script 使用網域管理員身分登入即可：
```bash==
// 掛載 \\windc.nsc49.skills.tw\web 網路位置到電腦，且磁碟代號為 W:，使用 AD/Administrator 身分來登入
net use W: /delete
net use W: \\windc.nsc49.skills.tw\web /user:AD\Administrator Skills39 /p:yes
```
### 讓 Windows Server 也能掛載 Debian SMBD
Local GPO -> Computer Configuration -> Administrative Templates -> Network -> Lanman Workstation -> 設定 Enable insecure guest logons 為 **Enabled**
![](https://hackmd.io/_uploads/rynWy0n92.png)
### GPO 個別使用者套用規則
若要指定特別使用者套用 Group Policy (刪除 Authentication Users)，至少要保留一台 Computer (最好是 Server 和 Client 都保留)
![image](https://hackmd.io/_uploads/SJMjm3FRT.png)
### 開機時自動跳出訊息
GPO -> Computer Configuration -> Windows Settings -> Security Settings -> Local Policy -> Security Options
![image](https://hackmd.io/_uploads/r15ckli0T.png)
![image](https://hackmd.io/_uploads/SyCi61j0T.png)
![image](https://hackmd.io/_uploads/H1zjyeiRa.png)
當電腦準備登入時會顯示：
![image](https://hackmd.io/_uploads/S1MRyejRp.png)
### 禁止使用 Windows Update
GPO -> Computer Configuration -> Administrative Templates -> Windows Components -> Windows Update -> 設定 Remove access to use all Windows Update features 為 **Enabled**
![image](https://hackmd.io/_uploads/BJ7flZjC6.png)
效果：
![image](https://hackmd.io/_uploads/SJl3gGbsR6.png)
### 登入時自動將檔案複製到桌面
```bash==
// 將 PuTTY 複製到使用者的桌面上
copy C:\putty.exe %USERPROFILE%\Desktop
// %USERPROFILE% 指的是當前登入使用者的 User 目錄
```
寫好後將檔案另存為 cmd，可參照上面的步驟套用於 GPO
### 用指令載入登錄檔
將登錄機碼匯出為 ```.reg``` 格式的檔案：右鍵 -> Export -> 選擇路徑
![image](https://hackmd.io/_uploads/H1HquOl1C.png)
```bash==
reg import [reg_file].reg
```
另存為 cmd，一樣可以套用於 GPO
## DNS
### DNS 快取紀錄關閉
按一下 Windows Key + R，輸入 regedit 後 Enter
設定「**HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\Dnscache**」中的 **Start** 值為 4，重啟後即可關閉 DNS 快取紀錄

### DNS 同步
```
DC：192.168.39.10 (Primary DNS)
SRV：192.168.39.20 (Secondary DNS)
```
先允許 Primary DNS 跟 Secondary DNS 的 Zone Transfer 功能
DC：
![image](https://hackmd.io/_uploads/r1KPerlC6.png)
SRV：
![image](https://hackmd.io/_uploads/SyOQWHgRp.png)
選擇域名按右鍵 -> Transfer new copy of zone from Master
![image](https://hackmd.io/_uploads/r1rqWSgRp.png)
即可完成同步

若要設定自動同步項可以看下方的 SOA
#### 通知 (Notify)
在 Primary DNS 上設定當記錄發生變化時通知 Secondary DNS
![image](https://hackmd.io/_uploads/SJ3xUBlAT.png)
設定 Secondary DNS 可以接收 Notify
![image](https://hackmd.io/_uploads/B10Uvrg0p.png)
#### Start of Authority Record (SOA)
![image](https://hackmd.io/_uploads/rkkD_HxAT.png)
Refresh interval：Secondary DNS 多久向 Primary DNS 伺服器同步
Retry interval：當 Secondary DNS 向 Primary DNS 同步但無法連線到 Primary DNS，多久後重試
Expires after：當 Secondary DNS 無法連線到 Primary DNS 會一直重試，如果重試超過到期時間就放棄重試
Minimum TTL：當其它 DNS 伺服器查詢這個網域的記錄時，資料儲存在對方伺服器快取中的時間 (若在到期前若對方伺服器又收到相同查詢就會直接回應快取中的資料)
### Conditional Forwarders
與 Forward 功能相似，但是可以指定網域傳送到指定伺服器
![image](https://hackmd.io/_uploads/S13rUWy_A.png)
![image](https://hackmd.io/_uploads/rJTtLWJu0.png)
DNS Domain：當收到這個網域的 DNS Request 時送到指定的 DNS Servers
IP addresses of the master servers：指定網域的 DNS Servers
```
本地 DNS：wsc2024.tw / 172.16.20.10
遠端 DNS：worldskills.org / 8.8.8.8
```
![image](https://hackmd.io/_uploads/ByeFwZkO0.png)
![image](https://hackmd.io/_uploads/B1uqDZkuA.png)
## 使用者設定 (cmd & for loop)
```bash==
//加入九個使用者，名稱為 IT01~IT09
for /l %a in (1 1 9) do net user IT0%a /add
//加入九個使用者，名稱為 HQ01~HQ09，密碼為 Skills39
for /l %a in (1 1 9) do net user HQ0%a Skills39 /add
//刪除使用者
net user [username] /del
```
## 進階使用者設定 (PowerShell & for loop)
### Set-ADUser
通常是使用者的細項資料設定才會用到
```bash==
//將 FA001~009 九個使用者的 Display Name 設定為 Flight Attendant 001~009
1..9 | % { Set-ADUser -Identity FA00$_ -DisplayName "Flight Attendant 00$_" }
// "$_" 是一個特殊的 PowerShell 自動變數，代表執行中的腳本或指令所傳遞過來的變數
```
![image](https://hackmd.io/_uploads/By0zKd-NA.png)

若忘記指令也可透過 PowerShell IDE 尋找指令
![image](https://hackmd.io/_uploads/HyFtKuZEA.png)
### dsmod
dsmod 與 Set-ADUser 的功能相同
先使用 `dsquery` 指令列出所有的完整使用者名稱 (包含所屬網域等參數)，在使用 `dsmod` 指令時需要
```bash==
dsquery user
// 列出所有使用者完整名稱
```
![image](https://hackmd.io/_uploads/ryT_7DHO0.png)

```bash==
dsmod user /?
// 可查看所有 dsmod 可修改的參數及表示方式
```
```bash==
dsmod user [full_user_name] -office "IT Manager"
// 將使用者的 Office 參數改為 IT Manager
```
![image](https://hackmd.io/_uploads/Sy5WNDrO0.png)
![image](https://hackmd.io/_uploads/BkozEwHOA.png)

## 群組設定 (cmd & for loop)
通常僅會在 Windows Server 題目中沒有要求做 Active Directory 時才會用到
```bash==
//新增群組
net localgroup [groupname] /add
//將 IT01~09 共九人加入 IT 群組
for /l %a in (1 1 9) do net localgroup IT IT0%a /add
//將使用者移出群組
net localgroup [groupname] [username] /del
//重新命名群組
wmic group where name="[oldname]" rename [newname]
//檢查群組內的使用者
net localgroup [groupname]
```
PS：若群組名稱或使用者名稱有空格，需要用雙引號("")括起來
### 一次允許多個可使用遠端桌面的使用者
```bash==
//將 IT01~09 共九人允許使用遠端桌面連線
for /l %a in (1 1 9) do net localgroup "Remote Desktop Users" IT0%a /add
```
## 允許 ICMP 協議
進入 Control Panel -> Windows Defender Firewall -> Advenced settings
![](https://hackmd.io/_uploads/r1s-A6n5n.png)
選 Inbound rules -> New Rule
![](https://hackmd.io/_uploads/HJnfR63qh.png)
![](https://hackmd.io/_uploads/HyVQAa252.png)
![](https://hackmd.io/_uploads/S1hQ0ph92.png)
![](https://hackmd.io/_uploads/SyQE0a352.png)
選擇 ICMP：
![](https://hackmd.io/_uploads/By64063q3.png)
![](https://hackmd.io/_uploads/B1SBAah9n.png)
![](https://hackmd.io/_uploads/BkvUATnch.png)
![](https://hackmd.io/_uploads/S1zwC6nqn.png)
即完成 ICMP 設定
![](https://hackmd.io/_uploads/SkSuCT3c2.png)
## 讓網域內電腦自動信任 CA 憑證
### 允許自動信任設定
打開 Group Policy Management -> Create a GPO in this domain, and Link it here
![](https://hackmd.io/_uploads/HkxKAa2cn.png)
選擇 Computer Configuration -> Policies -> Windows Settings -> Security Settings -> Public Keys -> Certificate Services Client - Auto-Enrollmemt
設定 Configuration Model 為 **Enabled**
![](https://hackmd.io/_uploads/SJcKApn93.png)
### 設定自動信任的電腦
選擇 Automatic Certification Settings
右鍵 -> New -> Automatic Certificate Request
![](https://hackmd.io/_uploads/BylcRah93.png)
選擇 Computer
![](https://hackmd.io/_uploads/BJ550p35h.png)
![](https://hackmd.io/_uploads/H1LoC625n.png)
![](https://hackmd.io/_uploads/r1b2R6hq3.png)
輸入 ```gpupdate /force``` 後，即完成設定
![](https://hackmd.io/_uploads/Hkh16KO2h.png)
## 共享資料夾管理 (File Server Resource Manager)
安裝 File Server Resource Manager
![image](https://hackmd.io/_uploads/HJn7SZjnp.png)
### 限制共享資料夾空間
選擇 Quota Management -> Quotas
![image](https://hackmd.io/_uploads/BkJdH-snp.png)
右鍵 Create Quota
![image](https://hackmd.io/_uploads/ByeZkR2c2.png)
選好要套用的共享資料夾，如果在系統給的選項內沒有題目的條件就用 Custom Properties
![image](https://hackmd.io/_uploads/HkiIUbihp.png)
### 限制共享資料夾存放檔案類型
**Step 1. 建立檔案類型群組**
選擇 File Screening Management -> File Groups
![image](https://hackmd.io/_uploads/B1sspZo3a.png)
右鍵 Create File Group
![image](https://hackmd.io/_uploads/HJUj0Wsn6.png)
將此群組包含的檔案類型都加到 Files to include 內 (註：＊.exe 代表封鎖全部附檔名為 exe 的檔案)
![image](https://hackmd.io/_uploads/H1KZRZohT.png)

**Step 2. 建立禁止檔案類型範本**
選擇 File Screening Management -> File Screen Templates
![image](https://hackmd.io/_uploads/S1K2hWona.png)
右鍵 Create File Screen Template
![image](https://hackmd.io/_uploads/B1Eiyfona.png)
**若顯示錯誤，將虛擬機重開就可解決**
![image](https://hackmd.io/_uploads/ByN_pbs3T.png)

**Step 3. 套用範本到共享資料夾**
選擇 File Screening Management -> File Screens
![image](https://hackmd.io/_uploads/rk0p_-j2a.png)
右鍵 Create File Screen
![image](https://hackmd.io/_uploads/SklXxzj36.png)
選好要套用的共享資料夾，並將選項選到剛剛設定的範本
![image](https://hackmd.io/_uploads/SJGceMoha.png)
## 快速啟動網路介面控制
按一下 Windows Key + R，輸入 ncpa.cpl 後 Enter
![](https://hackmd.io/_uploads/HkXDvaLL2.png)
可直接打開控制台網路介面
![](https://hackmd.io/_uploads/Hkd38pU8n.png)
## 更改 Remote Desktop 的 TCP Port (登錄檔修改)
按一下 Windows Key + R，輸入 regedit 後 Enter
在「**HKEY_LOCAL_MACHINE\System\CurrentControlSet\Control\Terminal Server\WinStations\RDP-Tcp**」下，找到「**PortNumber**」選項並編輯其機碼值為欲設定的 Port 後重啟即可
![](https://hackmd.io/_uploads/HJckBqzF3.png)
## DHCP Server 位址保留
打開 DHCP -> 選擇要設定的 Scope -> Reservations -> New Reservation
![](https://hackmd.io/_uploads/S1EOa9qtn.png)
Reservation name (此保留設定的名稱)
IP address (欲保留的 IP 位址)
MAC address (保留的 IP 要給誰)
Description (描述此保留設定，可略過)
![](https://hackmd.io/_uploads/H1BNR9qtn.png)
設定好後，到被保留 IP 的電腦上執行 ```ipconfig /renew``` (電腦網卡須設定為 DHCP)
![](https://hackmd.io/_uploads/B1yiJi9Y3.png)
## VPN 設定
新增 VPN 規則，選擇 DirectAccess and VPN (RAS)
![](https://hackmd.io/_uploads/BkaBU3Ps3.png)
重啟後點選 Remote Access Management Console 後再選 RRAS Management console
![](https://hackmd.io/_uploads/Sk6283Doh.png)
選擇伺服器，右鍵選擇 Configure and Enable Routing and Remote Access
![](https://hackmd.io/_uploads/r1CKRvn32.png)
選擇 Custom configuration
![](https://hackmd.io/_uploads/Hk4b1u32n.png)
選擇 VPN Access 即可
![](https://hackmd.io/_uploads/HJKFkO333.png)
若無設定 DHCP：
設定 VPN 的 Static address pool，並輸入範圍可使用 VPN 的 IP 範圍
![](https://hackmd.io/_uploads/rymwDnwih.png)
(若有設定 DHCP 可直接略過到下一步驟)
回到 Server Manager，選 Tools -> Active Directory Users and Computers
![](https://hackmd.io/_uploads/SkhOg5_32.png)
選取想要遠端存取的使用者，並右鍵選擇「Add to a group...」
![](https://hackmd.io/_uploads/HJJcG9dnh.png)
輸入 Remote 後選擇 Check Names
![](https://hackmd.io/_uploads/HJEpX5uhn.png)
選擇 Remote Desktop Users 後，按 OK
![](https://hackmd.io/_uploads/Hki8Ncu2h.png)
選擇 Network Policy Server
![](https://hackmd.io/_uploads/BJDHD_323.png)
點開 Policies -> Network Policies -> New
![](https://hackmd.io/_uploads/rJ3fu_nh2.png)
![](https://hackmd.io/_uploads/rJlxvs2nh.png)
設定後在 Client 端上可輸入在群組內使用者的帳號和密碼登入 VPN
若遇到登入失敗的問題或一直卡在連線中：
一樣到 Network Policy Server
![](https://hackmd.io/_uploads/H1oKHvx1a.png)
選擇剛剛建立的規則，按右鍵 -> Properties
![](https://hackmd.io/_uploads/HJodMwxJa.png)
Constraints -> Authentication Methods -> Add... -> 選 Microsoft: Secured password (EAP-MSCHAP v2) -> OK
![](https://hackmd.io/_uploads/SJxzrwx16.png)
![](https://hackmd.io/_uploads/SJ-HIvlyT.png)
### SSTP 設定
#### 有 Web Server + HTTPS
如果有 Web Server，SSTP 所使用的憑證需要和 Web Server 一樣
故要簽一張萬用域名(*)的憑證 (若 Web Server 和 SSTP 的 FQDN 不一樣的話)
![image](https://hackmd.io/_uploads/r1wZT0kD0.png)
簽好後到 Server Manager -> Tools -> Routing and Remote Access
![image](https://hackmd.io/_uploads/HyV4fJew0.png)
Server -> 右鍵 -> Properties
![image](https://hackmd.io/_uploads/HyQXZyxDA.png)
![image](https://hackmd.io/_uploads/B1f0jJlwR.png)
```
先設定 CA Server 的 Certificate Templates
MMC -> Certificate Templates -> IPSec -> 右鍵 Duplicate Template
![image](https://hackmd.io/_uploads/SJ0plU-S0.png)
Request Handling -> 勾選 Allow private key to be exported
![image](https://hackmd.io/_uploads/HJWMZ8bHR.png)
Subject Name -> 選擇 Supply in the request
![image](https://hackmd.io/_uploads/Sy93-8-B0.png)
Extensions Application -> Edit...
![image](https://hackmd.io/_uploads/rk9eGUbHR.png)
Add... -> Server Authentication
![image](https://hackmd.io/_uploads/r1xVfL-rC.png)![image](https://hackmd.io/_uploads/SyD8GUWSA.png)
Certificate Templates 設定完成
```
### RADIUS 驗證伺服器
若題目有要求用 AD 使用者帳號驗證，但 VPN 不是安裝在 Domain Contoller 上的時候就會需要 RADIUS
在 Domain Controller 上先安裝 Network Policy and Access Services
![image](https://hackmd.io/_uploads/HyZMWglPC.png)
安裝後 -> 點選 Tools -> Network Policy Server -> NPS (Local)
確認選項是 VPN Connections 後，點選 Configure VPN or Dial-Up
![image](https://hackmd.io/_uploads/HyF2QegvC.png)
選擇 Virtual Private Network (VPN) Connections
![image](https://hackmd.io/_uploads/BkC-4xlDR.png)
Next -> Add...
![image](https://hackmd.io/_uploads/BkzfBgxw0.png)
將被驗證方的資料輸入完後按 Verify...
![image](https://hackmd.io/_uploads/HyAozexDR.png)
再按 Resolve，系統會確定 Client 端是否在線，若在線下面的 IP address 會顯示
![image](https://hackmd.io/_uploads/ByKLSlew0.png)
將三個選項都確認無誤後再下一步
![image](https://hackmd.io/_uploads/BJYGUeewC.png)
接著設定可以使用 VPN 的群組
![image](https://hackmd.io/_uploads/SyIsLgeDR.png)
IP Fliter 可依需求設定，若無需設定直接 Next
![image](https://hackmd.io/_uploads/SygknxeDA.png)
僅勾選 Strongest encryption
![image](https://hackmd.io/_uploads/HJCGhelDR.png)
Realm Name 可直接跳過
![image](https://hackmd.io/_uploads/rywFnlgv0.png)
RADIUS Server 端設定完成，轉到 Client 端
Server Manager -> Tools -> Routing and Remote Access -> 右鍵 Server -> Properties -> Security
將 Authentication provider 和 Accounting provider 都設為 RADIUS Accounting -> Configure...
![image](https://hackmd.io/_uploads/SkbAvQevC.png)
按 New...
![image](https://hackmd.io/_uploads/HkweuXeDA.png)
Server name 輸入 Server 端的 IP Address，Shared secret 輸入在 Server 端設定好的密碼，Accounting provider 的 Configure 也照樣設定
![image](https://hackmd.io/_uploads/BJqCdXewR.png)
按 OK 後就設定完成
![image](https://hackmd.io/_uploads/S10qtQlwA.png)

## 讓外部電腦信任根憑證 (Root CA)
在 Windows Server 端的操作：打開 MMC -> 導入 Certificates -> Computer Account -> Local Computer
![](https://hackmd.io/_uploads/SyfBYQ8Rh.png)
Trusted Root Certificates Authorities -> Certificates -> 選擇要讓外部電腦驗證的根憑證 -> 右鍵 All Tasks -> Export...
![](https://hackmd.io/_uploads/rkuU5QUC2.png)
檔案格式選 DER 或 Base-64 則一即可
![](https://hackmd.io/_uploads/H1wKc78R2.png)
在外部電腦端的操作：打開 MMC -> 導入 Ceritficates -> Computer Account -> Local Computer -> Trusted Root Certificates Authorities -> Ceritficates -> 右鍵 All Tasks -> Import...
![](https://hackmd.io/_uploads/H1Ppi7LR2.png)
選取剛剛自己導出的根憑證
![](https://hackmd.io/_uploads/SkJYhXIC3.png)
選擇 Place all ceritificates in the following store，並確認憑證倉庫為「Trusted Root Certificates Authorities」
![](https://hackmd.io/_uploads/B1Bq2XLRh.png)
最後按下 Finish，即安裝完成根憑證，瀏覽內部網站時不會再跳出憑證錯誤等訊息
![](https://hackmd.io/_uploads/Skbb6Q8C2.png)
## Windows 11
### 安裝跳過 TPM、CPU 和 Secure Boot 檢查
![](https://hackmd.io/_uploads/HkhM2Fdh3.png)
進入安裝介面後，按「Shift + F10」叫出 cmd，並輸入 regedit
![](https://hackmd.io/_uploads/HJmEkuJn3.png)
找到「**Computer\HKEY_LOCAL_MACHINE\SYSTEM\Setup**」
![](https://hackmd.io/_uploads/H1pi0Dknh.png)
新增一個「LabConfig」機碼
![](https://hackmd.io/_uploads/S1pkxdknn.png)
在機碼內部新增三個 DWORD (32-bit) 值，分別為「**BypassTPMCheck**」、「**BypassSecureBootCheck**」、「**BypassCPUCheck**」及「**BypassRAMCheck**」，並將值全部設定為 1
![](https://hackmd.io/_uploads/H1wN_tOhn.png)
![](https://hackmd.io/_uploads/HkbSOFd32.png)
![](https://hackmd.io/_uploads/SyLSOt_h2.png)
![](https://hackmd.io/_uploads/rJgjotu2n.png)
最後回上一步再進入安裝介面，即成功進入安裝介面
![](https://hackmd.io/_uploads/BJ813FOn2.png)
## Organizational Unit (OU)
### 新增
到 Active Directory Users and Computers -> New -> Organizational Unit
![image](https://hackmd.io/_uploads/SkxfW-zTp.png)
### 刪除
直接將 OU 刪除的話，會遇到這個錯誤：
![image](https://hackmd.io/_uploads/ryr1XZf6p.png)
若要刪除 OU 需先設定：
Step 1. 將目標網域右鍵 -> View -> 點選 Advanced Features
![image](https://hackmd.io/_uploads/BkzAzbM6a.png)
Step 2. 到想要刪除的 OU 右鍵 -> Properties -> Object -> 將 Project object from accidental deletion 取消勾選 -> OK
![image](https://hackmd.io/_uploads/r1IKmWzaT.png)
![image](https://hackmd.io/_uploads/BkxgubGTp.png)
刪除時就不會出現錯誤了
## 當 IIS 有使用到網路資源的設定
不要使用掛載後的硬碟路徑，直接使用其網路路徑
![image](https://hackmd.io/_uploads/B1Wh72pap.png)
![image](https://hackmd.io/_uploads/r1uPE2aTT.png)
## Edge Group Policy Templates ADMX (54 分區可能出)
### 安裝
打開 ```MicrosoftEdgePolicyTemplates\windows\admx```
將這三個檔案複製到 ```C:\Windows\PolicyDefinitions```
![image](https://hackmd.io/_uploads/B1csbpDCp.png)
![image](https://hackmd.io/_uploads/Skawzaw0p.png)
再回到 admx 資料夾，選擇當下系統的語系
(若英文就是 en-US，中文就是 zh-TW，這裡的系統是 en-US)
複製裡面全部的檔案到 ```C:\Windows\PolicyDefinitions\en-US```
![image](https://hackmd.io/_uploads/r1Jd7TPA6.png)
### 套用更新
執行指令 ```gpupdate /force```，再開啟 ```gpedit.msc``` 或 Group Policy Management，在 Computer Configuration -> Administrative Templates 下即可看到四個新的與 Edge 相關的 Policy 設定
![image](https://hackmd.io/_uploads/BkqvHaPCp.png)
![image](https://hackmd.io/_uploads/rkxxC0DAp.png)
註：若 Client 端未安裝 ADMX 也可以套用規則
### 封鎖衝浪遊戲 (Surf Game)
* Setting
![image](https://hackmd.io/_uploads/B1V1cL_Ra.png)
* Effect
![image](https://hackmd.io/_uploads/Hy1cq8_CT.png)
### 啟動、首頁和新索引標籤頁面 (Startup, home page and new tab page)
* EN
![image](https://hackmd.io/_uploads/Bk-TBU_AT.png)
* ZH_TW
![image](https://hackmd.io/_uploads/HkihDUOCa.png)
### 允許或拒絕網頁截取螢幕畫面 (Allow or deny screen capture)
![image](https://hackmd.io/_uploads/HymET8dRa.png)
### 拒絕存取特定網站 (Block access to a list of URLs)
* Setting
![image](https://hackmd.io/_uploads/BkfMyvuAa.png)
![image](https://hackmd.io/_uploads/SJ1VyPdAT.png)
* Effect
![image](https://hackmd.io/_uploads/rk8U1w_Ca.png)
## 對單個使用者或群組做密碼限制 (AD AC)
打開 AD AC，到 domain (local) -> System -> Password Settings Container -> 右鍵 Password Settings
![image](https://hackmd.io/_uploads/BJLgKWKCp.png)
```
創立一個至少需要輸入 8 個字的密碼規則
```
![image](https://hackmd.io/_uploads/H1YC5bFCp.png)
回到 Users -> 選擇自己要套用設定的使用者或群組 -> 右鍵 Properties -> Password Settings -> Assign...
![image](https://hackmd.io/_uploads/Hy1D2-YAp.png)
選 Advenced...
![image](https://hackmd.io/_uploads/BkfepWtAa.png)
選 Find Now -> 選擇自己建立的規則
![image](https://hackmd.io/_uploads/B1ZXTZKCp.png)
若新輸入的密碼不到 8 個字：
![image](https://hackmd.io/_uploads/SJFSAZtC6.png)
![image](https://hackmd.io/_uploads/rkKDRWtAT.png)
若有至少 8 個字：
![image](https://hackmd.io/_uploads/HkeiRbt0p.png)
![image](https://hackmd.io/_uploads/B1kp0-YRa.png)
## 遠端桌面服務 (Remote Desktop Service)
安裝服務：
![image](https://hackmd.io/_uploads/HJLDgliR6.png)
![image](https://hackmd.io/_uploads/ry_igeiCT.png)
![image](https://hackmd.io/_uploads/ryc6xgjC6.png)
使用 Internet Explorer 可瀏覽其 RDWeb (在沒有 SSL 簽證的狀況下)：
![image](https://hackmd.io/_uploads/SkJB4giRp.png)
![image](https://hackmd.io/_uploads/HktnHxsCp.png)
也可透過網域使用者直接遠端 Server：
![image](https://hackmd.io/_uploads/BJqYNxo0T.png)
![image](https://hackmd.io/_uploads/SJah4gjRp.png)
若簽證了可使用 Edge 正常預覽：
![image](https://hackmd.io/_uploads/HkzMwxsR6.png)
## 啟用 IP Forwarding (Regedit)
按一下 Windows Key + R，輸入 regedit 後 Enter
設定「**Computer\HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\Tcpip\Parameters\IPEnableRouter**」為 1
![image](https://hackmd.io/_uploads/SJNNwq0AT.png)
## 啟用 NTP Server (Windows Server)
修改登錄檔，以下設定都是在目錄：「**HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\W32Time**」做設定，故只補充其後段的位置
* 設定為 NTP Server：**「\Parameters\Type」** 更改為 “NTP”
* 啟動 NTP Server：「**\TimeProviders\NtpServer\Enabled**」 更改為 “1”
* 設定時間修正：「**\Config\MaxPosPhaseCorrection** 和 **\Config\MaxNegPhaseCorrection**」更改數值為 “1800” (十進位)
用 cmd 重啟 Windows Time Service
```bash==
開啟 cmd.exe
net stop w32time (停止 Service)
net start w32time (啟用 Service)
```
## 次級憑證的簽證及安裝 (Sub CA)
先到已安裝 Main CA 的 Server，打開 Certification Authority -> 點選 Server 後右鍵 Properties 
![image](https://hackmd.io/_uploads/Sk4pHiuX0.png)
點選 Extensions -> Select extension 選擇 CDP -> 點選 http 開頭的項目 -> 勾選第三跟第四個選項
![image](https://hackmd.io/_uploads/SJFFvsdXR.png)
Select extension 換選擇 AIA -> 點選 http 開頭的項目 -> 勾選第一個選項 -> 點擊 Apply
![image](https://hackmd.io/_uploads/ByfCDiOQA.png)

接著轉到需要安裝 Sub CA 的 Server，打開 Certification Authority -> 點選 Server 後右鍵 All Tasks -> Renew CA Certificate...
![image](https://hackmd.io/_uploads/rJWrKiumR.png)
確認 Computer Name 跟 Parent CA 都正確後，點擊 OK
![image](https://hackmd.io/_uploads/rylCtidQR.png)

回到 Main CA Server -> Pending Requests -> Issue 從 Sub CA 發起的請求
![image](https://hackmd.io/_uploads/SyRN5i_mR.png)
Issued Certidicates -> 選擇剛剛 Issue 的 CA -> Details -> Copy to File...
![image](https://hackmd.io/_uploads/Sydp9s_QR.png)
選擇 DER encoded 的 X.509 -> Next -> 儲存於自己指定的位置 -> 複製到 Sub CA Server
![image](https://hackmd.io/_uploads/rJfVojOQC.png)

再回到 Sub CA Server，點選 Server 後右鍵 All Tasks -> Install CA Certificate...
![image](https://hackmd.io/_uploads/HyXAijdm0.png)
右下角選擇 X.509 類型的 CA -> 選擇剛剛簽好的 CA
![image](https://hackmd.io/_uploads/ByrOnjOXR.png)
安裝好後，Sub CA Server 圖標會有綠色勾勾，代表正常運作
### error: The revocation function was unable to check revocation because the revocation server was offline
![image](https://learn-attachment.microsoft.com/api/attachments/7a610d77-a91c-4fdd-b852-8997ea966c54?platform=QnA)
此錯誤為無法從 Root CA 的 CRL 發布點下載撤銷憑證名單，可先嘗試透過在 hosts 內增加對 Root CA Server 的記錄 (可能需要執行 ```ipconfig /flushdns``` 保證系統會透過 hosts 內的記錄找尋)
![image](https://hackmd.io/_uploads/By5GaH-rR.png)

若錯誤還在，也可透過 PowerShell 指令直接停用 CRL 檢查及下載
```bash==
certutil -setreg ca\CRLFlags +CRLF_REVCHECK_IGNORE_OFFLINE
```

## 透過 PowerShell 建立 RAID
### 建立 Storage Pool
打開 Server Manager -> File and Storage Services -> Storage Pools -> 右鍵 -> New Storage Pool...
![image](https://hackmd.io/_uploads/ryntCEjXC.png)
### 建立 RAID 磁區
![image](https://hackmd.io/_uploads/H14eRVjXA.png)
```bash==
// 假設已建立好 Storage Pool "SRVDisk" (上圖)
// 新增三個磁碟，將其設為其中一個磁碟損壞後仍可持續運作的模式，並以 40GB 左右的空間提供於 E:/
PowerShell 指令：
New-VirtualDisk -StoragePoolFriendlyName SRVDisk -FriendlyName SRVDisk -Size 40GB -ResiliencySettingName "Parity"
```
```
ResiliencySettingName 參數解釋：
Simple：依建立的磁碟大小，就佔多大的空間，相當於RAID 0
Mirror：同時寫入多份，增加資料的可用性但減少空間，相當於RAID 1
Parity：利用位元檢查將資料儲存至各個磁碟上，至少需要三顆以上的磁碟，就算有其中一顆硬碟故障也可正常運作，相當於RAID 5
```
找到 Disk Management
![image](https://hackmd.io/_uploads/Bk_3kBjQ0.png)
對剛建立的虛擬硬碟右鍵選擇 Online -> Initialize Disk
![image](https://hackmd.io/_uploads/HkjubHj70.png)![image](https://hackmd.io/_uploads/S1vxMrsm0.png)
選擇 GPT 分區
![image](https://hackmd.io/_uploads/B1Wx7SjmR.png)
選擇磁區右鍵選擇 New Simple Volume...
![image](https://hackmd.io/_uploads/rJe8QriQR.png)
建立完成
![image](https://hackmd.io/_uploads/r1H2mSi70.png) ![image](https://hackmd.io/_uploads/B1lRQHiXC.png)
## 啟用重複資料刪除機制
安裝 Data Deduplication
![image](https://hackmd.io/_uploads/By1ZBcbBR.png)
File and Storage Services -> Volumes -> 選中要設定的磁區 -> Configure Data Deduplication
![image](https://hackmd.io/_uploads/ry5xLqZr0.png)
選擇 General purpose file server 
![image](https://hackmd.io/_uploads/Sy92U5-HA.png)
再按 OK 就完成了
## AD Users CSV Import / Export
### csvde (Import 無法使用？)
Import
```bash==
csvde -i -k -f [csv_file_path]
```
Export
```bash==
csvde -r "(objectClass=user)" -m -f [csv_file_path_for_export]
```
![image](https://hackmd.io/_uploads/HyItOk1dC.png)
### Powershell Import Users
使用 `Import-CSV` 和 `ForEach-Object` 完成
```bash==
Import-Csv -Path [csv_path] | ForEach-Object { 
	$user = $_
	net group $user.group /add
	net user $user.name $user.pass /add
	net group $user.group $user.name /add
}
```
![image](https://hackmd.io/_uploads/BJ2Tdz4_0.png)
