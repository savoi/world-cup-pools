import Typography from '@mui/material/Typography'
import TextMobileStepper from '../src/components/TextMobileStepper'

export default function Home({ message }) {

  return (
    <div>
        <TextMobileStepper />
    </div>
  )
}

export async function getStaticProps() {
  const message = "Hello"
  return {
    props: {
      message
    },
    revalidate: 1200, // In seconds
  }
}