# Hardware - Smart Noise Sensor

Unidade de monitoramento acústico baseada em ESP32 para detecção de níveis de decibéis e telemetria em tempo real.

## 💻 Tech Stack
* **Microcontrolador:** [ESP32-WROOM-32](https://www.espressif.com/en/products/socs/esp32) (Dual-Core, Wi-Fi Nativo)
* **Sensor:** Microfone de Eletreto com Pré-amplificador [MAX4466](https://www.adafruit.com/product/1063)
* **Framework:** [Arduino Core for ESP32](https://github.com/espressif/arduino-esp32)
* **Protocolo:** HTTP/1.1 (Payload JSON)

## 🔧 Especificações Técnicas
* **Amostragem:** Leitura analógica (ADC) em janelas de 500ms.
* **Processamento:** Cálculo de RMS e conversão para dB SPL (Sound Pressure Level).
* **Conectividade:** Persistência de conexão Wi-Fi com auto-reconnect.

## 📡 Protocolo de Comunicação (Payload)
O dispositivo realiza um `POST` para o endpoint `/iot/noise` com a seguinte estrutura:

```json
{
  "device_id": "ESP32-LIB-01",
  "db_level": 65.5,
  "timestamp": "iso-8601-string"
}
```

## 🛠️ Configuração de Build
1. Definir credenciais no arquivo principal:
   - `WIFI_SSID`
   - `WIFI_PASS`
   - `API_ENDPOINT`
2. Configurar o ganho do potenciômetro no verso do módulo MAX4466 para calibragem.

---
