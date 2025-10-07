export interface DeviceData {
  results: Device[]
  count: number
  limit: string
  offset: string
}

export interface Device {
  id_device: number
  device_name: string
  device_model: string
  photo: string
  factory_family: string
  settings_device: SettingDevice
}

export interface SettingDevice {
  online: number
}