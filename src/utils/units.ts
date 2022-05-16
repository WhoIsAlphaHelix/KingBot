import { Collection } from "discord.js";
import { IMG_SIZE } from "../utilities/constants";
import { loadImage, Canvas } from "canvas";
import { resizeImage } from "./display";
import { Race, Grade, Type, Event, Affection, Unit } from "../models/unit";
import { unitCache } from "../utilities/cache";

export const ALL_RACES: Race[] = [Race.DEMON, Race.GIANT, Race.HUMAN, Race.FAIRY, Race.GODDESS, Race.UNKNOWN];
export const ALL_GRADES: Grade[] = [Grade.R, Grade.SR, Grade.SSR];
export const ALL_TYPES: Type[] = [Type.RED, Type.GREEN, Type.BLUE, Type.DARK, Type.LIGHT];
export const ALL_EVENT: Event[] = [
	Event.BASE_GAME,
	Event.SLIME,
	Event.AOT,
	Event.KOF,
	Event.FESTIVAL,
	Event.NEW_YEAR,
	Event.VALENTINE,
	Event.HALLOWEEN,
	Event.RE_ZERO,
	Event.STRANGER_THINGS,
	Event.RAGNAROK,
];
export const ALL_AFFECTIONS: Affection[] = [Affection.SINS, Affection.COMMANDMENTS, Affection.CATASTROPHES, Affection.ANGELS, Affection.HOLY_KNIGHTS, Affection.NONE];

export let unitList: Collection<number, Unit> = new Collection();
export let rUnitList: Collection<number, Unit> = new Collection();
export let srUnitList: Collection<number, Unit> = new Collection();

export let frames: {
	blue: { r: Canvas; sr: Canvas; ssr: Canvas };
	red: { r: Canvas; sr: Canvas; ssr: Canvas };
	green: { r: Canvas; sr: Canvas; ssr: Canvas };
};
export let frameBackgrounds: { r: Canvas; sr: Canvas; ssr: Canvas };

export async function load_frames() {
	frames = {
		blue: {
			r: resizeImage(await loadImage("data/gc/frames/blue_r_frame.png"), IMG_SIZE, IMG_SIZE),
			sr: resizeImage(await loadImage("data/gc/frames/blue_sr_frame.png"), IMG_SIZE, IMG_SIZE),
			ssr: resizeImage(await loadImage("data/gc/frames/blue_ssr_frame.png"), IMG_SIZE, IMG_SIZE),
		},
		red: {
			r: resizeImage(await loadImage("data/gc/frames/red_r_frame.png"), IMG_SIZE, IMG_SIZE),
			sr: resizeImage(await loadImage("data/gc/frames/red_sr_frame.png"), IMG_SIZE, IMG_SIZE),
			ssr: resizeImage(await loadImage("data/gc/frames/red_ssr_frame.png"), IMG_SIZE, IMG_SIZE),
		},
		green: {
			r: resizeImage(await loadImage("data/gc/frames/green_r_frame.png"), IMG_SIZE, IMG_SIZE),
			sr: resizeImage(await loadImage("data/gc/frames/green_sr_frame.png"), IMG_SIZE, IMG_SIZE),
			ssr: resizeImage(await loadImage("data/gc/frames/green_ssr_frame.png"), IMG_SIZE, IMG_SIZE),
		},
	};

	frameBackgrounds = {
		r: resizeImage(await loadImage("data/gc/frames/r_frame_background.png"), IMG_SIZE, IMG_SIZE),
		sr: resizeImage(await loadImage("data/gc/frames/sr_frame_background.png"), IMG_SIZE, IMG_SIZE),
		ssr: resizeImage(await loadImage("data/gc/frames/ssr_frame_background.png"), IMG_SIZE, IMG_SIZE),
	};
}

/*
function compose_icon(attribute, grade, background = null) {
    bg_frame = FRAME_BG[grade].copy()
    if(background === null)
        background = bg_frame
    else
        background = background
}*/

export function unitExists(name: string, grade: Grade, type: Type) {
	return (
		[...unitList.values()].filter((u: Unit) => (u.simpleName.toLowerCase() === name || u.variationName.toLowerCase() === name) && u.grade === grade && u.type === type).length >
		0
	);
}

export async function unitById(id: number): Promise<Unit> {
	return await unitCache.get(id.toString());
}

export function unitByIds(ids: number[]): Collection<number, Unit> {
	return unitList.filter(u => ids.includes(u.id));
}

export function unitByName(name: string): Unit {
	return unitList.find(u => u.name === name);
}

export function unitByNames(names: string[]): Collection<number, Unit> {
	return unitList.filter(u => names.includes(u.name));
}

export function unitByVagueName(name: string, samples: Collection<number, Unit> = new Collection(unitList)): Collection<number, Unit> {
	name = name.toLowerCase().trim();

	return samples.filter(u => {
		return u.altNames.includes(name) || u.name.toLowerCase().includes(` ${name}`);
	});
}

export function longestNamedUnit(samples: Collection<number, Unit> = unitList): Unit {
	samples = new Collection<number, Unit>(samples);
	samples.sort((a, b) => {
		return a.name.length - b.name.length;
	});

	return samples.first();
}

export function sortUnits(unitList: Unit[]): void {
	unitList.sort((a: Unit, b: Unit) => {
		if (a.event === Event.CUSTOM) return -1;
		else return 1;
	});
}