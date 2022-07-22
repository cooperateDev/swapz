import { XNERVE_POOL_NAME } from "../../constants";

import Grid from "../../components/tailwind/Grid";

import StakeCard from "../../components/StakeCard";

import PageWrapper from "../../components/layouts/PageWrapper";
import StandardPageContainer from "../../components/layouts/StandardPageContainer";

import XNRVForm from "./XNRVForm";

export default function XNrvPage() {
  return (
    <>
      <PageWrapper>
        <StandardPageContainer title="xNRV">
          <Grid cols={{ xs: 1 }} gap={6} className="mt-4 justify-center">
            <div className="w-full sm:w-600 justify-self-center">
              <XNRVForm />
            </div>
            <div className="w-full sm:w-600 justify-self-center">
              <StakeCard pid={1} />
            </div>
          </Grid>
        </StandardPageContainer>
      </PageWrapper>
    </>
  );
}
