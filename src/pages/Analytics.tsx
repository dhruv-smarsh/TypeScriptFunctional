import React, {useEffect, useState} from 'react'
import {useFormik} from "formik";
import axios from "axios";
import {Box, Button, Card, CardContent, InputLabel, MenuItem, Select, Typography,} from "@mui/material";

const initialValues = {
  asteroid : ''
};

const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      •
    </Box>
);

export default function Analytics() {
  const  [asteroidList, setAsteroidList] = useState([]);
  const  [asteroidDetail, setAsteroidDetail] = useState({
    name :'',
    nasa_jpl_url: '',
    is_potentially_hazardous_asteroid: ''
  });
  useEffect(() => {
    axios.get(`https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=N1nPwhyrIoJmgpdZGqqknNkAfyo6Vvw41N9m58Gz`).then((res: any) => {
      if(res.data) {
        setAsteroidList(res.data.near_earth_objects);
      }
    });
  }, []);

  const handleClickOpen = () => {
    let number = Math.floor(Math.random() * asteroidList.length);
    let asteroidId = asteroidList[number - 1] || {};
    console.log(asteroidId)
    const {id} = asteroidId;
    initialValues.asteroid = id;
    handleSubmit();
  };

  const {values, errors, touched, handleBlur, handleChange, handleSubmit} = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      axios.get(`https://api.nasa.gov/neo/rest/v1/neo/${values.asteroid}?api_key=N1nPwhyrIoJmgpdZGqqknNkAfyo6Vvw41N9m58Gz`).then((res: any) => {
        if(res.data) {
          setAsteroidDetail(res.data);
        }
      })
    }
  });
  return (
      <div className={`container`}>
        <form onSubmit={handleSubmit}>
          <div className={`d-flex justify-content-center`}>
            <InputLabel id="demo-simple-select-label">Asteroid</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Asteroid"
                name="asteroid"
                value={values.asteroid}
                onChange={handleChange}
                onBlur={handleBlur}
            >
              {asteroidList.map((res: any) => {
                return  <MenuItem key={res.id} value={res.id}>{res.neo_reference_id}</MenuItem>
              })}
            </Select>
            {/*<ErrorMessage name="country"/>*/}
            {touched.asteroid && errors.asteroid ? (
                <p className="form-error">{errors.asteroid}</p>
            ) : null}
          </div>
          {/*<TextField  id="outlined-basic" onChange={handleChange} name="country" value={values.country} label="Outlined" variant="outlined" />*/}
          <Button disabled={values.asteroid === ''} type="submit" variant="outlined">Submit</Button>
        </form>

        <Button variant="outlined" type="button" onClick={handleClickOpen}>Random Asteroid</Button>

        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Temprature Details
            </Typography>
            <Typography variant="h5" component="div">
              name: {asteroidDetail.name}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              nasa_jpl_url: {<a href={asteroidDetail.nasa_jpl_url}>{asteroidDetail.nasa_jpl_url}</a>}
            </Typography>
            <Typography variant="body2">
              is_potentially_hazardous_asteroid: {asteroidDetail.is_potentially_hazardous_asteroid}
            </Typography>
          </CardContent>
        </Card>
      </div>
  )
}
