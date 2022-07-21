import PageWrapper from "../../components/layouts/PageWrapper";
import StandardPageContainer from "../../components/layouts/StandardPageContainer";

import PortfolioContent from "./PortfolioContent";

export default function Portfolio() {
  return (
    <PageWrapper>
      <StandardPageContainer title="Nerve Portfolio">
        <div className="mt-4">
          <PortfolioContent />
        </div>
      </StandardPageContainer>
    </PageWrapper>
  );
}
