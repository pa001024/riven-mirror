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
      {
        damage: { Impact: 99, Puncture: 5.5, Slash: 5.5 },
        critChance: 0.2,
        critMul: 1.5,
      },
      {
        damage: { Impact: 198, Puncture: 11, Slash: 11 },
        prjSpeed: 85,
      },
    ],
  },
  "Mutalist Cernos": {
    modes: [
      {
        damage: { Impact: 108, Puncture: 6, Slash: 6 },
        critChance: 0.1,
        critMul: 1.5,
      }, //
      {
        damage: { Impact: 202.5, Puncture: 11.25, Slash: 11.25 },
      },
      { damage: { Toxin: 55 } },
    ],
  },
  "Cernos Prime": {
    modes: [
      {
        damage: { Impact: 162, Puncture: 9, Slash: 9 },
        critChance: 0.2,
        critMul: 1.5,
      },
      {
        damage: { Impact: 324, Puncture: 18, Slash: 18 },
        prjSpeed: 85,
      },
    ],
  },
  "Rakta Cernos": {
    modes: [
      {
        damage: { Impact: 135, Puncture: 7.5, Slash: 7.5 },
        critChance: 0.2,
      }, //
      {
        damage: { Impact: 225, Puncture: 12.5, Slash: 12.5 },
      },
    ],
  },
  Daikyu: {
    modes: [
      {
        damage: { Impact: 138, Puncture: 184, Slash: 138 },
        critChance: 0.2,
        procChance: 0.5,
        prjSpeed: 85,
      },
    ],
  },
  Dread: {
    modes: [
      { damage: { Impact: 6.5, Puncture: 6.5, Slash: 117 }, critChance: 0.25 }, //
      {
        damage: { Impact: 10, Puncture: 10, Slash: 180 },
      },
    ],
  },
  Paris: {
    modes: [
      {
        damage: { Impact: 6, Puncture: 96, Slash: 18 },
        critChance: 0.2,
        critMul: 1.5,
      }, //
      {
        damage: { Impact: 9, Puncture: 144, Slash: 27 },
      },
    ],
  },
  "MK1-Paris": {
    modes: [
      {
        damage: { Impact: 5, Puncture: 80, Slash: 15 },
        critChance: 0.2,
        critMul: 1.5,
      }, //
      {
        damage: { Impact: 6, Puncture: 96, Slash: 18 },
      },
    ],
  },
  "Paris Prime": {
    modes: [
      {
        damage: { Impact: 3.25, Puncture: 104, Slash: 22.75 },
        critChance: 0.25,
      }, //
      {
        damage: { Impact: 6.5, Puncture: 208, Slash: 45.5 },
        prjSpeed: 85,
      },
    ],
  },
} as { [x: string]: Partial<Weapon> };
