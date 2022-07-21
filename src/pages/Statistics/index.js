import PageWrapper from "../../components/layouts/PageWrapper";
import StandardPageContainer from "../../components/layouts/StandardPageContainer";

import StatisticsContent from "./StatisticsContent";

export default function Statistics() {
  return (
    <PageWrapper>
      <StandardPageContainer title="Statistics">
        <div className="mt-4">
          <StatisticsContent />
        </div>
      </StandardPageContainer>
    </PageWrapper>
  );
}
