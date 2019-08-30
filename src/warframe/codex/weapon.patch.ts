import { Weapon } from "./weapon.i";

/*
Cernos

Quick Shot increased from 110 to 190
Charged Shot increased from 220 to 380
Flight Speed increased from 85 to 90
Aim Zoom decreased from 2.23x to 2x

Mutalist Cernos

Quick Shot increased from 120 to 205
Charged Shot increased from 225 to 410
Aim Zoom decreased from 2.23x to 2x

Cernos Prime

Quick Shot increased from 60 to 92
Charged Shot increased from 120 to 184
Flight Speed increased from 85 to 95
Tightened the spread of the vertical fire mode and made the top arrow land on the reticle instead of the middle

Rakta Cernos

Quick Shot increased from 150 to 235
Charged Shot increased from 250 to 470

Daikyu

Status Chance decreased from 50% to 46%
Critical Chance increased from 20% to 34%
Charged Shot increased from 460 to 700
Flight Speed increased from 135 to 140

Dread

Quick Shot increased from 130 to 168
Charged Shot increased from 200 to 336

Paris

Quick Shot increased from 120 to 160
Charged Shot increased from 180 to 320

MK1-Paris

Quick Shot increased from 100 to 115
Charged Shot increased from 120 to 230

Paris Prime

Quick Shot increased from 130 to 180
Charged Shot increased from 260 to 360
Flight Speed increased from 85 to 95
*/
export default {
  Cernos: {
    modes: [
      { damage: { Impact: 171, Puncture: 9.5, Slash: 9.5 } },
      {
        damage: { Impact: 342, Puncture: 19, Slash: 19 },
        prjSpeed: 90,
      },
    ],
  },
  "Mutalist Cernos": {
    modes: [
      { damage: { Impact: 184.5, Puncture: 10.25, Slash: 10.25 } }, //
      { damage: { Impact: 369, Puncture: 20.5, Slash: 20.5 } },
      { damage: { Toxin: 55 } },
    ],
  },
  "Cernos Prime": {
    modes: [
      {
        damage: { Impact: 249.4, Puncture: 13.8, Slash: 13.8 },
      },
      {
        damage: { Impact: 498.8, Puncture: 27.6, Slash: 27.6 },
        prjSpeed: 95,
      },
    ],
  },
  "Rakta Cernos": {
    modes: [
      { damage: { Impact: 11.75, Puncture: 211.5, Slash: 11.75 } }, //
      { damage: { Impact: 23.5, Puncture: 423, Slash: 23.5 } },
    ],
  },
  Daikyu: {
    modes: [
      {
        damage: { Impact: 210, Puncture: 280, Slash: 210 },
        critChance: 0.34,
        procChance: 0.46,
        prjSpeed: 140,
      },
    ],
  },
  Dread: {
    modes: [
      { damage: { Impact: 8.4, Puncture: 8.4, Slash: 151.2 } }, //
      { damage: { Impact: 16.8, Puncture: 16.8, Slash: 302.4 } },
    ],
  },
  Paris: {
    modes: [
      { damage: { Impact: 8, Puncture: 128, Slash: 24 } }, //
      { damage: { Impact: 16, Puncture: 256, Slash: 48 } },
    ],
  },
  "MK1-Paris": {
    modes: [
      { damage: { Impact: 5.75, Puncture: 92, Slash: 17.25 } }, //
      { damage: { Impact: 11.5, Puncture: 184, Slash: 34.5 } },
    ],
  },
  "Paris Prime": {
    modes: [
      { damage: { Impact: 4.5, Puncture: 144, Slash: 31.5 } }, //
      { damage: { Impact: 9, Puncture: 288, Slash: 63 } },
    ],
  },
} as { [x: string]: Partial<Weapon> };
