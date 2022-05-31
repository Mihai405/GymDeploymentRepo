import * as React from "react";
import Grid from "@mui/material/Grid";
import PriceCard from "../components/Prices/PriceCard";
import Typography from '@mui/material/Typography';
import { Container } from "@mui/material";

let prices_data = [
  {type: "Basic", price: "$30", ad1: "• 2x group workouts of your choice ", ad2: "• Unlimited gym access ", ad3: "• Personal workout"},
  {type: "Unlimited", price: "$50", ad1: "• Unlimited group workouts", ad2: "• Unlimited gym access", ad3: "• 3x personal workouts", ad4: "• Personal nutrition plan"}
]


function Prices() {
    return (
    <Container>
      <Typography sx={{ fontSize: 42, fontWeight: 'bold', textAlign: "center", mb: 10, mt: 3 }} color="white" gutterBottom>
      Prices-Plans
    </Typography>
    <Grid container rowSpacing={3} justifyContent= "center" >
      
      {prices_data.map((element, index) => (
        <Grid item key={index}>
          <PriceCard {...element} />
        </Grid>
      ))}
    </Grid>

    </Container>
       
    );
}

export default Prices;
