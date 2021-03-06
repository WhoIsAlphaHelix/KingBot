import axios from "axios"
import { MessageEmbed, Collection, ColorResolvable } from "discord.js"
import { IMG_SIZE } from "./constants"
import { loadImage, createCanvas, Canvas } from "canvas"
import { resize_image } from "./general"
import { DefaultEmbed } from './embeds';
import { bannerByName } from "./banners"

export class Grade {
    public static R: Grade = new Grade("r")
    public static SR: Grade = new Grade("sr")
    public static SSR: Grade = new Grade("ssr")

    private name: string

    public constructor(name: string) {
        this.name = name
    }

    public toInt(): number {
        switch (this.name) {
            case "r":
                return 0
            case "sr":
                return 1
            case "ssr":
                return 2
        }
        return 0
    }

    public toEmoji(): string {
        switch (this.name) {
            case "r":
                return "<:r_:930925205122072636>"
            case "sr":
                return "<:sr:930925205172412477>"
            case "ssr":
                return "<:ssr:930925205205950514>"
        }
        return ""
    }

    public static fromString(input: string): Grade {
        switch (input.toLowerCase()) {
            case "r":
                return Grade.R
            case "sr":
                return Grade.SR
            case "ssr":
                return Grade.SSR
        }
        return Grade.R
    }

    public toString(): string {
        return this.name
    }
}

export class Type {
    public static RED: Type = new Type("red")
    public static GREEN: Type = new Type("green")
    public static BLUE: Type = new Type("blue")
    public static DARK: Type = new Type("dark")
    public static LIGHT: Type = new Type("light")

    private name: string

    private constructor(name: string) {
        this.name = name
    }

    public toInt(): number {
        switch (this.name) {
            case "red":
                return 0
            case "green":
                return 1
            case "blue":
                return 2
            case "dark":
                return 3
            case "light":
                return 4
        }
        return 0
    }

    public toDiscordColor(): ColorResolvable {
        switch (this.name){
            case "blue":
                return "#2596be"
            case "red":
                return "#ed4e2f"
            case "green":
                return "#339216"
            case "dark":
                return "#2e073b"
            case "light":
                return "#ddaf7d"
        }
        return "#ffffff"
    }

    public toEmoji(): string {
        switch (this.name) {
            case "red":
                return "<:red:930922964730392616>"
            case "green":
                return "<:green:930923202027343934>"
            case "blue":
                return "<:blue:930923202346106950>"
            case "dark":
                return "<:dark:930923204036407388>"
            case "light":
                return "light"
        }
        return ""
    }

    public static fromString(input: string): Type {
        switch (input.toLowerCase()) {
            case "blue":
            case "speed":
            case "b":
                return Type.BLUE
            case "red":
            case "strength":
            case "r":
                return Type.RED
            case "green":
            case "hp":
            case "g":
                return Type.GREEN
            case "dark":
            case "d":
                return Type.DARK
            case "light":
            case "l":
                return Type.LIGHT
        }
        return Type.BLUE
    }

    public toString(): string {
        return this.name
    }
}

export class Race {
    public static DEMON: Race = new Race("demon")
    public static GIANT: Race = new Race("giant")
    public static HUMAN: Race = new Race("human")
    public static FAIRY: Race = new Race("fairy")
    public static GODDESS: Race = new Race("goddess")
    public static UNKNOWN: Race = new Race("unknown")

    private name: string

    private constructor(name: string) {
        this.name = name
    }

    public toEmoji(): string {
        switch (this.name) {
            case "demon":
                return "<:demon:930924457437057054>"
            case "giant":
                return "<:giant:930924457369931906>"
            case "human":
                return "<:human:930924457382514800> "
            case "fairy":
                return "<:fairy~2:930924457290264647>"
            case "goddess":
                return "<:god:930924457290240061>"
            case "unknown":
                return "<:unknown:930924457504145528>"
        }
        return ""
    }

    public static fromString(input: string): Race {
        switch (input.toLowerCase()) {
            case "demon":
            case "demons":
                return Race.DEMON
            case "giant":
            case "giants":
                return Race.GIANT
            case "fairy":
            case "fairies":
                return Race.FAIRY
            case "human":
            case "humans":
                return Race.HUMAN
            case "goddess":
            case "god":
            case "gods":
                return Race.GODDESS
            case "unknown":
            case "?":
            case "unknowns":
                return Race.UNKNOWN
        }
        return Race.UNKNOWN
    }

