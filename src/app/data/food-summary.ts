import { JoinTour } from './join-tours.data';

export function getFoodSummary(tour: JoinTour): string {
  if (tour.foodHighlight) {
    return tour.foodHighlight;
  }
  return 'ทานอาหารเมนูพิเศษภัตตาคารท้องถิ่นตลอดทริป';
}
