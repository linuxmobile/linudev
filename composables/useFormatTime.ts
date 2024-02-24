import { format, register } from "timeago.js";

type LocaleFunc = (
	number: number,
	index: number,
	totalSec?: number,
) => [string, string];

const localeFunc: LocaleFunc = (number, index, totalSec?) => {
	const r: [string, string][] = [
		["justo ahora", "ahora mismo"],
		["hace %s segundos", "en %s segundos"],
		["hace 1 minuto", "en 1 minuto"],
		["hace %s minutos", "en %s minutos"],
		["hace 1 hora", "en 1 hora"],
		["hace %s horas", "en %s horas"],
		["hace 1 día", "en 1 día"],
		["hace %s días", "en %s días"],
		["hace 1 semana", "en 1 semana"],
		["hace %s semanas", "en %s semanas"],
		["hace 1 mes", "en 1 mes"],
		["hace %s meses", "en %s meses"],
		["hace 1 año", "en 1 año"],
		["hace %s años", "en %s años"],
	];
	return r[index] ?? ["", ""]; // Usa el operador de coalescencia nula para garantizar el retorno de una tupla
};

register("es", localeFunc);

export const useFormatTime = () => {
	const formatTimeAgo = (date: Date | string | number): string => {
		return format(date, "es");
	};

	return { formatTimeAgo };
};
