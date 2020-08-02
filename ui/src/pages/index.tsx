import VenueForm from '../components/VenueForm';
import { Container } from '@material-ui/core';
import { Typography } from '@material-ui/core';

export default function Index() {
  return (<Container maxWidth="md" fixed>
    <Typography variant="h3" align="left" color="primary">Valkyrie</Typography>
    <Typography variant="subtitle1" align="left" color="secondary">Best Available Seats</Typography>
    <VenueForm />
    </Container>)
}
