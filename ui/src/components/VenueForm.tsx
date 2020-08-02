import { useFormik } from 'formik';
import { TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';
import Venue from './Venue';
import fetch from 'isomorphic-unfetch';
import BestAvailableSeatsResult from './BestAvailableSeatsResult';
import { object, number , ref } from 'yup';

const validationSchema = object({
  venue: object({layout: object({
      rows: number().required().min(2).max(26),
      columns: number().required().min(2).max(20)
    })
  }),
  party_of: number().required().min(1).max(ref('venue.layout.columns'))
})

function VenueForm () {
  const [checkedItems, setCheckedItems] = React.useState(new Set)
  const [bestAvailableSeats, setBestAvailableSeats] = React.useState(new Array)
  const formik = useFormik({
    initialValues: {
      venue: {
        layout: {
          rows: 5,
          columns: 5
        }
      },
      party_of: 1,
      seats: []
    },
    validationSchema,
    onSubmit: values => {
      const seats = [...checkedItems].map((item) => { const data = item.match(/seats\[(([a-zA-Z])(\d+))\]/); return { id: data[1], row: data[2], column: data[3]} })
      return findBestAvailableSeat(JSON.stringify({...values, ...{ seats: seats }}))
    }
  })

  const findBestAvailableSeat = async function(params : string) {
    const res = await fetch('http://localhost:3001/api/v1/venue/lookup_best_available_seats', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: params
    })
    const data = await res.json()
    setBestAvailableSeats(data)
  }

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          id='venue.layout.rows'
          name='venue.layout.rows'
          label='Rows'
          InputProps={{ inputProps: { min: 0, max: 10 } }}
          onChange={(e) => { setBestAvailableSeats([]); checkedItems.clear(); formik.handleChange(e)} }
          value={formik.values.venue.layout.rows}
          error={Boolean(formik.errors.venue?.layout?.rows)}
          helperText={formik.errors.venue?.layout?.rows}
        />
        <TextField
          id='venue.layout.columns'
          name='venue.layout.columns'
          label='Columns'
          InputProps={{ inputProps: { min: 0, max: 10 } }}
          onChange={(e) => { setBestAvailableSeats([]); checkedItems.clear(); formik.handleChange(e)} }
          value={formik.values.venue.layout.columns}
          error={Boolean(formik.errors.venue?.layout?.columns)}
          helperText={formik.errors.venue?.layout?.columns}
        />
        <TextField
          id='party_of'
          name='party_of'
          label='Party of'
          onChange={formik.handleChange}
          value={formik.values.party_of}
          error={Boolean(formik.errors.party_of)}
          helperText={formik.errors.party_of}
        />
        <Button disabled={formik.isSubmitting} type='submit' color='primary' variant='outlined'>Find Best Seats</Button>
      </form>
      <BestAvailableSeatsResult seats={bestAvailableSeats}/>
      <Venue checkedItems={checkedItems} row={formik.values.venue.layout.rows} column={formik.values.venue.layout.columns}/>
    </div>
  )
};

export default VenueForm;
