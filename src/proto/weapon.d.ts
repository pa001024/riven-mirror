import * as $protobuf from "protobufjs";
/** Properties of a Weapons. */
export interface IWeapons {

    /** Weapons weapons */
    weapons?: (Weapons.IWeapon[]|null);
}

/** Represents a Weapons. */
export class Weapons implements IWeapons {

    /**
     * Constructs a new Weapons.
     * @param [properties] Properties to set
     */
    constructor(properties?: IWeapons);

    /** Weapons weapons. */
    public weapons: Weapons.IWeapon[];

    /**
     * Creates a new Weapons instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Weapons instance
     */
    public static create(properties?: IWeapons): Weapons;

    /**
     * Decodes a Weapons message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Weapons
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Weapons;

    /**
     * Decodes a Weapons message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Weapons
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Weapons;

    /**
     * Verifies a Weapons message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a Weapons message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Weapons
     */
    public static fromObject(object: { [k: string]: any }): Weapons;

    /**
     * Creates a plain object from a Weapons message. Also converts values to other types if specified.
     * @param message Weapons
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Weapons, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Weapons to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

export namespace Weapons {

    /** Properties of a Weapon. */
    interface IWeapon {

        /** Weapon name */
        name?: (string|null);

        /** Weapon tags */
        tags?: (string[]|null);

        /** Weapon traits */
        traits?: (string[]|null);

        /** Weapon mastery */
        mastery?: (number|null);

        /** Weapon disposition */
        disposition?: (number|null);

        /** Weapon polarities */
        polarities?: (string|null);

        /** Weapon reload */
        reload?: (number|null);

        /** Weapon magazine */
        magazine?: (number|null);

        /** Weapon maxAmmo */
        maxAmmo?: (number|null);

        /** Weapon reloadStyle */
        reloadStyle?: (number|null);

        /** Weapon sniperComboMin */
        sniperComboMin?: (number|null);

        /** Weapon sniperComboReset */
        sniperComboReset?: (number|null);

        /** Weapon zoom */
        zoom?: (Weapons.Weapon.IZoom[]|null);

        /** Weapon stancePolarity */
        stancePolarity?: (string|null);

        /** Weapon blockResist */
        blockResist?: (number|null);

        /** Weapon finisherDamage */
        finisherDamage?: (number|null);

        /** Weapon channelCost */
        channelCost?: (number|null);

        /** Weapon channelMult */
        channelMult?: (number|null);

        /** Weapon spinAttack */
        spinAttack?: (number|null);

        /** Weapon jumpAttack */
        jumpAttack?: (number|null);

        /** Weapon leapAttack */
        leapAttack?: (number|null);

        /** Weapon wallAttack */
        wallAttack?: (number|null);

        /** Weapon reach */
        reach?: (number[]|null);

        /** Weapon modes */
        modes?: (Weapons.Weapon.IWeaponMode[]|null);

        /** Weapon variants */
        variants?: (Weapons.IWeapon[]|null);
    }

    /** Represents a Weapon. */
    class Weapon implements IWeapon {

        /**
         * Constructs a new Weapon.
         * @param [properties] Properties to set
         */
        constructor(properties?: Weapons.IWeapon);

        /** Weapon name. */
        public name: string;

        /** Weapon tags. */
        public tags: string[];

        /** Weapon traits. */
        public traits: string[];

        /** Weapon mastery. */
        public mastery: number;

        /** Weapon disposition. */
        public disposition: number;

        /** Weapon polarities. */
        public polarities: string;

        /** Weapon reload. */
        public reload: number;

        /** Weapon magazine. */
        public magazine: number;

        /** Weapon maxAmmo. */
        public maxAmmo: number;

        /** Weapon reloadStyle. */
        public reloadStyle: number;

        /** Weapon sniperComboMin. */
        public sniperComboMin: number;

        /** Weapon sniperComboReset. */
        public sniperComboReset: number;

        /** Weapon zoom. */
        public zoom: Weapons.Weapon.IZoom[];

        /** Weapon stancePolarity. */
        public stancePolarity: string;

        /** Weapon blockResist. */
        public blockResist: number;

        /** Weapon finisherDamage. */
        public finisherDamage: number;

        /** Weapon channelCost. */
        public channelCost: number;

        /** Weapon channelMult. */
        public channelMult: number;

        /** Weapon spinAttack. */
        public spinAttack: number;

        /** Weapon jumpAttack. */
        public jumpAttack: number;

