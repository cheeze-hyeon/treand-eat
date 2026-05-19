/** BottomNavigation + Drawer.Content `bottom` offset */
export const MAP_BOTTOM_NAV_HEIGHT = 69;

/** Peek drawer content: handle (~20) + padding (16) + card (107) */
export const MAP_DRAWER_PEEK_HEIGHT_PX = 148;

export const MAP_DRAWER_PEEK_SNAP = `${MAP_DRAWER_PEEK_HEIGHT_PX}px` as const;

export const MAP_DRAWER_EXPANDED_SNAP = 0.88;

export const MAP_FLOATING_CONTROLS_GAP = 8;

/** 탭바 바로 위 */
export function getMapFloatingControlsBottom(): string {
  return `calc(${MAP_BOTTOM_NAV_HEIGHT}px + ${MAP_FLOATING_CONTROLS_GAP}px)`;
}
