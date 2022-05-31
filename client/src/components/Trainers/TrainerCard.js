import * as React from "react";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";

export default function TrainerCard({ _id, first_name, last_name, email }) {
  return (
    <ImageListItem key={_id}>
      <img
        src={`http://localhost:4000/users/${_id}/image?w=248&fit=crop&auto=format`}
        srcSet={`http://localhost:4000/users/${_id}/image?w=248&fit=crop&auto=format&dpr=2 2x`}
        alt={`${first_name} ${last_name}`}
        loading="lazy"
      />
      <ImageListItemBar title={`${first_name} ${last_name}`} subtitle={email} />
    </ImageListItem>
  );
}
