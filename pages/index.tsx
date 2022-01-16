import { useState } from "react";
import { Htag, Button, Rating } from "../components";

export default function Home(): JSX.Element {
  const [rating, setRating] = useState<number>(4);
  return (
    <div>
      <Htag lvl={1}>
        <span>123123</span>
      </Htag>
      <Button appearance="primary">
        <span>123123</span>
      </Button>
      <Button appearance="ghost" arrow="right">
        <span>123123</span>
      </Button>
      <Rating rating={rating} setRating={setRating} isEditable={true}></Rating>
    </div>
  );
}
