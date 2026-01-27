import type { Equipment } from "@/entities/equipment/model/types"
import { AccessSharingRole } from "@/entities/equipment/model/types"
import { FixtureDb } from "@/shared/lib/fixtures"

const equipment: Equipment[] = [
  {
    id: "a57ca0d0-10e6-4483-8a46-8e05cad8fe92",
    model: "M5-091",
    identifierType: "Serial",
    type: "machine",
    pinOrSerial: "50457",
    pin: null,
    serial: "50457",
    nickName: null,
    hasTelematics: true,
    telematics: {
      locationTime: "2025-12-30T05:59:21Z",
      cumulativeOperatingHours: 1564,
      location: {
        latitude: 33.505836,
        longitude: -97.87997,
        altitudeMeters: 264.76,
        positionHeadingAngle: 0,
      },
      businessUnit: "KTC-USA",
    },
    modelHeroUrl:
      "https://ktcictstorage.z13.web.core.windows.net/images/M5-091_Hero.jpg",
    modelFullUrl:
      "https://ktcictstorage.z13.web.core.windows.net/images/M5-091_Full.png",
    modelIconUrl:
      "https://ktcictstorage.z13.web.core.windows.net/images/M5-091_Icon.png",
    subscriptions: [
      {
        name: "Initial Telematics",
        type: "INITIAL_TELEMATICS",
        endDate: "2026-04-01",
      },
    ],
    role: AccessSharingRole.Owner,
  },
  {
    id: "6f6f813a-31a4-4e80-8899-042d8fc8e9e0",
    model: "U27-4",
    identifierType: "PIN",
    type: "machine",
    pinOrSerial: "WKFRGH1200Z040596",
    pin: "WKFRGH1200Z040596",
    serial: null,
    nickName: null,
    hasTelematics: true,
    telematics: {
      locationTime: "2025-12-03T16:02:12Z",
      cumulativeOperatingHours: 471.6,
      location: {
        latitude: 32.90235,
        longitude: -98.43119,
        altitudeMeters: 291.33,
        positionHeadingAngle: 293,
      },
      restartInhibitStatus: {
        canModify: true,
        commandStatus: "RestartEnabled",
        equipmentStatus: "RestartEnabled",
        equipmentFeatureStatus: "enabled",
      },
      businessUnit: "KTC-USA",
    },
    modelHeroUrl:
      "https://ktcictstorage.z13.web.core.windows.net/images/U27-4_Hero_800x550.jpg",
    modelFullUrl:
      "https://ktcictstorage.z13.web.core.windows.net/images/U27-4_Full.png",
    modelIconUrl:
      "https://ktcictstorage.z13.web.core.windows.net/images/U27-4_Icon.png",
    subscriptions: [
      {
        name: "Initial Telematics",
        type: "INITIAL_TELEMATICS",
        endDate: "2026-04-01",
      },
      {
        name: "Initial Telematics",
        type: "INITIAL_TELEMATICS",
        endDate: "2026-04-01",
      },
    ],
    role: AccessSharingRole.Owner,
  },
]

export const equipmentDb = new FixtureDb(equipment)
