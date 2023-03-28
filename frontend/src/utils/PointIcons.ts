import {
  faComment,
  faExclamationTriangle,
  faChartBar,
  faQuoteLeft,
  faLightbulb,
  faTasks,
  faFileAlt,
  faGavel,
  faUserSecret,
  faBalanceScale,
  faQuestion,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";

export default function getPointIcons(type: string): IconDefinition {
  switch (type) {
    case "Fact":
      return faFileAlt;
    case "Quote":
      return faQuoteLeft;
    case "Remark":
      return faComment;
    case "Opinion":
      return faLightbulb;
    case "Analysis":
      return faTasks;
    case "Description":
      return faFileAlt;
    case "Explanation":
      return faLightbulb;
    case "Allegation":
      return faGavel;
    case "Rumor":
      return faUserSecret;
    case "Statistic":
      return faChartBar;
    case "Testimonie":
      return faBalanceScale;
    case "Question":
      return faQuestion;
    default:
      return faExclamationTriangle;
  }
}