    public toString(): string {
        return this.name
    }
}

export class Event {
    public static BASE_GAME: Event = new Event("gc")
    public static SLIME: Event = new Event("slime")
    public static AOT: Event = new Event("aot")
    public static KOF: Event = new Event("kof")
    public static NEW_YEAR: Event = new Event("newyear")
    public static HALLOWEEN: Event = new Event("halloween")
    public static FESTIVAL: Event = new Event("festival")
    public static VALENTINE: Event = new Event("valentine")
    public static RE_ZERO: Event = new Event("rezero")
    public static STRANGER_THINGS: Event = new Event("stranger")
    public static RAGNAROK: Event = new Event("ragnarok")
    public static CUSTOM: Event = new Event("custom")

    private name: string

    private constructor(name: string) {
        this.name = name
    }

    public static fromString(input: string): Event {
        switch (input.replace(" ", "").toLowerCase()) {
            case "slime":
            case "tensura":
                return Event.SLIME
            case "aot":
            case "attackontitan":
                return Event.AOT
            case "kof":
            case "kingoffighters":
            case "kingoffighter":
                return Event.KOF
            case "val":
            case "valentine":
                return Event.VALENTINE
            case "ny":
            case "newyear":
            case "newyears":
                return Event.NEW_YEAR
            case "hw":
            case "hal":
            case "halloween":
                return Event.HALLOWEEN
            case "fes":
            case "fest":
            case "festival":
                return Event.FESTIVAL
            case "re":
            case "zero":
            case "rezero":
                return Event.RE_ZERO
            case "custom":
                return Event.CUSTOM
            case "stranger":
            case "strangerthings":
            case "st":
            case "things":
                return Event.STRANGER_THINGS
            case "ragnarok":
            case "ragna":
            case "rok":
                return Event.RAGNAROK
            default:
                return Event.BASE_GAME
        }
    }

    public toString(): string {
        return this.name
    }
}

export class Affection {
    public static SINS: Affection = new Affection("sins")
    public static COMMANDMENTS: Affection = new Affection("commandments")
    public static HOLY_KNIGHTS: Affection = new Affection("holyknights")
    public static CATASTROPHES: Affection = new Affection("catastrophes")
    public static ANGELS: Affection = new Affection("archangels")
    public static NONE: Affection = new Affection("none")

    private name: string

    private constructor(name: string) {
        this.name = name
    }

    public static fromString(input: string): Affection {
        switch (input.replace(" ", "").toLowerCase()) {
            case "sins":
            case "sin":
                return Affection.SINS
            case "holyknight":
            case "holyknights":
            case "knight":
            case "knights":
                return Affection.HOLY_KNIGHTS
            case "commandments":
            case "commandment":
                return Affection.COMMANDMENTS
            case "catastrophes":
            case "catastrophe":
                return Affection.CATASTROPHES
            case "archangels":
            case "archangel":
            case "angels":
            case "angel":
                return Affection.ANGELS
            case "none":
            case "no":
                return Affection.NONE
        }
        return Affection.NONE
    }

    public toString(): string {
        return this.name
    }
}

export const ALL_RACES: Race[] = [Race.DEMON, Race.GIANT, Race.HUMAN, Race.FAIRY, Race.GODDESS, Race.UNKNOWN]
export const ALL_GRADES: Grade[] = [Grade.R, Grade.SR, Grade.SSR]
export const ALL_TYPES: Type[] = [Type.RED, Type.GREEN, Type.BLUE, Type.DARK, Type.LIGHT]
export const ALL_EVENT: Event[] = [Event.BASE_GAME, Event.SLIME, Event.AOT, Event.KOF, Event.FESTIVAL, Event.NEW_YEAR, Event.VALENTINE, Event.HALLOWEEN,
    Event.RE_ZERO, Event.STRANGER_THINGS, Event.RAGNAROK]
export const ALL_AFFECTIONS: Affection[] = [Affection.SINS, Affection.COMMANDMENTS, Affection.CATASTROPHES, Affection.ANGELS, Affection.HOLY_KNIGHTS, Affection.NONE]

