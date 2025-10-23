// ================================
// TUYA API CONFIGURATION
// ================================
// File ini berisi konfigurasi lengkap Tuya API
// Sudah diisi dengan credentials yang sama dengan website

class TuyaApiConfig {
  // ================================
  // BASE CONFIGURATION
  // ================================
  
  /// Base URL untuk Tuya IoT Platform - Singapore Data Center
  static const String baseUrl = 'https://openapi-sg.iotbing.com';
  
  /// Client ID dari Tuya IoT Console
  static const String clientId = '7gx9swfk5a3m4gjxyutt';
  
  /// Client Secret dari Tuya IoT Console
  static const String clientSecret = 'ba56be8ae0ef4b578be565d1dcee7dff';
  
  /// Device ID untuk MCB Smart Meter
  static const String deviceId = 'a3953c06bbdf6d74d8mm5h';
  
  /// Device Name
  static const String deviceName = 'WiFi Smart Meter Protector';
  
  // ================================
  // API ENDPOINTS
  // ================================
  
  /// Endpoint untuk mendapatkan access token
  static const String tokenEndpoint = '/v1.0/token';
  
  /// Endpoint untuk mendapatkan informasi device
  static String deviceInfoEndpoint(String deviceId) => '/v1.0/devices/$deviceId';
  
  /// Endpoint untuk mendapatkan status device
  static String deviceStatusEndpoint(String deviceId) => '/v1.0/devices/$deviceId/status';
  
  /// Endpoint untuk mendapatkan daftar devices
  static const String devicesEndpoint = '/v1.0/devices';
  
  // ================================
  // API CONFIGURATION
  // ================================
  
  /// Grant type untuk token request
  static const int grantType = 1;
  
  /// Sign method yang digunakan
  static const String signMethod = 'HMAC-SHA256';
  
  /// Token expiry buffer (dalam detik) - 5 menit sebelum expire
  static const int tokenExpiryBuffer = 300;
  
  /// Auto refresh interval (dalam detik)
  static const int autoRefreshInterval = 30;
  
  /// Request timeout (dalam detik)
  static const int requestTimeout = 30;
  
  // ================================
  // DATA CONVERSION FACTORS
  // ================================
  
  /// Voltage conversion: raw value dalam 0.1V, perlu dibagi 10
  static const double voltageConversion = 10.0;
  
  /// Current conversion: raw value dalam mA, perlu dibagi 1000
  static const double currentConversion = 1000.0;
  
  /// Power conversion: raw value sudah dalam W, tidak perlu konversi
  static const double powerConversion = 1.0;
  
  /// Energy conversion: raw value dalam 0.01kWh, perlu dibagi 100
  static const double energyConversion = 100.0;
  
  // ================================
  // STATUS CODES (dari device MCB)
  // ================================
  
  /// Status code untuk voltage (Tegangan)
  static const String statusVoltage = 'cur_voltage';
  
  /// Status code untuk current (Arus)
  static const String statusCurrent = 'cur_current';
  
  /// Status code untuk power (Daya)
  static const String statusPower = 'cur_power';
  
  /// Status code untuk energy (Energi Total)
  static const String statusEnergy = 'add_ele';
  
  /// Status code untuk switch state
  static const String statusSwitch = 'switch_1';
  
  // ================================
  // HELPER FUNCTIONS
  // ================================
  
  /// Generate full URL untuk token request
  static String get tokenUrl => '$baseUrl$tokenEndpoint?grant_type=$grantType';
  
  /// Generate full URL untuk device info
  static String deviceInfoUrl(String deviceId) => 
      '$baseUrl${deviceInfoEndpoint(deviceId)}';
  
  /// Generate full URL untuk device status
  static String deviceStatusUrl(String deviceId) => 
      '$baseUrl${deviceStatusEndpoint(deviceId)}';
  
  /// Convert raw voltage value to actual voltage
  static double convertVoltage(dynamic rawValue) {
    if (rawValue == null) return 0.0;
    return (rawValue is int ? rawValue.toDouble() : rawValue) / voltageConversion;
  }
  
  /// Convert raw current value to actual current
  static double convertCurrent(dynamic rawValue) {
    if (rawValue == null) return 0.0;
    return (rawValue is int ? rawValue.toDouble() : rawValue) / currentConversion;
  }
  
  /// Convert raw power value to actual power
  static double convertPower(dynamic rawValue) {
    if (rawValue == null) return 0.0;
    return (rawValue is int ? rawValue.toDouble() : rawValue) / powerConversion;
  }
  
  /// Convert raw energy value to actual energy
  static double convertEnergy(dynamic rawValue) {
    if (rawValue == null) return 0.0;
    return (rawValue is int ? rawValue.toDouble() : rawValue) / energyConversion;
  }
  
  // ================================
  // VALIDATION
  // ================================
  
  /// Validate configuration
  static bool isConfigValid() {
    return baseUrl.isNotEmpty &&
           clientId.isNotEmpty &&
           clientSecret.isNotEmpty &&
           deviceId.isNotEmpty;
  }
  
  /// Get configuration info
  static Map<String, String> getConfigInfo() {
    return {
      'Base URL': baseUrl,
      'Client ID': clientId,
      'Device ID': deviceId,
      'Device Name': deviceName,
    };
  }
}

// ================================
// USAGE EXAMPLE
// ================================
/*

// Import this file in your service
import 'config/tuya_api_config.dart';

// Use the configuration
final String baseUrl = TuyaApiConfig.baseUrl;
final String clientId = TuyaApiConfig.clientId;
final String clientSecret = TuyaApiConfig.clientSecret;
final String deviceId = TuyaApiConfig.deviceId;

// Generate URLs
final String tokenUrl = TuyaApiConfig.tokenUrl;
final String deviceStatusUrl = TuyaApiConfig.deviceStatusUrl(deviceId);

// Convert values
final double voltage = TuyaApiConfig.convertVoltage(rawVoltageValue);
final double current = TuyaApiConfig.convertCurrent(rawCurrentValue);
final double power = TuyaApiConfig.convertPower(rawPowerValue);
final double energy = TuyaApiConfig.convertEnergy(rawEnergyValue);

// Validate configuration
if (TuyaApiConfig.isConfigValid()) {
  print('Configuration is valid');
}

*/
