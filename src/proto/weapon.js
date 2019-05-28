/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal";

// Common aliases
const $Reader = $protobuf.Reader, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const Weapons = $root.Weapons = (() => {

    /**
     * Properties of a Weapons.
     * @exports IWeapons
     * @interface IWeapons
     * @property {Array.<Weapons.IWeapon>|null} [weapons] Weapons weapons
     */

    /**
     * Constructs a new Weapons.
     * @exports Weapons
     * @classdesc Represents a Weapons.
     * @implements IWeapons
     * @constructor
     * @param {IWeapons=} [properties] Properties to set
     */
    function Weapons(properties) {
        this.weapons = [];
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Weapons weapons.
     * @member {Array.<Weapons.IWeapon>} weapons
     * @memberof Weapons
     * @instance
     */
    Weapons.prototype.weapons = $util.emptyArray;

    /**
     * Creates a new Weapons instance using the specified properties.
     * @function create
     * @memberof Weapons
     * @static
     * @param {IWeapons=} [properties] Properties to set
     * @returns {Weapons} Weapons instance
     */
    Weapons.create = function create(properties) {
        return new Weapons(properties);
    };

    /**
     * Decodes a Weapons message from the specified reader or buffer.
     * @function decode
     * @memberof Weapons
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Weapons} Weapons
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Weapons.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Weapons();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                if (!(message.weapons && message.weapons.length))
                    message.weapons = [];
                message.weapons.push($root.Weapons.Weapon.decode(reader, reader.uint32()));
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Weapons message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Weapons
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Weapons} Weapons
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Weapons.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Weapons message.
     * @function verify
     * @memberof Weapons
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Weapons.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.weapons != null && message.hasOwnProperty("weapons")) {
            if (!Array.isArray(message.weapons))
                return "weapons: array expected";
            for (let i = 0; i < message.weapons.length; ++i) {
                let error = $root.Weapons.Weapon.verify(message.weapons[i]);
                if (error)
                    return "weapons." + error;
            }
        }
        return null;
    };

    /**
     * Creates a Weapons message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Weapons
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Weapons} Weapons
     */
    Weapons.fromObject = function fromObject(object) {
        if (object instanceof $root.Weapons)
            return object;
        let message = new $root.Weapons();
        if (object.weapons) {
            if (!Array.isArray(object.weapons))
                throw TypeError(".Weapons.weapons: array expected");
            message.weapons = [];
            for (let i = 0; i < object.weapons.length; ++i) {
                if (typeof object.weapons[i] !== "object")
                    throw TypeError(".Weapons.weapons: object expected");
                message.weapons[i] = $root.Weapons.Weapon.fromObject(object.weapons[i]);
            }
        }
        return message;
    };

    /**
     * Creates a plain object from a Weapons message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Weapons
     * @static
     * @param {Weapons} message Weapons
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Weapons.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.arrays || options.defaults)
            object.weapons = [];
        if (message.weapons && message.weapons.length) {
            object.weapons = [];
            for (let j = 0; j < message.weapons.length; ++j)
                object.weapons[j] = $root.Weapons.Weapon.toObject(message.weapons[j], options);
        }
        return object;
    };

    /**
     * Converts this Weapons to JSON.
     * @function toJSON
     * @memberof Weapons
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Weapons.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    Weapons.Weapon = (function() {

        /**
         * Properties of a Weapon.
         * @memberof Weapons
         * @interface IWeapon
         * @property {string|null} [name] Weapon name
         * @property {Array.<string>|null} [tags] Weapon tags
         * @property {Array.<string>|null} [traits] Weapon traits
         * @property {number|null} [mastery] Weapon mastery
         * @property {number|null} [disposition] Weapon disposition
         * @property {string|null} [polarities] Weapon polarities
         * @property {number|null} [reload] Weapon reload
         * @property {number|null} [magazine] Weapon magazine
         * @property {number|null} [maxAmmo] Weapon maxAmmo
         * @property {number|null} [reloadStyle] Weapon reloadStyle
         * @property {number|null} [sniperComboMin] Weapon sniperComboMin
         * @property {number|null} [sniperComboReset] Weapon sniperComboReset
         * @property {Array.<Weapons.Weapon.IZoom>|null} [zoom] Weapon zoom
         * @property {string|null} [stancePolarity] Weapon stancePolarity
         * @property {number|null} [blockResist] Weapon blockResist
         * @property {number|null} [finisherDamage] Weapon finisherDamage
         * @property {number|null} [channelCost] Weapon channelCost
         * @property {number|null} [channelMult] Weapon channelMult
         * @property {number|null} [spinAttack] Weapon spinAttack
         * @property {number|null} [jumpAttack] Weapon jumpAttack
         * @property {number|null} [leapAttack] Weapon leapAttack
         * @property {number|null} [wallAttack] Weapon wallAttack
         * @property {Array.<number>|null} [reach] Weapon reach
         * @property {Array.<Weapons.Weapon.IWeaponMode>|null} [modes] Weapon modes
         * @property {Array.<Weapons.IWeapon>|null} [variants] Weapon variants
         */

        /**
         * Constructs a new Weapon.
         * @memberof Weapons
         * @classdesc Represents a Weapon.
         * @implements IWeapon
         * @constructor
         * @param {Weapons.IWeapon=} [properties] Properties to set
         */
        function Weapon(properties) {
            this.tags = [];
            this.traits = [];
            this.zoom = [];
            this.reach = [];
            this.modes = [];
            this.variants = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Weapon name.
         * @member {string} name
         * @memberof Weapons.Weapon
         * @instance
         */
        Weapon.prototype.name = "";

        /**
         * Weapon tags.
         * @member {Array.<string>} tags
         * @memberof Weapons.Weapon
         * @instance
         */
        Weapon.prototype.tags = $util.emptyArray;

        /**
         * Weapon traits.
         * @member {Array.<string>} traits
         * @memberof Weapons.Weapon
         * @instance
         */
        Weapon.prototype.traits = $util.emptyArray;

        /**
         * Weapon mastery.
         * @member {number} mastery
         * @memberof Weapons.Weapon
         * @instance
         */
        Weapon.prototype.mastery = 0;

        /**
         * Weapon disposition.
         * @member {number} disposition
         * @memberof Weapons.Weapon
         * @instance
         */
        Weapon.prototype.disposition = 0;

        /**
         * Weapon polarities.
         * @member {string} polarities
         * @memberof Weapons.Weapon
         * @instance
         */
        Weapon.prototype.polarities = "";

        /**
         * Weapon reload.
         * @member {number} reload
         * @memberof Weapons.Weapon
         * @instance
         */
        Weapon.prototype.reload = 0;

        /**
         * Weapon magazine.
         * @member {number} magazine
         * @memberof Weapons.Weapon
         * @instance
         */
        Weapon.prototype.magazine = 0;

        /**
         * Weapon maxAmmo.
         * @member {number} maxAmmo
         * @memberof Weapons.Weapon
         * @instance
         */
        Weapon.prototype.maxAmmo = 0;

        /**
         * Weapon reloadStyle.
         * @member {number} reloadStyle
         * @memberof Weapons.Weapon
         * @instance
         */
        Weapon.prototype.reloadStyle = 0;

        /**
         * Weapon sniperComboMin.
         * @member {number} sniperComboMin
         * @memberof Weapons.Weapon
         * @instance
         */
        Weapon.prototype.sniperComboMin = 0;

        /**
         * Weapon sniperComboReset.
         * @member {number} sniperComboReset
         * @memberof Weapons.Weapon
         * @instance
         */
        Weapon.prototype.sniperComboReset = 0;

        /**
         * Weapon zoom.
         * @member {Array.<Weapons.Weapon.IZoom>} zoom
         * @memberof Weapons.Weapon
         * @instance
         */
        Weapon.prototype.zoom = $util.emptyArray;

        /**
         * Weapon stancePolarity.
         * @member {string} stancePolarity
         * @memberof Weapons.Weapon
         * @instance
         */
        Weapon.prototype.stancePolarity = "";

        /**
         * Weapon blockResist.
         * @member {number} blockResist
         * @memberof Weapons.Weapon
         * @instance
         */
        Weapon.prototype.blockResist = 0;

        /**
         * Weapon finisherDamage.
         * @member {number} finisherDamage
         * @memberof Weapons.Weapon
         * @instance
         */
        Weapon.prototype.finisherDamage = 0;

        /**
         * Weapon channelCost.
         * @member {number} channelCost
         * @memberof Weapons.Weapon
         * @instance
         */
        Weapon.prototype.channelCost = 0;

        /**
         * Weapon channelMult.
         * @member {number} channelMult
         * @memberof Weapons.Weapon
         * @instance
         */
        Weapon.prototype.channelMult = 0;

        /**
         * Weapon spinAttack.
         * @member {number} spinAttack
         * @memberof Weapons.Weapon
         * @instance
         */
        Weapon.prototype.spinAttack = 0;

        /**
         * Weapon jumpAttack.
         * @member {number} jumpAttack
         * @memberof Weapons.Weapon
         * @instance
         */
        Weapon.prototype.jumpAttack = 0;

        /**
         * Weapon leapAttack.
         * @member {number} leapAttack
         * @memberof Weapons.Weapon
         * @instance
         */
        Weapon.prototype.leapAttack = 0;

        /**
         * Weapon wallAttack.
         * @member {number} wallAttack
         * @memberof Weapons.Weapon
         * @instance
         */
        Weapon.prototype.wallAttack = 0;

        /**
         * Weapon reach.
         * @member {Array.<number>} reach
         * @memberof Weapons.Weapon
         * @instance
         */
        Weapon.prototype.reach = $util.emptyArray;

        /**
         * Weapon modes.
         * @member {Array.<Weapons.Weapon.IWeaponMode>} modes
         * @memberof Weapons.Weapon
         * @instance
         */
        Weapon.prototype.modes = $util.emptyArray;

        /**
         * Weapon variants.
         * @member {Array.<Weapons.IWeapon>} variants
         * @memberof Weapons.Weapon
         * @instance
         */
        Weapon.prototype.variants = $util.emptyArray;

        /**
         * Creates a new Weapon instance using the specified properties.
         * @function create
         * @memberof Weapons.Weapon
         * @static
         * @param {Weapons.IWeapon=} [properties] Properties to set
         * @returns {Weapons.Weapon} Weapon instance
         */
        Weapon.create = function create(properties) {
            return new Weapon(properties);
        };

        /**
         * Decodes a Weapon message from the specified reader or buffer.
         * @function decode
         * @memberof Weapons.Weapon
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Weapons.Weapon} Weapon
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Weapon.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Weapons.Weapon();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.name = reader.string();
                    break;
                case 2:
                    if (!(message.tags && message.tags.length))
                        message.tags = [];
                    message.tags.push(reader.string());
                    break;
                case 3:
                    if (!(message.traits && message.traits.length))
                        message.traits = [];
                    message.traits.push(reader.string());
                    break;
                case 4:
                    message.mastery = reader.int32();
                    break;
                case 5:
                    message.disposition = reader.float();
                    break;
                case 6:
                    message.polarities = reader.string();
                    break;
                case 7:
                    message.reload = reader.float();
                    break;
                case 8:
                    message.magazine = reader.int32();
                    break;
                case 9:
                    message.maxAmmo = reader.int32();
                    break;
                case 10:
                    message.reloadStyle = reader.int32();
                    break;
                case 11:
                    message.sniperComboMin = reader.int32();
                    break;
                case 12:
                    message.sniperComboReset = reader.int32();
                    break;
                case 13:
                    if (!(message.zoom && message.zoom.length))
                        message.zoom = [];
                    message.zoom.push($root.Weapons.Weapon.Zoom.decode(reader, reader.uint32()));
                    break;
                case 14:
                    message.stancePolarity = reader.string();
                    break;
                case 15:
                    message.blockResist = reader.float();
                    break;
                case 16:
                    message.finisherDamage = reader.int32();
                    break;
                case 17:
                    message.channelCost = reader.int32();
                    break;
                case 18:
                    message.channelMult = reader.float();
                    break;
                case 19:
                    message.spinAttack = reader.float();
                    break;
                case 20:
                    message.jumpAttack = reader.float();
                    break;
                case 21:
                    message.leapAttack = reader.float();
                    break;
                case 22:
                    message.wallAttack = reader.float();
                    break;
                case 23:
                    if (!(message.reach && message.reach.length))
                        message.reach = [];
                    if ((tag & 7) === 2) {
                        let end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.reach.push(reader.float());
                    } else
                        message.reach.push(reader.float());
                    break;
                case 24:
                    if (!(message.modes && message.modes.length))
                        message.modes = [];
                    message.modes.push($root.Weapons.Weapon.WeaponMode.decode(reader, reader.uint32()));
                    break;
                case 25:
                    if (!(message.variants && message.variants.length))
                        message.variants = [];
                    message.variants.push($root.Weapons.Weapon.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Weapon message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Weapons.Weapon
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Weapons.Weapon} Weapon
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Weapon.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Weapon message.
         * @function verify
         * @memberof Weapons.Weapon
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Weapon.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.name != null && message.hasOwnProperty("name"))
                if (!$util.isString(message.name))
                    return "name: string expected";
            if (message.tags != null && message.hasOwnProperty("tags")) {
                if (!Array.isArray(message.tags))
                    return "tags: array expected";
                for (let i = 0; i < message.tags.length; ++i)
                    if (!$util.isString(message.tags[i]))
                        return "tags: string[] expected";
            }
            if (message.traits != null && message.hasOwnProperty("traits")) {
                if (!Array.isArray(message.traits))
                    return "traits: array expected";
                for (let i = 0; i < message.traits.length; ++i)
                    if (!$util.isString(message.traits[i]))
                        return "traits: string[] expected";
            }
            if (message.mastery != null && message.hasOwnProperty("mastery"))
                if (!$util.isInteger(message.mastery))
                    return "mastery: integer expected";
            if (message.disposition != null && message.hasOwnProperty("disposition"))
                if (typeof message.disposition !== "number")
                    return "disposition: number expected";
            if (message.polarities != null && message.hasOwnProperty("polarities"))
                if (!$util.isString(message.polarities))
                    return "polarities: string expected";
            if (message.reload != null && message.hasOwnProperty("reload"))
                if (typeof message.reload !== "number")
                    return "reload: number expected";
            if (message.magazine != null && message.hasOwnProperty("magazine"))
                if (!$util.isInteger(message.magazine))
                    return "magazine: integer expected";
            if (message.maxAmmo != null && message.hasOwnProperty("maxAmmo"))
                if (!$util.isInteger(message.maxAmmo))
                    return "maxAmmo: integer expected";
            if (message.reloadStyle != null && message.hasOwnProperty("reloadStyle"))
                if (!$util.isInteger(message.reloadStyle))
                    return "reloadStyle: integer expected";
            if (message.sniperComboMin != null && message.hasOwnProperty("sniperComboMin"))
                if (!$util.isInteger(message.sniperComboMin))
                    return "sniperComboMin: integer expected";
            if (message.sniperComboReset != null && message.hasOwnProperty("sniperComboReset"))
                if (!$util.isInteger(message.sniperComboReset))
                    return "sniperComboReset: integer expected";
            if (message.zoom != null && message.hasOwnProperty("zoom")) {
                if (!Array.isArray(message.zoom))
                    return "zoom: array expected";
                for (let i = 0; i < message.zoom.length; ++i) {
                    let error = $root.Weapons.Weapon.Zoom.verify(message.zoom[i]);
                    if (error)
                        return "zoom." + error;
                }
            }
            if (message.stancePolarity != null && message.hasOwnProperty("stancePolarity"))
                if (!$util.isString(message.stancePolarity))
                    return "stancePolarity: string expected";
            if (message.blockResist != null && message.hasOwnProperty("blockResist"))
                if (typeof message.blockResist !== "number")
                    return "blockResist: number expected";
            if (message.finisherDamage != null && message.hasOwnProperty("finisherDamage"))
                if (!$util.isInteger(message.finisherDamage))
                    return "finisherDamage: integer expected";
            if (message.channelCost != null && message.hasOwnProperty("channelCost"))
                if (!$util.isInteger(message.channelCost))
                    return "channelCost: integer expected";
            if (message.channelMult != null && message.hasOwnProperty("channelMult"))
                if (typeof message.channelMult !== "number")
                    return "channelMult: number expected";
            if (message.spinAttack != null && message.hasOwnProperty("spinAttack"))
                if (typeof message.spinAttack !== "number")
                    return "spinAttack: number expected";
            if (message.jumpAttack != null && message.hasOwnProperty("jumpAttack"))
                if (typeof message.jumpAttack !== "number")
                    return "jumpAttack: number expected";
            if (message.leapAttack != null && message.hasOwnProperty("leapAttack"))
                if (typeof message.leapAttack !== "number")
                    return "leapAttack: number expected";
            if (message.wallAttack != null && message.hasOwnProperty("wallAttack"))
                if (typeof message.wallAttack !== "number")
                    return "wallAttack: number expected";
            if (message.reach != null && message.hasOwnProperty("reach")) {
                if (!Array.isArray(message.reach))
                    return "reach: array expected";
                for (let i = 0; i < message.reach.length; ++i)
                    if (typeof message.reach[i] !== "number")
                        return "reach: number[] expected";
            }
            if (message.modes != null && message.hasOwnProperty("modes")) {
                if (!Array.isArray(message.modes))
                    return "modes: array expected";
                for (let i = 0; i < message.modes.length; ++i) {
                    let error = $root.Weapons.Weapon.WeaponMode.verify(message.modes[i]);
                    if (error)
                        return "modes." + error;
                }
            }
            if (message.variants != null && message.hasOwnProperty("variants")) {
                if (!Array.isArray(message.variants))
                    return "variants: array expected";
                for (let i = 0; i < message.variants.length; ++i) {
                    let error = $root.Weapons.Weapon.verify(message.variants[i]);
                    if (error)
                        return "variants." + error;
                }
            }
            return null;
        };

        /**
         * Creates a Weapon message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Weapons.Weapon
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Weapons.Weapon} Weapon
         */
        Weapon.fromObject = function fromObject(object) {
            if (object instanceof $root.Weapons.Weapon)
                return object;
            let message = new $root.Weapons.Weapon();
            if (object.name != null)
                message.name = String(object.name);
            if (object.tags) {
                if (!Array.isArray(object.tags))
                    throw TypeError(".Weapons.Weapon.tags: array expected");
                message.tags = [];
                for (let i = 0; i < object.tags.length; ++i)
                    message.tags[i] = String(object.tags[i]);
            }
            if (object.traits) {
                if (!Array.isArray(object.traits))
                    throw TypeError(".Weapons.Weapon.traits: array expected");
                message.traits = [];
                for (let i = 0; i < object.traits.length; ++i)
                    message.traits[i] = String(object.traits[i]);
            }
            if (object.mastery != null)
                message.mastery = object.mastery | 0;
            if (object.disposition != null)
                message.disposition = Number(object.disposition);
            if (object.polarities != null)
                message.polarities = String(object.polarities);
            if (object.reload != null)
                message.reload = Number(object.reload);
            if (object.magazine != null)
                message.magazine = object.magazine | 0;
            if (object.maxAmmo != null)
                message.maxAmmo = object.maxAmmo | 0;
            if (object.reloadStyle != null)
                message.reloadStyle = object.reloadStyle | 0;
            if (object.sniperComboMin != null)
                message.sniperComboMin = object.sniperComboMin | 0;
            if (object.sniperComboReset != null)
                message.sniperComboReset = object.sniperComboReset | 0;
            if (object.zoom) {
                if (!Array.isArray(object.zoom))
                    throw TypeError(".Weapons.Weapon.zoom: array expected");
                message.zoom = [];
                for (let i = 0; i < object.zoom.length; ++i) {
                    if (typeof object.zoom[i] !== "object")
                        throw TypeError(".Weapons.Weapon.zoom: object expected");
                    message.zoom[i] = $root.Weapons.Weapon.Zoom.fromObject(object.zoom[i]);
                }
            }
            if (object.stancePolarity != null)
                message.stancePolarity = String(object.stancePolarity);
            if (object.blockResist != null)
                message.blockResist = Number(object.blockResist);
            if (object.finisherDamage != null)
                message.finisherDamage = object.finisherDamage | 0;
            if (object.channelCost != null)
                message.channelCost = object.channelCost | 0;
            if (object.channelMult != null)
                message.channelMult = Number(object.channelMult);
            if (object.spinAttack != null)
                message.spinAttack = Number(object.spinAttack);
            if (object.jumpAttack != null)
                message.jumpAttack = Number(object.jumpAttack);
            if (object.leapAttack != null)
                message.leapAttack = Number(object.leapAttack);
            if (object.wallAttack != null)
                message.wallAttack = Number(object.wallAttack);
            if (object.reach) {
                if (!Array.isArray(object.reach))
                    throw TypeError(".Weapons.Weapon.reach: array expected");
                message.reach = [];
                for (let i = 0; i < object.reach.length; ++i)
                    message.reach[i] = Number(object.reach[i]);
            }
            if (object.modes) {
                if (!Array.isArray(object.modes))
                    throw TypeError(".Weapons.Weapon.modes: array expected");
                message.modes = [];
                for (let i = 0; i < object.modes.length; ++i) {
                    if (typeof object.modes[i] !== "object")
                        throw TypeError(".Weapons.Weapon.modes: object expected");
                    message.modes[i] = $root.Weapons.Weapon.WeaponMode.fromObject(object.modes[i]);
                }
            }
            if (object.variants) {
                if (!Array.isArray(object.variants))
                    throw TypeError(".Weapons.Weapon.variants: array expected");
                message.variants = [];
                for (let i = 0; i < object.variants.length; ++i) {
                    if (typeof object.variants[i] !== "object")
                        throw TypeError(".Weapons.Weapon.variants: object expected");
                    message.variants[i] = $root.Weapons.Weapon.fromObject(object.variants[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a Weapon message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Weapons.Weapon
         * @static
         * @param {Weapons.Weapon} message Weapon
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Weapon.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults) {
                object.tags = [];
                object.traits = [];
                object.zoom = [];
                object.reach = [];
                object.modes = [];
                object.variants = [];
            }
            if (options.defaults) {
                object.name = "";
                object.mastery = 0;
                object.disposition = 0;
                object.polarities = "";
                object.reload = 0;
                object.magazine = 0;
                object.maxAmmo = 0;
                object.reloadStyle = 0;
                object.sniperComboMin = 0;
                object.sniperComboReset = 0;
                object.stancePolarity = "";
                object.blockResist = 0;
                object.finisherDamage = 0;
                object.channelCost = 0;
                object.channelMult = 0;
                object.spinAttack = 0;
                object.jumpAttack = 0;
                object.leapAttack = 0;
                object.wallAttack = 0;
            }
            if (message.name != null && message.hasOwnProperty("name"))
                object.name = message.name;
            if (message.tags && message.tags.length) {
                object.tags = [];
                for (let j = 0; j < message.tags.length; ++j)
                    object.tags[j] = message.tags[j];
            }
            if (message.traits && message.traits.length) {
                object.traits = [];
                for (let j = 0; j < message.traits.length; ++j)
                    object.traits[j] = message.traits[j];
            }
            if (message.mastery != null && message.hasOwnProperty("mastery"))
                object.mastery = message.mastery;
            if (message.disposition != null && message.hasOwnProperty("disposition"))
                object.disposition = options.json && !isFinite(message.disposition) ? String(message.disposition) : message.disposition;
            if (message.polarities != null && message.hasOwnProperty("polarities"))
                object.polarities = message.polarities;
            if (message.reload != null && message.hasOwnProperty("reload"))
                object.reload = options.json && !isFinite(message.reload) ? String(message.reload) : message.reload;
            if (message.magazine != null && message.hasOwnProperty("magazine"))
                object.magazine = message.magazine;
            if (message.maxAmmo != null && message.hasOwnProperty("maxAmmo"))
                object.maxAmmo = message.maxAmmo;
            if (message.reloadStyle != null && message.hasOwnProperty("reloadStyle"))
                object.reloadStyle = message.reloadStyle;
            if (message.sniperComboMin != null && message.hasOwnProperty("sniperComboMin"))
                object.sniperComboMin = message.sniperComboMin;
            if (message.sniperComboReset != null && message.hasOwnProperty("sniperComboReset"))
                object.sniperComboReset = message.sniperComboReset;
            if (message.zoom && message.zoom.length) {
                object.zoom = [];
                for (let j = 0; j < message.zoom.length; ++j)
                    object.zoom[j] = $root.Weapons.Weapon.Zoom.toObject(message.zoom[j], options);
            }
            if (message.stancePolarity != null && message.hasOwnProperty("stancePolarity"))
                object.stancePolarity = message.stancePolarity;
            if (message.blockResist != null && message.hasOwnProperty("blockResist"))
                object.blockResist = options.json && !isFinite(message.blockResist) ? String(message.blockResist) : message.blockResist;
            if (message.finisherDamage != null && message.hasOwnProperty("finisherDamage"))
                object.finisherDamage = message.finisherDamage;
            if (message.channelCost != null && message.hasOwnProperty("channelCost"))
                object.channelCost = message.channelCost;
            if (message.channelMult != null && message.hasOwnProperty("channelMult"))
                object.channelMult = options.json && !isFinite(message.channelMult) ? String(message.channelMult) : message.channelMult;
            if (message.spinAttack != null && message.hasOwnProperty("spinAttack"))
                object.spinAttack = options.json && !isFinite(message.spinAttack) ? String(message.spinAttack) : message.spinAttack;
            if (message.jumpAttack != null && message.hasOwnProperty("jumpAttack"))
                object.jumpAttack = options.json && !isFinite(message.jumpAttack) ? String(message.jumpAttack) : message.jumpAttack;
            if (message.leapAttack != null && message.hasOwnProperty("leapAttack"))
                object.leapAttack = options.json && !isFinite(message.leapAttack) ? String(message.leapAttack) : message.leapAttack;
            if (message.wallAttack != null && message.hasOwnProperty("wallAttack"))
                object.wallAttack = options.json && !isFinite(message.wallAttack) ? String(message.wallAttack) : message.wallAttack;
            if (message.reach && message.reach.length) {
                object.reach = [];
                for (let j = 0; j < message.reach.length; ++j)
                    object.reach[j] = options.json && !isFinite(message.reach[j]) ? String(message.reach[j]) : message.reach[j];
            }
            if (message.modes && message.modes.length) {
                object.modes = [];
                for (let j = 0; j < message.modes.length; ++j)
                    object.modes[j] = $root.Weapons.Weapon.WeaponMode.toObject(message.modes[j], options);
            }
            if (message.variants && message.variants.length) {
                object.variants = [];
                for (let j = 0; j < message.variants.length; ++j)
                    object.variants[j] = $root.Weapons.Weapon.toObject(message.variants[j], options);
            }
            return object;
        };

        /**
         * Converts this Weapon to JSON.
         * @function toJSON
         * @memberof Weapons.Weapon
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Weapon.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        Weapon.Zoom = (function() {

            /**
             * Properties of a Zoom.
             * @memberof Weapons.Weapon
             * @interface IZoom
             * @property {number|null} [ratio] Zoom ratio
             * @property {Object.<string,number>|null} [props] Zoom props
             */

            /**
             * Constructs a new Zoom.
             * @memberof Weapons.Weapon
             * @classdesc Represents a Zoom.
             * @implements IZoom
             * @constructor
             * @param {Weapons.Weapon.IZoom=} [properties] Properties to set
             */
            function Zoom(properties) {
                this.props = {};
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Zoom ratio.
             * @member {number} ratio
             * @memberof Weapons.Weapon.Zoom
             * @instance
             */
            Zoom.prototype.ratio = 0;

            /**
             * Zoom props.
             * @member {Object.<string,number>} props
             * @memberof Weapons.Weapon.Zoom
             * @instance
             */
            Zoom.prototype.props = $util.emptyObject;

            /**
             * Creates a new Zoom instance using the specified properties.
             * @function create
             * @memberof Weapons.Weapon.Zoom
             * @static
             * @param {Weapons.Weapon.IZoom=} [properties] Properties to set
             * @returns {Weapons.Weapon.Zoom} Zoom instance
             */
            Zoom.create = function create(properties) {
                return new Zoom(properties);
            };

            /**
             * Decodes a Zoom message from the specified reader or buffer.
             * @function decode
             * @memberof Weapons.Weapon.Zoom
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {Weapons.Weapon.Zoom} Zoom
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Zoom.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Weapons.Weapon.Zoom(), key;
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.ratio = reader.float();
                        break;
                    case 2:
                        reader.skip().pos++;
                        if (message.props === $util.emptyObject)
                            message.props = {};
                        key = reader.string();
                        reader.pos++;
                        message.props[key] = reader.float();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Zoom message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof Weapons.Weapon.Zoom
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {Weapons.Weapon.Zoom} Zoom
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Zoom.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Zoom message.
             * @function verify
             * @memberof Weapons.Weapon.Zoom
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Zoom.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.ratio != null && message.hasOwnProperty("ratio"))
                    if (typeof message.ratio !== "number")
                        return "ratio: number expected";
                if (message.props != null && message.hasOwnProperty("props")) {
                    if (!$util.isObject(message.props))
                        return "props: object expected";
                    let key = Object.keys(message.props);
                    for (let i = 0; i < key.length; ++i)
                        if (typeof message.props[key[i]] !== "number")
                            return "props: number{k:string} expected";
                }
                return null;
            };

            /**
             * Creates a Zoom message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof Weapons.Weapon.Zoom
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {Weapons.Weapon.Zoom} Zoom
             */
            Zoom.fromObject = function fromObject(object) {
                if (object instanceof $root.Weapons.Weapon.Zoom)
                    return object;
                let message = new $root.Weapons.Weapon.Zoom();
                if (object.ratio != null)
                    message.ratio = Number(object.ratio);
                if (object.props) {
                    if (typeof object.props !== "object")
                        throw TypeError(".Weapons.Weapon.Zoom.props: object expected");
                    message.props = {};
                    for (let keys = Object.keys(object.props), i = 0; i < keys.length; ++i)
                        message.props[keys[i]] = Number(object.props[keys[i]]);
                }
                return message;
            };

            /**
             * Creates a plain object from a Zoom message. Also converts values to other types if specified.
             * @function toObject
             * @memberof Weapons.Weapon.Zoom
             * @static
             * @param {Weapons.Weapon.Zoom} message Zoom
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Zoom.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.objects || options.defaults)
                    object.props = {};
                if (options.defaults)
                    object.ratio = 0;
                if (message.ratio != null && message.hasOwnProperty("ratio"))
                    object.ratio = options.json && !isFinite(message.ratio) ? String(message.ratio) : message.ratio;
                let keys2;
                if (message.props && (keys2 = Object.keys(message.props)).length) {
                    object.props = {};
                    for (let j = 0; j < keys2.length; ++j)
                        object.props[keys2[j]] = options.json && !isFinite(message.props[keys2[j]]) ? String(message.props[keys2[j]]) : message.props[keys2[j]];
                }
                return object;
            };

            /**
             * Converts this Zoom to JSON.
             * @function toJSON
             * @memberof Weapons.Weapon.Zoom
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Zoom.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Zoom;
        })();

        Weapon.WeaponMode = (function() {

            /**
             * Properties of a WeaponMode.
             * @memberof Weapons.Weapon
             * @interface IWeaponMode
             * @property {string|null} [type] WeaponMode type
             * @property {string|null} [name] WeaponMode name
             * @property {Weapons.Weapon.WeaponMode.IDamage|null} [damage] WeaponMode damage
             * @property {number|null} [fireRate] WeaponMode fireRate
             * @property {number|null} [critChance] WeaponMode critChance
             * @property {number|null} [critMul] WeaponMode critMul
             * @property {number|null} [procChance] WeaponMode procChance
             * @property {number|null} [accuracy] WeaponMode accuracy
             * @property {number|null} [punchThrough] WeaponMode punchThrough
             * @property {number|null} [pellets] WeaponMode pellets
             * @property {number|null} [radius] WeaponMode radius
             * @property {number|null} [range] WeaponMode range
             * @property {number|null} [ammoCost] WeaponMode ammoCost
             * @property {number|null} [chargeTime] WeaponMode chargeTime
             * @property {string|null} [trigger] WeaponMode trigger
             * @property {number|null} [burstCount] WeaponMode burstCount
             * @property {number|null} [prjSpeed] WeaponMode prjSpeed
             * @property {number|null} [spool] WeaponMode spool
             * @property {boolean|null} [silent] WeaponMode silent
             * @property {Array.<number>|null} [falloff] WeaponMode falloff
             */

            /**
             * Constructs a new WeaponMode.
             * @memberof Weapons.Weapon
             * @classdesc Represents a WeaponMode.
             * @implements IWeaponMode
             * @constructor
             * @param {Weapons.Weapon.IWeaponMode=} [properties] Properties to set
             */
            function WeaponMode(properties) {
                this.falloff = [];
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * WeaponMode type.
             * @member {string} type
             * @memberof Weapons.Weapon.WeaponMode
             * @instance
             */
            WeaponMode.prototype.type = "";

            /**
             * WeaponMode name.
             * @member {string} name
             * @memberof Weapons.Weapon.WeaponMode
             * @instance
             */
            WeaponMode.prototype.name = "";

            /**
             * WeaponMode damage.
             * @member {Weapons.Weapon.WeaponMode.IDamage|null|undefined} damage
             * @memberof Weapons.Weapon.WeaponMode
             * @instance
             */
            WeaponMode.prototype.damage = null;

            /**
             * WeaponMode fireRate.
             * @member {number} fireRate
             * @memberof Weapons.Weapon.WeaponMode
             * @instance
             */
            WeaponMode.prototype.fireRate = 0;

            /**
             * WeaponMode critChance.
             * @member {number} critChance
             * @memberof Weapons.Weapon.WeaponMode
             * @instance
             */
            WeaponMode.prototype.critChance = 0;

            /**
             * WeaponMode critMul.
             * @member {number} critMul
             * @memberof Weapons.Weapon.WeaponMode
             * @instance
             */
            WeaponMode.prototype.critMul = 0;

            /**
             * WeaponMode procChance.
             * @member {number} procChance
             * @memberof Weapons.Weapon.WeaponMode
             * @instance
             */
            WeaponMode.prototype.procChance = 0;

            /**
             * WeaponMode accuracy.
             * @member {number} accuracy
             * @memberof Weapons.Weapon.WeaponMode
             * @instance
             */
            WeaponMode.prototype.accuracy = 0;

            /**
             * WeaponMode punchThrough.
             * @member {number} punchThrough
             * @memberof Weapons.Weapon.WeaponMode
             * @instance
             */
            WeaponMode.prototype.punchThrough = 0;

            /**
             * WeaponMode pellets.
             * @member {number} pellets
             * @memberof Weapons.Weapon.WeaponMode
             * @instance
             */
            WeaponMode.prototype.pellets = 0;

            /**
             * WeaponMode radius.
             * @member {number} radius
             * @memberof Weapons.Weapon.WeaponMode
             * @instance
             */
            WeaponMode.prototype.radius = 0;

            /**
             * WeaponMode range.
             * @member {number} range
             * @memberof Weapons.Weapon.WeaponMode
             * @instance
             */
            WeaponMode.prototype.range = 0;

            /**
             * WeaponMode ammoCost.
             * @member {number} ammoCost
             * @memberof Weapons.Weapon.WeaponMode
             * @instance
             */
            WeaponMode.prototype.ammoCost = 0;

            /**
             * WeaponMode chargeTime.
             * @member {number} chargeTime
             * @memberof Weapons.Weapon.WeaponMode
             * @instance
             */
            WeaponMode.prototype.chargeTime = 0;

            /**
             * WeaponMode trigger.
             * @member {string} trigger
             * @memberof Weapons.Weapon.WeaponMode
             * @instance
             */
            WeaponMode.prototype.trigger = "";

            /**
             * WeaponMode burstCount.
             * @member {number} burstCount
             * @memberof Weapons.Weapon.WeaponMode
             * @instance
             */
            WeaponMode.prototype.burstCount = 0;

            /**
             * WeaponMode prjSpeed.
             * @member {number} prjSpeed
             * @memberof Weapons.Weapon.WeaponMode
             * @instance
             */
            WeaponMode.prototype.prjSpeed = 0;

            /**
             * WeaponMode spool.
             * @member {number} spool
             * @memberof Weapons.Weapon.WeaponMode
             * @instance
             */
            WeaponMode.prototype.spool = 0;

            /**
             * WeaponMode silent.
             * @member {boolean} silent
             * @memberof Weapons.Weapon.WeaponMode
             * @instance
             */
            WeaponMode.prototype.silent = false;

            /**
             * WeaponMode falloff.
             * @member {Array.<number>} falloff
             * @memberof Weapons.Weapon.WeaponMode
             * @instance
             */
            WeaponMode.prototype.falloff = $util.emptyArray;

            /**
             * Creates a new WeaponMode instance using the specified properties.
             * @function create
             * @memberof Weapons.Weapon.WeaponMode
             * @static
             * @param {Weapons.Weapon.IWeaponMode=} [properties] Properties to set
             * @returns {Weapons.Weapon.WeaponMode} WeaponMode instance
             */
            WeaponMode.create = function create(properties) {
                return new WeaponMode(properties);
            };

            /**
             * Decodes a WeaponMode message from the specified reader or buffer.
             * @function decode
             * @memberof Weapons.Weapon.WeaponMode
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {Weapons.Weapon.WeaponMode} WeaponMode
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            WeaponMode.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Weapons.Weapon.WeaponMode();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.type = reader.string();
                        break;
                    case 2:
                        message.name = reader.string();
                        break;
                    case 3:
                        message.damage = $root.Weapons.Weapon.WeaponMode.Damage.decode(reader, reader.uint32());
                        break;
                    case 4:
                        message.fireRate = reader.int32();
                        break;
                    case 5:
                        message.critChance = reader.float();
                        break;
                    case 6:
                        message.critMul = reader.float();
                        break;
                    case 7:
                        message.procChance = reader.float();
                        break;
                    case 8:
                        message.accuracy = reader.float();
                        break;
                    case 9:
                        message.punchThrough = reader.float();
                        break;
                    case 10:
                        message.pellets = reader.int32();
                        break;
                    case 11:
                        message.radius = reader.float();
                        break;
                    case 12:
                        message.range = reader.float();
                        break;
                    case 13:
                        message.ammoCost = reader.int32();
                        break;
                    case 14:
                        message.chargeTime = reader.float();
                        break;
                    case 15:
                        message.trigger = reader.string();
                        break;
                    case 16:
                        message.burstCount = reader.float();
                        break;
                    case 17:
                        message.prjSpeed = reader.float();
                        break;
                    case 18:
                        message.spool = reader.int32();
                        break;
                    case 19:
                        message.silent = reader.bool();
                        break;
                    case 20:
                        if (!(message.falloff && message.falloff.length))
                            message.falloff = [];
                        if ((tag & 7) === 2) {
                            let end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.falloff.push(reader.float());
                        } else
                            message.falloff.push(reader.float());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a WeaponMode message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof Weapons.Weapon.WeaponMode
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {Weapons.Weapon.WeaponMode} WeaponMode
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            WeaponMode.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a WeaponMode message.
             * @function verify
             * @memberof Weapons.Weapon.WeaponMode
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            WeaponMode.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.type != null && message.hasOwnProperty("type"))
                    if (!$util.isString(message.type))
                        return "type: string expected";
                if (message.name != null && message.hasOwnProperty("name"))
                    if (!$util.isString(message.name))
                        return "name: string expected";
                if (message.damage != null && message.hasOwnProperty("damage")) {
                    let error = $root.Weapons.Weapon.WeaponMode.Damage.verify(message.damage);
                    if (error)
                        return "damage." + error;
                }
                if (message.fireRate != null && message.hasOwnProperty("fireRate"))
                    if (!$util.isInteger(message.fireRate))
                        return "fireRate: integer expected";
                if (message.critChance != null && message.hasOwnProperty("critChance"))
                    if (typeof message.critChance !== "number")
                        return "critChance: number expected";
                if (message.critMul != null && message.hasOwnProperty("critMul"))
                    if (typeof message.critMul !== "number")
                        return "critMul: number expected";
                if (message.procChance != null && message.hasOwnProperty("procChance"))
                    if (typeof message.procChance !== "number")
                        return "procChance: number expected";
                if (message.accuracy != null && message.hasOwnProperty("accuracy"))
                    if (typeof message.accuracy !== "number")
                        return "accuracy: number expected";
                if (message.punchThrough != null && message.hasOwnProperty("punchThrough"))
                    if (typeof message.punchThrough !== "number")
                        return "punchThrough: number expected";
                if (message.pellets != null && message.hasOwnProperty("pellets"))
                    if (!$util.isInteger(message.pellets))
                        return "pellets: integer expected";
                if (message.radius != null && message.hasOwnProperty("radius"))
                    if (typeof message.radius !== "number")
                        return "radius: number expected";
                if (message.range != null && message.hasOwnProperty("range"))
                    if (typeof message.range !== "number")
                        return "range: number expected";
                if (message.ammoCost != null && message.hasOwnProperty("ammoCost"))
                    if (!$util.isInteger(message.ammoCost))
                        return "ammoCost: integer expected";
                if (message.chargeTime != null && message.hasOwnProperty("chargeTime"))
                    if (typeof message.chargeTime !== "number")
                        return "chargeTime: number expected";
                if (message.trigger != null && message.hasOwnProperty("trigger"))
                    if (!$util.isString(message.trigger))
                        return "trigger: string expected";
                if (message.burstCount != null && message.hasOwnProperty("burstCount"))
                    if (typeof message.burstCount !== "number")
                        return "burstCount: number expected";
                if (message.prjSpeed != null && message.hasOwnProperty("prjSpeed"))
                    if (typeof message.prjSpeed !== "number")
                        return "prjSpeed: number expected";
                if (message.spool != null && message.hasOwnProperty("spool"))
                    if (!$util.isInteger(message.spool))
                        return "spool: integer expected";
                if (message.silent != null && message.hasOwnProperty("silent"))
                    if (typeof message.silent !== "boolean")
                        return "silent: boolean expected";
                if (message.falloff != null && message.hasOwnProperty("falloff")) {
                    if (!Array.isArray(message.falloff))
                        return "falloff: array expected";
                    for (let i = 0; i < message.falloff.length; ++i)
                        if (typeof message.falloff[i] !== "number")
                            return "falloff: number[] expected";
                }
                return null;
            };

            /**
             * Creates a WeaponMode message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof Weapons.Weapon.WeaponMode
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {Weapons.Weapon.WeaponMode} WeaponMode
             */
            WeaponMode.fromObject = function fromObject(object) {
                if (object instanceof $root.Weapons.Weapon.WeaponMode)
                    return object;
                let message = new $root.Weapons.Weapon.WeaponMode();
                if (object.type != null)
                    message.type = String(object.type);
                if (object.name != null)
                    message.name = String(object.name);
                if (object.damage != null) {
                    if (typeof object.damage !== "object")
                        throw TypeError(".Weapons.Weapon.WeaponMode.damage: object expected");
                    message.damage = $root.Weapons.Weapon.WeaponMode.Damage.fromObject(object.damage);
                }
                if (object.fireRate != null)
                    message.fireRate = object.fireRate | 0;
                if (object.critChance != null)
                    message.critChance = Number(object.critChance);
                if (object.critMul != null)
                    message.critMul = Number(object.critMul);
                if (object.procChance != null)
                    message.procChance = Number(object.procChance);
                if (object.accuracy != null)
                    message.accuracy = Number(object.accuracy);
                if (object.punchThrough != null)
                    message.punchThrough = Number(object.punchThrough);
                if (object.pellets != null)
                    message.pellets = object.pellets | 0;
                if (object.radius != null)
                    message.radius = Number(object.radius);
                if (object.range != null)
                    message.range = Number(object.range);
                if (object.ammoCost != null)
                    message.ammoCost = object.ammoCost | 0;
                if (object.chargeTime != null)
                    message.chargeTime = Number(object.chargeTime);
                if (object.trigger != null)
                    message.trigger = String(object.trigger);
                if (object.burstCount != null)
                    message.burstCount = Number(object.burstCount);
                if (object.prjSpeed != null)
                    message.prjSpeed = Number(object.prjSpeed);
                if (object.spool != null)
                    message.spool = object.spool | 0;
                if (object.silent != null)
                    message.silent = Boolean(object.silent);
                if (object.falloff) {
                    if (!Array.isArray(object.falloff))
                        throw TypeError(".Weapons.Weapon.WeaponMode.falloff: array expected");
                    message.falloff = [];
                    for (let i = 0; i < object.falloff.length; ++i)
                        message.falloff[i] = Number(object.falloff[i]);
                }
                return message;
            };

            /**
             * Creates a plain object from a WeaponMode message. Also converts values to other types if specified.
             * @function toObject
             * @memberof Weapons.Weapon.WeaponMode
             * @static
             * @param {Weapons.Weapon.WeaponMode} message WeaponMode
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            WeaponMode.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.arrays || options.defaults)
                    object.falloff = [];
                if (options.defaults) {
                    object.type = "";
                    object.name = "";
                    object.damage = null;
                    object.fireRate = 0;
                    object.critChance = 0;
                    object.critMul = 0;
                    object.procChance = 0;
                    object.accuracy = 0;
                    object.punchThrough = 0;
                    object.pellets = 0;
                    object.radius = 0;
                    object.range = 0;
                    object.ammoCost = 0;
                    object.chargeTime = 0;
                    object.trigger = "";
                    object.burstCount = 0;
                    object.prjSpeed = 0;
                    object.spool = 0;
                    object.silent = false;
                }
                if (message.type != null && message.hasOwnProperty("type"))
                    object.type = message.type;
                if (message.name != null && message.hasOwnProperty("name"))
                    object.name = message.name;
                if (message.damage != null && message.hasOwnProperty("damage"))
                    object.damage = $root.Weapons.Weapon.WeaponMode.Damage.toObject(message.damage, options);
                if (message.fireRate != null && message.hasOwnProperty("fireRate"))
                    object.fireRate = message.fireRate;
                if (message.critChance != null && message.hasOwnProperty("critChance"))
                    object.critChance = options.json && !isFinite(message.critChance) ? String(message.critChance) : message.critChance;
                if (message.critMul != null && message.hasOwnProperty("critMul"))
                    object.critMul = options.json && !isFinite(message.critMul) ? String(message.critMul) : message.critMul;
                if (message.procChance != null && message.hasOwnProperty("procChance"))
                    object.procChance = options.json && !isFinite(message.procChance) ? String(message.procChance) : message.procChance;
                if (message.accuracy != null && message.hasOwnProperty("accuracy"))
                    object.accuracy = options.json && !isFinite(message.accuracy) ? String(message.accuracy) : message.accuracy;
                if (message.punchThrough != null && message.hasOwnProperty("punchThrough"))
                    object.punchThrough = options.json && !isFinite(message.punchThrough) ? String(message.punchThrough) : message.punchThrough;
                if (message.pellets != null && message.hasOwnProperty("pellets"))
                    object.pellets = message.pellets;
                if (message.radius != null && message.hasOwnProperty("radius"))
                    object.radius = options.json && !isFinite(message.radius) ? String(message.radius) : message.radius;
                if (message.range != null && message.hasOwnProperty("range"))
                    object.range = options.json && !isFinite(message.range) ? String(message.range) : message.range;
                if (message.ammoCost != null && message.hasOwnProperty("ammoCost"))
                    object.ammoCost = message.ammoCost;
                if (message.chargeTime != null && message.hasOwnProperty("chargeTime"))
                    object.chargeTime = options.json && !isFinite(message.chargeTime) ? String(message.chargeTime) : message.chargeTime;
                if (message.trigger != null && message.hasOwnProperty("trigger"))
                    object.trigger = message.trigger;
                if (message.burstCount != null && message.hasOwnProperty("burstCount"))
                    object.burstCount = options.json && !isFinite(message.burstCount) ? String(message.burstCount) : message.burstCount;
                if (message.prjSpeed != null && message.hasOwnProperty("prjSpeed"))
                    object.prjSpeed = options.json && !isFinite(message.prjSpeed) ? String(message.prjSpeed) : message.prjSpeed;
                if (message.spool != null && message.hasOwnProperty("spool"))
                    object.spool = message.spool;
                if (message.silent != null && message.hasOwnProperty("silent"))
                    object.silent = message.silent;
                if (message.falloff && message.falloff.length) {
                    object.falloff = [];
                    for (let j = 0; j < message.falloff.length; ++j)
                        object.falloff[j] = options.json && !isFinite(message.falloff[j]) ? String(message.falloff[j]) : message.falloff[j];
                }
                return object;
            };

            /**
             * Converts this WeaponMode to JSON.
             * @function toJSON
             * @memberof Weapons.Weapon.WeaponMode
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            WeaponMode.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            WeaponMode.Damage = (function() {

                /**
                 * Properties of a Damage.
                 * @memberof Weapons.Weapon.WeaponMode
                 * @interface IDamage
                 * @property {number|null} [Impact] Damage Impact
                 * @property {number|null} [Puncture] Damage Puncture
                 * @property {number|null} [Slash] Damage Slash
                 * @property {number|null} [Heat] Damage Heat
                 * @property {number|null} [Cold] Damage Cold
                 * @property {number|null} [Electricity] Damage Electricity
                 * @property {number|null} [Toxin] Damage Toxin
                 * @property {number|null} [Blast] Damage Blast
                 * @property {number|null} [Radiation] Damage Radiation
                 * @property {number|null} [Magnetic] Damage Magnetic
                 * @property {number|null} [Gas] Damage Gas
                 * @property {number|null} [Viral] Damage Viral
                 * @property {number|null} [Corrosive] Damage Corrosive
                 * @property {number|null} [Void] Damage Void
                 * @property {number|null} [True] Damage True
                 */

                /**
                 * Constructs a new Damage.
                 * @memberof Weapons.Weapon.WeaponMode
                 * @classdesc Represents a Damage.
                 * @implements IDamage
                 * @constructor
                 * @param {Weapons.Weapon.WeaponMode.IDamage=} [properties] Properties to set
                 */
                function Damage(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * Damage Impact.
                 * @member {number} Impact
                 * @memberof Weapons.Weapon.WeaponMode.Damage
                 * @instance
                 */
                Damage.prototype.Impact = 0;

                /**
                 * Damage Puncture.
                 * @member {number} Puncture
                 * @memberof Weapons.Weapon.WeaponMode.Damage
                 * @instance
                 */
                Damage.prototype.Puncture = 0;

                /**
                 * Damage Slash.
                 * @member {number} Slash
                 * @memberof Weapons.Weapon.WeaponMode.Damage
                 * @instance
                 */
                Damage.prototype.Slash = 0;

                /**
                 * Damage Heat.
                 * @member {number} Heat
                 * @memberof Weapons.Weapon.WeaponMode.Damage
                 * @instance
                 */
                Damage.prototype.Heat = 0;

                /**
                 * Damage Cold.
                 * @member {number} Cold
                 * @memberof Weapons.Weapon.WeaponMode.Damage
                 * @instance
                 */
                Damage.prototype.Cold = 0;

                /**
                 * Damage Electricity.
                 * @member {number} Electricity
                 * @memberof Weapons.Weapon.WeaponMode.Damage
                 * @instance
                 */
                Damage.prototype.Electricity = 0;

                /**
                 * Damage Toxin.
                 * @member {number} Toxin
                 * @memberof Weapons.Weapon.WeaponMode.Damage
                 * @instance
                 */
                Damage.prototype.Toxin = 0;

                /**
                 * Damage Blast.
                 * @member {number} Blast
                 * @memberof Weapons.Weapon.WeaponMode.Damage
                 * @instance
                 */
                Damage.prototype.Blast = 0;

                /**
                 * Damage Radiation.
                 * @member {number} Radiation
                 * @memberof Weapons.Weapon.WeaponMode.Damage
                 * @instance
                 */
                Damage.prototype.Radiation = 0;

                /**
                 * Damage Magnetic.
                 * @member {number} Magnetic
                 * @memberof Weapons.Weapon.WeaponMode.Damage
                 * @instance
                 */
                Damage.prototype.Magnetic = 0;

                /**
                 * Damage Gas.
                 * @member {number} Gas
                 * @memberof Weapons.Weapon.WeaponMode.Damage
                 * @instance
                 */
                Damage.prototype.Gas = 0;

                /**
                 * Damage Viral.
                 * @member {number} Viral
                 * @memberof Weapons.Weapon.WeaponMode.Damage
                 * @instance
                 */
                Damage.prototype.Viral = 0;

                /**
                 * Damage Corrosive.
                 * @member {number} Corrosive
                 * @memberof Weapons.Weapon.WeaponMode.Damage
                 * @instance
                 */
                Damage.prototype.Corrosive = 0;

                /**
                 * Damage Void.
                 * @member {number} Void
                 * @memberof Weapons.Weapon.WeaponMode.Damage
                 * @instance
                 */
                Damage.prototype.Void = 0;

                /**
                 * Damage True.
                 * @member {number} True
                 * @memberof Weapons.Weapon.WeaponMode.Damage
                 * @instance
                 */
                Damage.prototype.True = 0;

                /**
                 * Creates a new Damage instance using the specified properties.
                 * @function create
                 * @memberof Weapons.Weapon.WeaponMode.Damage
                 * @static
                 * @param {Weapons.Weapon.WeaponMode.IDamage=} [properties] Properties to set
                 * @returns {Weapons.Weapon.WeaponMode.Damage} Damage instance
                 */
                Damage.create = function create(properties) {
                    return new Damage(properties);
                };

                /**
                 * Decodes a Damage message from the specified reader or buffer.
                 * @function decode
                 * @memberof Weapons.Weapon.WeaponMode.Damage
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {Weapons.Weapon.WeaponMode.Damage} Damage
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Damage.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Weapons.Weapon.WeaponMode.Damage();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.Impact = reader.float();
                            break;
                        case 2:
                            message.Puncture = reader.float();
                            break;
                        case 3:
                            message.Slash = reader.float();
                            break;
                        case 4:
                            message.Heat = reader.float();
                            break;
                        case 5:
                            message.Cold = reader.float();
                            break;
                        case 6:
                            message.Electricity = reader.float();
                            break;
                        case 7:
                            message.Toxin = reader.float();
                            break;
                        case 8:
                            message.Blast = reader.float();
                            break;
                        case 9:
                            message.Radiation = reader.float();
                            break;
                        case 10:
                            message.Magnetic = reader.float();
                            break;
                        case 11:
                            message.Gas = reader.float();
                            break;
                        case 12:
                            message.Viral = reader.float();
                            break;
                        case 13:
                            message.Corrosive = reader.float();
                            break;
                        case 14:
                            message.Void = reader.float();
                            break;
                        case 15:
                            message.True = reader.float();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a Damage message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof Weapons.Weapon.WeaponMode.Damage
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {Weapons.Weapon.WeaponMode.Damage} Damage
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Damage.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a Damage message.
                 * @function verify
                 * @memberof Weapons.Weapon.WeaponMode.Damage
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                Damage.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.Impact != null && message.hasOwnProperty("Impact"))
                        if (typeof message.Impact !== "number")
                            return "Impact: number expected";
                    if (message.Puncture != null && message.hasOwnProperty("Puncture"))
                        if (typeof message.Puncture !== "number")
                            return "Puncture: number expected";
                    if (message.Slash != null && message.hasOwnProperty("Slash"))
                        if (typeof message.Slash !== "number")
                            return "Slash: number expected";
                    if (message.Heat != null && message.hasOwnProperty("Heat"))
                        if (typeof message.Heat !== "number")
                            return "Heat: number expected";
                    if (message.Cold != null && message.hasOwnProperty("Cold"))
                        if (typeof message.Cold !== "number")
                            return "Cold: number expected";
                    if (message.Electricity != null && message.hasOwnProperty("Electricity"))
                        if (typeof message.Electricity !== "number")
                            return "Electricity: number expected";
                    if (message.Toxin != null && message.hasOwnProperty("Toxin"))
                        if (typeof message.Toxin !== "number")
                            return "Toxin: number expected";
                    if (message.Blast != null && message.hasOwnProperty("Blast"))
                        if (typeof message.Blast !== "number")
                            return "Blast: number expected";
                    if (message.Radiation != null && message.hasOwnProperty("Radiation"))
                        if (typeof message.Radiation !== "number")
                            return "Radiation: number expected";
                    if (message.Magnetic != null && message.hasOwnProperty("Magnetic"))
                        if (typeof message.Magnetic !== "number")
                            return "Magnetic: number expected";
                    if (message.Gas != null && message.hasOwnProperty("Gas"))
                        if (typeof message.Gas !== "number")
                            return "Gas: number expected";
                    if (message.Viral != null && message.hasOwnProperty("Viral"))
                        if (typeof message.Viral !== "number")
                            return "Viral: number expected";
                    if (message.Corrosive != null && message.hasOwnProperty("Corrosive"))
                        if (typeof message.Corrosive !== "number")
                            return "Corrosive: number expected";
                    if (message.Void != null && message.hasOwnProperty("Void"))
                        if (typeof message.Void !== "number")
                            return "Void: number expected";
                    if (message.True != null && message.hasOwnProperty("True"))
                        if (typeof message.True !== "number")
                            return "True: number expected";
                    return null;
                };

                /**
                 * Creates a Damage message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof Weapons.Weapon.WeaponMode.Damage
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {Weapons.Weapon.WeaponMode.Damage} Damage
                 */
                Damage.fromObject = function fromObject(object) {
                    if (object instanceof $root.Weapons.Weapon.WeaponMode.Damage)
                        return object;
                    let message = new $root.Weapons.Weapon.WeaponMode.Damage();
                    if (object.Impact != null)
                        message.Impact = Number(object.Impact);
                    if (object.Puncture != null)
                        message.Puncture = Number(object.Puncture);
                    if (object.Slash != null)
                        message.Slash = Number(object.Slash);
                    if (object.Heat != null)
                        message.Heat = Number(object.Heat);
                    if (object.Cold != null)
                        message.Cold = Number(object.Cold);
                    if (object.Electricity != null)
                        message.Electricity = Number(object.Electricity);
                    if (object.Toxin != null)
                        message.Toxin = Number(object.Toxin);
                    if (object.Blast != null)
                        message.Blast = Number(object.Blast);
                    if (object.Radiation != null)
                        message.Radiation = Number(object.Radiation);
                    if (object.Magnetic != null)
                        message.Magnetic = Number(object.Magnetic);
                    if (object.Gas != null)
                        message.Gas = Number(object.Gas);
                    if (object.Viral != null)
                        message.Viral = Number(object.Viral);
                    if (object.Corrosive != null)
                        message.Corrosive = Number(object.Corrosive);
                    if (object.Void != null)
                        message.Void = Number(object.Void);
                    if (object.True != null)
                        message.True = Number(object.True);
                    return message;
                };

                /**
                 * Creates a plain object from a Damage message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof Weapons.Weapon.WeaponMode.Damage
                 * @static
                 * @param {Weapons.Weapon.WeaponMode.Damage} message Damage
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                Damage.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.defaults) {
                        object.Impact = 0;
                        object.Puncture = 0;
                        object.Slash = 0;
                        object.Heat = 0;
                        object.Cold = 0;
                        object.Electricity = 0;
                        object.Toxin = 0;
                        object.Blast = 0;
                        object.Radiation = 0;
                        object.Magnetic = 0;
                        object.Gas = 0;
                        object.Viral = 0;
                        object.Corrosive = 0;
                        object.Void = 0;
                        object.True = 0;
                    }
                    if (message.Impact != null && message.hasOwnProperty("Impact"))
                        object.Impact = options.json && !isFinite(message.Impact) ? String(message.Impact) : message.Impact;
                    if (message.Puncture != null && message.hasOwnProperty("Puncture"))
                        object.Puncture = options.json && !isFinite(message.Puncture) ? String(message.Puncture) : message.Puncture;
                    if (message.Slash != null && message.hasOwnProperty("Slash"))
                        object.Slash = options.json && !isFinite(message.Slash) ? String(message.Slash) : message.Slash;
                    if (message.Heat != null && message.hasOwnProperty("Heat"))
                        object.Heat = options.json && !isFinite(message.Heat) ? String(message.Heat) : message.Heat;
                    if (message.Cold != null && message.hasOwnProperty("Cold"))
                        object.Cold = options.json && !isFinite(message.Cold) ? String(message.Cold) : message.Cold;
                    if (message.Electricity != null && message.hasOwnProperty("Electricity"))
                        object.Electricity = options.json && !isFinite(message.Electricity) ? String(message.Electricity) : message.Electricity;
                    if (message.Toxin != null && message.hasOwnProperty("Toxin"))
                        object.Toxin = options.json && !isFinite(message.Toxin) ? String(message.Toxin) : message.Toxin;
                    if (message.Blast != null && message.hasOwnProperty("Blast"))
                        object.Blast = options.json && !isFinite(message.Blast) ? String(message.Blast) : message.Blast;
                    if (message.Radiation != null && message.hasOwnProperty("Radiation"))
                        object.Radiation = options.json && !isFinite(message.Radiation) ? String(message.Radiation) : message.Radiation;
                    if (message.Magnetic != null && message.hasOwnProperty("Magnetic"))
                        object.Magnetic = options.json && !isFinite(message.Magnetic) ? String(message.Magnetic) : message.Magnetic;
                    if (message.Gas != null && message.hasOwnProperty("Gas"))
                        object.Gas = options.json && !isFinite(message.Gas) ? String(message.Gas) : message.Gas;
                    if (message.Viral != null && message.hasOwnProperty("Viral"))
                        object.Viral = options.json && !isFinite(message.Viral) ? String(message.Viral) : message.Viral;
                    if (message.Corrosive != null && message.hasOwnProperty("Corrosive"))
                        object.Corrosive = options.json && !isFinite(message.Corrosive) ? String(message.Corrosive) : message.Corrosive;
                    if (message.Void != null && message.hasOwnProperty("Void"))
                        object.Void = options.json && !isFinite(message.Void) ? String(message.Void) : message.Void;
                    if (message.True != null && message.hasOwnProperty("True"))
                        object.True = options.json && !isFinite(message.True) ? String(message.True) : message.True;
                    return object;
                };

                /**
                 * Converts this Damage to JSON.
                 * @function toJSON
                 * @memberof Weapons.Weapon.WeaponMode.Damage
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                Damage.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return Damage;
            })();

            return WeaponMode;
        })();

        return Weapon;
    })();

    return Weapons;
})();

export { $root as default };
