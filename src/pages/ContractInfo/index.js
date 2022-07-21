import PageWrapper from "../../components/layouts/PageWrapper";
import StandardPageContainer from "../../components/layouts/StandardPageContainer";

import ContractInfoContent from "./ContractInfoContent";

export default function ContractInfo() {
  return (
    <PageWrapper>
      <StandardPageContainer title="Contract Info">
        <div className="mt-4">
          <ContractInfoContent />
        </div>
      </StandardPageContainer>
    </PageWrapper>
  );
}
