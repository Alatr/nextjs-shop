import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, Button, CardActionArea, CardActions, Chip } from "@mui/material";

export default function Product({ image, description, title, price }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <Box sx={{ paddingTop: 1 }}>
        <CardMedia
          component="img"
          sx={{ objectFit: "contain" }}
          height="160"
          image={image}
          alt={title}
        />
      </Box>
      <CardContent>
        <Typography noWrap={true} gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Chip label={`${price} $`} sx={{ marginBottom: 1 }} />
        <Typography
          variant="body2"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: "4",
            lineClamp: "4",
            WebkitBoxOrient: "vertical",
          }}
          color="text.secondary"
        >
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
