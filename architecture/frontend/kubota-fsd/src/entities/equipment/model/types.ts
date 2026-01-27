export enum AccessSharingRole {
  Viewer = "VIEWER",
  Editor = "EDITOR",
  Admin = "ADMIN",
  Owner = "OWNER",
}

export interface TelematicsLocation {
  latitude: number
  longitude: number
  altitudeMeters: number
  positionHeadingAngle: number
}

export interface RestartInhibitStatus {
  canModify: boolean
  commandStatus: string
  equipmentStatus: string
  equipmentFeatureStatus: string
}

export interface TelematicsInfo {
  locationTime: string // ISO Date string
  cumulativeOperatingHours: number
  location: TelematicsLocation
  restartInhibitStatus?: RestartInhibitStatus
  businessUnit: string
}

export interface Subscription {
  name: string
  type: string // Можно уточнить литералами, например "INITIAL_TELEMATICS" | "PAID"
  endDate: string // YYYY-MM-DD
}

export interface Equipment {
  id: string // UUID
  model: string
  identifierType: "Serial" | "PIN"
  type: "machine" | "attachment"
  pinOrSerial: string
  pin: string | null
  serial: string | null
  nickName: string | null
  hasTelematics: boolean
  telematics: TelematicsInfo | null
  modelHeroUrl: string
  modelFullUrl: string
  modelIconUrl: string
  subscriptions: Subscription[]
  role: AccessSharingRole
}