        /** Weapon leapAttack. */
        public leapAttack: number;

        /** Weapon wallAttack. */
        public wallAttack: number;

        /** Weapon reach. */
        public reach: number[];

        /** Weapon modes. */
        public modes: Weapons.Weapon.IWeaponMode[];

        /** Weapon variants. */
        public variants: Weapons.IWeapon[];

        /**
         * Creates a new Weapon instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Weapon instance
         */
        public static create(properties?: Weapons.IWeapon): Weapons.Weapon;

        /**
         * Decodes a Weapon message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Weapon
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Weapons.Weapon;

        /**
         * Decodes a Weapon message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Weapon
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Weapons.Weapon;

        /**
         * Verifies a Weapon message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Weapon message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Weapon
         */
        public static fromObject(object: { [k: string]: any }): Weapons.Weapon;

        /**
         * Creates a plain object from a Weapon message. Also converts values to other types if specified.
         * @param message Weapon
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Weapons.Weapon, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Weapon to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    namespace Weapon {

        /** Properties of a Zoom. */
        interface IZoom {

            /** Zoom ratio */
            ratio?: (number|null);

            /** Zoom props */
            props?: ({ [k: string]: number }|null);
        }

        /** Represents a Zoom. */
        class Zoom implements IZoom {

            /**
             * Constructs a new Zoom.
             * @param [properties] Properties to set
             */
            constructor(properties?: Weapons.Weapon.IZoom);

            /** Zoom ratio. */
            public ratio: number;

            /** Zoom props. */
            public props: { [k: string]: number };

            /**
             * Creates a new Zoom instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Zoom instance
             */
            public static create(properties?: Weapons.Weapon.IZoom): Weapons.Weapon.Zoom;

            /**
             * Decodes a Zoom message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Zoom
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Weapons.Weapon.Zoom;

            /**
             * Decodes a Zoom message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Zoom
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Weapons.Weapon.Zoom;

            /**
             * Verifies a Zoom message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Zoom message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Zoom
             */
            public static fromObject(object: { [k: string]: any }): Weapons.Weapon.Zoom;

            /**
             * Creates a plain object from a Zoom message. Also converts values to other types if specified.
             * @param message Zoom
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: Weapons.Weapon.Zoom, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Zoom to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a WeaponMode. */
        interface IWeaponMode {

            /** WeaponMode type */
            type?: (string|null);

            /** WeaponMode name */
            name?: (string|null);

            /** WeaponMode damage */
            damage?: (Weapons.Weapon.WeaponMode.IDamage|null);

            /** WeaponMode fireRate */
            fireRate?: (number|null);

            /** WeaponMode critChance */
            critChance?: (number|null);

            /** WeaponMode critMul */
            critMul?: (number|null);

            /** WeaponMode procChance */
            procChance?: (number|null);

            /** WeaponMode accuracy */
            accuracy?: (number|null);

            /** WeaponMode punchThrough */
            punchThrough?: (number|null);

            /** WeaponMode pellets */
            pellets?: (number|null);

            /** WeaponMode radius */
            radius?: (number|null);

            /** WeaponMode range */
            range?: (number|null);

            /** WeaponMode ammoCost */
            ammoCost?: (number|null);

            /** WeaponMode chargeTime */
            chargeTime?: (number|null);

            /** WeaponMode trigger */
            trigger?: (string|null);

            /** WeaponMode burstCount */
            burstCount?: (number|null);

            /** WeaponMode prjSpeed */
            prjSpeed?: (number|null);

            /** WeaponMode spool */
            spool?: (number|null);

            /** WeaponMode silent */
            silent?: (boolean|null);

            /** WeaponMode falloff */
            falloff?: (number[]|null);
        }

        /** Represents a WeaponMode. */
        class WeaponMode implements IWeaponMode {

            /**
             * Constructs a new WeaponMode.
             * @param [properties] Properties to set
             */
            constructor(properties?: Weapons.Weapon.IWeaponMode);

            /** WeaponMode type. */
            public type: string;

            /** WeaponMode name. */
            public name: string;

            /** WeaponMode damage. */
            public damage?: (Weapons.Weapon.WeaponMode.IDamage|null);

            /** WeaponMode fireRate. */
            public fireRate: number;

            /** WeaponMode critChance. */
            public critChance: number;

            /** WeaponMode critMul. */
            public critMul: number;

            /** WeaponMode procChance. */
            public procChance: number;

            /** WeaponMode accuracy. */
            public accuracy: number;

