import styles from "./TopPageComponent.module.css";
import {
  Card,
  Box,
  CardMedia,
  CardContent,
  Typography,
  Rating,
  Chip,
} from "@mui/material";
import { ProductCharacteristic } from "../../interfaces/product.interface";

export const TopPageComponent = ({
  product,
}: TopPageComponentProps): JSX.Element => {
  if (!product) {
    return <span>not found</span>;
  }
  const {
    image,
    description,
    title,
    price,
    rating: { rate },
  } = product;
  return (
    <Card>
      <Box sx={{ paddingTop: 1 }}>
        <CardMedia
          component="img"
          sx={{ objectFit: "contain" }}
          height="360"
          image={image}
          alt={title}
        />
      </Box>
      <CardContent>
        <Typography noWrap={true} gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography
          sx={{ marginBottom: 1 }}
          variant="body2"
          color="text.secondary"
        >
          {description}
        </Typography>
        <Rating
          name="read-only"
          sx={{ marginBottom: 1 }}
          value={rate}
          readOnly
        />
        <Box sx={{ display: "block", marginBottom: 1 }}>
          <Chip label={`${price} $`} sx={{ marginRight: 1 }} />
          <Chip label="out of stock" />
        </Box>
      </CardContent>
    </Card>
  );
};

interface TopPageComponentProps {
  product: ProductCharacteristic;
}
