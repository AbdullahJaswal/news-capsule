export default function getPointColors(type: string): string {
  switch (type) {
    case "Fact":
      return `hsl(217, 71%, 50%)`;
    case "Quote":
      return `hsl(233, 65%, 50%)`;
    case "Remark":
      return `hsl(158, 83%, 50%)`;
    case "Opinion":
      return `hsl(46, 100%, 50%)`;
    case "Analysis":
      return `hsl(263, 60%, 50%)`;
    case "Description":
      return `hsl(194, 96%, 50%)`;
    case "Explanation":
      return `hsl(329, 70%, 50%)`;
    case "Allegation":
      return `hsl(0, 100%, 50%)`;
    case "Rumor":
      return `hsl(33, 100%, 50%)`;
    case "Statistic":
      return `hsl(212, 18%, 50%)`;
    case "Testimony":
      return `hsl(217, 29%, 50%)`;
    case "Question":
      return `hsl(0, 0%, 50%)`;
    default:
      return "";
  }
}