            /** WeaponMode punchThrough. */
            public punchThrough: number;

            /** WeaponMode pellets. */
            public pellets: number;

            /** WeaponMode radius. */
            public radius: number;

            /** WeaponMode range. */
            public range: number;

            /** WeaponMode ammoCost. */
            public ammoCost: number;

            /** WeaponMode chargeTime. */
            public chargeTime: number;

            /** WeaponMode trigger. */
            public trigger: string;

            /** WeaponMode burstCount. */
            public burstCount: number;

            /** WeaponMode prjSpeed. */
            public prjSpeed: number;

            /** WeaponMode spool. */
            public spool: number;

            /** WeaponMode silent. */
            public silent: boolean;

            /** WeaponMode falloff. */
            public falloff: number[];

            /**
             * Creates a new WeaponMode instance using the specified properties.
             * @param [properties] Properties to set
             * @returns WeaponMode instance
             */
            public static create(properties?: Weapons.Weapon.IWeaponMode): Weapons.Weapon.WeaponMode;

            /**
             * Decodes a WeaponMode message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns WeaponMode
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Weapons.Weapon.WeaponMode;

            /**
             * Decodes a WeaponMode message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns WeaponMode
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Weapons.Weapon.WeaponMode;

            /**
             * Verifies a WeaponMode message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a WeaponMode message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns WeaponMode
             */
            public static fromObject(object: { [k: string]: any }): Weapons.Weapon.WeaponMode;

            /**
             * Creates a plain object from a WeaponMode message. Also converts values to other types if specified.
             * @param message WeaponMode
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: Weapons.Weapon.WeaponMode, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this WeaponMode to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        namespace WeaponMode {

            /** Properties of a Damage. */
            interface IDamage {

                /** Damage Impact */
                Impact?: (number|null);

                /** Damage Puncture */
                Puncture?: (number|null);

                /** Damage Slash */
                Slash?: (number|null);

                /** Damage Heat */
                Heat?: (number|null);

                /** Damage Cold */
                Cold?: (number|null);

                /** Damage Electricity */
                Electricity?: (number|null);

                /** Damage Toxin */
                Toxin?: (number|null);

                /** Damage Blast */
                Blast?: (number|null);

                /** Damage Radiation */
                Radiation?: (number|null);

                /** Damage Magnetic */
                Magnetic?: (number|null);

                /** Damage Gas */
                Gas?: (number|null);

                /** Damage Viral */
                Viral?: (number|null);

                /** Damage Corrosive */
                Corrosive?: (number|null);

                /** Damage Void */
                Void?: (number|null);

                /** Damage True */
                True?: (number|null);
            }

            /** Represents a Damage. */
            class Damage implements IDamage {

                /**
                 * Constructs a new Damage.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: Weapons.Weapon.WeaponMode.IDamage);

                /** Damage Impact. */
                public Impact: number;

                /** Damage Puncture. */
                public Puncture: number;

                /** Damage Slash. */
                public Slash: number;

                /** Damage Heat. */
                public Heat: number;

                /** Damage Cold. */
                public Cold: number;

                /** Damage Electricity. */
                public Electricity: number;

                /** Damage Toxin. */
                public Toxin: number;

                /** Damage Blast. */
                public Blast: number;

                /** Damage Radiation. */
                public Radiation: number;

                /** Damage Magnetic. */
                public Magnetic: number;

                /** Damage Gas. */
                public Gas: number;

                /** Damage Viral. */
                public Viral: number;

                /** Damage Corrosive. */
                public Corrosive: number;

                /** Damage Void. */
                public Void: number;

                /** Damage True. */
                public True: number;

                /**
                 * Creates a new Damage instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns Damage instance
                 */
                public static create(properties?: Weapons.Weapon.WeaponMode.IDamage): Weapons.Weapon.WeaponMode.Damage;

                /**
                 * Decodes a Damage message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns Damage
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Weapons.Weapon.WeaponMode.Damage;

                /**
                 * Decodes a Damage message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns Damage
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Weapons.Weapon.WeaponMode.Damage;

                /**
                 * Verifies a Damage message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a Damage message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns Damage
                 */
                public static fromObject(object: { [k: string]: any }): Weapons.Weapon.WeaponMode.Damage;

                /**
                 * Creates a plain object from a Damage message. Also converts values to other types if specified.
                 * @param message Damage
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: Weapons.Weapon.WeaponMode.Damage, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this Damage to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }
        }
    }
}
