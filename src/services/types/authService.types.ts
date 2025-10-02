export interface AuthData {
  token: string
  user: User
  modules: Module[]
}

export interface User {
  email: string
  first_name: string
  last_name: string
}

export interface Module {
  id_module: number
  module: string
  path: string
  setting_module_config: SettingModule
  order: number
  is_render: number
  is_render_mobile: number
  operations: number[]
}

export interface SettingModule {
  key: string
  icon: string
  route: string
  position: string
  otherKeys?: string[]
}