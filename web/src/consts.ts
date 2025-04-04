import { getGridConstants } from "../public/pkg/snake_spark";

export const grid = getGridConstants();

export const VISUAL = {
    gap: 4,
} as const;

export const colors = {
    grid: {
        darkTile1: 0x121212, // Very dark charcoal gray
        darkTile2: 0x1c1c1c, // Almost black
        border: 0x39ff14, // Fluorescent green
    },
    snake: {
        human: 0x2d6a4f, // Darker fluorescent green
        ai: 0xbd33a4, // Neon purple
    },
    food: 0xff0011, // Neon red
} as const;
