export default function getPointFontSize(priority: number): string {
  switch (priority) {
    case 1:
    case 2:
      return "text-sm";
    case 3:
    case 4:
      return "text-base";
    case 5:
    case 6:
      return "text-lg";
    case 7:
    case 8:
      return "text-xl";
    case 9:
    case 10:
      return "text-2xl";
    default:
      return "text-base";
  }
}