export let unitList: Collection<number, Unit> = new Collection()
export let rUnitList: Collection<number, Unit> = new Collection()
export let srUnitList: Collection<number, Unit> = new Collection()

export let frames: {
    blue: {r: Canvas, sr: Canvas, ssr: Canvas},
    red: {r: Canvas, sr: Canvas, ssr: Canvas},
    green: {r: Canvas, sr: Canvas, ssr: Canvas}
}
export let frameBackgrounds: {r: Canvas, sr: Canvas, ssr: Canvas}

export async function load_frames() {
    frames = {
        blue: {
            r: resize_image(await loadImage("data/gc/frames/blue_r_frame.png"), IMG_SIZE, IMG_SIZE),
            sr: resize_image(await loadImage("data/gc/frames/blue_sr_frame.png"), IMG_SIZE, IMG_SIZE),
            ssr:  resize_image(await loadImage("data/gc/frames/blue_ssr_frame.png"), IMG_SIZE, IMG_SIZE)
        },
        red: {
            r:  resize_image(await loadImage("data/gc/frames/red_r_frame.png"), IMG_SIZE, IMG_SIZE),
            sr:  resize_image(await loadImage("data/gc/frames/red_sr_frame.png"), IMG_SIZE, IMG_SIZE),
            ssr:  resize_image(await loadImage("data/gc/frames/red_ssr_frame.png"), IMG_SIZE, IMG_SIZE),
        },
        green: {
            r:  resize_image(await loadImage("data/gc/frames/green_r_frame.png"), IMG_SIZE, IMG_SIZE),
            sr:  resize_image(await loadImage("data/gc/frames/green_sr_frame.png"), IMG_SIZE, IMG_SIZE),
            ssr:  resize_image(await loadImage("data/gc/frames/green_ssr_frame.png"), IMG_SIZE, IMG_SIZE),
        }
    }

    frameBackgrounds = {
        r: resize_image(await loadImage("data/gc/frames/r_frame_background.png"), IMG_SIZE, IMG_SIZE),
        sr: resize_image(await loadImage("data/gc/frames/sr_frame_background.png"), IMG_SIZE, IMG_SIZE),
        ssr: resize_image(await loadImage("data/gc/frames/ssr_frame_background.png"), IMG_SIZE, IMG_SIZE),
    }
}

/*
function compose_icon(attribute, grade, background = null) {
    bg_frame = FRAME_BG[grade].copy()
    if(background === null)
        background = bg_frame
    else
        background = background
}*/

export class Unit {

    private _id: number
    public get id(): number {
        return this._id
    }
    public set id(value: number) {
        this._id = value
    }
    private _name: string
    public get name(): string {
        return this._name
    }
    public set name(value: string) {
        this._name = value
    }
    private _simpleName: string
    public get simpleName(): string {
        return this._simpleName
    }
    public set simpleName(value: string) {
        this._simpleName = value
    }
    private _altNames: string[] = []
    public get altNames(): string[] {
        return this._altNames
    }
    public set altNames(value: string[]) {
        this._altNames = value
    }
    private _type: Type
    public get type(): Type {
        return this._type
    }
    public set type(value: Type) {
        this._type = value
    }
    private _grade: Grade
    public get grade(): Grade {
        return this._grade
    }
    public set grade(value: Grade) {
        this._grade = value
    }
    private _race: Race
    public get race(): Race {
        return this._race
    }
    public set race(value: Race) {
        this._race = value
    }
    private _event: Event = Event.BASE_GAME
    public get event(): Event {
        return this._event
    }
    public set event(value: Event) {
        this._event = value
    }
    private _affection: Affection = Affection.NONE
    public get affection(): Affection {
        return this._affection
    }
    public set affection(value: Affection) {
        this._affection = value
    }
    private _iconPath: string = "gc/icons/{}.png"
    public get iconPath(): string {
        return this._iconPath
    }
    public set iconPath(value: string) {
        this._iconPath = value
    }
    private _jp: boolean = false
    public get jp(): boolean {
        return this._jp
    }
    public set jp(value: boolean) {
        this._jp = value
    }
    private _emoji: string
    public get emoji(): string {
        return this._emoji
    }
    public set emoji(value: string) {
        this._emoji = value
    }
    private _homeBanners: string[] = []
    public get homeBanners(): string[] {
        return this._homeBanners
    }
    public set homeBanners(value: string[]) {
        this._homeBanners = value
    }
    private _icon: Canvas = undefined

