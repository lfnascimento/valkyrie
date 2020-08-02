import { useFormik } from 'formik';
import { TextField, Grid } from '@material-ui/core';
import { Button } from '@material-ui/core';
import Venue from './Venue';
import fetch from 'isomorphic-unfetch';
import BestAvailableSeatsResult from './BestAvailableSeatsResult';
import { object, number , ref } from 'yup';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { FormGroup, Typography } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        marginTop: theme.spacing(2),
        width: '100%',
      },
    },
    button: {
      color: '#E0E0E0',
      marginTop: '5%'
    },
    seatsFormGroup: {
      marginTop: '30%'
    }
  }),
);

const validationSchema = object({
  venue: object({layout: object({
      rows: number().required('is a required field').min(2, 'must be greater than or equal to 2').
        max(26, 'must be less than or equal to 26'),
      columns: number().required('is a required field').min(2, 'must be greater than or equal to 2').
        max(26, 'must be less than or equal to 26'),
    })
  }),
  party_of: number().min(1, 'must be greater than or equal to 1').
    max(ref('venue.layout.columns'), 'must be less than or equal to Number of Columns')
})

function VenueForm () {
  const [checkedItems, setCheckedItems] = React.useState(new Set)
  const [bestAvailableSeats, setBestAvailableSeats] = React.useState(new Array)
  const classes = useStyles();
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
      const seats = [...checkedItems].map((item) => {
        const data = item.match(/seats\[(([a-zA-Z])(\d+))\]/); return { id: data[1], row: data[2], column: data[3]}
      })
      return findBestAvailableSeat(JSON.stringify({...values, ...{ seats: seats }}))
    }
  })

  const findBestAvailableSeat = async function(params : string) {
    try {
      const res = await fetch('http://localhost:3001/api/v1/venue/find_best_available_seats', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: params
      })
      const data = await res.json()
      if (res.status == 422) {
        formik.setErrors(data)
        setBestAvailableSeats([])
      } else {
        setBestAvailableSeats(data)
      }
    } catch(error) {
      console.log(error)
    }
  }

  return (
    <div>
      <Grid container className={classes.root} spacing={5}>
        <Grid item xs={12} sm={8}>
          {
            formik.isValid ? <Venue checkedItems={checkedItems}
                                    row={formik.values.venue.layout.rows}
                                    column={formik.values.venue.layout.columns}/> : null
          }
        </Grid>
        <Grid item xs={12} sm={4}>
          <form className={classes.root} onSubmit={formik.handleSubmit}>
            <FormGroup row={true}>
              <TextField
                color='secondary'
                id='venue.layout.rows'
                name='venue.layout.rows'
                label='Number of Rows'
                onChange={(e) => { setBestAvailableSeats([]); checkedItems.clear(); formik.handleChange(e)} }
                value={formik.values.venue.layout.rows}
                error={Boolean(formik.errors.venue?.layout?.rows)}
                helperText={formik.errors.venue?.layout?.rows}
              />
              <TextField
                color='secondary'
                id='venue.layout.columns'
                name='venue.layout.columns'
                label='Number of Columns'
                InputLabelProps={{color: 'secondary'}}
                onChange={(e) => { setBestAvailableSeats([]); checkedItems.clear(); formik.handleChange(e)} }
                value={formik.values.venue.layout.columns}
                error={Boolean(formik.errors.venue?.layout?.columns)}
                helperText={formik.errors.venue?.layout?.columns}
              />
            </FormGroup>
            <Typography color="secondary">Please, select seats that should be available</Typography>
            <FormGroup className={classes.seatsFormGroup}>
              <TextField
                id='party_of'
                name='party_of'
                label='How many consecutive seats?'
                onChange={formik.handleChange}
                value={formik.values.party_of}
                error={Boolean(formik.errors.party_of)}
                helperText={formik.errors.party_of}
              />
            <Button className={classes.button} startIcon={<SearchIcon/>} disabled={formik.isSubmitting} type='submit' color='primary' variant='contained'>Find Best Seats</Button>
            </FormGroup>
            <BestAvailableSeatsResult seats={bestAvailableSeats}/>
          </form>
        </Grid>
      </Grid>
    </div>
  )
};

export default VenueForm;
