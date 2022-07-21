import PageWrapper from "../../components/layouts/PageWrapper"
import Grid from "../../components/tailwind/Grid"

import AirdropCard from "./AirdropCard"
import AirdropCard2 from "./AirdropCard2"

export default function ClaimPage() {
  return (
    <PageWrapper>
      <main className="relative z-0 overflow-y-auto focus:outline-none h-full text-white">
        <div className="py-6">
          <Grid
            cols={{ sm: 1, md: 2 }}
            gap={6}
            className="py-28 justify-center px-2 sm:px-6 md:px-8"
          >
            <div className="place-self-center w-full lg:w-450 my-6">
              <AirdropCard />
            </div>
            <div className="place-self-center w-full lg:w-450 my-6">
              <AirdropCard2 />
            </div>
          </Grid>
        </div>
      </main>
    </PageWrapper>
  )
}
