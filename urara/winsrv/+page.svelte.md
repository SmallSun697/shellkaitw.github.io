---
title: 'Windows Server'
summary: 'Hardening write up'
image: '/winsrv.jpg'
alt: 'Shellkai Huang'
created: 2023-02-06
updated: 2024-09-22
tags:
 - Windows
 - OS
---
## GPO 相關安全強化
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
### 讓 Windows Server 也能掛載 Debian SMBD
Local GPO -> Computer Configuration -> Administrative Templates -> Network -> Lanman Workstation -> 設定 Enable insecure guest logons 為 **Enabled**
![](https://hackmd.io/_uploads/rynWy0n92.png)
### GPO 個別使用者套用規則
若要指定特別使用者套用 Group Policy (刪除 Authentication Users)，至少要保留一台 Computer (最好是 Server 和 Client 都保留)
![image](https://hackmd.io/_uploads/SJMjm3FRT.png)
### 禁止使用 Windows Update
GPO -> Computer Configuration -> Administrative Templates -> Windows Components -> Windows Update -> 設定 Remove access to use all Windows Update features 為 **Enabled**
![image](https://hackmd.io/_uploads/BJ7flZjC6.png)
效果：
![image](https://hackmd.io/_uploads/SJl3gGbsR6.png)
## DNS
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
## 共享資料夾安全設定 (File Server Resource Manager)
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
## 更改 Remote Desktop 的 TCP Port (登錄檔修改)
按一下 Windows Key + R，輸入 regedit 後 Enter
在「**HKEY_LOCAL_MACHINE\System\CurrentControlSet\Control\Terminal Server\WinStations\RDP-Tcp**」下，找到「**PortNumber**」選項並編輯其機碼值為欲設定的 Port 後重啟即可
![](https://hackmd.io/_uploads/HJckBqzF3.png)
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
### VPN 安全強化 (SSTP) 設定
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