# Project_

**Project title:** Homelab implementation for practices of
Cybersecurity

**Author:** Daniel Carrión

**Role:** Systems engineering student (6th cycle)

**Correo:** [carriondaniel602@gmail.com](mailto:carriondaniel602@gmail.com) · **GitHub:** [@DanproTDT](https://github.com/DanproTDT) · **LinkedIn:** [linkedin.com/in/dacarrionsec](https://www.linkedin.com/in/dacarrionsec)

**Last update date:** 05-20-2025


## 1. Summary

**General objective**: Design and implement a virtual environment
controlled to simulate real cybersecurity scenarios,
including penetration tests, vulnerability management,
event monitoring and incident response. This laboratory seeks
strengthen technical skills through operational practices,
integrating key tools such as Pfsense, Suricata, Splunk, Nessus and
Active Directory.

**Technical reach**: Essential services such as Active were deployed
Directory, DNS, DHCP, IDS/IPS, SIEM and Escane of Vulnerabilities. He
environment includes work stations, Linux and Windows servers, and
Segmented areas (LAN, DMZ, WAN).

**Key results**

- Splunk receives logs of stations, servers and pfsense.

- Suricata detects and blocks malicious traffic.

- Nessus identifies vulnerabilities in LAN and DMZ.

- Firewall rules correctly segment traffic.

## 2. Context and motivation

**Personal motivation**: The creation of this laboratory responds to
desire to acquire practical experience in offensive cybersecurity and
defensive. The environment allows to validate theoretical knowledge through
real simulations, facilitating discovery learning and
Continuous improvement.

**Initial challenges**

- Segmented network configuration with multiple interfaces.

- Integration of tools with consistent logs flows.

- Validation of connectivity between areas for authenticated scan.

**Expected benefits**

- Consolidation of technical skills in real environments.

- Preparation for certifications such as Compia Linux+, Security+, etc.

- Creation of a demonstrable technical portfolio.

## 3. Detailed objectives

- Segment Wan / LAN / DMZ with PFSENSE.

- Deploy Active Directory + DNS in LAN.

- Integrate SOUTHETICS AS IDS/IPS.

- Install and configure Splunk Enterprise + Universal Forwarders.

- Execute vulnerabilities audits with Nessus.

## 4. Network architecture
![imagen1](media/imagen1.png)


### 4.1. Subnet table

|**Area**|**Subnet**|**Gateway**|**Function**|
| --------- | --------------- | ------------ | ------------------------------ |
| Wan | DHCP ISP | - | Internet access |
| Lan | 192.168.1.0/24 | 192.168.1.1 | AD DS, Splunk, Nessus, customers |
| DMZ | 10.0.0.0/24 | 10.0.0.1 | Ubuntu Server, Web Services |

### 4.2. PFSENSE interfaces

| **Interface** | **Zone** | **Adapter** |**Function**| **IP**
|-------|-------|----------| ------------- |------- 
| em0   | Wan   | Nat      | Internet connection | Assigned by ISP |
| em1   | DMZ   | Internal | Safe public network | 10.0.0.1/24 |
| em2   | Lan   | Internal | Internal network | 192.168.1.1/24 |

## 5. Component inventory

### 5.1. Hardware / VMS

|**Component**|**RAM**|**CPU**|**Storage**|**Adapters**| **Type**                   |
| -------------------- | -------- | --------- | ----------------- | ------------------ |-------------------------
| pfsense | 2GB | 2 | 20GB | 3 | Nat, internal, internal |
| Windows Server | 4GB | 3 | 50GB | 1 | Internal (LAN)          |
| Ubuntu server | 4GB | 2 | 30GB | 1 | Internal (dmz)          |
| Stations win10/11 | 4GB | 4 | 80GB | 1 | Internal (LAN)          |

### 5.2. Software and versions

- pfSense 2.8.0 + Suricata 7.0.8_2
- Windows Server 2022
- Splunk Enterprise 10.0.0 + UF 10.0.0
- Nessus essentials 10.9.2

## 6. Base implementation

### 6.1. Pfsense

- installation from ISO and interface allocation.
  ![imagen2](media/imagen2.png)  

  ![imagen3](media/imagen3.png)


- Initial configuration via http from Kali Linux temporary.
  ![imagen4](media/imagen4.png)


- Assignment of static IPS in LAN and DMZ, and DHCP in LAN.
  ![imagen5](media/imagen5.png)  

  ![imagen6](media/imagen6.png)  

  ![imagen7](media/imagen7.png)


**Comments**

- If the .iso is not removed, Pfsense restarts the Setup as if it were the first time.
- Kali Linux is used as a temporary bridge to access HTTP management.
- The OPT interface is renowned to DMZ to reflect its function.

### 6.2. Active Directory + DNS

- Windows Server installation from .iso.
  ![imagen8](media/imagen8.png)


- Installation of ad ds role in Windows Server.
  ![imagen9](media/imagen9.png)


- Domain creation: Lab.ciberlabs.local.
  ![imagen10](media/imagen10.png)


- Static IP allocation to Windows Server via DHCP Static Mapping in Pfsense.
  ![imagen11](media/imagen11.png)


**Comments**

- The static IP guarantees stable connectivity for domain services.

### 6.3. Work stations + Ubuntu Server

- Windows 11 installation from .iso.
  ![imagen12](media/imagen12.png)


- Add DNS Server record so that the stations can obtain the IP of the Windows Server.
  ![imagen13](media/imagen13.png)


- Join to domain.
  ![imagen14](media/imagen14.png)  

  ![imagen15](media/imagen15.png)


- Creation of OUS (Workstations, Users) and users (Jhon1, Jhon2).
  ![imagen16](media/imagen16.png)  

  ![imagen17](media/imagen17.png)  

  ![imagen18](media/imagen18.png)  

  ![imagen19](media/imagen19.png)  

  ![imagen20](media/imagen20.png)


- Ubuntu Server installation from .iso
  ![imagen21](media/imagen21.png)  

  ![imagen22](media/imagen22.png)


- Static IP allocation by DHCP Static Mapping to Ubuntu Server.
  ![imagen23](media/imagen23.png)


- Web hosting with Apache
  ![imagen24](media/imagen24.png)  

  ![imagen25](media/imagen25.png)


- Creation of GPO for work stations
  ![imagen26](media/imagen26.png)


- Enable ICMP by Firewall in GPO
  ![imagen27](media/imagen27.png)


**Comments**

- The registration in PFSENSE is key for the stations to solve the domain correctly.
- The GPO allows to verify connectivity between ping stations.
- Apache is installed as a basis for future penetration tests.

## 7. Splunk Enterprise + Universal Forwarders

### 7.1. Splunk Enterprise

- Installation in Windows Server.
  ![imagen28](media/imagen28.png)  

  ![imagen29](media/imagen29.png)


- Created indices: Windows, Ubuntu_Server, Pfsense.
  ![imagen30](media/imagen30.png)  

  ![imagen31](media/imagen31.png)


- Ports 9997 and 9969 enabled for logs reception.
  ![imagen32](media/imagen32.png)


- Firewall rule for data reception.
  ![imagen33](media/imagen33.png)  

  ![imagen34](media/imagen34.png)  

  ![imagen35](media/imagen35.png)


### 7.2. Universal Forwarders

- Installation of UF in Windows Server
  ![imagen36](media/imagen36.png)  

  ![imagen37](media/imagen37.png)


- Installation of UF in Ubuntu Server
  ![imagen38](media/imagen38.png)


- Installation of UF in work stations
  ![imagen39](media/imagen39.png)  

  ![imagen40](media/imagen40.png)


- PFSENSE LOGS Redirection Configuration
  ![imagen41](media/imagen41.png)


- Enable Logs by UDP
  ![imagen42](media/imagen42.png)


**Comments**

- The Firewall rule in Windows Server is mandatory to receive data from port 9997.
- Input UDP allows you to receive PFSENSE logs without Forwarder.
- The selection of Logs in Ubuntu Server covers key events of the system.

## 8. Suricata IDS/IPS

### 8.1. Installation

- Installed from the PFSENSE Package Manager.
  ![imagen43](media/imagen43.png)


- Active interfaces: WAN, LAN, DMZ.
  ![imagen44](media/imagen44.png)


- Redirection of Logs to System Log for Splunk.
  ![imagen45](media/imagen45.png)


### 8.2. Critical configuration

- Deactivation of:

- Hardware Checksum offloading
- TCP Segmentation offloading
- Lark Receive Offloading

  ![imagen46](media/imagen46.png)


### 8.3. Activated rules

- ET Open RULES AND SNORT GPLV2 RULES ACTIVATED.
  ![imagen47](media/imagen47.png)


- Wan configured as IPS (active block)
  ![imagen48](media/imagen48.png)


**Comments**

- If offloading options are not deactivated, Suricata can block DNS traffic by invalid checksums.
- Etopen and Snort GPLV2 rules were chosen as they are free and do not require authentication.

## 9. Nessus configuration

### 9.1. Facility

- Nessus essentials installed in Windows Server.
  ![imagen49](media/imagen49.png)


- Authenticated scan activation by SSH in Ubuntu Server.
- SSh installed
    ![imagen50](media/imagen50.png)


### 9.2. Scanning implementation

- Creation of scanning
  ![imagen51](media/imagen51.png)  

  ![imagen52](media/imagen52.png)


### 9.3. Scanns made

|**Scan name**|**Area**|**Type of scan**|**Authenticated**|**Result**|
|-----|-----|------|-----|----|
| Lan scan | Lan | Complete | Yes |--------|
| Dmz scan | DMZ | Ports + SSH | Yes |-------|

- LAN SCAN
  ![imagen53](media/imagen53.png)


- DMZ Scan
  ![imagen54](media/imagen54.png)


**Comments**

- The SSH service in Ubuntu Server allows NESSUS to access the DMZ.
- The scans are designed to evaluate vulnerabilities in both network areas.

## 10. Firewall Rules (Pfsense)

### 10.1. LAN RULES

|**Action**|**Protocol**|**Port**|**Destination**|**Description**|
| ----------- | -------------- | ---------- | -------------- | ------------------------------------------------------------------------------
| Allow | DNS | 53 | Internet | Name resolution |
| Allow | Https | 443 | Internet | SAFE WEB ACCESS |
| Allow | Http | 80 | pfsense gui | Management from Windows Server |
| Allow | Ssh | 22 | LAN / DMZ | Authenticated scan from Nessus |
| Allow | Http | 80 | DMZ | Access to Ubuntu Web Server |
| Allow | ICMP | - | DMZ | Connectivity tests |
| Allow | TCP | 9997 | Windows Server | Reception of logs from stations |
| Block | All | - | - | Unauthorized traffic |

![imagen55](media/imagen55.png)


### 10.2. DMZ Rules (EM3)

|**Action**|**Protocol**|**Port**|**Destination**|**Description**|
| ----------- | -------------- | ----------- | --------------- | -----------------------------------
| Allow | TCP | 9997 | Windows Server | LOGS sending from Ubuntu Server |
| Block | All | - | - | Unauthorized traffic |

![imagen56](media/imagen56.png)


### 10.3. WAN Rules

| **Action**  |**Protocol**|**Port**|**Destination**|**Description**|
|-------------|-----------|--------------|----------|------------------|
| Allow       | TCP | 80/443 | DMZ | External access to web services |

![imagen57](media/imagen57.png)


## 11. Tests and validation

### 11.1. Test cases

|**Component**|**Proof**| **Result**         |
| -------------- | -------------------------|--------------------|
| Splunk | Reception of Logs from UF | Correct            |
| Ad ds | Union of domain stations | Correct            |
| Suricata | IDS/IPS alert detection | Correct            |
| NESSUS | Authenticated scan in LAN/DMZ | Correct            |

- Splunk
- Logs to the "Windows" index
    ![imagen58](media/imagen58.png)


- Logs to the "Ubuntu_Server" index
    ![imagen59](media/imagen59.png)


- Logs to the "PfSense" index
    ![imagen60](media/imagen60.png)


- AD ds
  ![imagen61](media/imagen61.png)


- Suricata
  ![imagen62](media/imagen62.png)


- Nessus
- LAN SCAN
    ![imagen63](media/imagen63.png)


- DMZ Scan
    ![imagen64](media/imagen64.png)



## 12. Lessons learned and recommendations

### 12.1. Technical challenges

- Splunk Free limits the volume of data and retention.

- Suricata requires deactivating offloading to avoid false positives.

### 12.2. Recommendations

- Consider migration to Splunk Enterprise for greater capacity.

## 13. Conclusion

This laboratory represents a complete platform to simulate
real cybersecurity scenarios. Integration of tools
Key allows to practice detection, analysis and response to incidents.
Network segmentation, centralized monitoring and validation
Operational consolidate an ideal environment for technical learning and
Professional demonstration.
