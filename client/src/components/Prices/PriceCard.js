import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from "@mui/material/Container";
import Typography from '@mui/material/Typography';


function PriceCard({ type, price, ad1, ad2, ad3, ad4 }) {
  return (
    <Container>
    <Card sx={{ minWidth: 250, backgroundColor: 'text.primary' }} variant="outlined">
    <CardContent>
      <Typography sx={{ fontSize: 25, fontWeight: 'bold' }} color="white" gutterBottom>
        {type}
      </Typography>
      <Typography sx={{ mb: 1.5 }} variant="h5" component="div" color="white">
        {price}
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="white">
        Included:
      </Typography>
      <Typography variant="body2" color="white">
        {ad1} <br />
      </Typography>
      <Typography variant="body2" color="white">
        {ad2} <br />
      </Typography>
      <Typography variant="body2" color="white">
        {ad3} <br />
      </Typography>
      <Typography variant="body2" color="white">
        {ad4} 
      </Typography>
    </CardContent>
    </Card>
    </Container>
  );
}

export default PriceCard;

