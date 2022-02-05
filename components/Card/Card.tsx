import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box, Chip, Rating } from "@mui/material";
import Link from "next/link";
import Image from "next/image";

const overflowTextStyle = {
  marginBottom: 1,
  overflow: "hidden",
  textOverflow: "ellipsis",
  display: "-webkit-box",
  WebkitLineClamp: "4",
  lineClamp: "4",
  WebkitBoxOrient: "vertical",
};

export default function Product({
  image,
  description,
  title,
  price,
  id,
  category,
  rate,
}) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <Box
        sx={{
          paddingTop: 1,
          maxWidth: 345,
          height: 160,
          position: "relative",
          margin: 2,
        }}
      >
        <Image layout={"fill"} src={image} alt={title} />
      </Box>
      <CardContent>
        <Typography noWrap={true} gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Chip label={`${price} $`} sx={{ marginBottom: 1 }} />
          <Rating
            name="read-only"
            sx={{ marginBottom: 1 }}
            value={rate}
            readOnly
          />
        </Box>
        <Typography
          variant="body2"
          sx={overflowTextStyle}
          color="text.secondary"
        >
          {description}
        </Typography>
        <Link href={`${category}/${id}`}>
          <a>Learn More</a>
        </Link>
      </CardContent>
    </Card>
  );
}
