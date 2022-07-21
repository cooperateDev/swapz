import { Link } from "react-router-dom"

import Grid from "../../components/tailwind/Grid"

export default function BalanceSection({ label, linkTo }) {
  const labelContent = <small>{label} </small>

  let labelDisplay
  if (linkTo) {
    labelDisplay = (
      <Link to={linkTo} className="hover:underline hover:text-gray-600">
        {labelContent}
      </Link>
    )
  } else {
    labelDisplay = labelContent
  }

  return (
    <Grid gap={2} cols={{ xs: 1 }}>
      <div className="text-right text-purple-700">
        {labelDisplay}
        <small>
          <span className="text-white">0.0</span>
        </small>
      </div>
    </Grid>
  )
}
