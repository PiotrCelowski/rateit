import Stack from "@mui/material/Stack"
import { ErrorPage } from "./ErrorPage"
import Bar from "../components/Bar/Bar"
import Footer from "../components/Footer/Footer"
import { GradientBackgroundBox } from "../utils/SigninLayout"

export const RootErrorPage = () => {
  return (
    <Stack sx={{ minHeight: '100vh' }}>
      <Bar root />
      <GradientBackgroundBox sx={{ placeContent: 'center'}}>
        <ErrorPage />
      </GradientBackgroundBox>
      <Footer />
    </Stack>
  )
}