    public constructor(
        id: number,
        name: string,
        simple_name: string,
        alt_names: string[] = [],
        type: Type,
        grade: Grade,
        race: Race,
        event: Event = Event.BASE_GAME,
        affection: Affection = Affection.NONE,
        icon_path: string = "gc/icons/{}.png",
        jp: boolean = false,
        emoji: string,
        home_banner: string[] = []) {
            this.id = id
            this.name = name
            this.simpleName = simple_name
            this.type = type
            this.grade = grade
            this.race = race
            this.event = event
            this.affection = affection
            this.iconPath = icon_path.replace("{}", this.id.toString())
            this.jp = jp
            this.emoji = `<:${this.id > 9 ? this.id : "0" + this.id}:${emoji}>`
            this.homeBanners = home_banner
            this.altNames = alt_names
    }

    public info_embed(): MessageEmbed {
        const embed = new DefaultEmbed()
            .setTitle(this.name)
            .setColor(this.type.toDiscordColor())

        if(this.altNames.length > 0)
            embed.addField("Alternative Names", `\`\`\`${this.altNames.join(",\n")}\`\`\``, true)

        embed.addField("Type " + this.type.toEmoji(), `\`\`\`${this.type}\`\`\``, true)
            .addField("Grade " + this.grade.toEmoji(), `\`\`\`${this.grade}\`\`\``, true)
            .addField("Race " + this.race.toEmoji(), `\`\`\`${this.race}\`\`\``, true)
            .addField("Event", `\`\`\`${this.event}\`\`\``, true)
            .addField("Affection", `\`\`\`${this.affection}\`\`\``, true)
            .addField("JP", `\`\`\`${this.jp ? "Yes" : "No"}\`\`\``, true)
            .addField("ID", `\`\`\`${this.id}\`\`\``, true)
            .addField("Emoji " + this.emoji, `\`\`\`${this.emoji}\`\`\``, true)

        if(this.homeBanners.length > 0)
            embed.addField("Included in", `\`\`\`${this.homeBanners.map(bannerStr => bannerByName(bannerStr).prettyName).join(",\n")}\`\`\``, false)

        embed.setThumbnail(`attachment://${this.id}.png`)

        return embed
    }

    public async refreshIcon(): Promise<Canvas> {
        if (this.id < 0) {
            const response = await axios.get(this.iconPath, {responseType: 'arraybuffer'})
            this.icon = resize_image(await loadImage(Buffer.from(response.data, "utf-8")), IMG_SIZE, IMG_SIZE)
        }

        return this.icon
    }

    public get icon(): Canvas {
        return this._icon
    }

    public set icon(value: Canvas) {
        this._icon = value
    }

    public async updateIcon(): Promise<Unit> {
        if (this.id > 0) {
            const canvas = createCanvas(IMG_SIZE, IMG_SIZE)
            const ctx = canvas.getContext("2d")
            const icon = await loadImage(this.iconPath)

            ctx.save()
            ctx.scale(IMG_SIZE / icon.width, IMG_SIZE / icon.height)
            ctx.drawImage(icon, 0, 0)
            ctx.restore()

            this.icon = canvas
        }

        return new Promise(res => res(this))
    }
}

export function unitById(id: number): Unit {
    return unitList.get(id)
}

export function unitByIds(ids: number[]): Collection<number, Unit> {
    return unitList.filter(u => ids.includes(u.id))
}

export function unitByName(name: string): Unit {
    return unitList.find(u => u.name === name)
}

export function unitByNames(names: string[]): Collection<number, Unit> {
    return unitList.filter(u =>names.includes(u.name))
}

export function unitByVagueName(name: string, samples: Collection<number, Unit> = new Collection(unitList)): Collection<number, Unit> {
    name = name.toLowerCase().trim()

    return samples.filter((u) => {
        return u.altNames.includes(name) || u.name.toLowerCase().includes(` ${name}`)
    })
}

export function longestNamedUnit(samples: Collection<number, Unit> = unitList): Unit {
    samples = new Collection<number, Unit>(samples)
    samples.sort((a, b) => {
        return a.name.length - b.name.length
    })

    return samples.first()
}
