# Proyecto_

**Título del proyecto:** Implementación de HomeLab para prácticas de
ciberseguridad

**Autor:** Daniel Carrión

**Rol:** Estudiante de Ingeniería de Sistemas (6to ciclo)

**Correo:** [carriondaniel602@gmail.com](mailto:carriondaniel602@gmail.com) · **GitHub:** [@DanproTDT](https://github.com/DanproTDT) · **LinkedIn:** [linkedin.com/in/dacarrionsec](https://www.linkedin.com/in/dacarrionsec)

**Fecha de última actualización:** 20-05-2025


## 1. Resumen

**Objetivo General**: Diseñar e implementar un entorno virtual
controlado que permita simular escenarios reales de ciberseguridad,
incluyendo pruebas de penetración, gestión de vulnerabilidades,
monitoreo de eventos y respuesta ante incidentes. Este laboratorio busca
fortalecer habilidades técnicas mediante prácticas operativas,
integrando herramientas clave como pfSense, Suricata, Splunk, Nessus y
Active Directory.

**Alcance Técnico**: Se desplegaron servicios esenciales como Active
Directory, DNS, DHCP, IDS/IPS, SIEM y escaneo de vulnerabilidades. El
entorno incluye estaciones de trabajo, servidores Linux y Windows, y
zonas segmentadas (LAN, DMZ, WAN).

**Resultados Clave**

- Splunk recibe logs de estaciones, servidores y pfSense.

- Suricata detecta y bloquea tráfico malicioso.

- Nessus identifica vulnerabilidades en LAN y DMZ.

- Las reglas de firewall segmentan correctamente el tráfico.

## 2. Contexto y Motivación

**Motivación Personal**: La creación de este laboratorio responde al
deseo de adquirir experiencia práctica en ciberseguridad ofensiva y
defensiva. El entorno permite validar conocimientos teóricos mediante
simulaciones reales, facilitando el aprendizaje por descubrimiento y la
mejora continua.

**Retos Iniciales**

- Configuración de red segmentada con múltiples interfaces.

- Integración de herramientas con flujos de logs consistentes.

- Validación de conectividad entre zonas para escaneo autenticado.

**Beneficios Esperados**

- Consolidación de habilidades técnicas en entornos reales.

- Preparación para certificaciones como CompTIA Linux+, Security+, etc.

- Creación de un portafolio técnico demostrable.

## 3. Objetivos Detallados

- Segmentar WAN / LAN / DMZ con pfSense.

- Desplegar Active Directory + DNS en LAN.

- Integrar Suricata como IDS/IPS.

- Instalar y configurar Splunk Enterprise + Universal Forwarders.

- Ejecutar auditorías de vulnerabilidades con Nessus.

## 4. Arquitectura de Red
![imagen1](media/imagen1.png)

### 4.1. Tabla de Subredes

| **Zona** | **Subred**     | **Gateway** | **Función**                     |
|----------|----------------|-------------|---------------------------------|
| WAN      | DHCP ISP       | --          | Acceso a Internet               |
| LAN      | 192.168.1.0/24 | 192.168.1.1 | AD DS, Splunk, Nessus, clientes |
| DMZ      | 10.0.0.0/24    | 10.0.0.1    | Ubuntu Server, servicios web    |

### 4.2. Interfaces de pfSense

| **Interfaz** | **Adaptador** | **Tipo** | **Función**         | **IP**           |
|--------------|---------------|----------|---------------------|------------------|
| em0          | WAN           | NAT      | Conexión a Internet | Asignada por ISP |
| em1          | DMZ           | Interna  | Red pública segura  | 10.0.0.1/24      |
| em2          | LAN           | Interna  | Red interna         | 192.168.1.1/24   |

## 5. Inventario de Componentes

### 5.1. Hardware / VMs

| **Componente**      | **RAM** | **CPU** | **Almacenamiento** | **Adaptadores** | **Tipo**              |
|---------------------|---------|---------|--------------------|-----------------|-----------------------|
| pfSense             | 2GB     | 2       | 20GB               | 3               | NAT, Interna, Interna |
| Windows Server      | 4GB     | 3       | 50GB               | 1               | Interna (LAN)         |
| Ubuntu Server       | 4GB     | 2       | 30GB               | 1               | Interna (DMZ)         |
| Estaciones Win10/11 | 4GB     | 4       | 80GB               | 1               | Interna (LAN)         |

### 5.2. Software y Versiones

- pfSense 2.8.0 + Suricata 7.0.8_2
- Windows Server 2022
- Splunk Enterprise 10.0.0 + UF 10.0.0
- Nessus Essentials 10.9.2

## 6. Implementación Base

### 6.1. pfSense

- Instalación desde ISO y asignación de interfaces.  
  ![imagen2](media/imagen2.png)  
  ![imagen3](media/imagen3.png)

- Configuración inicial vía HTTP desde Kali Linux temporal.  
  ![imagen4](media/imagen4.png)

- Asignación de IPs estáticas en LAN y DMZ, y DHCP en LAN.  
  ![imagen5](media/imagen5.png)  
  ![imagen6](media/imagen6.png)  
  ![imagen7](media/imagen7.png)

**Comentarios**

- Si no se remueve el .iso, pfSense reinicia el setup como si fuera la primera vez.
- Se usa Kali Linux como puente temporal para acceder a la gestión HTTP.
- La interfaz OPT se renombra a DMZ para reflejar su función.

### 6.2. Active Directory + DNS

- Instalación de Windows Server desde .iso.  
  ![imagen8](media/imagen8.png)

- Instalación de rol AD DS en Windows Server.  
  ![imagen9](media/imagen9.png)

- Creación de dominio: lab.ciberlabs.local.  
  ![imagen10](media/imagen10.png)

- Asignación de IP estática a Windows Server vía DHCP static mapping en pfSense.  
  ![imagen11](media/imagen11.png)

**Comentarios**

- La IP estática garantiza conectividad estable para servicios de dominio.

### 6.3. Estaciones de Trabajo + Ubuntu Server

- Instalación de Windows 11 desde .iso.  
  ![imagen12](media/imagen12.png)

- Agregar registro a DNS Server para que las estaciones puedan obtener la IP del Windows Server.  
  ![imagen13](media/imagen13.png)

- Unión al dominio.  
  ![imagen14](media/imagen14.png)  
  ![imagen15](media/imagen15.png)

- Creación de OUs (WORKSTATIONS, USERS) y usuarios (jhon1, jhon2).  
  ![imagen16](media/imagen16.png)  
  ![imagen17](media/imagen17.png)  
  ![imagen18](media/imagen18.png)  
  ![imagen19](media/imagen19.png)  
  ![imagen20](media/imagen20.png)

- Instalación de Ubuntu Server desde .iso  
  ![imagen21](media/imagen21.png)  
  ![imagen22](media/imagen22.png)

- Asignación de IP estática por DHCP Static Mapping a Ubuntu Server.  
  ![imagen23](media/imagen23.png)

- Hosting web con Apache  
  ![imagen24](media/imagen24.png)  
  ![imagen25](media/imagen25.png)

- Creación de GPO para estaciones de trabajo  
  ![imagen26](media/imagen26.png)

- Habilitar ICMP por firewall en GPO  
  ![imagen27](media/imagen27.png)

**Comentarios**

- El registro en pfSense es clave para que las estaciones resuelvan el dominio correctamente.
- La GPO permite verificar conectividad entre estaciones por ping.
- Apache se instala como base para futuras pruebas de penetración.

## 7. Splunk Enterprise + Universal Forwarders

### 7.1. Splunk Enterprise

- Instalación en Windows Server.  
  ![imagen28](media/imagen28.png)  
  ![imagen29](media/imagen29.png)

- Índices creados: windows, ubuntu_server, pfsense.  
  ![imagen30](media/imagen30.png)  
  ![imagen31](media/imagen31.png)

- Puertos 9997 y 9969 habilitados para recepción de logs.  
  ![imagen32](media/imagen32.png)

- Regla de firewall para recepción de datos.  
  ![imagen33](media/imagen33.png)  
  ![imagen34](media/imagen34.png)  
  ![imagen35](media/imagen35.png)

### 7.2. Universal Forwarders

- Instalación de UF en Windows Server  
  ![imagen36](media/imagen36.png)  
  ![imagen37](media/imagen37.png)

- Instalación de UF en Ubuntu Server  
  ![imagen38](media/imagen38.png)

- Instalación de UF en estaciones de trabajo  
  ![imagen39](media/imagen39.png)  
  ![imagen40](media/imagen40.png)

- Configuración de redirección de logs de pfSense  
  ![imagen41](media/imagen41.png)

- Habilitar recepción de logs por UDP  
  ![imagen42](media/imagen42.png)

**Comentarios**

- La regla de firewall en Windows Server es obligatoria para recibir datos por el puerto 9997.
- El input UDP permite recibir logs de pfSense sin forwarder.
- La selección de logs en Ubuntu Server cubre eventos clave del sistema.

## 8. Suricata IDS/IPS

### 8.1. Instalación

- Instalado desde el Package Manager de pfSense.  
  ![imagen43](media/imagen43.png)

- Interfaces activas: WAN, LAN, DMZ.  
  ![imagen44](media/imagen44.png)

- Redirección de logs a System Log para Splunk.  
  ![imagen45](media/imagen45.png)

### 8.2. Configuración Crítica

- Desactivación de:

  - Hardware Checksum Offloading
  - TCP Segmentation Offloading
  - Large Receive Offloading

  ![imagen46](media/imagen46.png)

### 8.3. Reglas activadas

- ET Open Rules y Snort GPLv2 Rules activadas.  
  ![imagen47](media/imagen47.png)

- WAN configurada como IPS (bloqueo activo)  
  ![imagen48](media/imagen48.png)

**Comentarios**

- Si no se desactivan las opciones de offloading, Suricata puede bloquear tráfico DNS por checksums inválidos.
- Las reglas ETOpen y Snort GPLv2 fueron elegidas ya que son libres y no requieren autenticación.

## 9. Configuración de Nessus

### 9.1. Instalación

- Nessus Essentials instalado en Windows Server.  
  ![imagen49](media/imagen49.png)

- Activación de escaneo autenticado mediante SSH en Ubuntu Server.
  - SSH instalado  
    ![imagen50](media/imagen50.png)

### 9.2. Implementación de escaneos

- Creación de escaneos  
  ![imagen51](media/imagen51.png)  
  ![imagen52](media/imagen52.png)

### 9.3. Escaneos Realizados

| **Nombre del Escaneo** | **Zona** | **Tipo de Escaneo** | **Autenticado** | **Resultado** |
|------------------------|----------|---------------------|-----------------|---------------|
| LAN Scan               | LAN      | Completo            | Sí              |               |
| DMZ Scan               | DMZ      | Puertos + SSH       | Sí              |               |

- LAN Scan  
  ![imagen53](media/imagen53.png)

- DMZ Scan  
  ![imagen54](media/imagen54.png)

**Comentarios**

- El servicio SSH en Ubuntu Server permite que Nessus acceda a la DMZ.
- Los escaneos están diseñados para evaluar vulnerabilidades en ambas zonas de red.

## 10. Reglas de Firewall (pfSense)

### 10.1. Reglas LAN

| **Acción** | **Protocolo** | **Puerto** | **Destino**    | **Descripción**                    |
|------------|---------------|------------|----------------|------------------------------------|
| Permitir   | DNS           | 53         | Internet       | Resolución de nombres              |
| Permitir   | HTTPS         | 443        | Internet       | Acceso web seguro                  |
| Permitir   | HTTP          | 80         | pfSense GUI    | Gestión desde Windows Server       |
| Permitir   | SSH           | 22         | LAN / DMZ      | Escaneo autenticado desde Nessus   |
| Permitir   | HTTP          | 80         | DMZ            | Acceso a servidor web Ubuntu       |
| Permitir   | ICMP          | --         | DMZ            | Pruebas de conectividad            |
| Permitir   | TCP           | 9997       | Windows Server | Recepción de logs desde estaciones |
| Bloquear   | Todos         | --         | --             | Tráfico no autorizado              |

![imagen55](media/imagen55.png)

### 10.2. Reglas DMZ (em3)

| **Acción** | **Protocolo** | **Puerto** | **Destino**    | **Descripción**                   |
|------------|---------------|------------|----------------|-----------------------------------|
| Permitir   | TCP           | 9997       | Windows Server | Envío de logs desde Ubuntu Server |
| Bloquear   | Todos         | --         | --             | Tráfico no autorizado             |

![imagen56](media/imagen56.png)

### 10.3. Reglas WAN

| **Acción** | **Protocolo** | **Puerto** | **Destino** | **Descripción**                |
|------------|---------------|------------|-------------|--------------------------------|
| Permitir   | TCP           | 80/443     | DMZ         | Acceso externo a servicios web |

![imagen57](media/imagen57.png)

## 11. Pruebas y Validación

### 11.1. Casos de Prueba

| **Componente** | **Prueba**                     | **Resultado** |
|----------------|--------------------------------|---------------|
| Splunk         | Recepción de logs desde UF     | Correcto      |
| AD DS          | Unión de estaciones al dominio | Correcto      |
| Suricata       | Detección de alertas IDS/IPS   | Correcto      |
| Nessus         | Escaneo autenticado en LAN/DMZ | Correcto      |

- Splunk
  - Logs al índice "Windows"  
    ![imagen58](media/imagen58.png)

  - Logs al índice "Ubuntu_Server"  
    ![imagen59](media/imagen59.png)

  - Logs al índice "pfSense"  
    ![imagen60](media/imagen60.png)

- AD DS  
  ![imagen61](media/imagen61.png)

- Suricata  
  ![imagen62](media/imagen62.png)

- Nessus
  - LAN Scan  
    ![imagen63](media/imagen63.png)

  - DMZ Scan  
    ![imagen64](media/imagen64.png)


## 12. Lecciones Aprendidas y Recomendaciones

### 12.1. Retos Técnicos

- Splunk Free limita el volumen de datos y retención.

- Suricata requiere desactivar el offloading para evitar falsos positivos.

### 12.2. Recomendaciones

- Considerar migración a Splunk Enterprise para mayor capacidad.

## 13. Conclusión

Este laboratorio representa una plataforma completa para simular
escenarios reales de ciberseguridad. La integración de herramientas
clave permite practicar detección, análisis y respuesta ante incidentes.
La segmentación de red, el monitoreo centralizado y la validación
operativa consolidan un entorno ideal para aprendizaje técnico y
demostración profesional.
