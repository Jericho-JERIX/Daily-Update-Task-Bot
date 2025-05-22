export function convertSecondToHHMMSSMS(ms: number) {
	const seconds = Math.floor(ms / 1000);
	const minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);
	const remainingSeconds = seconds % 60;
	const remainingMinutes = minutes % 60;
	const remainingHours = hours % 24;

    return `${remainingHours < 10 ? "0" + remainingHours : remainingHours}:${
		remainingMinutes < 10 ? "0" + remainingMinutes : remainingMinutes
	}:${remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds}.${
		ms % 1000
	}`;
}
